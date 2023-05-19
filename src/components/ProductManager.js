import fs from 'fs'

export class ProductManager {
    constructor()  {
        this.patch = "./productos.txt"
        this.products = []
        this.format = 'utf-8'
    }
    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++
        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
           
        }

        this.products.push(newProduct)
        
        await fs.promises.writeFile(this.patch, JSON.stringify(this.products, null, '\t'))
    }
    
    readProducts = async () => {
        let respuesta = await fs.promises.readFile(this.patch , this.format)
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return  console.log(respuesta2)
     }

     getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)){
            console.log('No existe el producto')
        } else{
            console.log(respuesta3.find((product) => product.id === id))
        }
     }


     deleteProducts = async (id) => {
        let respuesta3 = await this.readProducts()
        let filterRespuesta3 = respuesta3.filter(products => products.id != id)
        await fs.promises.writeFile(this.patch, JSON.stringify(filterRespuesta3))
        console.log('Producto Eliminado con Exito')
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let productsModif = [ {id, ...producto}, ...productOld]
        await fs.promises.writeFile(this.patch, JSON.stringify(productsModif))
        console.log('Producto Modificado con Exito')
    }


}

//const productManager = new ProductManager

//productManager.addProduct('Escuadra', 'Escuadra para dibujo técnico', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 'COD1', 10)
//productManager.addProduct('Calculadora', 'Calculadora científica', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png', 'COD2', 20)
//productManager.addProduct('Globo Terráqueo', 'Globo terráqueo iluminado', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', 'COD3', 30)
//productManager.addProduct('Paleta Pintura', 'Paleta de pintura de madera', 456.78, 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-brush-painting-school-256.png', 'COD4', 40)
//productManager.addProduct('Mochila', 'Mochila escolar', 567.89, 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-school-education-backpack-256.png', 'COD5', 50)
//productManager.addProduct('Lapiz', 'Lapiz escolar', 678.90, 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-256.png', 'COD6', 60)
//productManager.addProduct('Borrador', 'Borrador escolar', 789.01, 'https://cdn3.iconfinder.com/data/icons/education-209/64/eraser-rubber-clean-school-256.png', 'COD7', 70)
//productManager.addProduct('Tijera', 'Tijera escolar', 890.12, 'https://cdn3.iconfinder.com/data/icons/education-209/64/scissors-cutting-tool-school-256.png', 'COD8', 80)
//productManager.addProduct('Regla', 'Regla escolar', 901.23, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 'COD9', 90)
//productManager.addProduct('Cuaderno', 'Cuaderno escolar', 12.34, 'https://cdn3.iconfinder.com/data/icons/education-209/64/notebook-notebook-stationery-education-256.png', 'COD10', 100)
//productManager.addProduct('Pegamento', 'Pegamento escolar', 23.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/glue-office-stationery-school-256.png', 'COD11', 110)
//productManager.addProduct('Lapicera', 'Lapicera escolar', 34.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/pen-pencil-stationery-school-256.png', 'COD12', 120)
//productManager.addProduct('Marcador', 'Marcador escolar', 45.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/marker-pen-stationery-school-256.png', 'COD13', 130)
//productManager.addProduct('Pincel', 'Pincel escolar', 56.78, 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-brush-painting-school-256.png', 'COD14', 140)


