"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    faculty: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill faculty from user profile
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.faculty) {
        setFormData(prev => ({ ...prev, faculty: user.faculty }));
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      router.push("/dashboard/teacher");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-neutral-900 border-neutral-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Course</CardTitle>
          <CardDescription className="text-neutral-400">
            Add a new subject (e.g., ASD) to your curriculum.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                placeholder="e.g. ASD"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
              <p className="text-xs text-neutral-500">Short identifier for the course.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g. Algorithms and Data Structures"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief overview of the course content..."
                className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Input
                id="faculty"
                required
                className="bg-neutral-800 border-neutral-700 text-white opacity-50 cursor-not-allowed"
                value={formData.faculty}
                readOnly
              />
              <p className="text-xs text-neutral-500">Linked to your profile's department.</p>
            </div>

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500" disabled={loading}>
              {loading ? "Creating..." : "Create Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
