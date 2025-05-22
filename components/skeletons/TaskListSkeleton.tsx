import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function TaskListSkeleton() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className={`relative rounded-lg ${isDark ? "bg-zinc-700/40" : "bg-zinc-200"} border border-white/10 backdrop-blur-md shimmer h-32 mb-4`}
                >
                    {/* Add some "text lines" as inner divs */}
                    <div className="absolute top-6 left-6 right-6 space-y-2">
                        <div className="h-4 bg-white/20 rounded w-3/4" />
                        <div className="h-3 bg-white/10 rounded w-1/2" />
                        <div className="h-3 bg-white/10 rounded w-1/3" />
                    </div>
                </div>
            ))}
        </>
    );
}
