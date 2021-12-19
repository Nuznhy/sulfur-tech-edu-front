export type CourseType = {
	course_id: number;
	course_name: string;
	course_price: number;
	course_description: string;
	create_time: string;
	rating: number;
	creator_id: number;
	image: string;
};

export type UserType = {
	user_id: number | null;
	email: string | null;
	first_name: string | null;
	last_name: string | null;
	disabled: boolean | null;
	image: string | null;
	registration_date: string | null;
};

export type FilterType = {
	query: string;
	minPrice: string;
	maxPrice: string;
	rating: string;
};

export type RegistrationDataType = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	repeat_password: string;
};

export type LoginDataType = {
	email: string;
	password: string;
};

export type CoursesDataType = {
	name: string;
	minimal_rating: number;
	min_price: number;
	max_price: number;
	page: number;
	per_page: number;
};
