'use client'

import { pokemonTcg } from "@/services/pokemontcg";
import { SetModel } from "@tcgdex/sdk";
import { use, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, Layers, LayersPlus, Sparkles, Star } from "lucide-react";
import KPI from "@/components/KPI";
import Card from "@/components/Card";
import useCollection from "@/hooks/useCollection";
import useModal from "@/hooks/useModal";

const CollectionPage = ({ params }: { params: Promise<{ collectionId: string }> }) => {

    const [collectionDetails, setCollectionDetails] = useState<SetModel | null>(null);
    const { collectionId } = use(params);

    const { open } = useModal();

    const { updateCollection, collectedCardsAmount, hasCard } = useCollection()

    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 16;

    useEffect(() => {
        if (!collectionId) return;

        const load = async () => {
            const c = await pokemonTcg.getSet(collectionId);
            if (c) setCollectionDetails(c as SetModel);
        }

        load();
    }, [collectionId])


    const totalPages = collectionDetails ? Math.ceil(collectionDetails.cards.length / ITEMS_PER_PAGE) : 0;

    const paginatedCards = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        return collectionDetails ? collectionDetails.cards.slice(start, start + ITEMS_PER_PAGE) : [];
    }, [collectionDetails, page]);


    if (!collectionDetails) {
        return (
            <div className="py-20 text-center text-base-content/50">
                Carregando coleção...
            </div>
        )
    }


    const openBooster = async () => {
        if (!collectionDetails || !collectionDetails.cards) return null;

        const booster = await pokemonTcg.openBooster(1, collectionDetails.cards);

        open({ target: "BoosterOpening", props: { cid: collectionId, cards: booster[0] } });

        booster[0].map(async (c) => await updateCollection(collectionId, c.id))


    }

    const logoUrl = collectionDetails.logo ? `${collectionDetails.logo}.png` : null;
    const symbolUrl = collectionDetails.symbol ? `${collectionDetails.symbol}.png` : null;

    return (
        <div className="space-y-10 py-6">
            <section className="relative overflow-hidden rounded-md border border-base-content/10 bg-base-200/40 backdrop-blur-md p-6">

                {/* Glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 blur-2xl rounded-full" />
                </div>

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                    {/* Info principal */}
                    <div className="space-y-3 max-w-xl">

                        {/* Logo */}
                        {logoUrl && (
                            <div className="relative h-14 w-48">
                                <Image
                                    src={logoUrl}
                                    alt={collectionDetails.name}
                                    fill
                                    className="object-contain object-left"
                                    unoptimized
                                />
                            </div>
                        )}

                        <h1 className="text-2xl font-bold tracking-tight">
                            {collectionDetails.name}
                        </h1>


                        <p className="text-sm text-base-content/70">
                            Série: {collectionDetails.serie?.name}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-wrap gap-4 text-xs text-base-content/70 font-semibold">

                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {collectionDetails.releaseDate}
                            </span>

                            <span className="flex items-center gap-1">
                                <Layers className="w-4 h-4" />
                                {collectionDetails.cardCount.official ?? collectionDetails.cardCount.total} cartas
                            </span>

                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col items-start sm:items-end gap-3">

                        {/* Symbol */}
                        {symbolUrl && (
                            <div className="relative h-10 w-10 opacity-80">
                                <Image
                                    src={symbolUrl}
                                    alt="symbol"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        )}

                        <button onClick={() => { openBooster() }} className="btn btn-primary text-primary-content gap-2 shadow-md shadow-primary/20 hover:scale-[1.03] transition">
                            <Sparkles className="w-4 h-4" />
                            Abrir Booster
                        </button>

                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="space-y-2">
                <h1 className="text-xl font-bold tracking-tighter">Informações Adicionais</h1>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <KPI title="Total" value={`${collectionDetails.cardCount.total}`} icon={Layers} />
                    <KPI title="Oficial" value={`${collectionDetails.cardCount.official}`} icon={LayersPlus} />
                    <KPI title="Holo" value={`${collectionDetails.cardCount.holo}`} icon={Sparkles} />
                    <KPI title="Reverse" value={`${collectionDetails.cardCount.reverse}`} icon={Star} />
                </div>
            </section>

            {/* Cards */}
            <section className="space-y-4">
                <h1 className="text-xl font-bold tracking-tight">
                    Sua Coleção
                    <span className="text-base-content/50 font-medium ml-2">
                        ({collectedCardsAmount(collectionId)}/{collectionDetails.cardCount.total})
                    </span>
                </h1>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {paginatedCards.map((c) => (
                        <Card key={c.id} details={c} collected={hasCard(collectionId, c.id)} />
                    ))}
                </div>
            </section>

            {/* Paginação */}
            {totalPages > 1 && (
                <section className="flex justify-center items-center gap-2 pt-4">

                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        className="btn btn-sm"
                        disabled={page === 1}
                    >
                        ←
                    </button>

                    <span className="text-sm text-base-content/70">
                        Página {page} de {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        className="btn btn-sm"
                        disabled={page === totalPages}
                    >
                        →
                    </button>

                </section>
            )}
        </div>
    )
}

export default CollectionPage;