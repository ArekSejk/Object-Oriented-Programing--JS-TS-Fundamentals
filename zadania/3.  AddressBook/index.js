class Contact {

    constructor(name, lastName, email) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.modificationDate = new Date();
        this.uuid = Math.floor(Math.random() * 1000000000);
    }

    setName(newName) {
        this.name = newName;
        this.modificationDate = new Date();
    }

    setLastName(newLastName) {
        this.lastName = newLastName;
        this.modificationDate = new Date();
    }

    setEmail(newEmail) {
        this.email = newEmail;
        this.modificationDate = new Date();
    }
}




class Group {
    contactList = [];

    constructor(name) {
        this.name = name;
        this.uuid = Math.floor(Math.random() * 1000000000);
    }

    setName(newName) {
        this.name = newName;
    }

    addContact(contact) {
        this.contactList.push(contact);
    }

    removeContact(contactName, contactLastName) {
        const indexToRemove = this.contactList.findIndex(e => e.name === contactName && e.lastName === contactLastName);

        if (indexToRemove !== -1) this.contactList.splice(indexToRemove, 1);
    }

    isInGroup(contact) {
        if (this.contactList.find(e => e.uuid === contact.uuid) !== undefined) return true;

        return false;
    }
}





class AddressBook {
    contacts = [];
    groups = [];

    createContact(name, lastName, email) {
        if (!(/^[a-z]{2,}$/i.test(name))) return 'zla wartosc name';
        if (!(/^[a-z]{2,}$/i.test(lastName))) return 'zla wartosc lastName';
        if (!/^[a-z\d]+[-\w\.]*@[a-z\d]+([-\w]+\.)[a-z]{2,6}$/i.test(email)) return 'zla wartosc email';

        const contactInstance = new Contact(name, lastName, email);
        this.contacts.push(contactInstance);
    }

    deleteContact(contactName, contactLastName) {
        if (!(/^[a-z]{2,}$/i.test(contactName))) return 'zla wartosc name';
        if (!(/^[a-z]{2,}$/i.test(contactLastName))) return 'zla wartosc lastName';
        const contactIndexToRemove = this.contacts.findIndex(e => e.name === contactName && e.lastName === contactLastName);

        if (contactIndexToRemove === -1) return 'Nie ma takiego kontaktu';

        this.contacts.splice(contactIndexToRemove, 1);


        const groupIndex = this.groups.findIndex(e => e.contactList.find(e => e.name === contactName && e.lastName === contactLastName));

        if (groupIndex === -1) return;

        const groupName = this.groups[groupIndex].name;

        return this.deleteContactFromGroup(contactName, contactLastName, groupName);
    }

    createGroup(name) {
        if (!(/^.{3,}$/i.test(name))) return 'zla wartosc name';

        const groupInstance = new Group(name);
        this.groups.push(groupInstance)
    }

    deleteGroup(name) {
        if (!(/^.{3,}$/i.test(name))) return 'zla wartosc name';

        const groupIndexToRemove = this.groups.findIndex(e => e.name === name);

        if (groupIndexToRemove === -1) return 'nie ma takiej grupy';

        this.groups.splice(groupIndexToRemove, 1);
    }

    addContactToGroup(contactName, contactLastName, groupName) {
        if (!(/^[a-z]{2,}$/i.test(contactName))) return 'zla wartosc name';
        if (!(/^[a-z]{2,}$/i.test(contactLastName))) return 'zla wartosc lastName';
        if (!(/^.{3,}$/i.test(groupName))) return 'zla wartosc name';

        const contactIndex = this.contacts.findIndex(e => e.name === contactName && e.lastName === contactLastName);
        if (contactIndex === -1) return 'Nie ma takiego kontaktu';

        const groupIndex = this.groups.findIndex(e => e.name === groupName);
        if (groupIndex === -1) return 'Nie ma takiej grupy';

        this.groups[groupIndex].contactList.push(this.contacts[contactIndex]);
    }

    deleteContactFromGroup(contactName, contactLastName, groupName) {
        if (!(/^[a-z]{2,}$/i.test(contactName))) return 'zla wartosc name';
        if (!(/^[a-z]{2,}$/i.test(contactLastName))) return 'zla wartosc lastName';
        if (!(/^.{3,}$/i.test(groupName))) return 'zla wartosc name';

        const groupIndex = this.groups.findIndex(e => e.name === groupName);
        if (groupIndex === -1) return 'Nie ma takiej grupy';

        const contactIndex = this.groups[groupIndex].contactList.findIndex(e => e.name === contactName && e.lastName === contactLastName);
        if (contactIndex === -1) return 'Nie ma takiego kontaktu w tej grupie';

        this.groups[groupIndex].contactList.splice(contactIndex, 1);
    }

    findContact(phrase) {

        return this.contacts.filter(e => {
            if (Object.values(e).toString().toLowerCase().includes(phrase.toLowerCase())) return true;

            return false;
        });
    }

    changeContactName(currName, currLastName, newName, newLastName) {
        if (!(/^[a-z]{2,}$/i.test(currName))) return 'zla wartosc name';
        if (!(/^[a-z]{2,}$/i.test(currLastName))) return 'zla wartosc lastName';

        if (!(/^[a-z]{2,}$/i.test(newName))) return 'zla wartosc name';
        if (!(/^[a-z]{2,}$/i.test(newLastName))) return 'zla wartosc lastName';

        const indexContactToChange = this.contacts.findIndex(e => e.name === currName && e.lastName === currLastName);

        this.contacts[indexContactToChange].name = newName;
        this.contacts[indexContactToChange].lastName = newLastName;
    }
    //przy zmianie wlasciwosci contactu, jego wlasciw. w grupie tez z auto sie zmienia

    changeContactEmail(contactName, newEmail) {
        if (!/^[a-z\d]+[-\w\.]*@[a-z\d]+([-\w]+\.)[a-z]{2,6}$/i.test(newEmail)) return 'zla wartosc email';

        this.contacts[this.contacts.findIndex(e => e.name === contactName)].email = newEmail; //tu data modyfikacji nie ulegla zmianie a ponizej owszem!!!
    }

    //lub z uzyciem metody setEmail() z classy Contact.....

    //  this.contacts[this.contacts.findIndex(e => e.name === contactName)].setEmail(newEmail);


    changeGroupName(currName, newName) {
        if (!(/^.{3,}$/i.test(currName))) return 'zla wartosc name';
        if (!(/^.{3,}$/i.test(newName))) return 'zla wartosc name';

        this.groups[this.groups.findIndex(e => e.name === currName)].name = newName;
    }

    //czy z .setName() z classy Groups....

    // changeGroupName2(currName, newName) {
    //     this.groups[this.groups.findIndex(e => e.name === currName)].setName(newName)
    // }

}

const book1 = new AddressBook();

book1.createContact('Angelika', 'Berkowska', 'angee@gmail.com');
book1.createContact('Marek', "Nowak", 'm.nowak@op.pl');
book1.createContact('Franciszek', 'Kowalski', 'francesco44@wp.pl');
book1.createContact('Janina', 'Hampel', 'ruda_janka@tlen.pl');
book1.createContact('Bogdan', 'Baraniak', 'baran11@yahoo.com');
book1.createContact('Maja', 'Bogucka', 'majeczka111@gmail.com')

book1.createGroup('pierwsza');
book1.createGroup('druga');
book1.createGroup('trzecia');

book1.addContactToGroup('Angelika', 'Berkowska', 'pierwsza');
book1.addContactToGroup('Marek', "Nowak", 'pierwsza');
book1.addContactToGroup('Franciszek', 'Kowalski', 'druga');
book1.addContactToGroup('Janina', 'Hampel', 'trzecia');
book1.addContactToGroup('Bogdan', 'Baraniak', 'trzecia');
book1.addContactToGroup('Maja', 'Bogucka', 'druga')

book1.deleteContact('Marek', 'Nowak')

book1.changeContactName('Janina', 'Hampel', 'Madona', 'Morales Gonzzales')
book1.changeGroupName('pierwsza', 'zmieniona Nazwa Na Fajną')





//Pytania?
// 1. Bez constructora w addressbook?

// 2. W jaki sposob przeprowadzac modyfikacje? korzystac z funkcji podrzednych?Np. zmiana nazwy grupy book1.groups[0].setName('nowaNazwa') gdzie setName to metoda z classy Group.

//Jesli pisac wszystko od nowa w kazdej klasie, to jaki jest do konca sens pisac te wszystkie metody w dwoch miejscach?!

//3. classa ponoc ma sie zajmowac 1 odpowiedzuialnoscia. ja mam giganta!

//4. Czy regexpa moge zapisac jako zmienna wlasna classy czy tak nie powinno sie robic?


//5. Czy jest sens robic w walidacje w metodach, ktore modyfikuja ale juz zwalidowane podczas tworzenia obiekty?