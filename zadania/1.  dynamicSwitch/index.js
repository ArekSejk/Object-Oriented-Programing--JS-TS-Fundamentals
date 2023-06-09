/* Cele główne
 1. Stwórz klasę Switch, która służy do wielokrotnej, równorzędnej walidacji
 2. Klasa ma mieć metode .add w której dodajemy warunek do sprawdzenia oraz callback, który ma się wywołać jeśli warunek zostanie spełniony(wykona go w isValid)
 3. Klasa ma mieć metodę.isValid która iteruje po wszystkich cases sprawdzając każdy dodany wcześniej warunek.  Metoda.isValid zwraca true jeśli wszystkie warunki będą na false.Jeżeli jakikolwiek warunek zostanie spełniony, funkcja przerywa swoje działanie, wywołując przekazany callback dla tego warunku.Po każdym wykonaniu metody warunki i callbacki są czyszczone.
 4. Klasa ma mieć metodę.isEmpty która sprawdza czy tablice cases i conditions są puste.Jeśli tak zwraca true
Np.
class Switch {
  cases = [];
  conditions = [];

  add(condition, callback) {}
  isValid() {
    // return this.conditions
  }
}

// ma to działać tak:
const formChecker = new Switch();
const value = "test";

formChecker.add(value.length < 5, () => {
  console.error("value is too short");
});

formChecker.add(!value.includes("@"), () => {
  console.error("value is not an email");
});

// formChecker.isEmpty() === false
formChecker.isValid(); // === false
// console.error('value is to short')
// console.error('value is not an email')
// formChecker.isEmpty() === true */

///////////////////////////////////////////////////////////////////////////////

class Switch2 {

    cases = []; //warunki i callbacki
    conditions = []; //warunki. Ten arr niepotrzebny,moglbym wszystko robic tylko na cases, ale kazali:)

    add(warunek, callbackFn) {
        this.cases.push({ warun: warunek, callFn: callbackFn });

        this.conditions.push(warunek);
    }

    isValid() {
        if (this.conditions.every((el => !el))) {   //spr czy all war sa niespelnione

            this.cases.length = 0;
            this.conditions.length = 0;
            console.log('isValid', true)           //pogladowe.(do usuniecia)
            return true;

        }

        for (let i = 0; i < this.cases.length; i++) {   //spr który warun jest spelniony
            if (this.cases[i].warun === true) {
                let j = i;
                i = this.cases.length;  //ustawiam by dalej nie robil kolejnej petli gdy znajdzie(jak break)
                this.cases[j].callFn(); //return? wtedy nie zeruje  arrejow
            }
        }
        this.cases.length = 0;
        this.conditions.length = 0;
        return false
    }

    isEmpty() {
        if (this.cases.length === 0 && this.conditions.length === 0) return true;
        return false;
    }
}
const test1 = new Switch2();
const value2 = "test";



test1.add(value2.length < 3, () => {
    console.log('Warunek jest spelniony');        // false
})

test1.add((typeof (value2) !== "string"), () => {
    console.log('Warunek jest spelniony');       // false
})

test1.add((typeof (value2) === "string"), () => {
    console.log('Warunek 3 nie jest spelniony');     // true
})

test1.add((typeof (value2) !== "string"), () => {
    console.log('Warunek 4 nie jest spelniony');       // false
})


console.log('cases Przed:', test1.cases)
console.log("condi Przed:", test1.conditions)
console.log('is Empty Przed', test1.isEmpty())

test1.isValid();
console.log('cases PO:', test1.cases)
console.log("condi PO:", test1.conditions)
console.log('is Empty PO', test1.isEmpty())



