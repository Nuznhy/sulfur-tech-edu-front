import { CourseType } from '../types';
import { ActionsTypes } from './redux-store';
import { Dispatch } from 'redux';

const initialState = {
	courses: [] as Array<CourseType> | [],
};

type InitialStateType = typeof initialState;

const adminReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'ADMIN/GET_COURSES':
			return {
				...state,
				courses: [...action.data.courses],
			};
		default:
			return state;
	}
};

type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
	getCourses: (courses: Array<CourseType>) => {
		return {
			type: 'ADMIN/GET_COURSES',
			data: { courses },
		} as const;
	},
};

type DispatchType = Dispatch<ActionsType>;

export const getCourses = () => {
	return async (dispatch: DispatchType) => {
		//const data = await courseAPI.getCourses();
		//dispatch(actions.getCourses(courses: data));
	};
};

export const addCourse = (title: string, description: string, price: string) => {
    console.log(title, description, price);
	return async (dispatch: DispatchType) => {
		//await courseAPI.addCourse(title, description, price);
		getCourses();
	};
};

export const removeCourse = (courseId: number) => {
	return async (dispatch: DispatchType) => {
		//await courseAPI.removeCourse(courseId);
		getCourses();
	};
};

export const updateCourse = (courseId: number, title: string, description: string, price: string) => {
    console.log(courseId, title, description, price);
	return async (dispatch: DispatchType) => {
		//await courseAPI.updateCourse(courseId, title, description, price);
		getCourses();
	};
};

export default adminReducer;
