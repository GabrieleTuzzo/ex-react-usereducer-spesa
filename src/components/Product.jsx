export default function Product({
    item,
    addToCart,
    removeFromCart,
    isInCart = false,
}) {
    const { name, price, quantity } = item;

    return (
        <div>
            <h3>{name}</h3>
            <p>Price: {price}€</p>
            {quantity && <p>Quantity: {quantity}</p>}
            {!isInCart && (
                <div>
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
            )}
            {isInCart && (
                <div>
                    <button onClick={() => removeFromCart(item)}>
                        Remove from Cart
                    </button>
                </div>
            )}
        </div>
    );
}
