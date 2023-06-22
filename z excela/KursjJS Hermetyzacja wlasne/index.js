function myModule() {
    //prywatne właściwości i metoda
    let _numberA = 102;
    let _numberB = 10;

    function calculateNumbers() {
        console.log(_numberA + _numberB);
    }

    //zwracany obiekt ma dostęp do powyższych rzeczy
    //reszta skryptu nie ma do nich dostępu
    //obiekt ma oczywiście też dostęp do swoich własnych rzeczy przez this
    return {
        nrA: 302,
        nrB: _numberB,

        sum: calculateNumbers,

        doSomething() {
            console.log(_numberA);
            console.log(_numberB);
            calculateNumbers();
            console.log(this.nrA, this.nrB);
        }
    }
}


const my = myModule();


// my.doSomething(); //działa
// my.sum(); //działa
// console.log(my.nrA); //302
// console.log(my.nrB); //10

// my.calculateNumbers(); //błąd
// console.log(my._numberA); //błąd