// Chcemy miec milion userow, ktorzy bedzie mieli wspolna baze kluczy/wlasciwoci i nie chcemy tego wpisac dodalnie literalnie. Chcemy  miec funkcje ktora moze nam sprawnie zwiekszac wlasciwosc usera "score" Porownanie sposobo jak to zrobic

// A) Tworzenie obiektu przez funkcje i odwolywanie sie do jego metody z zewnatrz w celu wykonania jakiegos zachowania. 

//UWAGA MEGA NIE PRAKTYCZNIE NIE UZYWANE!!!

//PLUSY:
//-jest łatwa i prosta to wyjasnienia

function userCreator(name, score) {
    const newUser = {};
    newUser.name = name;
    newUser.score = score;
    newUser.increment = function (score) {
        newUser.score++
    }
    return newUser;
}

const user1 = userCreator('Will', 5)
const user2 = userCreator('Tom', 3)
console.log(user1.score)
console.log(user2)
user1.increment()
console.log(user1.score)

// NIE UZYWAMY TEGO BO KAZDY Z OBIEKTOW BEDZIE MIAL ZDEFINIOWANA ZUPELNIE NOWA FUNKCJE INCREMENT(BO W TEN SPOSOB funkcje Tworza sie jak jej kopie)


// B) Object.creator(prot) ////////////////////

//Przez łańcuch prototypów - wrzucenie funkcji do osobnego obiektu.
//Metoda z uzyciem__proto__
//Same zalety, poza tym ze troche dluzszy i skomplikowany

function userCreator2(name, score) {
    const newUser = Object.create(functionStore);//W () prototyp. Why podajemy tu fn?
    newUser.name = name;
    newUser.score = score;
    return newUser;
}

const functionStore = {
    increment: function () { this.score++ },
    login: function () { console.log('You are logged in') }
}

const user3 = userCreator2('Marek', 8);
const user4 = userCreator2('Jim', 1);
console.log(user3.score)//8
user3.increment();//user3 nie ma f.increment w swoich wlasciwosciach wiec wtedy silnik szuka w powiazanym prototypie(najpierw szuka w user3). NA tym polega łańcuch prototypowy - ze js jak nie znajduje szukanej wlasciwosci/metody w obiekcie to automatycznie przechodzi do szukania w prototypie tego obiektu.Jesli tam nie znajduje to szuka dalej w prototypie prototypu tego obiektu itd:)
console.log(user3.score)//9


//  C - konstruktor new ....()  ///////////////////////////

function UserCreator3(name, score) {
    this.name = name;
    this.score = score;
}
const user5 = new UserCreator3('Tomek', 2);

UserCreator3.prototype.increment = function () {
    this.score++;       //dodajemy właściwosć w prototypie
}

UserCreator3.prototype.login = function () {
    console.log('login'); //dodanie właściw. w prototypie
}
console.log(user5)//we wszystkih referencjach(w user5 tez) widac w ich prototype własciwosci increment i login

user5.increment(); //uruchamiamy funkcje i score+1
console.log(user5)// score 6, a bylo 5


// D - CLASS klasyyy ////////////////////

class UserCreator4 {
    constructor(name, score) { //to co w constr. to wlasne wlasciw
        this.name = name;
        this.score = score;
    }
    increment() {   //a to co poza trafia do prototypu wspolnego
        this.score++;
    }
    login() {// to tez
        console.log('login');
    }
}
const user6 = new UserCreator4('Bartek', 9);
console.log(user6)
user6.increment();
console.log(user6)