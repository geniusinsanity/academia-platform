"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      // Fetch ALL courses for browsing (endpoint needs to be updated to support public/student viewing)
      const res = await fetch("/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setCourses(data.data.courses);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white p-4">Loading courses...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Available Courses</h1>
        <p className="text-neutral-400 mt-2">Browse and access university modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-neutral-900 border-neutral-800 text-white hover:border-neutral-700 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="text-indigo-400 border-indigo-500/30">
                  {course.code}
                </Badge>
                <span className="text-xs text-neutral-500">{course.faculty}</span>
              </div>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription className="text-neutral-400">
                Prof. {course.teacher?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {course.description || "No description provided."}
              </p>
            </CardContent>
            <CardFooter>
                <Link href={`/dashboard/student/course/${course.id}`} className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                    Access Course
                  </Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
