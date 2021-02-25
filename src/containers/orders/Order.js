import CartProduct from '../../components/cartproduct/CartProduct';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userOrdersRequest } from '../../redux/actions/orders';
import Spinner from '../../components/spinner/Spinner';

const Order = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)
    const { orders, isLoading } = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(userOrdersRequest(users[0]._id))
    }, [])

    
    return (
        <div>
            {isLoading && <Spinner />}
            <div className="container mt-5 min-vh-100 d-flex flex-column justify-content-start align-items-center">
                <h1>Orders</h1>
                {
                    !isLoading && orders.length > 0 &&
                    <div className="col-md-12 p-5">
                        {
                            orders.map((order) => {
                                return (
                                    <div className="row p-2 m-3">
                                        <CartProduct item={order} isOrder={true} />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Order