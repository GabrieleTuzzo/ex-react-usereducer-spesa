import './App.css';
import Product from './components/Product';
import { useState, useEffect } from 'react';

function App() {
    const products = [
        { name: 'Mela', price: 0.5 },
        { name: 'Pane', price: 1.2 },
        { name: 'Latte', price: 1.0 },
        { name: 'Pasta', price: 0.7 },
    ];

    const [addedProducts, setAddedProducts] = useState([]);
    const [priceToPay, setPriceToPay] = useState(0);

    useEffect(() => {
        setPriceToPay(
            addedProducts.reduce(
                (acc, currentItem) =>
                    (acc = acc + currentItem.price * currentItem.quantity),
                0
            )
        );
    }, [addedProducts]);

    // console.log(addedProducts);

    const handleAddProduct = (item) => {
        if (addedProducts.some((element) => element.name === item.name)) {
            updateProductQuantity(item);
        } else {
            setAddedProducts([...addedProducts, { ...item, quantity: 1 }]);
        }
    };

    const handleRemoveProduct = (item) => {
        const newProducts = [...addedProducts];
        const index = addedProducts.findIndex(
            (product) => product.name === item.name
        );
        newProducts.splice(index, 1);

        setAddedProducts(newProducts);
    };

    const updateProductQuantity = (item) => {
        setAddedProducts(
            addedProducts.map((product) => {
                if (item.name === product.name) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            })
        );
    };

    return (
        <>
            <h1>Welcome to my shop!</h1>
            <section>
                <h2>Products</h2>
                {products.map((product, i) => (
                    <Product
                        key={i}
                        item={product}
                        addToCart={handleAddProduct}
                    />
                ))}
            </section>
            <section>
                <h2>My Cart</h2>
                {addedProducts.length > 0 ? (
                    <>
                        {addedProducts.map((product, i) => (
                            <Product
                                key={i}
                                item={product}
                                removeFromCart={handleRemoveProduct}
                                isInCart={true}
                            />
                        ))}
                        <div>Total: {priceToPay.toFixed(2)}€</div>
                    </>
                ) : (
                    <p>The cart is empty</p>
                )}
            </section>
        </>
    );
}

export default App;
