interface BoosterPackProps {
    setName: string;
    setLogoUrl: string; // Vem de: set.logo (ex: "https://assets.tcgdex.net/pt/sv/sv8/logo.png")
    onOpen: () => void;
}

const BoosterPack = ({ setName, setLogoUrl, onOpen }: BoosterPackProps) => {
    return (
        <div
            onClick={onOpen}
            className="group relative w-64 h-96 cursor-pointer select-none perspective-1000"
        >
            {/* Corpo do Booster simulando o reflexo do Foil/Plástico */}
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border border-white/10 shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden transition-transform duration-300 group-hover:scale-105 active:scale-95">

                {/* Efeito de Brilho Metalizado do Booster */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay pointer-events-none transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Serrilhado Superior do Booster (Borda de plástico IRL) */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-base-300 opacity-40 flex justify-between overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
                    {/* Você pode fazer um zigue-zague simples aqui com CSS */}
                </div>

                <span className="text-[10px] font-bold text-primary/60 tracking-widest uppercase mt-4">
                    Pokémon TCG Booster
                </span>

                {/* LOGO DINÂMICO DO SET (Injetado via API) */}
                <div className="relative w-full h-32 my-auto flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110">
                    {setLogoUrl ? (
                        <img
                            src={`${setLogoUrl}`} // O TCGdex geralmente hospeda em .png ou .webp
                            alt={setName}
                            className="object-contain max-h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                        />
                    ) : (
                        <span className="text-xl font-extrabold text-center text-base-content/80">{setName}</span>
                    )}
                </div>

                <div className="text-center">
                    <p className="text-[11px] text-base-content/40 font-semibold mb-2">CLIQUE PARA ABRIR</p>
                    <div className="h-1 w-12 bg-primary/40 rounded-full mx-auto" />
                </div>
            </div>
        </div>
    )
}


export default BoosterPack;