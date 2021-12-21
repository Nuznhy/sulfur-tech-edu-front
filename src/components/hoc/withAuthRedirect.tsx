import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapStateToPropsType = {
    isAuth: boolean
}

export const withAuthRedirect = (Component: React.ComponentType) => {
    class RedirectComponent extends React.Component<MapStateToPropsType> {
        render() {
            if(!this.props.isAuth) return <Redirect to='/authentication/login'/>
            return <Component {...this.props} />
        }
    }

    let connectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return connectedRedirectComponent;
}


// export const WithAuthRedirect: React.FC = (Component: any) => {
//     const isAuth = useSelector(getIsAuth)

//     if(!isAuth) return <Redirect to='/login'/>
//     return <Component />
// }