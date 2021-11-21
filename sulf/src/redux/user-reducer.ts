import { CourseType } from '../types';
import { ActionsTypes } from './redux-store';

const initialState = {
	courses: [] as Array<CourseType> | [],
};

type InitialStateType = typeof initialState;

const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'USER/ADD_USER_COURSE':
			return {
				...state,
				courses: [...state.courses, action.data.course]
			}
        case 'USER/REMOVE_USER_COURSE':
            return {
                ...state,
                courses: [...state.courses.filter(c => c.id !== action.data.courseId)]
            }
		default:
			return state;
	}
};
type ActionsType = ActionsTypes<typeof actions>;

export const actions = {
	addUserCourses: (course: CourseType) => {
		return {
			type: 'USER/ADD_USER_COURSE',
			data: { course },
		} as const;
	},
	removeUserCourses: (courseId: number) => {
		return {
			type: 'USER/REMOVE_USER_COURSE',
			data: { courseId },
		} as const;
	},
};

export default userReducer;
