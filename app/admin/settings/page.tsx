"use client";

import AdminLayout from "@/components/AdminLayout";
import { Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                <p className="text-slate-500">Configure lab details and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">General Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Lab Name</label>
                            <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" defaultValue="Vitals Pathology & Diagnostic Lab" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
                            <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" defaultValue="Accurate Tests. Trusted Reports." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                            <input type="email" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" defaultValue="care@vitalslab.in" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <textarea className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" rows={3} defaultValue="Plot No. 12, Sector 5, Rohini, New Delhi - 110085"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm" defaultValue="+91 98765 43210" />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Notifications</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">Email Alerts on New Booking</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">SMS Alerts to Patients</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-700">Daily Report Summary</span>
                            <input type="checkbox" className="toggle" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
                    <Save className="h-4 w-4" /> Save Changes
                </button>
            </div>
        </AdminLayout>
    );
}
