import { CourseType } from '../types';
import { ActionsTypes } from './redux-store';
import { Dispatch } from 'redux';

const initialState = {
	userCourses: [] as Array<CourseType> | [],
};

type InitialStateType = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'USER/GET_COURSES':
			return {
				...state,
				userCourses: [...action.data.courses],
			};
		default:
			return state;
	}
};

type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
	getUserCourse: (courses: Array<CourseType>) => {
		return {
			type: 'USER/GET_COURSES',
			data: { courses },
		} as const;
	},
};

type DispatchType = Dispatch<ActionsType>;

export const getUserCourses = (userId: number | null) => {
	return async (dispatch: DispatchType) => {
		//const data = await courseAPI.getUserCourses(userId);
		//dispatch(actions.getAllCourse(courses: data));
	};
};

export const addUserCourse = (userId: number | null, courseId: number) => {
	return async (dispatch: DispatchType) => {
		//const data = await courseAPI.addUserCourse(userId, courseId);
		//getUserCourses(userId);
	};
};

export const removeUserCourse = (userId: number | null, courseId: number) => {
	return async (dispatch: DispatchType) => {
		//const data = await courseAPI.removeUserCourse(userId, courseId);
		getUserCourses(userId);
	};
};

export default userReducer;
