import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json()
        if (result) {
            getProducts();
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }

    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="search-product-box" placeholder="search product"
                onChange={searchHandle} />
            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>

            {
                products.length >0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                )
                :<h1>No result found</h1>
            }
            {/* {Array.isArray(products) && products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button></li>
                    </ul>
                ))
            ) : (
                <p>No products available.</p>
            )} */}

        </div>
    )
}

export default ProductList;