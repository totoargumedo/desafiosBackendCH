// Librerias
const fs = require(`fs`)


// Clase constructor
class Container{
    constructor (fileRoute){
        this.fileRoute=fileRoute;
        this.fileContent= [];
        this.id=0;
    }

    async read (){
        try{
            const readContent = await fs.promises.readFile(this.fileRoute, `utf-8`)
            this.fileContent = JSON.parse(readContent) 
            if (this.fileContent.length >= 1){
                this.id = this.fileContent[this.fileContent.length-1].id
            }
            console.log(`${this.fileRoute} se cargo correctamente`)
        } catch(err){
            const initialContent = [                                                                                                                                                     
                {                                                                                                                                                    
                  title: 'Escuadra',                                                                                                                                 
                  price: 123.45,                                                                                                                                     
                  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
                  id: 1                                                                                                                                              
                },                                                                                                                                                   
                {                                                                                                                                                    
                  title: 'Calculadora',                                                                                                                              
                  price: 234.56,                                                                                                                                     
                  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
                  id: 2                                                                                                                                              
                },                                                                                                                                                   
                {                                                                                                                                                    
                  title: 'Globo Terráqueo',                                                                                                                          
                  price: 345.67,                                                                                                                                     
                  thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
                  id: 3                                                                                                                                              
                }                                                                                                                                                    
              ]  
            
            await this.write(initialContent)
            console.log(`Hubo un error al cargar ${this.fileRoute}: ${err}`)
            throw new Error(`Hubo un error al cargar ${this.fileRoute}: ${err}`)
        }
    }
    
    async write (contentToSave) {
        try{
            await fs.promises.writeFile(this.fileRoute, JSON.stringify(contentToSave))
            console.log(`${this.fileRoute} guardado con exito`)
        } catch(err){
            console.log(`Hubo un error al guardar ${this.fileRoute}: ${err}`)
            throw new Error(`Hubo un error al guardar ${this.fileRoute}: ${err}`)
        }
    }

    async save (object) {
        this.id++
        const newObject = {...object, id:this.id}
        this.fileContent.push(newObject)
        await this.write(this.fileContent)
        console.log(`Se ingreso ${JSON.stringify(newObject)} correctamente al archivo`)
    }

    getById (id) {
        const objectById = this.fileContent.find(e => e.id == id)
        if (objectById === undefined){
            return null
        }
        console.log(`Elemento encontrado ${objectById}`)
    }

    getRandom(){
        const randomElement = Math.floor(Math.random()*(this.fileContent.length))
        return this.fileContent[randomElement]
    }

    getAll(){
        return this.fileContent
    }

    async deleteById(id) {
        const objectIndex = this.fileContent.indexOf(this.fileContent.find(e=>e.id == id))
        console.log(objectIndex)
        if (objectIndex != -1){
            this.fileContent.splice(objectIndex, 1)
            await this.write(this.fileContent) 
            return console.log(`Elemento eliminado correctamente`)
        }
        throw new Error (`Elemento no encontrado`)
    }
    
    async deleteAll(){
        await this.write("[]")
        console.log(`Archivo limpiado correctamente`)
    }
}

module.exports = Container;