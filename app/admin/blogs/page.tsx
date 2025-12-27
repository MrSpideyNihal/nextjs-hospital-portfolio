'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Blog {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    published: boolean;
    publishDate: string;
    tags: string[];
}

export default function ManageBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: 'Admin',
        published: false,
        tags: '',
    });
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            router.push('/login');
            return;
        }
        fetchBlogs();
    }, [router]);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (data.success) {
                setBlogs(data.data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs';
            const method = editingId ? 'PUT' : 'POST';

            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setShowForm(false);
                setEditingId(null);
                setFormData({ title: '', content: '', author: 'Admin', published: false, tags: '' });
                fetchBlogs();
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    const handleEdit = (blog: Blog) => {
        setFormData({
            title: blog.title,
            content: blog.content,
            author: blog.author,
            published: blog.published,
            tags: blog.tags.join(', '),
        });
        setEditingId(blog._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchBlogs();
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Manage Blogs</h1>
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
                                setFormData({ title: '', content: '', author: 'Admin', published: false, tags: '' });
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            + Add Blog Post
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Content *</label>
                                <textarea
                                    required
                                    rows={10}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                                    placeholder="Write your blog content here... (supports HTML)"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Author</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg"
                                        placeholder="health, wellness, tips"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="published" className="text-sm font-medium">
                                    Publish immediately
                                </label>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    {editingId ? 'Update' : 'Create'} Blog Post
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
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Author</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {blogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No blog posts yet. Click "Add Blog Post" to create one.
                                    </td>
                                </tr>
                            ) : (
                                blogs.map((blog) => (
                                    <tr key={blog._id}>
                                        <td className="px-6 py-4 font-medium">{blog.title}</td>
                                        <td className="px-6 py-4">{blog.author}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs ${blog.published
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {blog.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(blog.publishDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
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
