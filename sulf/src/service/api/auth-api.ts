import { $hostapi } from '..';
import { LoginDataType, RegistrationDataType } from '../../types/index';
import { LoginResponseType, RegistrationResponseType } from '../types/api-types';

export const authAPI = {
	async login(data: LoginDataType): Promise<LoginResponseType> {
		const { email, password } = data;
		const res = await $hostapi.post('auth/login', { email, password });
		//@ts-ignore
		return res;
	},
	async registration(data: RegistrationDataType): Promise<RegistrationResponseType> {
		const { email, password, repeat_password, first_name, last_name } = data;
		const res = await $hostapi.post('auth/register', { email, password, repeat_password, first_name, last_name });
		//@ts-ignore
		return res;
	},
};
