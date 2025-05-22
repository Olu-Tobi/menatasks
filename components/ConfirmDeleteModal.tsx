// components/ConfirmDeleteModal.tsx

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm max-sm:w-[90%] space-y-4">
                <h2 className="text-lg font-semibold text-zinc-800">Confirm Deletion</h2>
                <p className="text-sm text-gray-600">Are you sure you want to delete this task?</p>
                <div className="flex justify-end gap-3">
                    <button
                        aria-label="Cancel"
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        aria-label="Delete"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="bg-red-600 text-white px-4 py-2 text-sm rounded hover:bg-red-700 transition"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
