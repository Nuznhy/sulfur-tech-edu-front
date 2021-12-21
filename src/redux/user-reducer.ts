import { CourseType } from '../types';
import { ActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { courseAPI } from '../service/api/course-api';
import { ResultCodesEnum } from '../service/types/api-types';
import { userAPI } from '../service/api/user-api';
import { authUserThunk } from './auth-reducer';

const initialState = {
	userCourses: [] as Array<CourseType> | [],
	items_total: 0,
	page_count: 0,
};

type InitialStateType = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'USER/SET_COURSES':
			return {
				...state,
				userCourses: [...action.data.courses],
				items_total: action.data.items_total,
				page_count: action.data.page_count,
			};
		default:
			return state;
	}
};

type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
	setUserCourses: (courses: Array<CourseType>, items_total: number, page_count: number) => {
		return {
			type: 'USER/SET_COURSES',
			data: { courses, items_total, page_count },
		} as const;
	},
};

type DispatchType = Dispatch<ActionsType>;

export const getAllUserCourses = () => {
	return async (dispatch: DispatchType) => {
		const res = await courseAPI.getUserCourses();
		console.log(res);
		dispatch(actions.setUserCourses(res.data.courses, res.data.items_total, res.data.page_count));
	};
};

export const addUserCourse = (courseId: number) => {
	return async (dispatch: DispatchType) => {
		try {
			const res = await courseAPI.subscribeCourse(courseId);
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('You have successfully enrolled in this course');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
};

export const removeUserCourse = (courseId: number) => {
	return async (dispatch: DispatchType) => {
		try {
			const res = await courseAPI.unsubscribeCourse(courseId);
			console.log(res);
			res.status === ResultCodesEnum.Success && alert('You have successfully removed this course');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
};

export const uploadUserImage = (image: string) => {
	return async (dispatch: DispatchType) => {
		try {
			const res = await userAPI.uploadUserIcon(image);
			console.log(res);
			//@ts-ignore
			dispatch(authUserThunk());
			res.status === ResultCodesEnum.Success && alert('You have successfully upload image');
		} catch (e) {
			alert('Some error occurred, please try again');
		}
	};
}

export default userReducer;
