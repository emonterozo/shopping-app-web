import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navigation from '../components/navigation/Navigation';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Product from './product/Product';
import Dashboard from './dashboard/Dashboard';
import Cart from './cart/Cart';
import Order from './orders/Order';
import Profile from './profile/Profile';
import ProtectedRoute from '../components/route/ProtectedRoute';

const App = () => {
  return (
      <Router>
        <div className="App bg-white text-dark">
        <Navigation />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/products' exact component={Product} />
          <ProtectedRoute path='/dashboard' exact component={Dashboard} />
          <ProtectedRoute path='/my/cart' exact component={Cart} />
          <ProtectedRoute path='/my/orders' exact component={Order} />
          <ProtectedRoute path='/my/profile' exact component={Profile} />
        </Switch>
        </div>
      </Router>
  )
}

const Home = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>MERN Shopping Cart</h1>
      <h4> This project was built using MERN Stack (MongoDB, Express, React, and Node). Its front-end is created using React functional component. In the back-end, I used mongoose ODM. Also, in this project, I implemented Redux as my state management and used Redux-Saga.</h4>
        <div>
          <h4>
          <Link to='/signin'>Click here to Start</Link>
          </h4>
        </div>
    </div>
  )
}


export default App;
