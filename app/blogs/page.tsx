'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/blogs')
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBlogs(data.data);
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
                    <h1 className="text-5xl font-bold mb-4">Health Blog</h1>
                    <p className="text-xl text-blue-100">
                        Latest health tips and medical insights
                    </p>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {blogs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">
                                No blog posts available yet. Please check back later.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog: any) => (
                                <div
                                    key={blog._id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                                        <div className="text-white text-6xl">📝</div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-2 text-gray-800">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-3">
                                            {new Date(blog.publishDate).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {blog.excerpt}
                                        </p>
                                        <Link
                                            href={`/blogs/${blog._id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Read More →
                                        </Link>
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
