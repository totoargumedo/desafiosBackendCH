class User {
    constructor (name, lastName) {
        this.ID = User.userID;
        this.name = name; //string
        this.lastName = lastName; //string
        this.books = []; //array recibe books as objects
        this.pets = []; //array recibe pets as strings
        User.userID++
    }

    static userID = 1;

    getFullName () {
        return `Usuario: ${this.name} ${this.lastName}`
    }

    addPet (pet){
        this.pets.push(pet)
        console.log(`Se agrego correctamente la mascota ${pet} al usuario ${this.ID}`)
    }

    countPets(){
        return `El usuario ${this.ID} tiene ${this.pets.length} mascotas`
    }

    addBook (name, author){
        let book = {name: name, author: author}
        this.books.push(book)
        console.log(`Se agrego correctamente el libro ${book.name} del autor ${book.author} al usuario ${this.ID}`)
    }

    getBooksNames(){
        return this.books.map(e=>e.name)
    }

}


// Inicializamos una instancia de User
const user1 = new User ("Roberto", "Argumedo")
// Inicializamos una instancia de User
const user2 = new User ("Barbara", "Garcia")
// Inicializamos una instancia de User
const user3 = new User ("Darth", "Vader")

// Test getFullName
console.log(user1.getFullName())
console.log(user2.getFullName())
console.log(user3.getFullName())

// Test agregar mascotas
user1.addPet("Juno")
user1.addPet("Houston")
user2.addPet("Kion")
user3.addPet("C3P0")
user3.addPet("R2D2")
user3.addPet("Jar Jar Binks")

// Test cantidad de mascotas
console.log(user1.countPets())
console.log(user2.countPets())
console.log(user3.countPets())

// Test agregar libros
user1.addBook("Fundación", "Isaac Asimov")
user1.addBook("The Hobbit", "J.R.R. Tolkien")
user1.addBook("Silmarillion", "J.R.R. Tolkien")
user1.addBook("Crónicas Marcianas", "Ray Bradbury")
user2.addBook("Tabú", "El Gato y la Caja")
user2.addBook("El Prisioner de Azkhaban", "J.K. Rowling")
user3.addBook("Democracia Intergalactica", "Palpatine")
user3.addBook("Como matar un Jedi", "Autobiografía")

// Test getBooksNames
console.log(user1.getBooksNames())
console.log(user2.getBooksNames())
console.log(user3.getBooksNames())

// Probamos las instancias
console.log(user1)
console.log(user2)
console.log(user3)