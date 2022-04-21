
// Componentes
const Contenedor = require(`./constructor`)


// Instanciacion 1
let init1 = async () => {
    let producto = new Contenedor("./persistent/productos.json");
    
    await producto.read()
    
    await producto.save({title: 'Escuadra',                                                                                                                                 
    price: 123.45,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
    })
    
    await producto.save({title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
    })
    
    await producto.save({title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                                               
    })

    await producto.getById(12)

    await producto.getAll()

    await producto.deleteById(2)
}



// Instanciacion 1
let init2 = async () => {
    let cajones = new Contenedor("./persistent/cajones.json");
    
    await cajones.read()
    
    await cajones.deleteAll()
}


init1()
init2()