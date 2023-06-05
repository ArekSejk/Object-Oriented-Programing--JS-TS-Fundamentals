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


// Dziedziczenie class & Rozbudowa/Roszerzenie (Extends)

//główna classa-rodzic
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    opisz() {
        return (`Jestem ${this.name} i mam ${this.age} lat.`)
    }
}

//classa dziecko
//extends - zapis dziedziczenia, tzn mamy classe,ktora rozszerza Person, tzn, ze przyjmuje wszystkie atrybuty/własc. z Person i do tego ma jakies dodatkowe swoje.

class Programmer extends Person {//
    constructor(name, age, lataDoswiadczenia) {
        super(name, age) //wywolujemy arg. z rodzica

        //a tu jego wlasne wlasc./zachowanie
        this.lataDoswiadczenia = lataDoswiadczenia;
    }

    code() {
        console.log(`${this.name} właśnie koduje.`)
    }
}

const person1 = new Person('Marek', 44);
const programmer1 = new Programmer('Jan', 37, 9)
console.log(person1)
console.log(programmer1)
console.log(programmer1.opisz()) // Dziala , bo progr.. korzysta z wlasciwosci z persona, natomiast..
//console.log(person1.code())//.. to nie dziala bo code jest indywid. zachowaniem programmera
console.log('--------------------')
//a teraz to samo ale z tablica z kilkoma programersami

const programmers = [
    new Programmer('Ola', 30, 4),
    new Programmer('Maciej', 23, 1),
];

function developeSoftware(arr) {
    //rob cos tam
    for (let programista of arr) {
        programista.code();
    }
}
developeSoftware(programmers)

//  Polymorphism
// zdolnosc do wywollania tej samej metody co u classy-rodzica, ale przez classe potomna  z inna wartoscia(zmiana)

class Animal {
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        console.log(`${this.name} robi ryk ogolny!`);
    }
}

const animal1 = new Animal('Lew')
console.log(animal1.makeSound())

class Dog extends Animal {
    constructor(name) {
        super(name);
    }

    makeSound() {
        console.log(`Hau hau hau!!!`);
    }
}
//polimorfism- clasa Potomek uzywa metody makeSound rdozica ale calkowicie na swoj sposob(inny dzwiek). Czyli podmienia dzwiek rodzica na swoj. Gdyby nie mial swojego sposobu to by mial sposob rodzica

const dog1 = new Dog('Burek');
console.log(dog1.makeSound())

//Inny przyklad polimorfizmu czyli uzycie metody rodzica, oraz dodanie czegos od siebie. Uzycie dwoch
console.log('...')
class Warzywo {
    constructor(typ) {
        this.typ = typ;
    }

    rosnij() {
        console.log('rosne rosne!')
    }
}

class Burak extends Warzywo {
    constructor(typ) {
        super(typ)
    }

    rosnij() {
        super.rosnij();//uzycie tego  od rodzica
        console.log('Ale tak wolniutko...')//i cos swego
    }
}

const burak1 = new Burak('buraczek');
console.log(burak1.rosnij())
console.log('...')


// Uzycie Class do modyfikowania DOM i HTML ////////////////


//w tej klasie bedziemy mogli przekazywac moja liste do elementu konstruktora. Classa ta zachowuje
//referencje do znacznika html z moja lista(cala lista jako element)

class modyfikacjaListy {
    constructor(element) {
        this.listaElementow = element;//listElem-odnosi sie do listy w html-calej listy <li>, a nie tylko pojedynczego!
        this.textList = []//ta tablica bedzie zawierac stringi ktore wstawimy do list jaki pojedyncze itemy
    }

    static stworzElementListy(text) {
        const li = document.createElement('li')//w ()wpisuje typ selec.,bo crea..sluzy do tworz zniacznikow html.
        li.textContent = text;//nastepnie po stworzeniu znacznikow wstawiamy w zawartosc text z argumentu
        return li;
    }

    aktualizuj() { //ustawiamy metode w tej klasie ktora bedzie odswiezac zawartosc listy
        while (this.listaElementow.firstChild) {//(jesli jest jakis element na liscie to dzialaj(dzialaj dopoki tru))
            this.listaElementow.removeChild(this.listaElementow.firstChild)//to usun go. i tak az nie zabraknie fChild
        }

        for (const text of this.textList) { //wstawiamy li jesli jakies sa w tablicy textList
            this.listaElementow.appendChild(modyfikacjaListy.stworzElementListy(text))
        }
    }

    dodaj(text) {//ustawiamy metode, ktore dodaje do listy wpisany tekst
        this.textList.push(text);//dodajemy to tablicy text
        this.aktualizuj(); //od razu po uzyciu metody dodaj i dopisaniu textu do tablicy uruchamiam aktualizacje listy
    }

    usun(index) { //ustawiamy metode, ktora usuwa z listy pozycje z wskazanego indexu
        this.textList.splice(index, 1); // (usuwamy od wskazanego indexu, ile indexow (1))
        this.aktualizuj();
    }
}

const myList = document.getElementById('myList');//querujemy moja cala liste w html
const nowaListaModyfikacja = new modyfikacjaListy(myList);//nowaListaModyfikacja mojej listy w HTML z classa listBinding

//wpisanie w consoli lub tutaj ponizszcyh edytuje liste html uzywajac powyzsza clase  jej metody;

// nowaListaModyfikacja.aktualizuj()
// nowaListaModyfikacja.dodaj('przykladowy tekst')
// nowaListaModyfikacja.usun(2) //usuwa index 2