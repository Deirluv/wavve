// @/components/DeleteConfirmModal.tsx
import React from 'react';
import { Disc, Trash, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    trackTitle: string;
    loading: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
                                                                          isOpen,
                                                                          onClose,
                                                                          onConfirm,
                                                                          trackTitle,
                                                                          loading,
                                                                      }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                    <h2 className="text-2xl font-bold text-red-400 flex items-center">
                        <Trash className="w-6 h-6 mr-2" />
                        Confirm Deletion
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-gray-300 mb-6">
                    Are you absolutely sure you want to delete the track **"{trackTitle}"**?
                    <br />
                    **This action cannot be undone!**
                </p>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? (
                            <Disc className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Trash className="w-5 h-5 mr-2" />
                        )}
                        {loading ? 'Deleting...' : 'Delete Permanently'}
                    </button>
                </div>
            </div>
        </div>
    );
};