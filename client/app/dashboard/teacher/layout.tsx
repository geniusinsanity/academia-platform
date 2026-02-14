"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function TeacherLayout({
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
    if (parsedUser.role !== "TEACHER") {
      router.push("/dashboard/student");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  if (!user) return <div className="p-8 text-neutral-400">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-8">Professor Panel</h2>
        
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard/teacher">
            <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white hover:bg-neutral-800">
              My Courses
            </Button>
          </Link>
          <Link href="/dashboard/teacher/create-course">
            <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white hover:bg-neutral-800">
              Create Course
            </Button>
          </Link>
          <Link href="/dashboard/teacher/students">
             <Button variant="ghost" className="w-full justify-start text-neutral-300 hover:text-white hover:bg-neutral-800">
              Students
            </Button>
          </Link>
        </nav>

        <div className="pt-6 border-t border-neutral-800">
          <div className="mb-4">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-neutral-500">{user.faculty}</p>
          </div>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
          >
            Sign Out
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
