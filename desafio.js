import fs from 'fs'

class ProductManager {
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




const productManager = new ProductManager

//productManager.addProduct('Escuadra', 'Escuadra para dibujo técnico', 123.45, 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 'COD1', 10)
//productManager.addProduct('Calculadora', 'Calculadora científica', 234.56, 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png', 'COD2', 20)
//productManager.addProduct('Globo Terráqueo', 'Globo terráqueo iluminado', 345.67, 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png', 'COD3', 30)



//productManager.getProducts()

//productManager.getProductsById(3)

//productManager.deleteProducts(2)

/*productManager.updateProducts({
    "id": 2,
		"title": "Calculadora",
		"description": "Calculadora científica",
		"price": 500.56,
		"thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
		"code": "COD2",
		"stock": 20
})*/