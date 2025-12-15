"use client";

import AdminLayout from "@/components/AdminLayout";
import { Users, Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function PatientsPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        // De-duplicate patients based on phone number for this view
        const uniquePatientsMap = new Map();
        savedBookings.forEach((b: any) => {
            if (!uniquePatientsMap.has(b.phone)) {
                uniquePatientsMap.set(b.phone, {
                    name: b.patientName,
                    phone: b.phone,
                    age: b.age,
                    gender: b.gender,
                    lastVisit: b.date,
                    totalVisits: 1
                });
            } else {
                const p = uniquePatientsMap.get(b.phone);
                p.totalVisits += 1;
                // keep latest date is simpler logic for now
            }
        });
        setBookings(Array.from(uniquePatientsMap.values()));
    }, []);

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Patients Directory</h1>
                <p className="text-slate-500">Manage patient records and history.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium">
                        <tr>
                            <th className="px-6 py-4">Patient Name</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Demographics</th>
                            <th className="px-6 py-4">Visits</th>
                            <th className="px-6 py-4">Last Visit</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No patients found.
                                </td>
                            </tr>
                        ) : (
                            bookings.map((patient, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                                {patient.name.charAt(0)}
                                            </div>
                                            {patient.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-600">
                                            <Phone className="h-3 w-3" /> {patient.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {patient.age} Y / {patient.gender}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                                            {patient.totalVisits} Visits
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" /> {patient.lastVisit}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary-600 hover:text-primary-800 font-medium text-xs">View History</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
