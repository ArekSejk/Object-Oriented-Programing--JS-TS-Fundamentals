
class Contact {

    constructor(name, lastName, email) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.modificationDate = new Date();
        this.uuid = Math.floor(Math.random() * 1000000000);
    }
}
const newPerson = new Contact('Arek', "szambelan", 'asss@open.pl');
console.log(newPerson)

class Group {
    contactList = [];

    constructor(name) {
        this.name = name;
        this.uuid = Math.floor(Math.random() * 1000000000);
    }
}