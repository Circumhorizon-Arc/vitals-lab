"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useTests, TestItem } from "@/hooks/useTests";
import { Plus, Edit, Trash2, X, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminTestsPage() {
    const { tests, loading, addTest, updateTest, deleteTest } = useTests();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTest, setEditingTest] = useState<TestItem | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");

    // Form State
    const [formData, setFormData] = useState<Partial<TestItem>>({
        category: "Popular"
    });

    const filteredTests = tests.filter(test => {
        const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "All" || test.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleEdit = (test: TestItem) => {
        setEditingTest(test);
        setFormData(test);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this test?")) {
            deleteTest(id);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const testData = {
            ...formData,
            id: editingTest ? editingTest.id : formData.id || Math.random().toString(36).substr(2, 9),
            price: Number(formData.price),
            originalPrice: formData.category === 'Package' ? Number(formData.originalPrice) : undefined,
        } as TestItem;

        if (editingTest) {
            updateTest(testData);
        } else {
            addTest(testData);
        }

        setIsModalOpen(false);
        setEditingTest(null);
        setFormData({ category: "Popular" });
    };

    if (loading) return <AdminLayout><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Test Management</h1>
                    <p className="text-slate-500">Add, edit, or remove diagnostic tests.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingTest(null);
                        setFormData({ category: "Popular" });
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition"
                >
                    <Plus className="h-4 w-4" /> Add New Test
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search tests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {["All", "Popular", "Routine", "Package"].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                filterCategory === cat
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">TAT</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTests.map((test) => (
                                <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {test.name}
                                        {test.category === 'Package' && (
                                            <p className="text-xs text-slate-500 line-clamp-1">{test.includes?.join(", ")}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-xs font-medium",
                                            test.category === "Package" ? "bg-purple-100 text-purple-700" :
                                                test.category === "Popular" ? "bg-blue-100 text-blue-700" :
                                                    "bg-slate-100 text-slate-700"
                                        )}>
                                            {test.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700">₹{test.price}</td>
                                    <td className="px-6 py-4 text-slate-500">{test.turnaroundTime}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(test)}
                                                className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(test.id)}
                                                className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredTests.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        No tests found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200 my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">
                                {editingTest ? "Edit Test" : "Add New Test"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Test Name</label>
                                <input
                                    required
                                    value={formData.name || ""}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    placeholder="e.g. Complete Blood Count"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    >
                                        <option value="Popular">Popular</option>
                                        <option value="Routine">Routine</option>
                                        <option value="Package">Package</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Turnaround Time</label>
                                    <input
                                        required
                                        value={formData.turnaroundTime || ""}
                                        onChange={e => setFormData({ ...formData, turnaroundTime: e.target.value })}
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="e.g. 24 Hours"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.price || ""}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    />
                                </div>
                                {formData.category === 'Package' && (
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Original Price (₹)</label>
                                        <input
                                            type="number"
                                            value={formData.originalPrice || ""}
                                            onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            placeholder="Optional"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    required
                                    value={formData.description || ""}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    rows={3}
                                />
                            </div>

                            {formData.category !== 'Package' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Sample Type</label>
                                        <input
                                            value={formData.sampleType || ""}
                                            onChange={e => setFormData({ ...formData, sampleType: e.target.value })}
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            placeholder="e.g. Blood"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Preparation</label>
                                        <input
                                            value={formData.preparation || ""}
                                            onChange={e => setFormData({ ...formData, preparation: e.target.value })}
                                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                            placeholder="e.g. Fasting required"
                                        />
                                    </div>
                                </div>
                            )}

                            {formData.category === 'Package' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Includes (Comma separated)</label>
                                    <input
                                        value={formData.includes?.join(", ") || ""}
                                        onChange={e => setFormData({ ...formData, includes: e.target.value.split(",").map(s => s.trim()) })}
                                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                        placeholder="CBC, LFT, KFT..."
                                    />
                                </div>
                            )}

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
                                >
                                    {editingTest ? "Save Changes" : "Create Test"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
