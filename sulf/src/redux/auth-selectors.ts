import { AppStateType } from './redux-store';

export const getIsAuth = (state: AppStateType) => {
	return state.auth.isAuth;
};

export const getUserId = (state: AppStateType) => {
	return state.auth.userId;
};

export const getUserEmail = (state: AppStateType) => {
	return state.auth.email;
};

export const getUserRole = (state: AppStateType) => {
	return state.auth.userRole;
};
