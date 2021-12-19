import { AppStateType } from './redux-store';

export const getUserCourses = (state: AppStateType) => {
	return state.user.userCourses;
};

export const getTotalCount = (state: AppStateType) => {
	return state.admin.items_total;
};

export const getPageCount = (state: AppStateType) => {
	return state.admin.page_count;
};
