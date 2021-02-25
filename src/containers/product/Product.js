import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import './Product.css';
import Spinner from '../../components/spinner/Spinner';
import Item from '../../components/item/Item';
import { userCartAddItem } from '../../redux/actions/cart';
import { userOrdersAdd } from '../../redux/actions/orders';
import { roundNumber, dateNow } from '../../util/util';

const Product = () => {
    const { users } = useSelector(state => state.users)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ products, setProducts ] = useState([])
    const [ isModalShow, setIsModalShow ] = useState(false)
    const [ product, setProduct ] = useState([])
    const [ action, setAction ] = useState('')

    useEffect(() => {
        axios.get('/products')
        .then((response) => {
            setProducts(response.data.products)
            setIsLoading(false)
        })
        .catch((error) => {
            throw error
        })
    }, [])


    const addProduct = (product, action) => {
        setProduct(product)
        setAction(action)
        toggleModal()
    }

    const toggleModal = () => {
        setIsModalShow(!isModalShow)
    }

    return (
        <div>
            {isLoading && <Spinner />}
            <div className="container mt-5 min-vh-100 d-flex flex-column justify-content-start align-items-center">
            <h2>Product</h2>
            <div className="row">
                {
                    products.map((product) => {
                        return <Item product={product} role={users.length !== 0 ? users[0].role : 'Guest'} addItem={addProduct} />
                    })
                }
                
            </div>
            {
                isModalShow && 
                <div className="col-md-9 p-3 custom-modal">
                    <ModalOption action={action} product={product} hideModal={toggleModal} />
                </div>
            }
            </div>
        </div>
    )
}

const ModalOption = (props) => {
    const { users } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const { name, price, currency } = props.product
    const [ quantity, setQuantity ] = useState(1)
    

    const setItemQuantity = (action) => {
        if (action === 'DEC') {
            quantity !== 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const addProduct = () => {
        props.hideModal()
        if (props.action === "ADD") {
            dispatch(
                userCartAddItem(
                    users[0]._id,
                    props.product._id,
                    quantity
                )
            )
        } else {
            const total = quantity * price

            const data = {
                userId: users[0]._id,
                orders: [
                    {
                        product: props.product._id,
                        price: price,
                        quantity: quantity,
                        total_price: total,
                        order_date: dateNow()
            
                    }
                ]
            }
           
            dispatch(userOrdersAdd(data))
        }
    }

    return (
      <div className="container bg-info text-white p-2 rounded" >
          <h1>{name}</h1>
          <h1>{currency} {price}</h1>
          <div className="d-flex justify-content-around">
            <h1>Total Amount: {roundNumber(quantity * price)}</h1>
            <div className="d-flex justify-content-end">
                <button className="m-2 btn btn-danger" onClick={() => setItemQuantity('DEC')}>
                <i className="fas fa-minus" />
                </button>
                <h1>{quantity}</h1>
                <button className="m-2 btn btn-success" onClick={() => setItemQuantity('INC')}>
                <i className="fas fa-plus" />
                </button>
            </div>
            <div className="col-md-3 d-flex">
            <button className="btn btn-success btn-block m-2" onClick={() => addProduct()}>
                {
                    props.action === 'ADD' ? "Add" : "Buy"
                }
            </button>
            <button className="btn btn-danger btn-block m-2" onClick={() => props.hideModal()}>Cancel</button>
            </div>
          </div>
      </div>
    )
}

export default Product