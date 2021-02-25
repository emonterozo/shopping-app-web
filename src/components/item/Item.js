
const Item = (props) => {
    const { name, price, currency, description } = props.product
    const { addItem, role } = props

    return (
        <div className="col-md-4 py-2">
            <div className="card h-100 text-white bg-dark">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h5 class="card-title">{currency} {price}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer">
                {
                    role === 'User' && <div className="d-flex justify-content-center">
                        <button className="btn btn-primary m-2 btn-block" onClick={() => addItem(props.product, "BUY")}>
                        <i class="fas fa-shopping-cart m-2" />
                           Buy
                        </button>
                        <button className="btn btn-warning m-2 btn-block" onClick={() => addItem(props.product, "ADD")}>
                        <i className="fas fa-cart-plus m-2" />
                           Add to Cart
                        </button>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}


export default Item

/* 



*/