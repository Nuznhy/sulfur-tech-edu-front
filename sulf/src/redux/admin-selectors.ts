import { AppStateType } from './redux-store';

export const getCourses = (state: AppStateType) => {
	return state.admin.courses;
};
