"use client";

import { useState, useEffect } from "react";
import {
    Calendar,
    Users,
    FileText,
    FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminLayout from "@/components/AdminLayout";

export default function AdminPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookings(savedBookings);
        setFilteredBookings(savedBookings);
    }, []);

    useEffect(() => {
        if (filterStatus === "All") {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(b => b.status === filterStatus));
        }
    }, [filterStatus, bookings]);

    const updateStatus = (id: string, newStatus: string) => {
        const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
        setBookings(updated);
        localStorage.setItem("bookings", JSON.stringify(updated));
    };

    // Admin Dashboard
    const stats = [
        { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "bg-blue-500" },
        { label: "Pending Samples", value: bookings.filter(b => b.status === "Confirmed").length, icon: FlaskConical, color: "bg-yellow-500" },
        { label: "Reports Ready", value: bookings.filter(b => b.status === "Report Ready").length, icon: FileText, color: "bg-green-500" },
        { label: "Total Revenue", value: `₹${bookings.reduce((acc, curr) => acc + (curr.price || 0), 0)}`, icon: Users, color: "bg-purple-500" },
    ];

    return (
        <AdminLayout>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, Admin</p>
                </div>

            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className={cn("p-3 rounded-lg", stat.color, "bg-opacity-10")}>
                            <stat.icon className={cn("h-6 w-6", stat.color.replace("bg-", "text-"))} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 text-lg">Recent Bookings</h3>
                    <div className="flex gap-2">
                        {["All", "Confirmed", "Sample Collected", "Report Ready"].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={cn(
                                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                                    filterStatus === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Test/Package</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">#{booking.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{booking.patientName}</div>
                                            <div className="text-xs text-slate-500">{booking.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">{booking.testName}</td>
                                        <td className="px-6 py-4">
                                            <div>{booking.date}</div>
                                            <div className="text-xs text-slate-500">{booking.timeSlot}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-1 rounded-full text-xs font-medium",
                                                booking.status === "Report Ready" ? "bg-green-100 text-green-700" :
                                                    booking.status === "Sample Collected" ? "bg-yellow-100 text-yellow-700" :
                                                        "bg-blue-100 text-blue-700"
                                            )}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => updateStatus(booking.id, e.target.value)}
                                                className="bg-white border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            >
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Sample Collected">Sample Collected</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Report Ready">Report Ready</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
