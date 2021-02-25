import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const { users } = useSelector(state => state.users)
    
    return (
        <div>
            {users[0].role !== 'Admin' && <Redirect to='/' />}
            <h2>Dashboarb</h2>
            <h2>Dashboarb</h2>
            <h2>Dashboarb</h2>
            <h2>Dashboarb</h2>
            <h2>Dashboarb</h2>
        </div>
    )
}

export default Dashboard