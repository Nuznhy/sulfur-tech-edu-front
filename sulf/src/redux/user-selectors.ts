import { AppStateType } from "./redux-store"

export const getUserCourses = (state: AppStateType) => {
    return state.user.courses
}
