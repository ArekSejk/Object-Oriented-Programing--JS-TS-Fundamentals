// Czyste funkcje

let num = 123;
console.log(typeof num)
//number

function toString(val) {
    return val.toString()
}
//funkcja zalezy od inputa. Jesli input jest taki sam to zwraca zawsze taka sama wartosc. Gdybysmy wew funkcji przypisali dokladnie do num  np num.toString .. to by moglo sie zmienic, i mialoby skutek uboczny

const str = toString(num)
console.log(typeof str)
//string
console.log(num)


//niezmiennosc danych

const jeden = Object.freeze([1, 2, 3])
//jeden.push(5);  blad -nie mozna pushowac do freeza



//Funkcje jako Argumenty
//f.pierwszej klasy
const dodaj5 = (val) => toString(val) + '5';

console.log(dodaj5(0))

//Funkcje wyzszego rzedu
const dodaj5doKazdegoEl = (el) => el + 5;
const Plus5 = jeden.map(dodaj5doKazdegoEl);
console.log(Plus5)
//Object.freez pozornie udalo sie zmienic a tak na prawde .map tworzy na jego bazie nowy arr!



//Funkcje ktore zwracaja funkcje

//nudy...


//przepis na ciasto

class Emoji{

    // icon: string; nie uzywam jeszcze TS wiec nie zadziala takie typowanie

    constructor(icon) {
        this.icon = icon;
        
    }
}

const sun = new Emoji('SŁONECZKO')

console.log(sun)
//w komentarzu gosc powiedzial ze w ts jest latwiej to zrobicx bo sa public i private members

// class Emoji2 {
// constructor(public icon) {}
// }
// jesli wpiszemy 'public' onacza ze icona jest dostepna dla samej klasy i wszelich instancji klasy.

// Natomiast jesli zmienimy na private oznaczac bedzie , ze moze byc uzywany jedynie wewnatrz tej klasy

//reszty juz nie ogarnialem bo wymagalo typescripta... od ok 5-6minuty
