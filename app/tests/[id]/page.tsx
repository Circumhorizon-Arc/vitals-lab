import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock, FlaskConical, IndianRupee, Info } from "lucide-react";
import { POPULAR_TESTS, HEALTH_PACKAGES } from "@/lib/data";
import { TestOrPackage } from "@/lib/types";

interface PageProps {
    params: {
        id: string;
    };
}

// Helper to find test or package
function getData(id: string): TestOrPackage | null {
    const test = POPULAR_TESTS.find((t) => t.id === id);
    if (test) return { type: "test", ...test };

    const pkg = HEALTH_PACKAGES.find((p) => p.id === id);
    if (pkg) return { type: "package", ...pkg };

    return null;
}

export default function TestDetailPage({ params }: PageProps) {
    const data = getData(params.id);

    if (!data) {
        notFound();
    }

    const isPackage = data.type === "package";

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container max-w-4xl">
                <Link href="/tests" className="text-sm text-slate-500 hover:text-primary-600 mb-6 inline-block">
                    &larr; Back to all tests
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
                                        {isPackage ? "Health Package" : "Diagnostic Test"}
                                    </span>
                                    {data.type === "test" && (
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                            Sample: {data.sampleType}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{data.name}</h1>
                                <p className="mt-4 text-lg text-slate-600">{data.description}</p>
                            </div>
                            <div className="flex-none bg-slate-50 p-6 rounded-xl border border-slate-100 text-center min-w-[200px]">
                                <p className="text-sm text-slate-500 mb-1">Total Cost</p>
                                <div className="flex items-center justify-center text-4xl font-bold text-slate-900">
                                    <IndianRupee className="h-8 w-8" />
                                    {data.price}
                                </div>
                                {data.type === "package" && data.originalPrice && (
                                    <p className="text-sm text-slate-400 line-through mt-1">₹{data.originalPrice}</p>
                                )}
                                <Link
                                    href={`/book?${data.type === "package" ? "package" : "test"}=${data.id}`}
                                    className="mt-6 block w-full rounded-md bg-primary-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>

                        <hr className="my-10 border-slate-100" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <Info className="h-5 w-5 text-primary-600" />
                                    Overview & Preparation
                                </h3>
                                <div className="space-y-4 text-slate-600">
                                    {data.type === "package" ? (
                                        <p>This package includes a comprehensive set of tests designed to check for underlying health conditions.</p>
                                    ) : (
                                        <>
                                            <p><strong className="text-slate-900">Preparation:</strong> {data.preparation}</p>
                                        </>
                                    )}
                                    <p className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        Report ready in <span className="font-medium text-slate-900">{data.turnaroundTime}</span>
                                    </p>
                                </div>
                            </div>

                            {data.type === "package" && (
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                        <FlaskConical className="h-5 w-5 text-primary-600" />
                                        Tests Included ({data.includes.length})
                                    </h3>
                                    <ul className="space-y-3">
                                        {data.includes.map((item: string, idx: number) => (
                                            <li key={idx} className="flex gap-x-3 text-slate-600">
                                                <CheckCircle2 className="h-5 w-5 flex-none text-green-500" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
