import { CourseType, UserType } from '../../types';

export enum ResultCodesEnum {
	Success = 200,
	Error = 400,
	WrongData = 404,
	UserAlreadyExist = 409,
	WrongFieldType = 422,
}

//responses
export type LoginResponseType = {
	data: {
		success: string;
		access_token: string;
		token_type: string;
	};
	status: number;
};

export type RegistrationResponseType = {
	data: {
		success: string;
		access_token: string;
		token_type: string;
		message: string;
	};
	status: number;
};

export type getUserDataResponseType = {
	success: string;
	user: UserType;
	status: number;
};

export type getCoursesResponseType = {
	success: string;
	items_total: number;
	page_count: number;
	courses: Array<CourseType>;
	status: number;
};

export type getCourseByIdResponseType = {
	success: string;
	course: CourseType;
	status: number;
};

export type deleteCourseByIdResponseType = {
	success: string;
	message: string;
	status: number;
};

export type getCreateTaskResponseType = {
	success: string;
	message: string;
	status: number;
}
