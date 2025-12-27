'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Doctor {
    _id: string;
    name: string;
    specialty: string;
    bio: string;
    experience: number;
    email: string;
    phone: string;
    imageUrl?: string;
}

export default function ManageDoctors() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        bio: '',
        experience: 0,
        email: '',
        phone: '',
        imageUrl: '',
    });
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            router.push('/login');
            return;
        }
        fetchDoctors();
    }, [router]);

    const fetchDoctors = async () => {
        try {
            const res = await fetch('/api/doctors');
            const data = await res.json();
            if (data.success) {
                setDoctors(data.data);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingId ? `/api/doctors/${editingId}` : '/api/doctors';
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setShowForm(false);
                setEditingId(null);
                setFormData({ name: '', specialty: '', bio: '', experience: 0, email: '', phone: '', imageUrl: '' });
                fetchDoctors();
            }
        } catch (error) {
            console.error('Error saving doctor:', error);
        }
    };

    const handleEdit = (doctor: Doctor) => {
        setFormData({
            name: doctor.name,
            specialty: doctor.specialty,
            bio: doctor.bio,
            experience: doctor.experience,
            email: doctor.email,
            phone: doctor.phone,
            imageUrl: doctor.imageUrl || '',
        });
        setEditingId(doctor._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this doctor?')) return;

        try {
            const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchDoctors();
            }
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Manage Doctors</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/admin')}
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            ← Back to Dashboard
                        </button>
                        <button
                            onClick={() => {
                                setShowForm(true);
                                setEditingId(null);
                                setFormData({ name: '', specialty: '', bio: '', experience: 0, email: '', phone: '', imageUrl: '' });
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            + Add Doctor
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? 'Edit Doctor' : 'Add New Doctor'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Specialty *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Experience (years) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl || ''}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        placeholder="https://i.imgur.com/example.jpg"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload to Imgur and paste URL here</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    {editingId ? 'Update' : 'Create'} Doctor
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
                                    }}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Specialty</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Experience</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {doctors.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No doctors yet. Click "Add Doctor" to create one.
                                    </td>
                                </tr>
                            ) : (
                                doctors.map((doctor) => (
                                    <tr key={doctor._id}>
                                        <td className="px-6 py-4">{doctor.name}</td>
                                        <td className="px-6 py-4">{doctor.specialty}</td>
                                        <td className="px-6 py-4">{doctor.experience} years</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">
                                                <div>{doctor.email}</div>
                                                <div className="text-gray-500">{doctor.phone}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(doctor)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(doctor._id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
