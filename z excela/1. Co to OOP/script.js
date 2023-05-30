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

// Omowienie class z linka z 3 dzialu Syntax JS(film yt)

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


// artykul o 10 najwazniejszych cechach OOP.
//ASOCJACJA- RELACJA NIEZALEZNYCH OBIEKTOW, W KTOREJ USUNIECIE ICH ZWIAZKU NIE ZMIENIA SPOSOBU ICH fUNKCJONOWANIA 

function Person(name) { //fn tworzoaca osobe 
    this.name = name;
    this.phone = null;
}

function Phone(phone) { //fn tworzaca tel
    this.phone = phone;
}

const john = new Person('John');    //tworzymy johna
const phone = new Phone('iPhone');  //tworzymy obiekt Phone

john.phone = phone;//nadajmy referencje/zwiazek johna tel z Phonem.
console.log(john.phone) // iphone
john.phone = 'motorolla'; // usuwamy zwiazek deklarujac przyp.inna wartosc
console.log(john.phone) // motorolla

//

function Cook(nickname, fullName) {
    this.nickname = nickname;
    this.fullName = fullName;
}
const cook1 = new Cook('Hippie', 'Janusz Bimberstein');
const cook2 = new Cook('The Alchemist', 'Paulo Coelho');
console.log(cook1)
console.log(cook2)
cook2.multiplicity = cook1;

console.log(cook2)

// AGREGACJA- jakby rodzaj asociacji w ktorym jeden z obiektow pelni funkcje nadrzedna

const university = {
    students: [],
}

const marek = new Person('Marek')
const jan = new Person('Jan')
university.students.push(marek);
university.students.push(jan);
console.log(university.students[0]) //marek.. dla [1]Jan
/*W powyższym przykładzie obiekty typu Person pomagają w budowaniu obiektu university. W przypadku zamknięcia uniwersytetu, studenci nie przestaną istnieć. Innymi słowy agregacja polega na tworzeniu obiektu składającego się z innych obiektów, które są związane z obiektem nadrzędnym, jednak mimo to mogą istnieć niezależnie.*/

// Abstrakcja
//Ukrywamy czesc szczegolow tworzenia/implementacji.

const Game = function (getTitle, getAuthor) {
    let title = getTitle; //PRIVATE zmienne title i author 
    let author = getAuthor;

    this.giveTitle = function () { //PUBLIC method z dostepem do privat title
        return title;
    }

    this.giveAuthor = function () {  //PUBLIC metod z dostepem do privat autor
        return author;
    }

    const pigulka = function () { //PRIVATE method to get pigulka
        return `${title} zostało stworzone przez ${author}`;
    }

    this.givePigulka = function () { //PUBLIC method ktora ma dostep do ..
        return pigulka();             //.. private metody. Uwaga z funkcjami na nawiasy ()!
    }
}

const game1 = new Game('Wiedzmin', 'CD Project')
console.log(game1.giveTitle()) //wiedzmin
console.log(game1.giveAuthor()) //CD Project
//console.log(game1.pigulka())// TypeError: ..pigulka is not a fn
console.log(game1.givePigulka())



//Dziedziczenie i prototypy
//Dziedziczenie przez classy(syntetic sugar, dla czytelniejszego zapisu) lub prototypowe(standartowe dlA JS)


//A) Dziedziczenie class'owe
const Artist = function (name2, country) {
    this.name2 = name2; //2 bo na poczatku uzylem juz taka zmienna
    this.country = country;
    this.greeting = () => console.log('elo!');
}

const VanGogh = new Artist('Vincet', 'Nederland')
console.log(VanGogh.greeting())
//powyzsza instancja dla klasy Artist czyli VanGogh ma te same wlasciwosci i metode co classa, wiec to jest dziedziczenie, i widac ze dziala.

//B) Dziedziczenie prototypowe

/*Powiedzmy sobie teraz nieco więcej o prototypach.W dwóch słowach, prototypy są to wlasciwosci bądź metody, które są odziedziczone od konstruktora, jednak nie są bezpośrednio dostępne jako property(bądź metoda) instancji.*/

Artist.prototype.talk = () => console.log('Rumtarkt das Sloneczniki')
Artist.prototype.login = () => console.log("Jestem zalogowany!");
Artist.prototype.logout = () => console.log("Jestem wylogowany!");
Artist.prototype.moveLeft = () => console.log("Idę w lewo!");
Artist.prototype.moveRight = () => console.log("Idę w prawo!");
/*
Console.log(VanGogh) // -->

Artist { name2: 'Vincet', country: 'Nederland', greeting: ƒ }
country:"Nederland"
>greeting:() => console.log('elo!')  //metoda nalezaca do instancji VanG.
name2:"Vincet"
>[[Prototype]]:Object // wlasciwosci nalezace do prototypu,ale nie dostepne bezposrednio jako wlasc. instancji*/




// POLIMORFIZM - zdolność do wywoływania tej samej metody na roznych obiektach i reagowania na swój wlasny sposób.

