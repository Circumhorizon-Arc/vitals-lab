import Link from "next/link";
import { Bike, Calendar, CheckCircle2, Clock, FileText, Phone } from "lucide-react";

export default function HomeCollectionPage() {
    const steps = [
        {
            icon: Calendar,
            title: "Book Appointment",
            description: "Schedule your test online or via call at your preferred time."
        },
        {
            icon: Bike,
            title: "Technician Visit",
            description: "Our certified phlebotomist visits your home for sample collection."
        },
        {
            icon: Clock,
            title: "Processing",
            description: "Samples are processed in our NABL certified advanced lab."
        },
        {
            icon: FileText,
            title: "Get Report",
            description: "Receive accurate digital reports via email/WhatsApp within 24 hours."
        }
    ];

    const benefits = [
        "Safety and hygiene protocols strictly followed",
        "Trained and certified phlebotomists",
        "Temperature controlled sample transport",
        "Convenience of your home",
        "No extra visiting charges"
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary-50 py-16">
                <div className="container">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Home Sample Collection</h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        Get your blood tests done comfortably and safely from your home. We bring the lab to your doorstep with our expert home collection service.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-16">
                <div className="container">
                    <h2 className="text-2xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                                    <step.icon className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-slate-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits & CTA */}
            <section className="py-16 bg-slate-50">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Home Collection?</h2>
                        <ul className="space-y-4">
                            {benefits.map((benefit, i) => (
                                <li key={i} className="flex gap-3">
                                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-none" />
                                    <span className="text-slate-700 font-medium">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-primary-100 text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to book?</h3>
                        <p className="text-slate-600 mb-8">Schedule your visit now. Our technicians are available from 6:00 AM to 8:00 PM.</p>
                        <div className="flex flex-col gap-4">
                            <Link href="/book" className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition">
                                Book Home Visit
                            </Link>
                            <a href="tel:+919876543210" className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-2">
                                <Phone className="h-5 w-5" /> Call to Book
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
