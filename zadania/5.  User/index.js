/*Cele główne
1.Stwórz 2 klasy: User i App
2. Klasa User ma dostępne dwa poziomy dostępu: normal i admin.
3. Powinna umożliwiać zmianę hasła, emaila oraz poziomu dostępu.
 User z poziomem dostępu = "admin" może zmieniać hasła, emaile oraz poziomy dostępu innych użytkowników.
 Klasa App powinna zarządzać relacjami pomiędzy użytkownikami.
 Zawiera listę użytkowników, pozwala tworzyć nowych użytkowników o różnych poziomach dostępu.
Cele opcjonalne do wykonania
 Stwórz klase pomocniczną Validator, która będzie posiadała metody statyczne odpowiedzalne za walidacje usera.Jeżeli któraś z walidacji się nie powiedzie, instancja ma nie być tworzona, tylko ma zwracać error z odpowiednim komunikatem o niepowiedzionej walidacji.W razie problemów przy tworzeniu klasy validator, polecam zapoznać się z dokumentacja biblioteki is.js.

 / Podczas walidacji upewnij się, że:
// - email jest poprawnym emailem
// - hasło ma mieć min 8 znaków, co najmniej jedną wielką literę i co najmniej jedną cyfrę oraz co najmniej 1 znak specjalny
// - płeć musi być ze zbioru [male, female]
// - data (nieważne jaka wejdzie) do konstruktora musi wejść w formacie MM/DD/YYYY 2023/04/13
// - imię i lastName musi być niepuste

class User{
 imię
 lastName
 datę urodzenia
 hasło
 płeć
 adres email
 accessLevel dostępu = "user" | "admin";
}

class App{
 listOfUsers
 createUser(...)
 createAdmin(...)
 wszystkie metody w których admin ingeruje we właściwości innych użytkowników
}
*/

class Validator {
    static isNameValid(name) {
        return (/^.+$/i.test(name))
    }

    static isEmailValid(email) {
        return (/^[a-z\d]+[-\w\.]*@[a-z\d]+([-\w]+\.)[a-z]{2,6}$/i.test(email));
    }

    static isSexValid(sex) {
        return (sex === 'male' || sex === 'female')
    }

    static isPasswordValid(password) {
        return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/.test(password));
    }

    static isAccessLevelValid(accessLevel) {
        return (accessLevel === 'admin' || accessLevel === 'user');
    }

    static isBirthDateValid(birthDate) {
        return (/^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/([0-9]{2}?[0-9]{2})$/.test(birthDate));
    }
}

class User {
    constructor(name, lastName, birthDate, password, sex, email, accessLevel) {

        if (!Validator.isNameValid(name)) throw new Error('niewlasciwe name');
        if (!Validator.isNameValid(lastName)) throw new Error('niewlascie lastName');
        if (!Validator.isEmailValid(email)) throw new Error('niewlasciwy email');
        if (!Validator.isSexValid(sex)) throw new Error('niewlasciwa sex');
        if (!Validator.isPasswordValid(password)) throw new Error('niewlasciwe password');
        if (!Validator.isAccessLevelValid(accessLevel)) throw new Error('niewlasciwy poziom')
        if (!Validator.isBirthDateValid(birthDate)) throw new Error('zla data uro');

        this.name = name;
        this.lastName = lastName;
        this.birthDate = this.formatBirthDate(birthDate);
        this.password = password;
        this.sex = sex;
        this.email = email;
        this.accessLevel = accessLevel;
    }
    
    formatBirthDate(birthDate) {

        const regex = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/[0-9]{2}?([0-9]{2})$/;

        const birthDateInNewFormat = birthDate.replace(regex, "$1/$2/$3")

        return birthDateInNewFormat;

    }

    setPassword(newPassword) {
        if (!Validator.isPasswordValid(newPassword)) throw new Error('niewlasciwe password');
        return this.password = newPassword;
    }

    setEmail(newEmail) {
        if (!Validator.isEmailValid(newEmail)) throw new Error('niewlasciwy email');
        return this.email = newEmail;
    }

    setAccessLevel(newAccessLevel) {
        if (!Validator.isAccessLevelValid(newAccessLevel)) throw new Error('niewlasciwy poziom')
        return this.accessLevel = newAccessLevel;
    }
}







class App {
    listOfUsers = [];

    createUser(name, lastName, birthDate, password, sex, email) {

        try {
            const userInstance = new User(name, lastName, birthDate, password, sex, email, 'user');
            this.listOfUsers.push(userInstance)
        } catch (error) {
            console.log(error)
            return
        }
    }

    createAdmin(name, lastName, birthDate, password, sex, email) {

        try {
            const userInstance = new User(name, lastName, birthDate, password, sex, email, "admin");
            this.listOfUsers.push(userInstance)
        } catch (error) {
            console.log(error)
            return
        }
    }

    findUserOrAdminIndex(email) {
        return this.listOfUsers.findIndex(e => e.email.toLowerCase() === email.toLowerCase());
    };

    checkAccessLevel(email) {
        const indexUser = this.findUserOrAdminIndex(email);

        if (indexUser === -1) return -1; //nie ma takiego usera/admina

        if (this.listOfUsers[indexUser].accessLevel === 'user') return -1;//nie masz uprawnien do zmiany

        return indexUser;
    }

    setPassword(adminEmail, userEmail, newPassword) {
        try {

            if (this.checkAccessLevel(adminEmail) === -1) return;//brak tego usera/uprawnien

            if (this.findUserOrAdminIndex(userEmail) === -1) return;

            this.listOfUsers[this.findUserOrAdminIndex(userEmail)].setPassword(newPassword);
        } catch (error) {
            console.log(error)
            return;
        }
    }

    setEmail(adminEmail, userEmail, newEmail) {

        try {
            if (this.checkAccessLevel(adminEmail) === -1) return;

            if (this.findUserOrAdminIndex(userEmail) === -1) return;
            this.listOfUsers[this.findUserOrAdminIndex(userEmail)].setEmail(newEmail);
        } catch (error) {
            console.log(error)
            return;
        }
        // if (this.checkAccessLevel(adminEmail) === -1) return;
        // if (this.findUserOrAdminIndex(userEmail) === -1) return;
        // this.listOfUsers[this.findUserOrAdminIndex(userEmail)].setEmail(newEmail);
    }

    setAccessLevel(adminEmail, userEmail, newAccessLevel) {

        try {

            if (this.checkAccessLevel(adminEmail) === -1) return;

            if (this.findUserOrAdminIndex(userEmail) === -1) return;

            this.listOfUsers[this.findUserOrAdminIndex(userEmail)].setAccessLevel(newAccessLevel);
        } catch (error) {
            console.log(error)
            return
        }
    }
}
const myApp = new App();

myApp.createAdmin('Jan', 'Jaki', '12/13/2000', 'a!Dja4@#', 'male', 'aaa@op.pl')
myApp.createUser('Ula', 'Pakos', '10/21/2012', 'Arsadiu&', 'male', 'p@op.pl')
myApp.createUser('Ola', 'Bala', '10/5/1999', 'Jaia*&%fd', 'male', 'xxx@op.pl')


console.log(...myApp.listOfUsers)




// Pytania:
// 1. Co nam daje w setEmail ze zrobimy try i catch, jesli konsola drukuje dokladnie to samo w obu przypadkach? Nie zatrzyma dalszej funkcji czy co? Wykonuje dalej wszystko co jest po try/catch. W tym przypadku jest to tylko return, ale jakbym wpisal wiecej to wszystko by sie dzialo:)

/* 2. W klasie app, w metodach setPassword, setEmail , setAcc.. zamiast robic w tryu np.
 this.listOfUsers[this.findUserOrAdminIndex(userEmail)].Password === newPassword  robię
this.listOfUsers[this.findUserOrAdminIndex(userEmail)].setPassword(newPassword)  czyli uzywam metod z classy User, po to by uzyc jej wszystkie mechanizmy (np. z walidacja itd). Na pierwszy rzut oka wydaje sie uzycie wlasnej metody ale to tylko zbieznosc nazw metod w obu classach.

*/

const test = is.date(new Date())

//co to za biblioteka is.js podana w linkach?