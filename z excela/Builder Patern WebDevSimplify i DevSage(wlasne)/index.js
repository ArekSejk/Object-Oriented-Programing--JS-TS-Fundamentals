/* Wzorce projektowe - BUILDER patern. WebDevSimplyfy , a na dole przyklad DevSage


Przydaje sie , gdy musimy stworzyc wiele obiektow, ktore maja wiele czesci roboczych, ktore musza sie polaczyc aby stworzyc jeden obiekt

Są dwa sposoby tworzenia buildera (bez nazw):
A - tradycyjny
B - zaawansowany(bardziej przejrzysty i opowiedni do JS)

Ten model dzieli konstrukcje na pewne etapy(setPhone, setAdress itd).
Wystepuje w nich tzw. kierownik. Mozna przenieść kolejkę bezpośrednich wywołań budowniczego do osobnej klasy, zwanej kierownikiem. Kierownik określa kolejność etapów jaką musi zachować budowniczy, który z kolei implementuje te etapy konstrukcji obiektu. Posiadanie w programie klasy kierownika nie jest niezbędne. 

ZASTOSOWANIE:
-------------
# Stosuj wzorzec Budowniczy, gdy potrzebujesz możliwości tworzenia różnych reprezentacji jakiegoś produktu (na przykład, domy z kamienia i domy z drewna).

# Wzorzec Budowniczy można użyć gdy konstruowanie różnorakich reprezentacji produktu obejmuje podobne etapy, które różnią się jedynie szczegółami.

# Bazowy interfejs budowniczego definiuje wszelkie możliwe etapy konstrukcji, a konkretni budowniczy implementują te kroki by móc tworzyć poszczególne reprezentacje obiektów. Natomiast klasa kierownik pilnuje właściwego porządku konstruowania.

# Stosuj ten wzorzec do konstruowania drzew Kompozytowych lub innych złożonych obiektów.

# Wzorzec budowniczego umożliwia konstrukcję w etapach. Niektóre z nich możemy odroczyć bez szkody dla finalnego produktu. Możemy nawet wywoływać etapy rekursywnie, co przydaje się przy budowie drzewa obiektów.

# Budowniczy uniemożliwia dostęp do nieskończonego produktu przez okres jego konstrukcji. Zapobiega to pozyskiwaniu niekompletnych wyników przez kod kliencki.
*/

//zwykle tworzenie obiektow

class Address {
    constructor(zip, street) {
        this.zip = zip;
        this.street = street;
    }
}

class User {
    constructor(name, age, phone, address) {
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }
}

const user1 = new User('Arek')
//console.log(user1)

/*Przy takim zapisie jesli nie podam reszty wymaganych w constructorze parametrów, to wszystkie te wlasciwsci uzyskaja value undefined;
.. a gdybysmy chcieli stworzyc usera ale tylko z imieniem i adresem, to zeby podac adres, w te wlasciwosci przed  adresem musielibysmy tak czy siak cos wpisac. tutaj sa tylko dwie takie, ale robi sie to problematyczne, gdy mamy tych argumentow znacznie wiecej.
*/

const user2 = new User('Marek', undefined, undefined, new Address(66400, 'Kollataja'))
//console.log(user2)






//A)  Builder patern - tradycyjny. 

//Tu nie musze uzupelniac wlasciwosci ktorych nie chce, i nie bedzie ich value uzupelniac undefinami. Wyjasnienie na koniec tego buildera

class Adres {
    constructor(zip, street) {
        this.zip = zip;
        this.street = street;
    }
}



class Uzytkownik {
    constructor(name) {
        this.name = name;
    } //usunalem pozostale keysy bo dodam je metodami w builderze
}




class BuilderUzytkownika {
    constructor(name) {
        this.uzytkownik = new Uzytkownik(name)
    }

    setAge(age) {
        this.uzytkownik.age = age;
        return this
    }
    //metody te maja zwrocic po prostu obiekt Builder(this) co pozwoli laczyc all metods przy tworzeniu(ad1)
    setPhone(phone) {
        this.uzytkownik.phone = phone;
        return this
    }

    setAddress(address) {
        this.uzytkownik.address = address;
        return this
    }

    build() {
        return this.uzytkownik
    }
}//tworzymy metode build zeby faktyczni stworzyc i uzyc obietu uzytkownika zamiast buildera(ocb?!)


const uzytkownik1 = new BuilderUzytkownika('Rafal').setAge(33).setAddress(new Address(45400, 'Kasztanowa')).setPhone(1111111).build()// (cd.ad1) nie wiem czemu .build musi byc zapisane jako ostanie. Jak nie chce podawac ktorejs wlasciwosci to po prostu nie wywoluje danej metody i po problemie z undefinami itd.

//gdyby nie return this w kazdej metodzie nie moglibysmy uzyc notacji kropkowej tylko ponizsza, linia po linii(zadziala jak skasuje kropkowe wywolanie)

// uzytkownik1.setAge(33)
// uzytkownik1.setPhone(34242343)
// uzytkownik1.setAddress('katowicka')



//console.log(uzytkownik1)







// B) Builder Patern - zaawansowany, ale lepszy

class Praca {
    constructor(stanowisko, firma) {
        this.stanowisko = stanowisko;
        this.firma = firma;
    }
}

class Pracownik {
    constructor(name, { age, phone = '0 700 72 772', praca } = {}) { //Phone ma domyslny 070..gdy nie podam go w par
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.praca = praca;
    }
}
//poza name mamy rowniez kilka opcjonalnych parametrow, ktore mozemy ale nie musimy podawac. I wtedy najlepiej podac je na koniec w obiekcie json lub js. Jesli przy tworzeniu obiektu nie podamy jakiegos parametru z takiego obj wtedy automatycznie przydziela sie mu wartosc undefined, chyba ze zdefiniujemy jego wartosc na wypadek nie podania. = {} oznacza, ze jeesli podamy tylko name to reszta bedzie miala undefined.

const zatrudniony1 = new Pracownik("janina", { age: 55, phone: 5555555, praca: new Praca('Kasjer', 'Lidl') })
//moglem wpisac wszystkie wlasciwosci ale nie musalem.


//console.log(zatrudniony1)






// BUILDER PATERN WG DEVSAGE

//BUILDER - ma tak jakby 2 czesci: obiekt, ktory chce zbudowac oraz klasa/funkc. builder, ktora dziala jako jego konstruktor. tutaj zamiast class z konstruktorem uzywamy tzw constructor function.

function Person(name, weight, height, gender) { // 1. obiekt,ktory chce zbudowac
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
}


function PersonBuilder(name, gender) { // 2. klasa/funkcja konstruktora ktora tworzy i buduje nam objekty person
    this.name = name;
    this.gender = gender;

    this.setWeight = function (weight) { //zapis krotki setWeight(..) uzywam tylko w class.
        this.weight = weight;
        return this
    }

    this.setHeight = function (height) {
        this.height = height;
        return this;
    }

    this.build = function () {//tu musze konstruowac nowy obiekt person
        return new Person(this.name, this.weight, this.height, this.gender)
    }//tu zapis w new Person param. w tej samej kolejnosci co w construct.
}
const jan = new PersonBuilder('Janusz', 'Male').setWeight(84).setHeight(190).build()
console.log(jan)

//NIE ZA BARDZO interesuje nas jak obj. jest budowany, wiec oddzielamy konstrukcje(build()) od reprezentacji(metody i dodatkowe cechy)

// " ...const ziomek = new PersonBuilder('Ola', 'female').weight(56) "
//do tego momentu stworzylismy konstruktora osoby Person nadajac mu cechy, a..
// " ...build() "
//tu konstruujemy i zwracamy nowa osobe Person.