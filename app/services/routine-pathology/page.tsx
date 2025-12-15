import Link from "next/link";
import { FlaskConical, TestTube2 } from "lucide-react";
import { POPULAR_TESTS, ROUTINE_PATHOLOGY_TESTS } from "@/lib/data";

const ALL_TESTS = [...POPULAR_TESTS, ...ROUTINE_PATHOLOGY_TESTS];

export default function RoutinePathologyPage() {
    const routineCategories = [
        {
            category: "Haematology",
            tests: ["Complete Blood Count (CBC)", "ESR", "Blood Group", "Haemoglobin"]
        },
        {
            category: "Biochemistry",
            tests: ["Blood Sugar (F/PP)", "Liver Function Test (LFT)", "Kidney Function Test (KFT)", "Lipid Profile"]
        },
        {
            category: "Hormones",
            tests: ["Thyroid Profile (T3, T4, TSH)", "Vitamin D", "Vitamin B12", "Testosterone"]
        },
        {
            category: "Infectious Diseases",
            tests: ["Dengue NS1", "Typhoid (Widal)", "Malaria Antigen", "Urine Culture"]
        }
    ];

    const getTestLink = (name: string) => {
        // Simple fuzzy match or exact match to find ID
        // Note: In a real app, we should use IDs in the categories list instead of names.
        // Mapping specific display names to data names if needed.
        const test = ALL_TESTS.find(t =>
            t.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(t.name.toLowerCase()) ||
            // Handle some specific mappings if names are slightly different
            (name === "ESR" && t.id === "esr") ||
            (name === "Blood Group" && t.id === "blood-group") ||
            (name === "Haemoglobin" && t.id === "haemoglobin") ||
            (name === "Blood Sugar (F/PP)" && t.id === "bs-f-pp") ||
            (name === "Testosterone" && t.id === "testosterone") ||
            (name === "Malaria Antigen" && t.id === "malaria-antigen") ||
            (name === "Urine Culture" && t.id === "urine-culture")
        );
        return test ? `/book?test=${test.id}` : "/book";
    };

    return (
        <div className="bg-white min-h-screen">
            <section className="bg-primary-50 py-16">
                <div className="container">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Routine Pathology Services</h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Comprehensive range of everyday diagnostic tests essential for monitoring your health and diagnosing common conditions.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {routineCategories.map((cat, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <FlaskConical className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">{cat.category}</h2>
                                </div>
                                <ul className="space-y-3">
                                    {cat.tests.map((test, idx) => (
                                        <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                                            <span className="text-slate-700 font-medium">{test}</span>
                                            <Link href={getTestLink(test)} className="text-xs font-bold text-primary-600 hover:underline">
                                                Book
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-slate-900 text-white text-center">
                <div className="container">
                    <h2 className="text-2xl font-bold mb-4">Need a specific test?</h2>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">We offer over 1000+ specialized parameters. Browse our full test directory.</p>
                    <Link href="/tests" className="inline-flex items-center gap-2 bg-primary-600 px-6 py-3 rounded-lg font-bold hover:bg-primary-500 transition">
                        <TestTube2 className="h-5 w-5" /> Browse All Tests
                    </Link>
                </div>
            </section>
        </div>
    );
}
