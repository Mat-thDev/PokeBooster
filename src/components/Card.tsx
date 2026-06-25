import { CardResume } from "@tcgdex/sdk";
import Image from "next/image";

interface CardProps {
    details: CardResume;
    collected?: boolean;
}

const Card = ({ details, collected = false }: CardProps) => {
    if (!details) return null;

    const cardImage = details.image ? `${details.image}/high.webp` : null;

    if (!cardImage) {
        return (
            <div className="relative aspect-2/3 w-full rounded-xl border border-base-content/10 bg-base-300 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider mb-1">
                    Nº {details.localId}
                </span>
                <p className="text-xs font-bold text-base-content/60 line-clamp-2">
                    {details.name}
                </p>
            </div>
        );
    }

    return (
        <div
            className={`group relative aspect-2/3 w-full overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20 ${!collected ? "brightness-50 grayscale contrast-125" : "brightness-100 grayscale-0"}`}
        >
            <Image
                src={cardImage}
                alt={`Carta ${details.name} - Nº ${details.localId}`}
                fill
                sizes="(max-w-xs) 150px, 220px"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                unoptimized
                loading="lazy"
            />

            <div className="absolute bottom-2 left-2 rounded-sm bg-base-300 px-2 py-0.5 text-xs font-mono font-bold text-base-content opacity-0 transition-opacity duration-200 group-hover:opacity-100 backdrop-blur-sm pointer-events-none">
                #{details.localId}
            </div>
        </div>
    );
};

export default Card;