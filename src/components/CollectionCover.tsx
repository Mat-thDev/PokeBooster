import { SetResumeModel } from "@tcgdex/sdk";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CollectionCoverProps {
    set: SetResumeModel;
}

const CollectionCover = ({ set }: CollectionCoverProps) => {
    if (!set) return null;

    const logoUrl = set.logo ? `${set.logo}.png` : null;
    const symbolUrl = set.symbol ? `${set.symbol}.png` : null;

    return (
        <Link
            href={`/collection/${set.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-md border-2 border-base-300 p-4 transition-all duration-300 hover:border-accent hover:bg-base-300 active:scale-[0.99] shadow-sm hover:shadow-md min-h-35"
        >
            <div className="flex w-full items-start justify-between gap-4">
                <div className="relative h-12 w-40 shrink-0">
                    {logoUrl ? (
                        <Image
                            src={logoUrl}
                            alt={`Logo da coleção ${set.name}`}
                            fill
                            sizes="(max-w-xl) 160px"
                            className="object-contain object-left filter brightness-90 transition-all duration-300 group-hover:brightness-100 group-hover:scale-[1.02]"
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full items-center">
                            <span className="text-xs font-black tracking-widest text-primary uppercase truncate max-w-37.5">
                                {set.id}
                            </span>
                        </div>
                    )}
                </div>

                {symbolUrl && (
                    <div className="relative h-7 w-7 shrink-0 rounded-md bg-base-300/40 p-1 border border-base-content/5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src={symbolUrl}
                            alt={`Símbolo de ${set.name}`}
                            fill
                            sizes="28px"
                            className="object-contain p-1"
                            unoptimized
                        />
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-end justify-between">
                <div className="min-w-0 pr-6">
                    <h2 className="font-bold text-base leading-tight text-base-content tracking-tight truncate group-hover:text-accent transition-colors">
                        {set.name}
                    </h2>
                    <p className="text-xs text-base-content/70 mt-1 font-semibold">
                        {set.cardCount.official ?? set.cardCount.total} cartas na coleção
                    </p>
                </div>

                <div className="text-base-content/20 transition-all duration-300 transform translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-accent hidden sm:block">
                    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </div>
            </div>
        </Link>
    );
};

export default CollectionCover;