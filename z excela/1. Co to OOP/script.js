//tworzenie obiektu, kopiowanie przez konstruktor new + fn()
// (czesciej robi sie to przez classy)
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

const book1 = new Book("Marymont", "Jonasz Kanovitch", 1999);
const book2 = new Book("Lejza na wakajkach", "Maria Dunin", 2013)
console.log(book2)

console.log(book1 instanceof Book)



//tworzenie przez obiekt glowny Object.create(proto,[propertiesObject])
// patrz rowniez na omowienie class w 3 dziale Syntax Js w materialach z excela. Jest lepiej wyjasnione na youtube po Pl.

const Song = {
    podsumowanie: function () {
        console.log(`${this.title} is written by ${this.author}.`);
    }
}
const song1 = Object.create(Song);
song1.title = "Hej Sokoły";
song1.author = "Marek Frankowski"
console.log(song1)
console.log(song1.podsumowanie())

// tworzenie CLASS

let Poem = function (name) {
    this.name = name;
}

let newPoem = function (name) {
    Poem.call(this, name);
}

newPoem.prototype = Object.create(Poem.prototype);
const poem1 = new newPoem("Oda do młodości");

console.log(poem1)

// Omowienie class z linka z 3 dzialu Syntax JS

//https://www.youtube.com/watch?v=eA2jfh707fQ

class Pokemon {//nazwa z duzej litery
    health = 100; //jesli dla wszystkich zdefiniowane od poczatku to mozemy zapisywac nad konstruktorem, ale wtedy bez this...

    //w classach nie piszemy jak zmiennych const/let!

    constructor(name, type, coach) {//do inicjalizacji tj. tworzenia instancji klasy, czyli do tworzenia obiektu na podstawie danej klasy. Zapis jak do funkcji bo jest to metoda
        this.name = name;
        this.type = type;
        this.coach = coach;
        // this.health = 100; ... lub tutaj
    }

    //mozemy rowniez zdefiniowac jakies czynnosci ktore bedzie wykonywac w formie metody
    attack() {
        console.log('Haaaadziaa!');
        this.health -= 20;
    }

    doubleAttack() {//odwolanie sie do jakiejs metody w obj.
        this.attack()
        this.attack()
    }
}

const pikachu = new Pokemon("Pikachu", "electric")
