import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../redux/actions/user';

const HomeNavigation = () => {
    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
                Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/products">
                Products
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/signin">
                Signin
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/signup">
                Signup
            </Link>
          </li>
        </ul>
    )
}

const AdminNavigation = () => {
  const dispatch = useDispatch()
  
  const logoutUser = () => {
    dispatch(userLogout())
  }

    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/products">
                Products
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
                Dashboard
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Settings
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/my/profile">
                  Profile
              </Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#" onClick={logoutUser}>Logout</a>
            </div>
          </li>
        </ul>
    )
}

const UserNavigation = () => {
    const dispatch = useDispatch()
    
    const logoutUser = () => {
      dispatch(userLogout())
    }

    return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/my/cart">
                Cart
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/my/orders">
                Orders
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Settings
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" onClick={logoutUser}>Logout</a>
            </div>
          </li>
        </ul>
    )
}


const Navigation = (props) => {
    const { users } = useSelector(state => state.users)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
            Mini Project
        </a>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
                users.length <= 0 ? <HomeNavigation /> : users[0].role === 'Admin' ? <AdminNavigation /> : <UserNavigation />
            }
        </div>
        </nav>
    )
}

export default Navigation;
