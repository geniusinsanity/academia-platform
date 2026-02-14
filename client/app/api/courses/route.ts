import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(request: Request) {
  try {
     const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: { name: true, email: true },
        },
      },
    });

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

export async function POST(request: Request) {
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

        if (!user || user.role !== "TEACHER") {
             return NextResponse.json({ message: "Forbidden: Teachers only" }, { status: 403 });
        }

        const { title, code, description, faculty } = await request.json();

        const newCourse = await prisma.course.create({
            data: {
                title,
                code,
                description,
                faculty,
                teacherId: user.id
            }
        });

        return NextResponse.json({
            status: "success",
            data: { course: newCourse }
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Something went wrong" },
            { status: 500 }
          );
    }
}
