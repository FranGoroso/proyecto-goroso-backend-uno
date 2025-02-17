const express = require("express")
const fs = require("fs")
const path = require("path")
const { ProductManager } = require("./dao/ProductManager") 

const productManager = new ProductManager(path.resolve(__dirname, "data/products.json"))

const PORT = 8080
const app = express()

app.get("/", (req, res) =>{
    res.send("Home page")
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(__dirname) // Prueba de dirname para aprender a usarlo de manera correcta 
});

app.get("/api/products", async (req, res) =>{
    try {
        let products = await productManager.getProducts(); 
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: "Error al obtener productos" });
    }
});

app.get("/api/products/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10); 
        const products = await productManager.getProducts();
        const product = products.find(p => p.id === productId); 

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
});


app.get("/pid", async (req, res) =>{
    try {
        let products = await productManager.getProducts(); 
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: "Error al obtener productos" });
    }
});

app.get("/api/carts/", (req, res) => {
    res.send("")
})


