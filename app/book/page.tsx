"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, ChevronRight, MapPin, Calendar as CalendarIcon, User, TestTube2, AlertCircle } from "lucide-react";
import { POPULAR_TESTS, HEALTH_PACKAGES, ROUTINE_PATHOLOGY_TESTS, SITE_CONFIG } from "@/lib/data";
import { cn } from "@/lib/utils";

// Types
type BookingStep = 1 | 2 | 3 | 4;

interface FormData {
    patientName: string;
    age: string;
    gender: string;
    phone: string;
    testId: string;
    testType: "test" | "package" | null;
    collectionType: "home" | "lab";
    date: string;
    timeSlot: string;
    address: string;
    pincode: string;
}

const INITIAL_DATA: FormData = {
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    testId: "",
    testType: null,
    collectionType: "home",
    date: "",
    timeSlot: "",
    address: "",
    pincode: "",
};

function BookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState<BookingStep>(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);

    // Load initial test from URL
    useEffect(() => {
        const testId = searchParams.get("test");
        const packageId = searchParams.get("package");

        if (testId) {
            setFormData((prev) => ({ ...prev, testId, testType: "test" }));
        } else if (packageId) {
            setFormData((prev) => ({ ...prev, testId: packageId, testType: "package" }));
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 4) as BookingStep);
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1) as BookingStep);

    const getSelectedTestName = () => {
        if (!formData.testId) return "No Test Selected";
        if (formData.testType === "test") {
            const test = POPULAR_TESTS.find((t) => t.id === formData.testId) || ROUTINE_PATHOLOGY_TESTS.find((t) => t.id === formData.testId);
            return test?.name || "Unknown Test";
        }
        return HEALTH_PACKAGES.find((p) => p.id === formData.testId)?.name || "Unknown Package";
    };

    const getSelectedTestPrice = () => {
        if (!formData.testId) return 0;
        if (formData.testType === "test") {
            const test = POPULAR_TESTS.find((t) => t.id === formData.testId) || ROUTINE_PATHOLOGY_TESTS.find((t) => t.id === formData.testId);
            return test?.price || 0;
        }
        return HEALTH_PACKAGES.find((p) => p.id === formData.testId)?.price || 0;
    }

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Save to localStorage
        const booking = {
            id: Math.random().toString(36).substr(2, 9),
            ...formData,
            testName: getSelectedTestName(),
            price: getSelectedTestPrice(),
            status: "Confirmed",
            createdAt: new Date().toISOString(),
        };

        const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        localStorage.setItem("bookings", JSON.stringify([booking, ...existingBookings]));

        setLoading(false);
        // Redirect to confirmation (or just show success here for now)
        router.push("/my-appointments?new=true");
    };

    const isStepValid = () => {
        switch (step) {
            case 1: // Patient Details
                return formData.patientName && formData.age && formData.phone.length === 10;
            case 2: // Test Selection
                return !!formData.testId;
            case 3: // Schedule & Address
                if (!formData.date || !formData.timeSlot) return false;
                if (formData.collectionType === "home") return formData.address && formData.pincode;
                return true;
            default:
                return true;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-slate-50 p-4 border-b border-slate-100">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                                    step >= s ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-500"
                                )}
                            >
                                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                            </div>
                            <span className="text-[10px] uppercase mt-1 font-semibold text-slate-500">
                                {s === 1 ? "Patient" : s === 2 ? "Test" : s === 3 ? "Slot" : "Confirm"}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 md:p-8">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900">Patient Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    name="patientName"
                                    value={formData.patientName}
                                    onChange={handleChange}
                                    placeholder="e.g. Rahul Sharma"
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                <div className="flex">
                                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500">+91</span>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={10}
                                        placeholder="9876543210"
                                        className="w-full rounded-r-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Age</label>
                                <input
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Years"
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900">Select Test or Package</h2>
                        {formData.testId ? (
                            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Selected</span>
                                    <h3 className="font-bold text-slate-900">{getSelectedTestName()}</h3>
                                </div>
                                <button
                                    onClick={() => setFormData(prev => ({ ...prev, testId: "", testType: null }))}
                                    className="text-sm text-slate-500 hover:text-red-600 underline"
                                >
                                    Change
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                                <p className="text-sm text-slate-500">Please select a test or package to proceed.</p>

                                {/* Popular Tests */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">Popular Tests</h3>
                                    <div className="space-y-3">
                                        {POPULAR_TESTS.map(test => (
                                            <div
                                                key={test.id}
                                                onClick={() => setFormData(prev => ({ ...prev, testId: test.id, testType: "test" }))}
                                                className="cursor-pointer border border-slate-200 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50/50 transition-colors flex justify-between items-center"
                                            >
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{test.name}</h4>
                                                    <p className="text-xs text-slate-500">{test.description}</p>
                                                </div>
                                                <span className="font-bold text-slate-700">₹{test.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Health Packages */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3 mt-6">Health Packages</h3>
                                    <div className="space-y-3">
                                        {HEALTH_PACKAGES.map(pkg => (
                                            <div
                                                key={pkg.id}
                                                onClick={() => setFormData(prev => ({ ...prev, testId: pkg.id, testType: "package" }))}
                                                className="cursor-pointer border border-purple-200 bg-purple-50/30 rounded-lg p-3 hover:border-purple-500 hover:bg-purple-50 transition-colors flex justify-between items-center"
                                            >
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{pkg.name}</h4>
                                                    <p className="text-xs text-slate-500">{pkg.description} ({pkg.includes.length} tests)</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block font-bold text-slate-700">₹{pkg.price}</span>
                                                    <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Routine Pathology */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3 mt-6">Routine Pathology</h3>
                                    <div className="space-y-3">
                                        {ROUTINE_PATHOLOGY_TESTS.map(test => (
                                            <div
                                                key={test.id}
                                                onClick={() => setFormData(prev => ({ ...prev, testId: test.id, testType: "test" }))}
                                                className="cursor-pointer border border-slate-200 rounded-lg p-3 hover:border-primary-500 hover:bg-primary-50/50 transition-colors flex justify-between items-center"
                                            >
                                                <div>
                                                    <h4 className="font-semibold text-slate-900">{test.name}</h4>
                                                    <p className="text-xs text-slate-500">{test.description}</p>
                                                </div>
                                                <span className="font-bold text-slate-700">₹{test.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold text-slate-900">Schedule & Address</h2>

                        {/* Collection Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, collectionType: "home" }))}
                                className={cn(
                                    "p-4 rounded-xl border text-left transition-all",
                                    formData.collectionType === "home"
                                        ? "border-primary-600 bg-primary-50 ring-1 ring-primary-600"
                                        : "border-slate-200 hover:border-slate-300"
                                )}
                            >
                                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                                    <div className="bg-white p-1 rounded shadow-sm"><User className="h-4 w-4" /></div>
                                    Home Collection
                                </div>
                                <p className="text-xs text-slate-500">We collect sample from your doorstep.</p>
                            </button>
                            <button
                                onClick={() => setFormData(prev => ({ ...prev, collectionType: "lab" }))}
                                className={cn(
                                    "p-4 rounded-xl border text-left transition-all",
                                    formData.collectionType === "lab"
                                        ? "border-primary-600 bg-primary-50 ring-1 ring-primary-600"
                                        : "border-slate-200 hover:border-slate-300"
                                )}
                            >
                                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                                    <div className="bg-white p-1 rounded shadow-sm"><TestTube2 className="h-4 w-4" /></div>
                                    Visit Lab
                                </div>
                                <p className="text-xs text-slate-500">Visit our nearest center.</p>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Time Slot</label>
                                <select
                                    name="timeSlot"
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="">Select Time</option>
                                    <option value="07:00 AM - 08:00 AM">07:00 AM - 08:00 AM</option>
                                    <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                                </select>
                            </div>
                        </div>

                        {formData.collectionType === "home" && (
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="font-semibold text-slate-900">Collection Address</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="House No, Street, Area"
                                        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            placeholder="Pincode (e.g. 110085)"
                                            maxLength={6}
                                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                        <div className="text-xs text-slate-500 flex items-center">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            Service available in Delhi NCR only.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                        <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-8 w-8 text-primary-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Confirm Booking</h2>
                        <p className="text-slate-600">Please review your appointment details.</p>

                        <div className="bg-slate-50 rounded-xl p-6 text-left space-y-3 max-w-sm mx-auto border border-slate-200">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Test name</span>
                                <span className="font-semibold text-slate-900">{getSelectedTestName()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Patient</span>
                                <span className="font-semibold text-slate-900">{formData.patientName}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Date & Time</span>
                                <span className="font-semibold text-slate-900">{formData.date} | {formData.timeSlot}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Type</span>
                                <span className="font-semibold text-slate-900 capitalize">{formData.collectionType === 'home' ? 'Home Collection' : 'Lab Visit'}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-lg font-bold text-slate-900">
                                <span>Total</span>
                                <span>₹{getSelectedTestPrice()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
                    {step > 1 && (
                        <button
                            onClick={prevStep}
                            className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                        >
                            Back
                        </button>
                    )}
                    {step < 4 ? (
                        <button
                            onClick={nextStep}
                            disabled={!isStepValid()}
                            className="ml-auto px-6 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            Next Step <ChevronRight className="ml-2 h-4 w-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="ml-auto px-8 py-2 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 disabled:opacity-70 flex items-center"
                        >
                            {loading ? (
                                <>Processing...</>
                            ) : (
                                <>Confirm Booking</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function BookPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container max-w-3xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
                    <p className="text-slate-600 mt-2">Book a home collection or lab visit in 3 simple steps</p>
                </div>
                <Suspense fallback={<div className="text-center p-8">Loading booking form...</div>}>
                    <BookingForm />
                </Suspense>
            </div>
        </div>
    )
}
