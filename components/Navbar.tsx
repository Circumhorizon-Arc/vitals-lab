"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, TestTube2, Phone, User, Calendar, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/data";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/tests", label: "Tests & Packages" },
    { href: "/book", label: "Book Appointment" },
    { href: "/my-appointments", label: "My Reports" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About Us" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const userCode = localStorage.getItem("user");
            const adminSession = localStorage.getItem("adminSession");
            setIsAuthenticated(!!userCode || !!adminSession);
        };

        // Check on mount
        checkAuth();

        // Listen for custom auth events and storage events (cross-tab)
        window.addEventListener('auth-change', checkAuth);
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('auth-change', checkAuth);
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("adminSession");
        // Dispatch event to update Navbar
        window.dispatchEvent(new Event("auth-change"));
        setIsAuthenticated(false);
        setIsOpen(false);
        router.push("/");
    };

    const filteredLinks = NAV_LINKS.filter(link => {
        if (link.label === "My Reports") return isAuthenticated;
        return true;
    });

    if (pathname.startsWith("/admin")) return null;

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-primary-600 p-1.5 rounded-lg">
                        <TestTube2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="hidden font-bold sm:inline-block text-xl tracking-tight text-primary-900">
                        Vitals <span className="text-primary-600">Lab</span>
                    </span>
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    {filteredLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary-600",
                                pathname === link.href ? "text-primary-600" : "text-slate-600"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <Link href="/book" className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-700 transition-colors">
                                Book Now
                            </Link>
                            <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 transition-colors" title="Logout">
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-700 transition-colors">
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t p-4 bg-white shadow-lg absolute w-full left-0">
                    <div className="flex flex-col space-y-4">
                        {filteredLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-600",
                                    pathname === link.href ? "text-primary-600" : "text-slate-600"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isAuthenticated ? (
                            <>
                                <Link href="/book" onClick={() => setIsOpen(false)} className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-700 transition-colors text-center">
                                    Book Home Collection
                                </Link>
                                <button onClick={handleLogout} className="text-red-600 font-medium text-sm flex items-center justify-center gap-2 py-2">
                                    <LogOut className="h-4 w-4" /> Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login" onClick={() => setIsOpen(false)} className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary-700 transition-colors text-center">
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
