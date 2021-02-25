import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { userLogin } from '../../redux/actions/user';

import Alert from '../../components/alert/Alert';
import Spinner from '../../components/spinner/Spinner';

const Signin = () => {
    const history = useHistory()
    const [ isSubmit, setIsSubmit ] = useState(false)
    const { users, isLoading, error } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const email = useRef(null)
    const password = useRef(null)

    useEffect(() => {
        if(users.length !== 0) {
          history.push('/products');
        }
    }, [users, history])


    const loginUser = (e) => {
        e.preventDefault()
        setIsSubmit(true)
        const data = {
            email: email.current.value,
            password: password.current.value
        }
        dispatch(userLogin(data))
    }


    return (
        <div>
            { isLoading && <Spinner />}
            { !isLoading && error != null && isSubmit && <Alert message={error} type="alert-danger" />}
            <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
                <h1>Signin</h1>
                <form className="col col-lg-5" onSubmit={loginUser}>
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control" placeholder="Your Email" maxLength="30" required ref={email}></input>
                    <label>Password</label>
                    <input type="password" class="form-control" placeholder="Your Password" maxLength="30" required ref={password}></input>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Sigin</button>
                <h6>Don't have Account? <Link to='/signup'>Click here</Link></h6>
                </form>
            </div>
        </div>
    )
}


export default Signin