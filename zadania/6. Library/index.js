/* Cele główne
 Stwórz strukturę danych związaną z biblioteką, pełen opis znajduję się w kodzie poniżej
 Wypracuj obiekt charakteryzujący użytkownika
 Wypracuj obiekt charakteryzujący książkę
 Wypracuj obiekt charakteryzujący wypożyczenie
 Wypracuj obiekt charakteryzujący bibliotekę
Cele opcjonalne do wykonania
 Dodaj możliwość posiadania więcej niż jednej książki w bibliotece - będzie trzeba zmienić logikę dodawania i usuwania książki z biblioteki (np. jeżeli książka jest już w bibliotece to dodajemy do niej kolejną sztukę).

 Kawałek kodu dla lepszego początku!
class User {
    // Ma miec: Imie, Nazwisko, uuid
}

class Book {
    // Ma miec: Tytuł, Autora, uuid, losowe zdjęcie oraz krótki opis
}

class Booking {
    // Booking dostaje użytkownika w constructorze

    // Ma mieć: datę wypożyczenia, datę zwrotu (+7d od wypożyczenia), listę wypożyczonych książek, kara
    
    // Ma umożliwiać: 
    // - usuwanie i dodawanie książki do listy wypożyczonych książek
    // - zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie - 
    // każdy dzień zwłoki to naliczenie jakiejś kary. 
}

class Library {
    // Ma miec: listę książek, listę książek dostępnych (które nie zostały wypożyczone),
    // lista wypożyczeń, lista użytkowników
    
    // Ma umożliwiać: 
    // - dodawanie książek do listy
    // - usuwanie książek z listy
    // - wypożyczanie książki dla usera X
    // - oddanie wypożyczania książki
}*/





// WSZYSTKO ZROBIONE BDB, jEDYNIE przydałaby sie walidacja (jak zawsze), ale na nia nie bylo czasu, a walidacja jak to walidacja;)





class User {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
        this.uuid = Math.floor(Math.random() * 1000000)
    }
}



class Book {
    constructor(title, author, picture, description) {
        this.title = title;
        this.author = author;
        this.uuid = Math.floor(Math.random() * 1000000);
        this.picture = picture;
        this.description = description;
    }
}




class Booking {
    borrowedBookList = [];

    constructor(userName, userLastName) {
        this.user = new User(userName, userLastName)
        this.borrowDate = new Date();
        this.maxReturnDate = new Date(this.borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        this.chargeAmount = 5; //5 zl za 1 rozpocz. dzien spoznienia z 1 ksiazka
        this.chargeSum = 0;
    }

    findBookIndex(bookTitle) {
        return this.borrowedBookList.findIndex(e => e.book.title.toLowerCase() === bookTitle.toLowerCase());
    }

    addBookToBorrowedList(book) {
        this.borrowedBookList.push(book);
    }

    deleteBookFromBorrowedList(bookTitle) {
        if (this.findBookIndex(bookTitle) === -1) return;
        this.borrowedBookList.splice(this.findBookIndex(bookTitle), 1)
    }

    countCharge(actualReturnDate) {
        const timeDifference = (this.maxReturnDate.getTime()) - actualReturnDate;

        if (timeDifference >= 0) return console.log('no extra charge');

        const timeDifferenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return this.chargeSum += Math.abs(this.chargeAmount * timeDifferenceInDays);
    }

    returnBook(bookTitle) {
        if (this.findBookIndex(bookTitle) === -1) return;

        this.deleteBookFromBorrowedList(bookTitle);

        const actualReturnDate = (new Date()).getTime();

        const charge = this.countCharge(actualReturnDate);

        if (charge === undefined) return;

        return console.log(`Extra charge is ${charge} pln`);
    }
}

const book1 = new Book('Pan Tadeusz', 'A.Mickiewicz', 'panTad.jpg', 'Dawno,dawno temu..')
const book2 = new Book('Potop', 'H.Sienkiewicz', 'hSienk.jpg', 'Byly sobie swinki 3...')
const book3 = new Book('Marysieńka', 'A.Kopacka', 'aKop.jpg', 'Marysia była bardzo...')

const booking1 = new Booking('Marek', 'Kondrad')

booking1.addBookToBorrowedList(book1)
booking1.addBookToBorrowedList(book2)
booking1.addBookToBorrowedList(book3)








class Library {
    allLibraryBookList = [];
    availableBookList = [];
    bookingsList = [];
    userList = [];

    findBookIndex(bookTitle, list) {//podaje w param. dana liste w ktorej szukamy.
        return list.findIndex(e => e.book.title.toLowerCase() === bookTitle.toLowerCase());
    }

    addBookToLibrary(book) {//par.jest zmienna z obiektem ksiazki(a nie jej tytul!)
        const bookIndex = this.findBookIndex(book.title, this.allLibraryBookList);

       if (bookIndex === -1) {
            this.allLibraryBookList.push({ book, quantity: 1 });
            this.availableBookList.push({ book, quantity: 1 });
            return;
        }

        this.allLibraryBookList[bookIndex].quantity++;

        this.addBookToAvailableList(book.title);
    }

    addBookToAvailableList(bookTitle) {
        const bookIndexInAvailables = this.findBookIndex(bookTitle, this.availableBookList);

        if (bookIndexInAvailables !== -1) return this.availableBookList[bookIndexInAvailables].quantity++;

            const bookIndexInAllbooks = this.findBookIndex(bookTitle, this.allLibraryBookList);

            if (bookIndexInAllbooks === -1) return console.log('nie ma takiej ksiazki w bibliotece');

            return this.availableBookList.push(bookIndexInAllbooks);
    }

    deleteBookFromLibrary(bookTitle) {
        const bookIndexToDelete = this.findBookIndex(bookTitle, this.allLibraryBookList);

        if (bookIndexToDelete === -1) return;

        if (this.allLibraryBookList[bookIndexToDelete].quantity === 1) {
            this.allLibraryBookList.splice(bookIndexToDelete, 1);
            this.deleteBookFromAvailableList(bookTitle);
            return;
        }

        this.allLibraryBookList[bookIndexToDelete].quantity--;

        this.deleteBookFromAvailableList(bookTitle);
    }

    deleteBookFromAvailableList(bookTitle) {
        const bookIndexToDelete = this.findBookIndex(bookTitle, this.availableBookList);

        if (bookIndexToDelete === -1) return;

        if (this.availableBookList[bookIndexToDelete].quantity === 1) return this.availableBookList.splice(bookIndexToDelete, 1);

        this.availableBookList[bookIndexToDelete].quantity--;
    }

    makeBooking(userName, userLastName, bookTitle) {
        const bookIndexInAvailablelList = this.findBookIndex(bookTitle, this.availableBookList);

        if (bookIndexInAvailablelList === -1) return console.log("book unavailable- booking canceled");

        const newBooking = new Booking(userName, userLastName);

        this.userList.push(newBooking.user);

        newBooking.addBookToBorrowedList(this.availableBookList[bookIndexInAvailablelList]);

        this.bookingsList.push(newBooking)

        if (this.availableBookList[bookIndexInAvailablelList].quantity === 1) return this.availableBookList.splice(bookIndexInAvailablelList, 1);

        this.availableBookList[bookIndexInAvailablelList].quantity--;

        // ZALOZENIEM JEST, ze REZERWACJA jest tworzona NA 1 KSIAZKE!!!
    }

    returnBooking(userName, userLastName, bookTitle) {
        const findBookingIndex = this.bookingsList.findIndex(e =>
            (e.user.name.toLowerCase() === userName.toLowerCase()) &&
            (e.user.lastName.toLowerCase() === userLastName.toLowerCase()) &&
            e.borrowedBookList.find(f => f.book.title.toLowerCase() === bookTitle.toLowerCase())
        )//szukam rezerwacji na tego usera i ksiazke

        if (findBookingIndex === -1) return console.log('booking doesn\'t exist');

        this.bookingsList[findBookingIndex].returnBook(bookTitle)//metodą classy Booking usuwam z listy pozyczonych i naliczam oplate


        this.userList.splice(this.userList.findIndex(e => e.name.toLowerCase() === userName.toLowerCase() && e.lastName.toLowerCase() === userLastName.toLowerCase()), 1) //usuwam usera z listy userow

        this.availableBookList.push(this.allLibraryBookList[this.findBookIndex(bookTitle, this.allLibraryBookList)])//dodaje oddana ksiazke do listy dostepnych

        this.bookingsList.splice(findBookingIndex, 1)
    }
}

const biblioteka = new Library();

biblioteka.addBookToLibrary(book1)
biblioteka.addBookToLibrary(book2)
biblioteka.addBookToLibrary(book3)
biblioteka.addBookToLibrary(book3)


//biblioteka.makeBooking('Marek', 'Janicki', 'marysieńka');
biblioteka.makeBooking('Janusz', 'Wunderbaumer', 'potop');
biblioteka.makeBooking('Jan', 'Janowicz', 'pan tadeusz')

biblioteka.returnBooking('Janusz', 'Wunderbaumer', 'potop')

console.log(...biblioteka.bookingsList)









// WERSJA PIERWOTNA- zadanie podstawowe bez Opcjonalnego(ksiazka ma tylko 1szt, wiec book nie jest obiektem z wlasciwoscia quantity)

// class User {
//     constructor(name, lastName) {
//         this.name = name;
//         this.lastName = lastName;
//         this.uuid = Math.floor(Math.random() * 1000000)
//     }
// }

// class Book {
//     constructor(title, author, picture, description) {
//         this.title = title;
//         this.author = author;
//         this.uuid = Math.floor(Math.random() * 1000000);
//         this.picture = picture;
//         this.description = description;
//     }
// }

// class Booking {
//     borrowedBookList = [];

//     constructor(userName, userLastName) {
//         this.user = new User(userName, userLastName)
//         this.borrowDate = new Date();
//         this.maxReturnDate = new Date(this.borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000);
//         this.chargeAmount = 5; //5 zl za 1 rozpocz. dzien spoznienia z 1 ksiazka
//         this.chargeSum = 0;
//     }

//     findBookIndex(bookTitle) {
//         return this.borrowedBookList.findIndex(e => e.title.toLowerCase() === bookTitle.toLowerCase());
//     }

//     addBookToBorrowedList(book) {
//         this.borrowedBookList.push(book);
//     }

//     deleteBookFromBorrowedList(bookTitle) {
//         if (this.findBookIndex(bookTitle) === -1) return;
//         this.borrowedBookList.splice(this.findBookIndex(bookTitle), 1)
//     }

//     countCharge(actualReturnDate) {
//         const timeDifference = (this.maxReturnDate.getTime()) - actualReturnDate;

//         if (timeDifference >= 0) return console.log('no extra charge');

//         const timeDifferenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

//         return this.chargeSum += Math.abs(this.chargeAmount * timeDifferenceInDays);
//     }

//     returnBook(bookTitle) {
//         if (this.findBookIndex(bookTitle) === -1) return;

//         this.deleteBookFromBorrowedList(bookTitle);

//         const actualReturnDate = (new Date()).getTime();

//         const charge = this.countCharge(actualReturnDate);

//         if (charge === undefined) return;

//         return console.log(`Extra charge is ${charge} pln`);
//     }
// }

// const book1 = new Book('Pan Tadeusz', 'A.Mickiewicz', 'panTad.jpg', 'Dawno,dawno temu..')
// const book2 = new Book('Potop', 'H.Sienkiewicz', 'hSienk.jpg', 'Byly sobie swinki 3...')
// const book3 = new Book('Marysieńka', 'A.Kopacka', 'aKop.jpg', 'Marysia była bardzo...')

// const booking1 = new Booking('Marek', 'Kondrad')

// booking1.addBookToBorrowedList(book1)
// booking1.addBookToBorrowedList(book2)
// booking1.addBookToBorrowedList(book3)





// class Library {
//     allLibraryBookList = [];
//     availableBookList = [];
//     bookingsList = [];
//     userList = [];

//     // createBook(title, author, picture, description) {
//     //     const bookInstance = new Book(title, author, picture, description);
//     //     this.addBookToLibrary(bookInstance); //od razu dodaje do listy w bibliotece
//     //     this.addBookToAvailableList(bookTitle); // od razu dodaje do listy dostepnych
//     // }// funkcja pomocnicza totalnie zbedna

//     // createUser(userName, userLastName) {
//     //     const userInstance = new User(userName, userLastName);
//     //     this.userList.push(userInstance);
//     // }// funkcja pomocnicza totalnie zbedna

//     findBookIndex(bookTitle, list) {//podaje w param. dana liste w ktorej szukamy.
//         return list.findIndex(e => e.title.toLowerCase() === bookTitle.toLowerCase());
//     }

//     addBookToLibrary(book) {//par. jest zmienna z obiektem ksiazki (a nie jej tytul!)
//         this.allLibraryBookList.push(book);//dodaje do listy wszystkich w bibliotece
//        this.addBookToAvailableList(book.title)//tez od razu dodaje do listy dostepnych
//     }

//     addBookToAvailableList(bookTitle) {
//         this.availableBookList.push(this.allLibraryBookList[this.findBookIndex(bookTitle, this.allLibraryBookList)])//dodaje do listy dostepnych
//     }

//     deleteBookFromLibrary(bookTitle) {
//         if (this.findBookIndex(bookTitle, this.allLibraryBookList) === -1) return;

//         this.allLibraryBookList.splice(this.findBookIndex(bookTitle, this.allLibraryBookList), 1);//usuwam z listy wszystkich w bibliotece

//         this.deleteBookFromAvailableList(bookTitle);//usuwam tez z listy dostepnych
//     }

//     deleteBookFromAvailableList(bookTitle) {
//         if (this.findBookIndex(bookTitle, this.availableBookList) === -1) return;

//         this.availableBookList.splice(this.findBookIndex(bookTitle, this.availableBookList), 1)//usuwam z listy dostepnych
//     }

//     makeBooking(userName, userLastName, bookTitle) {
//         if (this.findBookIndex(bookTitle, this.availableBookList) === -1) return "book unavailable";//spr czy book jest dostepna,if not nie ma sensu robic reszty...

//         const newBooking = new Booking(userName, userLastName);//tworze rezerwacje

//         this.userList.push(newBooking.user)//dodaje usera do listy userow

//         // newBooking.borrowedBookList.push(this.availableBookList[this.findBookIndex(bookTitle, this.availableBookList)])

//         newBooking.addBookToBorrowedList(this.availableBookList[this.findBookIndex(bookTitle, this.availableBookList)]);//dodaje book do listy wypozyczonych

//         this.availableBookList.splice(this.findBookIndex(bookTitle, this.availableBookList), 1) //usuwam ksiazke z listy dostepnych w bibliotece

//         this.bookingsList.push(newBooking)//dodaje te rezerwacje do listy rezerwacji

//         //ZALOZENIEM JEST, ze REZERWACJA jest tworzona NA 1 KSIAZKE!!!
//     }

//     returnBooking(userName, userLastName, bookTitle) {
//         const findBookingIndex = this.bookingsList.findIndex(e =>
//             (e.user.name.toLowerCase() === userName.toLowerCase()) &&
//             (e.user.lastName.toLowerCase() === userLastName.toLowerCase()) &&
//             e.borrowedBookList.find(f => f.title.toLowerCase() === bookTitle.toLowerCase())
//         )//szukam rezerwacji na tego usera i ksiazke

//         if (findBookingIndex === -1) return console.log('booking doesn\'t exist');

//         this.bookingsList[findBookingIndex].returnBook(bookTitle)//metodą classy Booking usuwam z listy pozyczonych i naliczam oplate

//         this.userList.splice(this.userList.findIndex(e => e.name.toLowerCase() === userName.toLowerCase() && e.lastName.toLowerCase() === userLastName.toLowerCase()), 1) //usuwam usera z listy userow

//         this.availableBookList.push(this.allLibraryBookList[this.findBookIndex(bookTitle, this.allLibraryBookList)])//dodaje oddana ksiazke do listy dostepnych

//         this.bookingsList.splice(findBookingIndex, 1)
//     }
// }

// const biblioteka = new Library();

// biblioteka.addBookToLibrary(book1)
// biblioteka.addBookToLibrary(book2)
// biblioteka.addBookToLibrary(book3)

// biblioteka.makeBooking('Marek', 'Janicki', 'marysieńka');
// biblioteka.makeBooking('Janusz', 'Wunderbaumer', 'potop');


// biblioteka.returnBooking('janUsz', 'wUnDerbaumer', 'potop')

// console.log(biblioteka.allLibraryBookList)



/* Usuniecie ksiazki z listy pozyczonych. Nie jest konieczn skoro usuwam cala rezerwacje. Ale zastapione takim samym dzialaniem z metody klasy Booking

const bookIndex = this.bookingsList[findBookingIndex].borrowedBookList.findIndex(e => e.title.toLowerCase() === bookTitle.toLowerCase());
//usuwam oddana ksiazke z listy pozyczonych w tej rezerwacji. Czy to konieczne skoro i tak usuwam cala rezerwacje?
this.bookingsList[findBookingIndex].borrowedBookList.splice(bookIndex, 1)
*/






















// const date1 = new Date();
// const roznica = 7 * 24 * 60 * 60 * 1000;

// const diff = new Date(date1.getTime() + roznica);




// const dzienWmilisecundach = 24 * 60 * 60 * 1000;

// const dataWYPOŻ = new Date();
// const dataLIMITmax = new Date(dataWYPOŻ.getTime() + (7 * dzienWmilisecundach))

// const bezspoznienia = dataWYPOŻ.getTime() + (6 * dzienWmilisecundach);
// const spozn1day = dataWYPOŻ.getTime() + (8 * dzienWmilisecundach);
// const spozn3day = dataWYPOŻ.getTime() + (10 * dzienWmilisecundach);

// const roznicaBEZspoznienia = dataLIMITmax - bezspoznienia;
// const roznicaZspoznieniem1 = dataLIMITmax - spozn3day;
// console.log(roznicaBEZspoznienia / (1000 * 60 * 60 * 24))
// console.log(roznicaZspoznieniem1 / (1000 * 60 * 60 * 24))
