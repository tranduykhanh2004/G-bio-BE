import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await api.post('/users', {
                username,
                password_hash: password,
                display_name: displayName
            });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white p-4 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-bold mb-2 text-center tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                            JOIN US
                        </h2>
                        <p className="text-center text-gray-400 mb-8 text-sm tracking-wide uppercase">
                            Start your journey today
                        </p>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 mb-6 text-sm rounded text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder-gray-600"
                                placeholder="Choose a username"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Display Name</label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder-gray-600"
                                placeholder="Your public name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-lg focus:border-white/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder-gray-600"
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'CREATING...' : 'CREATE ACCOUNT'}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white font-semibold hover:text-gray-300 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
