import { userAPI } from '../service/api/user-api';
import { Dispatch } from 'redux';
import { ResultCodesEnum } from '../service/types/api-types';
import { authAPI } from '../service/api/auth-api';
import { RegistrationDataType, LoginDataType, UserType } from '../types';
import { ActionsTypes } from './redux-store';

const initialState = {
	user_id: null as number | null,
	first_name: null as string | null,
	last_name: null as string | null,
	email: null as string | null,
	disabled: null as boolean | null,
	image: null as string | null,
	registration_date: null as string | null,
	userRole: 's' as string | null,
	isAuth: false as boolean,
};

type InitialStateType = typeof initialState;
type ActionsType = ActionsTypes<typeof actions>;
type DispatchType = Dispatch<ActionsType>;

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'AUTH/SET_USER_DATA':
			return {
				...state,
				...action.data,
			};
		case 'AUTH/SET_USER_AUTH':
			return {
				...state,
				isAuth: action.data,
			};
		default:
			return state;
	}
};

export const actions = {
	setAuthUserData: (data: UserType, isAuth: boolean) => {
		return {
			type: 'AUTH/SET_USER_DATA',
			data: { ...data, isAuth },
		} as const;
	},
	setAuthUser: (isAuth: boolean) => {
		return {
			type: 'AUTH/SET_USER_AUTH',
			data: isAuth,
		} as const;
	},
};

export const authUserThunk = () => {
	return async (dispatch: DispatchType) => {
		try {
			const res = await userAPI.getUserData();
			console.log(res);
			if (res.status === ResultCodesEnum.Success) {
				const { user_id, first_name, last_name, email, disabled, image, registration_date } = res.data.user;
				const userData = {
					user_id,
					first_name,
					last_name,
					email,
					disabled,
					image,
					registration_date,
				};
				dispatch(actions.setAuthUserData(userData, true));
			} else {
				console.log('Some error occurred, please try again');
			}
		} catch (e: any) {
			if (e.response.status === ResultCodesEnum.UserAlreadyExist) alert('User already exist, please select another email');
			else console.log('Some error occurred, please try again');
		}
	};
};

export const registration = (data: RegistrationDataType) => {
	return async (dispatch: DispatchType) => {
		try {
			let res = await authAPI.registration(data);
			if (res.status === ResultCodesEnum.Success) {
				localStorage.setItem('token', res.data.access_token);
				//@ts-ignore
				dispatch(authUserThunk());
			}
		} catch (e: any) {
			if (e.response.status === ResultCodesEnum.UserAlreadyExist) alert('User already exist, please select another email');
			else alert('Some error occurred, please try again');
		}
	};
};

export const login = (data: LoginDataType) => {
	return async (dispatch: DispatchType) => {
		try {
			const res = await authAPI.login(data);
			if (res.status === ResultCodesEnum.Success) {
				localStorage.setItem('token', res.data.access_token);
				//@ts-ignore
				dispatch(authUserThunk());
			} else if (res.status === ResultCodesEnum.WrongData) alert('User not found');
		} catch (e: any) {
			if (e.response.status === ResultCodesEnum.WrongData || e.response.status === ResultCodesEnum.Error)
				alert(`Email and password don't match, please try again`);
			else alert('Some error occurred, please try again');
		}
	};
};

export const logout = () => {
	return async (dispatch: DispatchType) => {
		localStorage.removeItem('token');
		const userData = {
			user_id: null,
			first_name: null,
			last_name: null,
			email: null,
			disabled: null,
			image: null,
			registration_date: null,
		};
		dispatch(actions.setAuthUserData(userData, false));
	};
};

export default authReducer;
