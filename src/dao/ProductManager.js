const fs = require("fs");

class ProductManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        } else {
            return [];
        }
    }

    async updateProduct() {
        if (fs.existsSync(this.path)) {
            totalProducts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));

        }
    }


    async addProduct(producto) { 
        let productos = await this.getProducts();

        let id = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

        let nuevoProducto = { id, ...producto };

        productos.push(nuevoProducto);
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));

        return nuevoProducto;

        //Falta agregarle la validacion de los campos requeridos 
    }

    async deleteProduct(id) {
        let productos = await this.getProducts();

        const index = productos.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }

        productos.splice(index, 1);

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
    }

    async updateProduct(id, updatedFields) {
        let productos = await this.getProducts();


        const index = productos.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado");
        }

        productos[index] = { ...productos[index], ...updatedFields };

        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));

        return productos[index];
    }

}


module.exports = {
    ProductManager
}
