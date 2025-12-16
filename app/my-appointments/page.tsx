"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Clock, FileText, FlaskConical, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Suspense } from "react";

function MyAppointmentsContent() {
    const [bookings, setBookings] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const isNew = searchParams.get("new");

    useEffect(() => {
        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const userStr = localStorage.getItem("user");

        if (userStr) {
            const user = JSON.parse(userStr);
            console.log("Current User:", user); // Debug log
            // Filter bookings for the logged-in user's phone number
            const userBookings = savedBookings.filter((b: any) => b.phone === user.phone);
            setBookings(userBookings);
        } else {
            // If no user is logged in, show nothing (or redirect, but component handles display)
            setBookings([]);
        }
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">My Appointments</h1>
                <p className="text-slate-600 mb-8">View your upcoming appointments and download test reports.</p>

                {isNew && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">Booking confirmed successfully! You will receive an SMS shortly.</span>
                    </div>
                )}

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
                        <FlaskConical className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900">No appointments found</h3>
                        <p className="text-slate-500 max-w-sm mx-auto mt-2">You haven't booked any tests yet. Book a test to keep track of your health.</p>
                        <Link href="/tests" className="mt-6 inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                            Book a Test
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking: any, index: number) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{booking.testName}</h3>
                                        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {booking.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {booking.timeSlot}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide",
                                            booking.status === "Report Ready" ? "bg-green-100 text-green-800" :
                                                booking.status === "Confirmed" ? "bg-blue-100 text-blue-800" :
                                                    "bg-yellow-100 text-yellow-800"
                                        )}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
                                    <div>
                                        <span className="block text-xs font-medium text-slate-400 uppercase">Patient</span>
                                        <span className="font-medium text-slate-900">{booking.patientName}</span> ({booking.age} yrs, {booking.gender})
                                    </div>
                                    <div>
                                        <span className="block text-xs font-medium text-slate-400 uppercase">Location</span>
                                        {booking.collectionType === "home" ? (
                                            <span className="flex items-start gap-1">
                                                <MapPin className="h-4 w-4 mt-0.5" />
                                                {booking.address}, {booking.pincode}
                                            </span>
                                        ) : (
                                            <span className="font-medium text-slate-900">Lab Visit</span>
                                        )}
                                    </div>
                                </div>

                                {booking.status === "Report Ready" && (
                                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                        <button className="flex items-center gap-2 text-primary-600 font-semibold text-sm hover:underline">
                                            <FileText className="h-4 w-4" />
                                            Download Report
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MyAppointmentsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex justify-center items-center">Loading...</div>}>
            <MyAppointmentsContent />
        </Suspense>
    );
}
