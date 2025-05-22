import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function ChartSkeleton() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-72">
            {[...Array(2)].map((_, i) => (
                <div
                    key={i}
                    className={`relative rounded-lg ${isDark ? "bg-zinc-700/40" : "bg-zinc-200"}   border border-white/10 backdrop-blur-md shimmer h-72`}
                />
            ))}
        </div>
    );
}
