import { useMemo } from 'react';
import { CourseType } from '../../../types';

export const useSortedCourses = (courses: Array<CourseType>) => {
	const sortedCourses = useMemo(() => {
		// if (sort) {
		// 	//@ts-ignore
		// 	return [...courses].sort((a, b) => a[sort].localeCompare(b[sort]));
		// }
		return courses;
	}, [courses]);

	return sortedCourses;
};

export const useCourses = (courses: Array<CourseType>, query: string) => {
	const sortedCourses = useSortedCourses(courses);

	const sortedAndSearchedCourses = useMemo(() => {
		return sortedCourses.filter((course) => course.title?.toLowerCase().includes(query.toLowerCase()));
	}, [query, sortedCourses]);

	return sortedAndSearchedCourses;
};
