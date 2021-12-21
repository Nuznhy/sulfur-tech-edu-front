import { AxiosResponse } from 'axios';
import { $api } from '..';
import { getUserDataResponseType } from '../types/api-types';

export const userAPI = {
	async getUserData(): Promise<AxiosResponse<getUserDataResponseType>> {
		const res = await $api.get('user/profile');
		return res;
	},
	async uploadUserIcon(image: string): Promise<AxiosResponse<getUserDataResponseType>> {
		//@ts-ignore
		const res = await $api.put('user/avatar-upload', { image });
		//@ts-ignore
		return res;
	}
};
