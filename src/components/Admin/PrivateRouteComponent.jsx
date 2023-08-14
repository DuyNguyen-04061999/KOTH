import { Navigate } from 'react-router-dom';

export { PrivateRouteComponent };

function PrivateRouteComponent(props) {
    const tokenAdmin = localStorage.getItem("token_admin")
    const auth = tokenAdmin ? true : false;
    const { children } = props
    return (
        <>
            {auth ? children : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
        </>
    );
}