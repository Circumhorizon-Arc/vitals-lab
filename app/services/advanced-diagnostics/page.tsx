import Link from "next/link";
import { Microscope, Dna, Activity, ShieldCheck } from "lucide-react";

export default function AdvancedDiagnosticsPage() {
    const treatments = [
        {
            title: "Molecular Diagnostics",
            desc: "PCR based testing for infectious diseases and genetic markers.",
            icon: Dna
        },
        {
            title: "Histopathology & Cytology",
            desc: "Microscopic examination of tissues and cells for cancer detection.",
            icon: Microscope
        },
        {
            title: "Immunoassay",
            desc: "Advanced hormone and tumor marker analysis using CLIA technology.",
            icon: Activity
        },
        {
            title: "Allergy Testing",
            desc: "Comprehensive panels to identify allergens and sensitivities.",
            icon: ShieldCheck
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <section className="bg-slate-900 text-white py-20">
                <div className="container">
                    <h1 className="text-4xl font-bold mb-4">Advanced Diagnostics</h1>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Leveraging cutting-edge technology to provide precise insights for complex medical conditions.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {treatments.map((item, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="flex-none h-14 w-14 bg-primary-100 rounded-xl flex items-center justify-center">
                                    <item.icon className="h-7 w-7 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Technology Partners</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
                        {/* Mock Logos - Text representation for now */}
                        <div className="text-2xl font-black text-slate-400">ROCHE</div>
                        <div className="text-2xl font-black text-slate-400">SIEMENS</div>
                        <div className="text-2xl font-black text-slate-400">BECKMAN COULTER</div>
                        <div className="text-2xl font-black text-slate-400">BIOMERIEUX</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
