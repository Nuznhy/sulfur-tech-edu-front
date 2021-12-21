import { AxiosResponse } from 'axios';
import { getCoursesResponseType, getCourseByIdResponseType, deleteCourseByIdResponseType, getCreateTaskResponseType } from '../types/api-types';
import { CoursesDataType } from '../../types';
import { $api } from '..';

export const courseAPI = {
	async getAllCourses(data: CoursesDataType): Promise<AxiosResponse<getCoursesResponseType>> {
		const { name, minimal_rating, min_price, max_price, page, per_page } = data;
		const res = await $api.get(
			`course/all?name=${name}&minimal_rating=${minimal_rating}&min_price=${min_price}&max_price=${max_price}&page=${page}&per_page=${per_page}`
		);
		return res;
	},
	async getCourseById(id: number): Promise<AxiosResponse<getCourseByIdResponseType>> {
		const res = await $api.get(`course/get-id/${id}`);
		return res;
	},
	async getCourseByUser(id: number): Promise<AxiosResponse<getCourseByIdResponseType>> {
		const res = await $api.get(`course/get-by-creator-id/${id}`);
		return res;
	},
	async createCourse(course_name: string, course_price: number, course_description: string, drive_link: string, image: string | null): Promise<AxiosResponse<getCourseByIdResponseType>> {
		const res = await $api.post(`course/create`, { course_name, course_price, course_description, drive_link, image });
		//@ts-ignore
		return res;
	},
	async updateCourseById(
		id: number,
		course_name: string,
		course_price: number,
		course_description: string
	): Promise<AxiosResponse<getCourseByIdResponseType>> {
		const res = await $api.patch(`course/update/${id}`, { course_name, course_price, course_description });
		//@ts-ignore
		return res;
	},
	async deleteCourseById(id: number): Promise<AxiosResponse<deleteCourseByIdResponseType>> {
		const res = await $api.delete(`course/delete/${id}`);
		return res;
	},

	async getUserCourses(): Promise<AxiosResponse<getCoursesResponseType>> {
		const res = await $api.get('course/my-subscribed');
		return res;
	},
	async subscribeCourse(course_id: number): Promise<AxiosResponse<deleteCourseByIdResponseType>> {
		const res = await $api.post('course/subscribe', { course_id });
		//@ts-ignore
		return res;
	},
	async unsubscribeCourse(course_id: number): Promise<AxiosResponse<deleteCourseByIdResponseType>> {
		const res = await $api.delete('course/unsubscribe', { data: { course_id } });
		//@ts-ignore
		return res;
	},

	async getTaskFile(taskId: number, userId: number): Promise<AxiosResponse<getCreateTaskResponseType>> {
		const res = await $api.get(`course/task/download-task-file/${taskId}`, {
			headers: {
				'user-id': `${userId}`
			}
		});
		return res;
	},
	async getTaskSolutionTask(taskId: number, userId: number, currentUserId: number): Promise<AxiosResponse<getCreateTaskResponseType>> {
		const res = await $api.get(`course/task/download-solution-file/${taskId}`, {
			headers: {
				'user-id': `${userId}`,
				'current-user-id': `${currentUserId}`
			}
		});
		return res;
	},
	async createCourseTask(course_id: number, max_grade: number, name: string, file: string | null, file_name: string): Promise<AxiosResponse<getCreateTaskResponseType>> {
		console.log(course_id, name, max_grade, file );
		const res = await $api.post(`course/task-create/${course_id}`,  { name, max_grade, file, file_name });
		//@ts-ignore
		return res;
	},
	async createCourseSolution(task_id: number, file: string | null, file_name: string, user_name: string): Promise<AxiosResponse<getCreateTaskResponseType>> {
		const res = await $api.post(`/course/task/post-solution/${task_id}`, { file, file_name, user_name });
		//@ts-ignore
		return res;
	},
	async createCourseMark(taskId: number, mark: number, user_id: number): Promise<AxiosResponse<getCreateTaskResponseType>> {
		const res = await $api.post(`/course/task/mark-student/${taskId}`, { mark, user_id });
		//@ts-ignore
		return res;
	},
};
