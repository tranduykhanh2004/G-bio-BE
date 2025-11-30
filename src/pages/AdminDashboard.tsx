import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { motion } from 'framer-motion';

interface Stats {
    users: number;
    products: number;
}

interface UserData {
    id: number;
    username: string;
    role: string;
}

const AdminDashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState<Stats>({ users: 0, products: 0 });
    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/admin/stats');
                setStats(statsRes.data);
                const usersRes = await api.get('/admin/users');
                setUsers(usersRes.data.data);
            } catch (err) {
                console.error("Failed to fetch admin data", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter text-red-500">ADMIN DASHBOARD</h1>
                    <p className="text-gray-400">Welcome, Administrator {user?.display_name}</p>
                </div>
                <button
                    onClick={logout}
                    className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-colors rounded-full text-sm font-medium"
                >
                    LOGOUT
                </button>
            </header>

            <main className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {/* Stats Card */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Users</h3>
                        <p className="text-4xl font-bold">{stats.users}</p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Products</h3>
                        <p className="text-4xl font-bold">{stats.products}</p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">System Status</h3>
                        <p className="text-green-500 font-bold uppercase">Operational</p>
                    </div>

                    {/* User Management Section */}
                    <section className="col-span-1 md:col-span-3 mt-8">
                        <h2 className="text-xl font-semibold uppercase tracking-wider border-l-2 border-red-500 pl-4 mb-6">User Management</h2>
                        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/10 text-xs uppercase text-gray-400">
                                    <tr>
                                        <th className="p-4">ID</th>
                                        <th className="p-4">Username</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {users.map((u) => (
                                        <tr key={u.id}>
                                            <td className="p-4">{u.id}</td>
                                            <td className="p-4">{u.username}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                    {u.role.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-sm text-gray-400 hover:text-white mr-4">Edit</button>
                                                <button className="text-sm text-red-400 hover:text-red-300">Ban</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </motion.div>
            </main>
        </div>
    );
};

export default AdminDashboard;
