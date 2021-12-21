import { AppStateType } from './redux-store';

export const getAllCourses = (state: AppStateType) => {
	return state.admin.courses;
};

export const getTotalCount = (state: AppStateType) => {
	return state.admin.items_total;
};

export const getPageCount = (state: AppStateType) => {
	return state.admin.page_count;
};
