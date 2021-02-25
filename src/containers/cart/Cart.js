import CartProduct from '../../components/cartproduct/CartProduct';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userCartRequest, userCartRemoveItem } from '../../redux/actions/cart';
import { userOrdersAdd } from '../../redux/actions/orders';
import Spinner from '../../components/spinner/Spinner';
import { roundNumber, dateNow, productExist, totalAmount, totalItems } from '../../util/util';

const Cart = () => {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.users)
    const { cartItems, isLoading } = useSelector(state => state.cartItems)
    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        dispatch(userCartRequest(users[0]._id))
    }, [])


    const placeItem = (item, action) => {
        const productId = item.product._id
        const price = item.product.price
        const quantity = item.quantity
        const total = roundNumber(quantity * price)

        if (action === 'ADD') {
            setOrders([...orders, {
                product: productId,
                price: price,
                quantity: quantity,
                total_price: total,
                order_date: dateNow()
            }])
        } else {
            setOrders(orders.filter(({ product }) => product !== item.product._id))
        }
    }

    const deleteItem = (item) => {
        placeItem(item, "REMOVE")
        const data = {
            userId: users[0]._id,
            items: [item.product._id]
        }
        dispatch(userCartRemoveItem(data))
    }

    const checkOut = () => {
        const data = {
            userId: users[0]._id,
            orders: orders
        }
        const products = []

        cartItems.forEach(item => {
            const order = productExist(orders, item.product._id)
            if (order)
                products.push(item.product._id)
        })

        const cart = {
            userId: users[0]._id,
            items: products
        }

        setOrders([])
        dispatch(userOrdersAdd(data))
        dispatch(userCartRemoveItem(cart))
    }

    return (
        <div>
            {isLoading && <Spinner />}
            <div className="container mt-5 min-vh-100 d-flex flex-column justify-content-start align-items-center">
                <h1>Cart</h1>
                {
                    !isLoading && cartItems.length > 0 &&
                    <div className="col-md-12 p-5">
                    {
                        cartItems.map((cartItem) => {
                            return (
                                <div className="row p-2 m-3">
                                    <CartProduct item={cartItem} delete={deleteItem} add={placeItem} orders={orders} />
                                </div>
                            )
                        })
                    }
                    </div>
                }   
            </div>
            <footer class="fixed-bottom bg-dark p-2 mt-5">
                <div className="text-white p-2 d-flex justify-content-around align-items-center">
                    <h3>Total Amount: {roundNumber(totalAmount(orders))}</h3>
                    <h3>Total Items: {roundNumber(totalItems(orders))}</h3>
                    <button className="btn btn-success" onClick={() => checkOut()}>Checkout</button>
                </div>
            </footer>
        </div>
    )
}

export default Cart