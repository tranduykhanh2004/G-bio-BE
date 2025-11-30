import React, { useState } from 'react';
import api from '../api/axios';
import { motion } from 'framer-motion';

interface ImageUploadProps {
    onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        // Create local preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpload(response.data.url);
        } catch (err) {
            setError('Failed to upload image');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-2 text-gray-400 uppercase tracking-wider">
                Product Image
            </label>

            <div className="relative group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                />

                <label
                    htmlFor="image-upload"
                    className={`
            flex flex-col items-center justify-center w-full h-64 
            border-2 border-dashed border-white/20 rounded-lg 
            cursor-pointer bg-white/5 hover:bg-white/10 transition-all
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    {preview ? (
                        <div className="relative w-full h-full p-2">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded"
                            />
                            {uploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                        </div>
                    )}
                </label>
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default ImageUpload;
