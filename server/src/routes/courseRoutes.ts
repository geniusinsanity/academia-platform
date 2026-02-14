import express from 'express';
import { createCourse, getAllCourses, getMyCourses } from '../controllers/courseController';
import { protect, restrictTo } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect); // Protect all routes

router.route('/')
  .get(getAllCourses)
  .post(restrictTo('TEACHER', 'ADMIN'), createCourse);

router.get('/my-courses', getMyCourses);

export default router;
