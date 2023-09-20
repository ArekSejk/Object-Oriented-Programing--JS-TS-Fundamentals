// function.call(kontekst, argument1, argument2,...)

const Pracownik = {
    zawolaj: function (name) {
        console.log(`Ahoj! Nazywam sie ${name}.`)
    }
}

const Person1 = {
    name: 'Janusz',
    age: 20,
}

const Person2 = {
    name: "Artur",
    age: 37,
}
const wynik1 = Pracownik.zawolaj.call(Person2, Person1.name)

// zajebiscie wytlumaczon pod tym linkiem i to w PL
// http://blog.nebula.us/12-javascript-wykorzystanie-metod-call-oraz-apply-w-praktyce


// czasem trzeba wyiterowac/wynumerowac wszystkie wlasciwosci lub ich wartosci z obiektu

function wezCosZrob(siusiak) {
    this.siusiak = siusiak;
    this.bieg = function () {
        console.log('biegneee!')
    }
}
const cosTam = new wezCosZrob("!marek!")

//gdy chce klucze
for (let key in cosTam) {
    console.log(key)
}
//to samo robi Object.keys(coTam)

//i gdy chce klucze i wartosci
for (let key in cosTam) {
    console.log(key, cosTam[key])
}
console.log('-------')
//to samo robi Object.value(cosTam)

//gdy chce tylko wlasciwosci ale nie metody
for (let key in cosTam) {
    if (typeof cosTam[key] != 'function')
        console.log(key, cosTam[key])
}

//Żeby sprawdzic czy obiekt posiada konkretna metode lub wlasciwosc uzywamy "in", tj.:

if ('siusiak' in cosTam) {
    console.log('Obj cosTam zawiera siusiaka! Huurraa!')
}





// ABSTRAKCJA  - ukrywanie niepotrzebnych dla uzytkownika szczegolow i wystawienie jedynie niezbednych

//Ponizszy zapis jest dostepny publicznie dla wszystkich i jego wszystkie wlasciwosci i metody
function Kwadrat(bok, color) {
    this.bok = bok;
    this.color = color;
    this.zadanie = function () { console.log('blabla') };
}
const one = new Kwadrat(5, 'blue')
//np.
console.log(one.bok) //5
console.log(one.zadanie) //function zadanie () ..

console.log('------------')

//mozna ograniczyc dostep do niektorych zapisujac je w funkcji jako zmienne lokalne, ktore istnieja tylko w niej

function Kwadrat2(bok) {
    let color = "niebieski";

    let zadanie = function () {
        console.log('fn zadanie')
    };

    this.bok = bok;

    this.rob = function () {
        //      this.zadanie(5, 1) //taki zapis byl ok gdy zadanie bylo publicznie dostepne z this.zadanie, skoro jest let to musi byc ponizszy zapis bez this. Tutaj beda one dostepne mimo, ze sa na let a nie this poniewaz w CLOSURES funkcja w funkcji ma dostep do swoich zmiennych i zmiennych rodzica

        zadanie()
        console.log('cos tam zrobilem')
    }
}
//sprawdzam dostepnosc
const two = new Kwadrat2(5)
console.log(two.color) //undefined
console.log(two.zadanie)////undefined
console.log(two.bok) ////5
console.log(two.rob)////function rob()...

//GETTER -  Co zrobic zeby z zewnatrz mozna miec dostep z wlasciwosci/metody z wewnatrz, ale tylko do odczytu.

function Kwadrat3(bok) {
    let color = "niebieski";
    this.bok = bok;
}
const blabla = new Kwadrat3(5)
console.log('color: ', blabla.color) //undefined
console.log('bok: ', blabla.bok) //5

//robie zeby byl dostep do coloru

function Kwadrat4(bok) {
    let color = "niebieski";
    this.bok = bok;
    this.getColor = function () { //getter!
        return color;
    }
}
const blabla2 = new Kwadrat4(5)
console.log(blabla2.getColor()) // niebieski!!!!

// Jest zwyzaj/zasada ze getter nazyamy get cos tam cos tam. Jesli chce go wywolywac inaczej to przemianowuje na inna nazwa do wolania.Nazywam getter normalna nazwa color

function Kwadrat5(bok) {
    let color = "niebieski";
    this.bok = bok;
    this.getColor = function () { //getter!
        return color;
    }

    Object.defineProperty(this, 'color', {
        get: function () {
            return color;
        },
        set: function (value) {
            if (value !== 'niebieski')
                throw new Error('Zly kolor');
        }
    });
}
const blabla3 = new Kwadrat5(5)
console.log('zmiana nazwy:', blabla3.color)//niebieski
//blabla3.color = 'red';// wyskakuje blad w konsoli:)


//zadanie powtorkowe z filmu mosha
//Ma mierzyc czas miedzy  wywolaniamy 
function Stopwatch() {
    let startTime, endTime, running, duration = 0;

    this.start = function () { //gdy wywolamy..
        if (running) { //.i juz chodzi (czyli za 2 i kolejnym razem)
            throw new Error('Stopwatch juz wystartowal')
        }
        running = true;
        startTime = new Date();
    }


    this.stop = function () {
        if (!running) {
            throw new Error('Stopwatch jeszcze sie nie zaczela')
        }
        running = false;
        endTime = new Date();

        const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
        duration += seconds;
    }

    this.reset = function () {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
    }

    Object.defineProperty(this, 'duration', {
        get: function () {
            return duration;
        }
    })
}

const sw = new Stopwatch()

//Jak dziala? W konsoli wpisz kolejno sw.start(), potem sw.stop(), potem sw.duration zeby sprawdzic ile czasu minelo miedzy start i stop, a zeby zaczac od nowa to trzeba sw.reset()