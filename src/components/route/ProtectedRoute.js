import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({...rest }) => {
    const { users } = useSelector(state => state.users)
    
    return (
        users.length > 0 ? <Route {...rest} /> : <Redirect to='/' />
    )
}

export default ProtectedRoute