/*      ZADANIE EmailBuilder

Cele główne
- Wykorzystując wzorzec projektowy Builder stwórz obiekt json reprezentujacy wszystkie parametry maila (parametry znajdują sie w kodzie poniżej)


class EmailBuilder{
  constructor() {
    this._mail = {
      from: "",
      to: "",
      title: "",
      cc: [],
      bcc: [],
      html: "",
    };
  }

  // Stwórz metody które będą zmieniać parametry from, to, title, cc, bcc, html

  buildMail = () => {
   // Zwróć finalnego maila
  }
}*/





class Email {
    constructor(from, to, title, cc, bcc, html) {
        this.from = from;
        this.to = to;
        this.title = title;
        this.cc = cc;
        this.bcc = bcc;
        this.html = html;
    }
}


class EmailBuilder {
//warto tu tworzyc constructor z  min.1 property(wtedy zwracamy obiekt, a nie klasie)
    setFrom(from) {
        this.from = from;
        return this;
    }

    setTo(to) {
        this.to = to;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setCC(cc) {
        this.cc = cc;
        return this;
    }
    setBCC(bcc) {
        this.bcc = bcc;
        return this;
    }

    setHTML(html) {
        this.html = html;
        return this;
    }

    build() {
        return new Email(this.from, this.to, this.title, this.cc, this.bcc, this.html);
    }
}

const email1 = new EmailBuilder().setFrom('jan@op.pl').setTo('ala@wp.pl').setCC(['marek@op.pl', 'ja@gg.pl']).build()

console.log(email1)



















// wyjasnienie jsona przez Pawla.

//JSON sluzy do zmodyfikowania kodu z js w stringi, by moglby byc odczytane rowniez przez inne aplikacje itd.


//przykladowy obiekt gdzie mam stringi, numery, tablice i obiekty.
const x = {
    name: 'janek',
    age: 24,
    adress: {
        street: "akacjowa",
        houseNumber: 34,
    },
    email: 'fasdf@fasdfa.fd',
    animals: ['pies', 'kot']
}
// JSON.stringify(obj.) sluzy do zmiany z js na jsona.
// JSON.parse odwrotnie z jsona w jsa powrotnie

const y = JSON.stringify(x)

//console.log(JSON.parse(y))
