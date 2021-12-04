import { Dispatch } from 'redux';
import { fakeApi } from '../api/api';
import { ActionsTypes } from './redux-store';

const initialState = {
	userId: null as number | null,
	name: null as string | null,
	surname: null as string | null,
	email: null as string | null,
	password: null as string | null,
	userRole: 'admin' as string | null,
	isAuth: false as boolean,
};

type InitialStateType = typeof initialState;

const testData = {
	email: 'first.user@test.com',
	password: 'admin',
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
        case 'AUTH/SET_USER_DATA':
			return {
				...state,
				...action.data,
			};
		default:
			return state;
	}
};
type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
    setAuthUserData: (userId: number | null, name: string | null, surname: string | null, email: string | null, password: string | null, isAuth: boolean) => {
		return {
			type: 'AUTH/SET_USER_DATA',
			data: { userId, name, surname, email, password, isAuth },
		} as const;
	},
};

type DispatchType = Dispatch<ActionsType>;

export const authUserThunk = () => {
    return async (dispatch: DispatchType) => {
        return initialState.isAuth;
		// let data = await authAPI.setAuthUser();
		// if(data.resultCode === ResultCodesEnum.Success) {
		//     let {id, email, login} = data.data;
		//     dispatch(actions.setAuthUserData(id, email, login, true));
		// }
	};
};

export const registration = (name: string, surname: string, email: string, password: string) => {
	return async (dispatch: DispatchType) => {
		setTimeout(() => {
			dispatch(actions.setAuthUserData(1, name, surname, email, password, true))
			alert('Registration completed')
		}, 1000);
    };
};

export const login = (email: string, password: string) => {
	return async (dispatch: DispatchType) => {
		if (email === testData.email && password === testData.password) {
			setTimeout(() => {
				dispatch(actions.setAuthUserData(1, 'Dan', 'Kosinskiy', email, password, true))
				alert('Login completed')
			}, 1000);
		} else {
			alert('Login failed')
		}

		// let data = await authAPI.login(email, password, rememberMe, captcha);
		// if(data.resultCode === ResultCodesEnum.Success) {
		//     dispatch(authUserThunk());
		// } else {
		//     if(data.resultCode === ResultCodeForCapthcaEnum.CaptchaIsRequired) {
		//         dispatch(getCaptchaUrl());
		//     }
		//     let message = data.messages.length > 0 ? data.messages[0] : "Some error";
		//     dispatch(stopSubmit("Login", {_error: message}))
		// }
    };
};

export const logout = () => {
	return async (dispatch: DispatchType) => {
		dispatch(actions.setAuthUserData(null, null, null, null, null, false))
		//let data = await authAPI.logout();
		//dispatch(actions.setAuthUserData(null, null, null, false))
	};
};

export default authReducer;
