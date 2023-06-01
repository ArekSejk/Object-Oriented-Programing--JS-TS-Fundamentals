// Roznica miedzy Object.create() a new Object()

//1. utworzenie fn, która będzie prototypem obiektu, który ma zostać utworzony później

function fruits() {
    this.name = 'owoc 1';
}

//2. utworzenie fn, której obiekt odziedziczy właściwości z prototypu fruits za pomocą metody object.create() 

function apple() {
    fruits.call(this)
}

//3. utworzenie obiektu funkcji apple, który będzie miał właściwości prototypu tego obiektu tj. fruits jako prototypu

apple.prototype = Object.create(fruits.prototype)

const test = new apple();

//4. Wyświetlenie utworzonego obiektu 
console.log(test.name); // owoc 1

const jajco = Object.create(fruits);
console.log(jajco.name); //fruits
console.log('<Obj.create   new Obj>')
const fruit1 = new fruits();
console.log(fruit1.name); // fruit 1






















////////  Porównanie     Object.create()  vs    NEW        ////////////


// Object.create -------------------------------
const person = {
    firstName: "John",
    lastName: "Doe",
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

const john = Object.create(person);
console.log(john)
/* wyjdzie {} czyli pusty obiekt, bez wlasnych wlasciwosci, ale z przypisanym prototypem ustawionym jako person.tj.
{} 
    >[[Prototype]]: Object
        firstName: "John",
        lastName: "Doe",
        >getFullName: f getFullName()
        >[[Prototype]]: Object
*/

john.riki = 5;/* dodaje wlasna wlasciwosc zeby sprawdzic jak wyglada

{riki=5}
    riki=5
    >[[Prototype]]: Object
        fi...

ma jedna wlasna i reszte do dyspozcji z prototypu jak wczesniej */
console.log(john)

console.log(john.hasOwnProperty('riki')) //  true
console.log(john.hasOwnProperty('firstName')) // false

console.log(person)
console.log(person.hasOwnProperty('firstName')) //true
//John moze korzystac z wlasciwosci firstname, choc ma ja jego prototyp person a on na wlasnosc nie
console.log(john.firstName) //John

// NEW -------------------------------------

function Shampoo(marka, producent) {
    this.marka = marka;
    this.producent = producent;
    this.getFullName = function () {
        return `${this.marka} ${this.producent}`;
    }
}

const srodek1 = new Shampoo('Panteen Pro-V', 'SC Johnson');
console.log(srodek1)
console.log(srodek1.hasOwnProperty('marka')) //true
//Dzieki new tworzony obiekt srodek1 pozyskuje jako swoje wlasciwosci te dziedziczone z przypisanego prototypu Shampoo

//wyswitlamy jaki co pokazuje ich prototyp. Ta metoda dziala, ale nie powinna byc uzywana, nie wiem czemu. ale dziala:)
console.log(srodek1.__proto__)
console.log(john.__proto__)




/////////////////////////////////////////////////////////////
console.log('===================')
//powtorka class

class Phone {
    signal = 'gsm';

    constructor(brand, cost, batery) {
        this.brand = brand;
        this.cost = cost;
        this.batery = batery;
    }
    ring() {
        console.log('dryyynn dryyyn dryyyn');
        this.batery -= 5;
    }
}
const iphone = new Phone('Apple', 2000, 50);
console.log(iphone)

console.log(iphone.hasOwnProperty('brand'))//adaptuje z prototypu jako wlasne
iphone.wioslo = 111111;//dla jaj i sprawdzenia czy mozna dopisywac wlasciw.
console.log(iphone)


////////////////////////////////////////////////////////////////
// SUBCLASS Cats pozycza z Animals

class Animals {
    constructor(nazwa, gatunek) {
        this.nazwa = nazwa;
        this.gatunek = gatunek;

    }
    dzwiek() {
        console.log(`Robię muuu`);
    }//dzwiek jest dopiero sprecyzowany w Catsach. Sam to tu wymyslilem
}

class Cats extends Animals {
    constructor(nazwa, gatunek, kolorWasow) {
        super(nazwa, gatunek); //pozyczane z animals
        this.kolorWasow = kolorWasow;
    }
    bieg() { //metody zawsze poza konstruktorem
        return 'patataj patataj!';
    }
}
const kot1 = new Cats('mruczek', 'egipski', 4, 'muuuu', "blue");
console.log(kot1)
console.log(kot1.hasOwnProperty('bieg'))
/*jako swoje wlasciwosci ma nazwa,gatunek(z konstruktora clasy Animal) i kolorWasow (z konstruktowa clasy Cats). Mam dostep do prototypu classy Cats z ktorego mam dostep do: bieg oraz w tym prototypie Cats mam dostep do prototypu Animals z metoda dzwiek*/

