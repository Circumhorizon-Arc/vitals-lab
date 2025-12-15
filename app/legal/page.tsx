import { SITE_CONFIG } from "@/lib/data";

// Reuse this component for both Privacy and Terms as they are similar dummy pages
export default function LegalPage() {
    return (
        <div className="container max-w-3xl py-12 prose prose-slate">
            <h1>Privacy Policy & Terms</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h3>1. General Information</h3>
            <p>Welcome to {SITE_CONFIG.name}. By accessing our website, you agree to these terms.</p>

            <h3>2. Booking & Appointments</h3>
            <p>Appointments are subject to availability. Home collection timings are indicative and may vary slightly due to traffic or weather conditions.</p>

            <h3>3. Reports</h3>
            <p>We strive for 100% accuracy, but diagnostic tests have limitations. Please consult your doctor for interpretation.</p>

            <h3>4. Privacy</h3>
            <p>Your medical data is confidential and shared only with you and registered medical practitioners as authorized.</p>
        </div>
    );
}
