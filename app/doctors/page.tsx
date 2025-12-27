'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/doctors')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setDoctors(data.data);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold mb-4">Our Doctors</h1>
                    <p className="text-xl text-blue-100">
                        Meet our team of experienced medical professionals
                    </p>
                </div>
            </section>

            {/* Doctors Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {doctors.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No doctors available yet. Please check back later.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {doctors.map((doctor: any) => (
                                <div
                                    key={doctor._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                        <div className="text-white text-6xl">👨‍⚕️</div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2 text-gray-800">
                                            {doctor.name}
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-3">
                                            {doctor.specialty}
                                        </p>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {doctor.bio}
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            {doctor.experience} years of experience
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
