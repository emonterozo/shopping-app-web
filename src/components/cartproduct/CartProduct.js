import { roundNumber, productExist } from '../../util/util';

const CartProduct = (props) => {
    const { product } = props.item
    const { item } = props
    const total = props.item.quantity * product.price

    const addItem = () => {
        props.add(
            props.item,
            productExist(props.orders, product._id) ? "REMOVE" : "ADD"
        )
    }


    return (
        <div className="col-md-12 py-2">
            <div className="card h-100 border-primary text-dark ">
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h5 className="card-subtitle mb-2 text-muted">
                        {
                        `${product.currency} ${props.isOrder ?  item.price : product.price}`
                        }
                    </h5>
                </div>
                <div className="card-footer d-flex justify-content-around align-items-center">
                    <h4>{`Amount: ${product.currency} ${roundNumber( props.isOrder ? item.total_price : total)}`}</h4>
                    <h4>{`Quantity: ${item.quantity}`}</h4>
                    {
                        !props.isOrder &&
                        <div className="col-md-3 row ">
                            <button className="btn btn-danger btn-block" onClick={() => props.delete(props.item)}>Delete</button>
                            <button className="btn btn-success btn-block" onClick={() => addItem()}>
                            {
                                productExist(props.orders, product._id) ? "Remove" : "Place"
                            }
                            </button>
                        </div>
                    }
                    {
                        props.isOrder &&
                        <h4>Order Date: {item.order_date}</h4>
                    }
                </div>  
            </div>
        </div>
    )
}


export default CartProduct