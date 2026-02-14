"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STUDENT",
    faculty: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          faculty: formData.role === "TEACHER" ? formData.faculty : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store token (in real app use httpOnly cookies or secure storage)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Redirect based on role
      if (data.data.user.role === "TEACHER") {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard/student");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 p-4">
      <Card className="w-full max-w-md bg-neutral-900 border-neutral-800 text-neutral-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-neutral-400">
            Join Academia Platform today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="bg-neutral-800 border-neutral-700 text-white"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
                defaultValue={formData.role}
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="TEACHER">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "TEACHER" && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="faculty">Faculty / Department</Label>
                <Input
                  id="faculty"
                  placeholder="e.g. Computer Science"
                  required
                  className="bg-neutral-800 border-neutral-700 text-white"
                  value={formData.faculty}
                  onChange={(e) =>
                    setFormData({ ...formData, faculty: e.target.value })
                  }
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
