import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ImageUpload from '../components/ImageUpload';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [imageUrl, setImageUrl] = useState<string>('');

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter">DASHBOARD</h1>
                    <p className="text-gray-400">Welcome back, {user?.display_name || user?.username}</p>
                </div>
                <button
                    onClick={logout}
                    className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full text-sm font-medium"
                >
                    LOGOUT
                </button>
            </header>

            <main className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* Profile Section */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold uppercase tracking-wider border-l-2 border-white pl-4">Your Profile</h2>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold">
                                    {user?.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{user?.display_name}</p>
                                    <p className="text-gray-400 text-sm">@{user?.username}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Product Upload Demo */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold uppercase tracking-wider border-l-2 border-white pl-4">Add New Product</h2>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-6">
                            <ImageUpload onUpload={(url) => setImageUrl(url)} />

                            {imageUrl && (
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-sm break-all">
                                    <strong>Upload Success!</strong><br />
                                    URL: {imageUrl}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-black/50 border border-white/10 p-3 rounded focus:border-white/50 outline-none text-white"
                                    placeholder="e.g. Vintage Camera"
                                />
                            </div>

                            <button className="w-full bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition-colors">
                                PUBLISH PRODUCT
                            </button>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    );
};

export default Dashboard;
