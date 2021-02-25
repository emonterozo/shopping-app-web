import { Link, useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isValueEqual } from '../../util/util';
import { userRegister } from '../../redux/actions/user';
import Alert from '../../components/alert/Alert';
import Spinner from '../../components/spinner/Spinner';

const Signup = () => {
    const history = useHistory()
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ isPasswordMatch, setIsPasswordMatch ] = useState(true)
    const { users, isLoading, error } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const firstname = useRef(null)
    const lastname = useRef(null)
    const address = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const confirmPassword = useRef(null)

    useEffect(() => {
        if(users.length !== 0) {
          history.push('/products');
        }
    }, [users, history])

    const registerUser = (e) => {
        e.preventDefault();
        setIsSubmit(true)
        const data = {
            firstname: firstname.current.value,
            lastname: lastname.current.value,
            address: address.current.value,
            email: email.current.value,
            password: password.current.value
        }

        dispatch(userRegister(data))
    }

    const handlePasswordChange = () => {
        if(password.current.value === '' && confirmPassword.current.value === '' ) {
            setIsPasswordMatch(true)
        } else {
            if (isValueEqual(password.current.value, confirmPassword.current.value)) {
                setIsPasswordMatch(true)
            } else {
                setIsPasswordMatch(false)
            }
        }
    }

    return (
      <div>
        { isLoading && <Spinner />}
        { !isLoading && error != null && isSubmit && <Alert message={error} type="alert-danger" />}
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1>Signup</h1>
        <form className="col col-lg-5" onSubmit={registerUser}>
          <div className="input-group mb-2">
            <div className="col">
              <label>Firstname</label>
              <input
                ref={firstname}
                className="form-control"
                type="text"
                placeholder="Your Firstname"
                maxLength="30"
                required
              />
            </div>
            <div className="col">
              <label>Lastname</label>
              <input
                ref={lastname}
                className="form-control"
                type="text"
                placeholder="Your Lastname"
                maxLength="30"
                required
              />
            </div>
          </div>
          <div className="form-group pl-3 pr-3">
            <label>Address</label>
            <input
              ref={address}
              type="text"
              className="form-control"
              placeholder="Your Address"
              maxLength="50"
              required
            ></input>
            <label>Email Address</label>
            <input
              ref={email}
              type="email"
              className="form-control"
              placeholder="Your Email Address"
              maxLength="30"
              required
            ></input>
            <label>Password</label>
            <input
              onChange={handlePasswordChange}
              ref={password}
              type="password"
              className="form-control"
              placeholder="Password"
              maxLength="30"
              required
            ></input>
            <label>Confirm Password</label>
            <input
              onChange={handlePasswordChange}
              ref={confirmPassword}
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              maxLength="30"
              required
            ></input>
            {
                !isPasswordMatch && <small className="text-warning">Password not match</small>
            }
            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={isPasswordMatch ? false : true}>
              Create Account
            </button>
            <h6>
              Already have account? <Link to="/signin">Click here</Link>
            </h6>
          </div>
        </form>
        </div>
        
      </div>
    );
}


export default Signup