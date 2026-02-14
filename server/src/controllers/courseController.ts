import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/AppError';

const prisma = new PrismaClient();

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, code, description, faculty } = req.body;
    const teacherId = req.user.id;

    const newCourse = await prisma.course.create({
      data: {
        title,
        code,
        description,
        faculty,
        teacherId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        course: newCourse,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: { name: true, email: true },
        },
      },
    });

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // If teacher, get courses they teach. If student, get enrolled courses.
    const userId = req.user.id;
    const role = req.user.role;

    let courses;

    if (role === 'TEACHER') {
      courses = await prisma.course.findMany({
        where: { teacherId: userId },
      });
    } else {
        // Enrolled courses for students (to be implemented with Enrollment)
        courses = []
    }

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    next(error);
  }
};
