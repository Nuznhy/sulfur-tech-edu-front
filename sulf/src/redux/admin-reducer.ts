import { CoursesDataType } from './../types/index';
import { CourseType } from '../types';
import { ActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { courseAPI } from '../service/api/course-api';
import { ResultCodesEnum } from '../service/types/api-types';

const initialState = {
	courses: [] as Array<CourseType> | [],
	items_total: 0,
	page_count: 0,
};

type InitialStateType = typeof initialState;

const adminReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'ADMIN/SET_COURSES':
			return {
				...state,
				courses: [...action.data.courses],
				items_total: action.data.items_total,
				page_count: action.data.page_count,
			};
		default:
			return state;
	}
};

type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
	setCourses: (courses: Array<CourseType>, items_total: number, page_count: number) => {
		return {
			type: 'ADMIN/SET_COURSES',
			data: { courses, items_total, page_count },
		} as const;
	},
};

type DispatchType = Dispatch<ActionsType>;

export const getCourses = (data: CoursesDataType) => {
	return async (dispatch: DispatchType) => {
		const res = await courseAPI.getAllCourses(data);
		console.log(res);
		dispatch(actions.setCourses(res.data.courses, res.data.items_total, res.data.page_count));
	};
};

export const getCourseById = (id: number) => {
	return async (dispatch: DispatchType) => {
		const res = await courseAPI.getCourseById(id);
		console.log(res);
	};
};

export const addCourse = (title: string, description: string, price: number, drive_link: string, image: string | null) => {
	console.log(title, description, price);
	return async () => {
		try {
			const res = await courseAPI.createCourse(title, price, description, drive_link, image);
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('Course created successfully!');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
};

export const removeCourse = (courseId: number) => {
	return async () => {
		try {
			const res = await courseAPI.deleteCourseById(courseId);
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('Course deleted successfully!');
		} catch (e) {
			alert(`Can't delete this course because user didn't create it`);
		}
	};
};

export const updateCourse = (courseId: number, title: string, description: string, price: number) => {
	console.log(courseId, title, description, price);
	return async () => {
		try {
			const res = await courseAPI.updateCourseById(courseId, title, price, description);
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('Course updated successfully!');
		} catch (e) {
			alert(`Can't update this course because user didn't create it`);
		}
	};
};

export const addTask = (course_id: number, name: string, max_grade: number, file: string | null, file_name: string) => {
	return async () => {
		try {
			const res = await courseAPI.createCourseTask(course_id, Number(max_grade), name, file, file_name); 
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('Task created successfully!');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
};

export const addTaskSolution = (task_id: number, solution_file: string, file_name: string, user_name: string) => {
	return async () => {
		try {
			const res = await courseAPI.createCourseSolution(task_id, solution_file, file_name, user_name); 
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('Solution created successfully!');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
};

export const addSolutionMark = (task_id: number, mark: number, user_id: number) => {
	return async () => {
		try {
			const res = await courseAPI.createCourseMark(task_id, mark, user_id ); 
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('Mark send successfully!');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
};

export default adminReducer;
