import { useMemo } from 'react';
import { CourseType } from '../../../../types';

export const useSortedCourses = (courses: Array<CourseType>, minPrice: string, maxPrice: string, rating: string) => {
	const sortedCourses = useMemo(() => {
		if (minPrice || maxPrice || rating) {
			return [...courses].filter(
				(course) =>
					(minPrice !== '' ? course.course_price >= Number(minPrice) : course) &&
					(maxPrice !== '' ? course.course_price <= Number(maxPrice) : course) &&
					(rating !== '' ? course.rating === Number(rating) : course)
			);
		}
		return courses;
	}, [courses, minPrice, maxPrice, rating]);

	return sortedCourses;
};

export const useCourses = (courses: Array<CourseType>, query: string, minPrice: string, maxPrice: string, rating: string) => {
	const sortedCourses = useSortedCourses(courses, minPrice, maxPrice, rating);

	const sortedAndSearchedCourses = useMemo(() => {
		return sortedCourses.filter((course) => course.course_name?.toLowerCase().includes(query.toLowerCase()));
	}, [query, sortedCourses]);

	return sortedAndSearchedCourses;
};
