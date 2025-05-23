
type Props = {
    onRetry: () => void;
};

export default function TaskLoadError({ onRetry }: Props) {
    return (
        <div className="p-6 bg-red-50  rounded-lg text-center text-red-700  w-full max-w-xs sm:max-w-sm md:max-w-md">
            <p className="mb-4 text-lg font-semibold">Failed to load tasks.</p>
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600  text-white rounded cursor-pointer hover:bg-red-700  transition"
            >
                Retry
            </button>
        </div>
    );
}

