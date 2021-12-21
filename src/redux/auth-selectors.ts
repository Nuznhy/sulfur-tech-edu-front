import { AppStateType } from './redux-store';

export const getIsAuth = (state: AppStateType) => {
	return state.auth.isAuth;
};

export const getUserId = (state: AppStateType) => {
	return state.auth.user_id;
};

export const getUserName = (state: AppStateType) => {
	return state.auth.first_name;
};

export const getUserSurname = (state: AppStateType) => {
	return state.auth.last_name;
};

export const getUserEmail = (state: AppStateType) => {
	return state.auth.email;
};

export const getUserImage = (state: AppStateType) => {
	return state.auth.image;
};

export const getUserRegistrationDate = (state: AppStateType) => {
	return state.auth.registration_date;
};

export const getUserRole = (state: AppStateType) => {
	return state.auth.userRole;
};
