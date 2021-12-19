import { AxiosResponse } from 'axios';
import { getCoursesResponseType } from '../types/api-types';
import { CoursesDataType } from '../../types';
import { $api } from '..';

export const courseAPI = {
	async getAllCourses(data: CoursesDataType): Promise<AxiosResponse<getCoursesResponseType>> {
		const { name, minimal_rating, min_price, max_price, page, per_page } = data;
		//?? params
		const res = await $api.get(
			`course/all?name=${name}&minimal_rating=${minimal_rating}&min_price=${min_price}&max_price=${max_price}&page=${page}&per_page=${per_page}`
		);
		return res.data;
	},
};
