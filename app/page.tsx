import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical, Timer, ShieldCheck } from "lucide-react";
import { SITE_CONFIG, POPULAR_TESTS, HEALTH_PACKAGES } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl space-y-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                {SITE_CONFIG.tagline}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Experience world-class diagnostics with {SITE_CONFIG.name}. NABL certified lab, expert technicians, and accurate reports delivered focused on your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/book"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary-600 px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 shadow-lg shadow-primary-200"
                >
                  Book a Test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/tests"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  View Packages
                </Link>
              </div>

              <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                {SITE_CONFIG.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl font-bold text-primary-700">{stat.value}</span>
                    <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-md">
                <img
                  src="/hero-image.png"
                  alt="Vitals Laboratory"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Blob */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[800px] h-[800px] fill-primary-600">
            <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,85.8,-6.6C81.5,7.1,70.2,20.4,60.6,31.7C51,43,43.1,52.4,33.5,59.7C23.9,67,12.6,72.3,-0.6,73.3C-13.8,74.4,-29.4,71.2,-42.9,64.2C-56.4,57.2,-67.8,46.4,-75.7,33.4C-83.6,20.4,-88,5.2,-83.4,-7.8C-78.8,-20.8,-65.2,-31.6,-53.4,-40.4C-41.6,-49.2,-31.6,-56,-20.7,-64.8C-9.8,-73.6,2,-84.4,14.7,-86.3C27.4,-88.2,40.9,-81.2,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </section>

      {/* Popular Tests Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Popular Diagnostic Tests</h2>
            <p className="mt-4 text-slate-600">Accurate results for the most common health checks. Book online for home collection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_TESTS.slice(0, 6).map((test) => (
              <div key={test.id} className="group relative rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-100 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {test.sampleType}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {test.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-grow">{test.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                  <Timer className="h-3.5 w-3.5" />
                  <span>Report in {test.turnaroundTime}</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-slate-900">₹{test.price}</span>
                  <Link href={`/book?test=${test.id}`} className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                    Book Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/tests" className="text-primary-600 font-semibold hover:underline">View All Tests & Packages</Link>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Comprehensive Health Packages</h2>
            <p className="mt-4 text-slate-600">Save more with our bundled health packages designed for complete body analysis.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {HEALTH_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col">
                <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-2 text-slate-500 text-sm">{pkg.description}</p>
                <div className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-4xl font-bold tracking-tight text-slate-900">₹{pkg.price}</span>
                  <span className="text-sm text-slate-400 line-through">₹{pkg.originalPrice}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-slate-600 flex-grow">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx} className="flex gap-x-3">
                      <CheckCircle2 className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/book?package=${pkg.id}`}
                  className="mt-8 block w-full rounded-md bg-primary-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Select Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Local */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Vitals Lab?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-none h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">NABL Certified</h4>
                    <p className="text-slate-600 mt-1">Our labs adhere to the highest quality standards ensured by NABL accreditation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <FlaskConical className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-lg">Advanced Technology</h4>
                    <p className="text-slate-600 mt-1">State-of-the-art automated analyzers for precise and zero-error reporting.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="font-bold text-xl text-slate-900 mb-4">Service Areas in Delhi</h3>
              <p className="text-slate-600 mb-6">We provide home sample collection across major areas in Delhi.</p>
              <div className="flex flex-wrap gap-2">
                {SITE_CONFIG.locations.map(loc => (
                  <span key={loc} className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700">
                    {loc}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-500 italic">
                  + Many more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
