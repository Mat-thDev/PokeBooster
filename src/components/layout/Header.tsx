import Link from "next/link";

const Header = () => {
    return (
        <header className="w-full bg-transparent">
            <div className="mx-auto max-w-3xl px-5 pt-6 pb-2">
                <div className="flex h-10 items-center justify-between">

                    {/* Logo Link com efeito ativo rápido */}
                    <Link
                        href="/"
                        className="group block text-2xl font-bold tracking-tight transition-transform active:scale-95 hover:scale-105"
                    >
                        <span className="text-rose-600 transition-colors group-hover:text-rose-500">
                            Poké
                        </span>
                        <span className="text-base-content">
                            Booster
                        </span>
                    </Link>

                    {/* Espaço limpo e reservado para futuras interações (ex: menu/filtros) */}
                    <nav className="flex items-center gap-4"></nav>

                </div>
            </div>
        </header>
    );
};

export default Header;