import { LucideIcon } from "lucide-react";

const KPI = ({ title, value, icon: Icon }: { title: string, value: string, icon: LucideIcon }) => {
    return (
        <div className="group relative overflow-hidden rounded-md border-2 border-base-300 bg-base-200 px-4 py-3 transition-all duration-300 hover:bg-base-300 hover:border-primary
        ">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -top-8 -right-8 w-20 h-20 bg-primary/10 blur-2xl rounded-full" />
            </div>

            <div className="relative flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-base font-bold text-primary truncate">
                        {title}
                    </p>

                    <p className="text-base font-semibold tracking-tight text-accent">
                        {value}
                    </p>
                </div>

                {/* Ícone */}
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-base-100 border-2 border-base-300 text-primary transition-all duration-300 group-hover:scale-105">
                    <Icon className="w-4 h-4" />
                </div>

            </div>
        </div>
    )
}

export default KPI;