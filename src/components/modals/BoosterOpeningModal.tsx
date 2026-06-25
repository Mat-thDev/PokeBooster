import useModal from "@/hooks/useModal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, CheckCircle2 } from "lucide-react";
import useCollection from "@/hooks/useCollection";
import { Card } from "@tcgdex/sdk";

const BoosterOpeningModal = () => {
    const { active, close } = useModal();

    const cards = active?.props?.cards ?? [];

    const [revealedIndex, setRevealedIndex] = useState<number>(0);

    useEffect(() => {
        setRevealedIndex(0);
    }, [cards]);


    const handleReveal = (index: number) => {
        if (revealedIndex >= cards.length) return;

        if (index === revealedIndex) {
            setRevealedIndex((prev) => Math.min(prev + 1, cards.length));
        }
    };

    const handleRevealAll = () => {
        setRevealedIndex(cards.length);
    };

    if (!cards.length) return null;

    return (
        <div className="flex flex-col items-center justify-between w-full min-h-[60vh] py-2 text-base-content select-none">

            <div className="text-center space-y-1 mb-8">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Abrindo Booster
                </h2>
                <p className="text-xs text-base-content/50 font-medium">
                    {revealedIndex >= cards.length
                        ? "Todas as cartas foram coletadas!"
                        : "Clique na carta destacada para virá-la"}
                </p>
            </div>

            {/* Grid */}
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-2">

                {cards.map((card: Card, index: number) => {
                    const isRevealed = index < revealedIndex;
                    const isCurrent = index === revealedIndex && revealedIndex < cards.length;
                    const image = card.image ? `${card.image}/high.webp` : null;

                    return (
                        <div
                            key={card.id + "_booster" + index}
                            onClick={() => handleReveal(index)}
                            className={`
                                relative w-24 sm:w-36 aspect-2/3 rounded-md
                                transition-all duration-300 ease-out
                                ${isRevealed ? "scale-100" : "scale-95"}
                                ${isCurrent ? "cursor-pointer" : "cursor-default"}
                            `}
                        >

                            {/* Carta */}
                            <div className="relative w-full h-full">

                                {/* Frente */}
                                <div className={`
                                    absolute inset-0 transition-all duration-500
                                    ${isRevealed ? "opacity-100 rotate-0" : "opacity-0 rotate-6"}
                                `}>
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={card.name || "Carta Pokémon"}
                                            fill
                                            className="object-contain rounded-md"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs bg-base-200 rounded-md">
                                            {card.name}
                                        </div>
                                    )}
                                </div>

                                {/* Verso */}
                                <div className={`
                                    absolute inset-0 transition-all duration-500
                                    ${isRevealed ? "opacity-0 -rotate-6" : "opacity-100 rotate-0"}
                                `}>
                                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-base-content/10 bg-base-300/40">
                                        <Image
                                            src="/assets/pokemon_card_backside.png"
                                            alt="Verso da Carta"
                                            fill
                                            className="object-contain"
                                            unoptimized
                                            priority={index < 4}
                                        />

                                        <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>

                            </div>

                            {isCurrent && (
                                <div className="
                                    absolute inset-0
                                    ring-2 ring-primary/60
                                    rounded-md
                                    animate-pulse
                                    pointer-events-none
                                " />
                            )}

                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-10 flex items-center gap-3">
                {revealedIndex < cards.length ? (
                    <button
                        onClick={handleRevealAll}
                        className="btn btn-ghost btn-sm text-xs gap-1.5 opacity-60 hover:opacity-100 normal-case"
                    >
                        <Eye className="w-4 h-4 text-accent" />
                        Revelar tudo
                    </button>
                ) : (
                    <button
                        onClick={() => close()}
                        className="btn btn-primary px-8 gap-2 font-bold shadow-lg text-primary-content shadow-primary/20 normal-case"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Guardar na Coleção
                    </button>
                )}
            </div>
        </div>
    );
};

export default BoosterOpeningModal;