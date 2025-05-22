import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function ToolbarSkeleton() {
    const theme = useSelector((state: RootState) => state.ui.theme);
    const isDark = theme === 'dark';
    return (
        <div className="flex items-center justify-between gap-4 w-full">
            {/* Search input skeleton */}
            <div className={`relative rounded-md ${isDark ? "bg-zinc-700/40" : "bg-zinc-200"} border border-white/10 backdrop-blur-md shimmer h-10 w-1/3`} />

            {/* Button skeletons */}
            <div className={`relative rounded-md ${isDark ? "bg-zinc-700/40" : "bg-zinc-200"} border border-white/10 backdrop-blur-md shimmer h-10 w-1/6`} />
            <div className={`relative rounded-md ${isDark ? "bg-zinc-700/40" : "bg-zinc-200"} border border-white/10 backdrop-blur-md shimmer h-10 w-1/6`} />
        </div>
    );
}
