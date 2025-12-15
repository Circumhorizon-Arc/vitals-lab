import Link from "next/link";
import { FlaskConical, Timer, CheckCircle2 } from "lucide-react";
import { POPULAR_TESTS, HEALTH_PACKAGES, ROUTINE_PATHOLOGY_TESTS } from "@/lib/data";

export default function TestsPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900">Diagnostic Tests & Health Packages</h1>
                    <p className="text-slate-600 mt-2">Browse our comprehensive list of pathology tests and full body checkup packages.</p>
                </div>

                {/* Individual Tests */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FlaskConical className="h-6 w-6 text-primary-600" />
                        Popular Tests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {POPULAR_TESTS.map((test) => (
                            <div key={test.id} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:scale-[1.01] hover:ring-primary-200 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        <Link href={`/tests/${test.id}`} className="focus:outline-none hover:text-primary-600 transition-colors">
                                            {/* Remove full card click overlay to allow separate buttons */}
                                            {test.name}
                                        </Link>
                                    </h3>
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                        {test.sampleType}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">{test.description}</p>

                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500">Report in</span>
                                            <span className="text-sm font-medium text-slate-900">{test.turnaroundTime}</span>
                                        </div>
                                        <div className="text-lg font-bold text-slate-900">₹{test.price}</div>
                                    </div>
                                    <Link
                                        href={`/book?test=${test.id}`}
                                        className="block w-full rounded-md bg-white px-3 py-2.5 text-center text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-600 hover:bg-primary-50 transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Health Packages */}
                {/* Health Packages */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-primary-600" />
                        Health Packages
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {HEALTH_PACKAGES.map((pkg) => (
                            <div key={pkg.id} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:scale-[1.01] hover:ring-primary-200 flex flex-col">
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
                </section>

                {/* Routine Pathology Tests */}
                <section className="mt-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FlaskConical className="h-6 w-6 text-primary-600" />
                        Routine Pathology Tests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ROUTINE_PATHOLOGY_TESTS.map((test) => (
                            <div key={test.id} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:scale-[1.01] hover:ring-primary-200 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        <span className="hover:text-primary-600 transition-colors">
                                            {test.name}
                                        </span>
                                    </h3>
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                        {test.sampleType}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 line-clamp-2 flex-grow">{test.description}</p>

                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500">Report in</span>
                                            <span className="text-sm font-medium text-slate-900">{test.turnaroundTime}</span>
                                        </div>
                                        <div className="text-lg font-bold text-slate-900">₹{test.price}</div>
                                    </div>
                                    <Link
                                        href={`/book?test=${test.id}`}
                                        className="block w-full rounded-md bg-white px-3 py-2.5 text-center text-sm font-semibold text-primary-600 shadow-sm ring-1 ring-inset ring-primary-600 hover:bg-primary-50 transition-colors"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
