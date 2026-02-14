import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let courses;
        if (user.role === "TEACHER") {
            courses = await prisma.course.findMany({
                where: { teacherId: user.id }
            });
        } else {
            // Student logic (for now just all courses or empty)
            courses = await prisma.course.findMany(); 
        }

        return NextResponse.json({
            status: "success",
            results: courses.length,
            data: { courses }
        });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
