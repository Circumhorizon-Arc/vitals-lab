import { ShieldCheck, Award, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/data";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container max-w-4xl">
                <div className="space-y-4 mb-16">
                    <h1 className="text-4xl font-bold text-slate-900">About {SITE_CONFIG.name}</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We are a premier pathology and diagnostic center in Delhi, committed to providing accurate, reliable, and timely diagnostic services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {SITE_CONFIG.stats.map((stat, i) => (
                        <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                            <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                            <div className="text-slate-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our History</h2>
                        <p>
                            Established over a decade ago, Vitals Lab started with a simple mission: to make high-quality diagnostic services accessible to everyone in Delhi. From a small collection center in Rohini, we have grown into a network of trusted labs serving thousands of patients monthly.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                        <div className="flex gap-4">
                            <div className="bg-blue-50 p-3 rounded-lg h-fit">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Quality Assurance</h3>
                                <p>Our labs are NABL accredited and ISO certified. We participate in external quality assurance programs to ensure every report you get is 100% accurate.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-green-50 p-3 rounded-lg h-fit">
                                <Users className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Expert Team</h3>
                                <p>Our team consists of highly qualified pathologists, biochemists, microbiologists, and skilled phlebotomists who treat every sample with care.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment</h2>
                        <p>
                            We understand that behind every sample is a patient waiting for answers. That's why we invest in the latest technology and automation to deliver reports faster without compromising on precision.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
