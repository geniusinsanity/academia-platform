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
import { Plus } from "lucide-react";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/courses/my-courses", {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Courses</h1>
          <p className="text-neutral-400 mt-2">Manage your teaching modules and content.</p>
        </div>
        <Link href="/dashboard/teacher/create-course">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
            <Plus className="mr-2 h-4 w-4" /> Create Course
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-800 rounded-lg">
          <p className="text-neutral-500 mb-4">You haven't created any courses yet.</p>
          <Link href="/dashboard/teacher/create-course">
            <Button variant="outline" className="text-white border-neutral-700 bg-neutral-900	hover:bg-neutral-800">
              Create your first course
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-neutral-900 border-neutral-800 text-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.code}</CardTitle>
                </div>
                <CardDescription className="text-neutral-400">{course.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500 line-clamp-2">
                  {course.description || "No description provided."}
                </p>
              </CardContent>
              <CardFooter>
                 <Link href={`/dashboard/teacher/course/${course.id}`} className="w-full">
                    <Button variant="secondary" className="w-full bg-neutral-800 hover:bg-neutral-700 text-white">
                      Manage Content
                    </Button>
                 </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
