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