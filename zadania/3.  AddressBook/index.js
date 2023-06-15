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

const man1 = new Contact('Marek', "Nowak", 'm.nowak@op.pl');
const man2 = new Contact('Franciszek', 'Kowalski', 'francesco44@wp.pl');
const man3 = new Contact('Janina', 'Hampel', 'ruda_janka@tlen.pl');
const man4 = new Contact('Bogdan', 'Baraniak', 'baran11@yahoo.com');
const man5 = new Contact('Maja', 'Bogucka', 'majeczka111@gmail.com')








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
        (this.contactList.find(e => e.uuid === contact.uuid) !== undefined) ? true : false;
    }
}

const group1 = new Group('Praca');
const group2 = new Group('Rodzina');

group1.addContact(man1)
group1.addContact(man2)
group1.addContact(man3)
group1.addContact(man4)

group1.removeContact('Janina', 'Hampel')







class AddressBook {
    contact = []
    groups = []

    constructor(/*parametry...*/) {
        this.contactList = Contact.contactInstances;
        this.groupList = Group.groupInstances;
    }

    // addContact(parems => {
    //     const contactInstanc = new Contact(arge)
    //     this.contacts.push(contactInstanc)
    // })

getContact(phrase) {

    return this.contactList.filter(e => {
        if (Object.values(e).toString().includes(phrase)) return true;

        return false;

    });
}
}

const book1 = new AddressBook();
//console.log(book1.contactList)
const jac = book1.getContact('Maja');
console.log(jac)




//Pytania?
// New Date() sie na biezaco aktualizuje, czy tak to powinno dzialac ?