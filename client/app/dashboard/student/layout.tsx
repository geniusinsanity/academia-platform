"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, User } from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/auth/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "STUDENT") {
      router.push("/dashboard/teacher");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  if (!user) return <div className="p-8 text-neutral-400">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 p-6 flex flex-col">
        <div className="mb-8 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-indigo-500" />
            <h2 className="text-xl font-bold text-white">Academia</h2>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard/student">
            <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white hover:bg-neutral-800">
              Browser Courses
            </Button>
          </Link>
          <Link href="/dashboard/student/my-learning">
            <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white hover:bg-neutral-800">
              My Learning
            </Button>
          </Link>
        </nav>

        <div className="pt-6 border-t border-neutral-800">
          <div className="mb-4 flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
            </div>
            <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-neutral-500">Student</p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            className="w-full justify-start"
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
