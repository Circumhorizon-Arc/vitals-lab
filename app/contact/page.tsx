import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16">
            <div className="container max-w-4xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary-600" /> Visit Us
                            </h3>
                            <p className="text-slate-600 text-sm whitespace-pre-line">{SITE_CONFIG.address}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-primary-600" /> Call Us
                            </h3>
                            <p className="text-slate-600 text-sm mb-2">{SITE_CONFIG.phone}</p>
                            <p className="text-xs text-slate-500">Available 24/7 for support.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-primary-600" /> Email
                            </h3>
                            <p className="text-slate-600 text-sm">{SITE_CONFIG.email}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <Clock className="h-5 w-5 text-primary-600" /> Lab Timings
                            </h3>
                            <p className="text-slate-600 text-sm mb-1">Mon - Sat: 7:00 AM - 9:00 PM</p>
                            <p className="text-slate-600 text-sm">Sunday: 7:00 AM - 2:00 PM</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-slate-200 w-full h-full min-h-[400px] rounded-xl flex items-center justify-center text-slate-500 font-medium">
                            {/* Dummy Map Embed */}
                            <div className="text-center p-8">
                                <MapPin className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                Google Map Embed
                                <p className="text-sm mt-2 font-normal opacity-70">Visualize map pointing to {SITE_CONFIG.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
