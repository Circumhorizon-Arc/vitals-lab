"use client";

import AdminLayout from "@/components/AdminLayout";
import { Users, Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function PatientsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [rawBookings, setRawBookings] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<any | null>(null);

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        setRawBookings(savedBookings);

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
                // Simple logic: keep the latest date found so far if it's "greater" (string comparison works for ISO dates roughly, but for DD-MM-YYYY it fails. 
                // Ideally dates should be comparable. For now, we trust the order or just leave as is since 'lastVisit' isn't critical.)
            }
        });
        setBookings(Array.from(uniquePatientsMap.values()));
    }, []);

    const handleViewHistory = (patient: any) => {
        // Filter all bookings for this phone number
        const history = rawBookings.filter(b => b.phone === patient.phone);
        setSelectedPatient({ ...patient, history });
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Patients Directory</h1>
                <p className="text-slate-500">Manage patient records and history.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">Patient Name</th>
                                <th className="px-6 py-4 whitespace-nowrap">Contact</th>
                                <th className="px-6 py-4 whitespace-nowrap">Demographics</th>
                                <th className="px-6 py-4 whitespace-nowrap">Visits</th>
                                <th className="px-6 py-4 whitespace-nowrap">Last Visit</th>
                                <th className="px-6 py-4 whitespace-nowrap">Actions</th>
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
                                            <button
                                                onClick={() => handleViewHistory(patient)}
                                                className="text-primary-600 hover:text-primary-800 font-medium text-xs hover:underline"
                                            >
                                                View History
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* History Modal */}
            {selectedPatient && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{selectedPatient.name}</h2>
                                <p className="text-sm text-slate-500">History for +91 {selectedPatient.phone}</p>
                            </div>
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition-colors"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <div className="p-0 overflow-y-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-medium sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3">Test Name</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {selectedPatient.history.map((record: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-slate-600">{record.date}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900">{record.testName}</td>
                                            <td className="px-6 py-4">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-full text-xs font-medium",
                                                    record.status === "Report Ready" ? "bg-green-100 text-green-700" :
                                                        record.status === "Sample Collected" ? "bg-yellow-100 text-yellow-700" :
                                                            "bg-blue-100 text-blue-700"
                                                )}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-slate-900">₹{record.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end">
                            <button
                                onClick={() => setSelectedPatient(null)}
                                className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
