/// GETTER i SETTER

class Square {
    constructor(width) {
        this.width = width;
        this.height = width; //bo kwadrat to width x width
        this.liczbaWywolanPola = 0;
    }

    get pole() {
        this.liczbaWywolanPola++;
        return this.width * this.height;
    }

    set pole(value) {
        this.width = Math.sqrt(value);//pierwiastek kw. z value
        this.height = this.width;
    }
}

const kwadratA = new Square(5)
console.log(kwadratA) // Square{wid..5,he..5}
console.log('Gotted Pole; ', kwadratA.pole) //25    1 wywolanie

kwadratA.pole = 100;
console.log('Setted width: ', kwadratA.width)
console.log('Setted height: ', kwadratA.height)

console.log(kwadratA.pole)          //2wywolanie....
console.log(kwadratA.pole)
console.log(kwadratA.pole)
console.log(kwadratA.pole)      //... 5 wywolanie.
console.log(kwadratA.liczbaWywolanPola) // 5


// STATIC METHODS

class Square2 {
    constructor(width) {
        this.width = width;
        this.height = width;
    }

    static równość(a, b) {
        return a.width * a.height === b.width * b.height;
    }
}
const sq1 = new Square2(4);
const sq2 = new Square2(5);
const sq3 = new Square2(4);
//Metody statyczne wywolujemy nie na instancji tylko na classie!
console.log(Square2.równość(sq1, sq2))// false, bo 16!=25
console.log(Square2.równość(sq1, sq3))// true, bo 16=16
//Powyzsze zamiast sq1 i 2 mozemy wstawiac liczby, wiec metody statyczne w klasach w ogole nie opotrzebuja instancji tej klasy aby dzialac.