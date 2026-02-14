import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navbar */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-indigo-500/20 shadow-lg">
            A
          </div>
          <span className="font-semibold text-lg tracking-tight">Academia</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-white transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-white text-neutral-950 hover:bg-neutral-200 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-fuchsia-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-400 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            New Semester Enrollment Open
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 pb-2">
            Master Your Future <br /> with Premium Education
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A next-generation learning platform designed for ambitious students and expert educators. Experience seamless course delivery, real-time progress tracking, and interactive assignments.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth/register">
              <Button size="lg" className="h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105">
                Start Learning Now
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base border-neutral-700 hover:bg-neutral-900 text-neutral-300 hover:text-white transition-all">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto w-full px-6">
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Structure Learning</h3>
            <p className="text-neutral-400 leading-relaxed">Follow a meticulously crafted curriculum with chapter-based progression and prerequisites.</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center mb-4 group-hover:bg-fuchsia-500/20 transition-colors">
              <svg className="w-6 h-6 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Automated Grading</h3>
            <p className="text-neutral-400 leading-relaxed">Submit assignments instantly and receive automated feedback or teacher reviews.</p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Progress</h3>
            <p className="text-neutral-400 leading-relaxed">Track your journey with detailed analytics and completion certificates.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-900 mt-20 text-center text-neutral-500 text-sm">
        <p>&copy; 2024 Academia Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
