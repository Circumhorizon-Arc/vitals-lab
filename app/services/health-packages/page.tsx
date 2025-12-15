import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { HEALTH_PACKAGES } from "@/lib/data";

export default function HealthPackagesPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-white py-16">
                <div className="container text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Preventive Health Packages</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Curated full body checkups to monitor your vital health parameters.
                        Early detection is the key to a healthy life.
                    </p>
                </div>
            </section>

            <div className="container py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {HEALTH_PACKAGES.map((pkg) => (
                        <div key={pkg.id} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:scale-[1.01] flex flex-col">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{pkg.description}</p>

                            <ul className="space-y-3 text-sm text-slate-600 mb-8 flex-grow">
                                {pkg.includes.map((item, idx) => (
                                    <li key={idx} className="flex gap-x-3">
                                        <CheckCircle2 className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500">Total Price</span>
                                        <div className="flex items-baseline gap-x-2">
                                            <span className="text-lg font-bold text-slate-900">₹{pkg.price}</span>
                                            <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={`/book?package=${pkg.id}`}
                                    className="block w-full rounded-md bg-primary-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    Book Package
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
