'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        // Simple client-side auth check
        const isAuth = localStorage.getItem('isAuthenticated');
        const user = localStorage.getItem('username');

        if (!isAuth || isAuth !== 'true') {
            router.push('/login');
            return;
        }

        setUsername(user || 'Admin');
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Welcome, {username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Total Blogs</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">0</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500 text-sm font-medium">Published Blogs</h3>
                        <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
                    </div>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-bold text-green-800 mb-2">✅ Login Successful!</h3>
                    <p className="text-green-700">
                        You are now logged in to the admin dashboard. The authentication system is working correctly.
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                            <div className="text-2xl mb-2">👨‍⚕️</div>
                            <div className="font-medium">Manage Doctors</div>
                        </button>
                        <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                            <div className="text-2xl mb-2">📝</div>
                            <div className="font-medium">Manage Blogs</div>
                        </button>
                        <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors">
                            <div className="text-2xl mb-2">⚙️</div>
                            <div className="font-medium">Hospital Settings</div>
                        </button>
                        <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors">
                            <div className="text-2xl mb-2">📧</div>
                            <div className="font-medium">Messages</div>
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-blue-800 mb-2">ℹ️ Next Steps</h3>
                    <p className="text-blue-700">
                        The admin dashboard is ready! You can now add CRUD functionality for doctors and blogs
                        using the API endpoints that are already set up.
                    </p>
                </div>
            </main>
        </div>
    );
}
