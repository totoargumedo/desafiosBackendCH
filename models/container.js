// Librerias
const fs = require(`fs`)


// Clase constructor
class Container{
    constructor (fileRoute){
        this.fileRoute= fileRoute;
        this.fileContent= [];
        this.id=0;
        this.read()
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
            await this.write([])
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
        return newObject
    }

    async modify (id, object){
        const objectIndex = this.fileContent.indexOf(this.fileContent.find(e=>e.id==id))
        const oldObject = this.fileContent[objectIndex]
        if (oldObject === undefined){
            return {error: `Elemento no encontrado`}
        }
        const newObject = object
        this.fileContent[objectIndex] = newObject
        await this.write(this.fileContent)
        return oldObject,newObject
    }

    getById (id) {
        const objectById = this.fileContent.find(e => e.id == id)
        if (objectById === undefined){
            return {error: `Elemento no encontrado`}
        }
        return objectById
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
            const deletedObject = JSON.stringify(this.fileContent[objectIndex])
            this.fileContent.splice(objectIndex, 1)
            await this.write(this.fileContent) 
            return deletedObject
        }
        return {error: `Elemento no encontrado`}
    }
    
    async deleteAll(){
        await this.write([])
        console.log(`Archivo limpiado correctamente`)
    }
}

module.exports = Container;