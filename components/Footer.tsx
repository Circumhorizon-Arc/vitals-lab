"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";

export function Footer() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-slate-900 text-slate-200 py-12">
            <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Vitals Pathology</h3>
                    <p className="text-sm text-slate-400 max-w-xs">{SITE_CONFIG.tagline} We are committed to providing accurate and timely diagnostic services.</p>
                    <div className="flex space-x-4">
                        <Facebook className="h-5 w-5 hover:text-primary-400 cursor-pointer" />
                        <Twitter className="h-5 w-5 hover:text-primary-400 cursor-pointer" />
                        <Instagram className="h-5 w-5 hover:text-primary-400 cursor-pointer" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-primary-400">About Us</Link></li>
                        <li><Link href="/tests" className="hover:text-primary-400">Tests & Packages</Link></li>
                        <li><Link href="/book" className="hover:text-primary-400">Book Appointment</Link></li>
                        <li><Link href="/contact" className="hover:text-primary-400">Contact Us</Link></li>
                        <li><Link href="/admin" className="hover:text-primary-400">Admin Login</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Our Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/services/home-collection" className="hover:text-primary-400">Home Sample Collection</Link></li>
                        <li><Link href="/services/routine-pathology" className="hover:text-primary-400">Routine Pathology</Link></li>
                        <li><Link href="/services/advanced-diagnostics" className="hover:text-primary-400">Advanced Diagnostics</Link></li>
                        <li><Link href="/services/health-packages" className="hover:text-primary-400">Health Packages</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary-400 shrink-0" />
                            <span>{SITE_CONFIG.address}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary-400 shrink-0" />
                            <span>{SITE_CONFIG.phone}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary-400 shrink-0" />
                            <span>{SITE_CONFIG.email}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                &copy; {new Date().getFullYear()} Vitals Pathology & Diagnostic Lab. All rights reserved.
            </div>
        </footer>
    );
}
