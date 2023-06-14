/*Cele główne
1.Stwórz strukturę danych związaną ze sklepem int.,(pełen opis się w kodzie niżej).
2. Wypracuj obiekt charakteryzujący przedmiot.
3. Wypracuj obiekt charakteryzujący koszyk.

class CartItem {
    // Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, uuid
    // Ma umożliwiać: 
    // - określać jego rabat procentowy
    // - dodawać produkt do kategorii
    // - zmianę nazwy, ceny lub rabatu
}

class Cart {
    // Ma mieć: uuid, listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
    // Ma umożliwiać: 
    // - dodawanie/usuwanie przedmiotów do/z koszyka
    // - zmianę ilości produktu w koszyku
    // - podliczać wartość koszyka uwzględniajac rabaty
}*/

/////////////////////////////////////////////////////////////////////////

class Item {
    category = '';
    discountValue = 0;
    discountedPrice = 0;

    constructor(name, price) {
        this.name = (typeof name === 'string') ? name : console.error('Zly typ name!');
        this.price = (typeof price === 'number') ? price : console.error('Zly format price');
        this.uuid = Math.floor(Math.random() * 1000000000000)
    }

    changeName(newName) {
        this.name = newName;
    }

    changePrice(newPrice) {
        this.price = newPrice;
    }

    setCategory(category) {
        this.category = category;
    }

    setProdDiscount(discountValue) {
        this.discountValue = discountValue;
        this.discountedPrice = this.price - discountValue;
    }
}
const przedmiot1 = new Item('Wiadro z kijem', 20);
const przedmiot2 = new Item('Doniczka', 15)
const przedmiot3 = new Item('Klocki LEGO', 99)
przedmiot1.setProdDiscount(2)
przedmiot2.setProdDiscount(3)
przedmiot3.setProdDiscount(9)



class Cart {
    selectedProdsList = []
    discountCodeValue = 0;
    cartDiscountValue = 0;

    constructor() {
        this.uuid = Math.floor(Math.random() * 1000000000000);
    }

    addProduct(product) {
        const indexToAdd = this.selectedProdsList.findIndex(e => e.prodInCart.uuid === product.uuid);

        if (indexToAdd !== -1) this.selectedProdsList[indexToAdd].quantity++;
        else this.selectedProdsList.push({ prodInCart: product, quantity: 1 });
    }

    removeProduct(product) {
        const indexToRemove = this.selectedProdsList.findIndex(e => e.prodInCart.uuid === product.uuid);

        if (indexToRemove !== -1) {
            if (this.selectedProdsList[indexToRemove].quantity === 1) this.selectedProdsList.splice(indexToRemove, 1);
            else this.selectedProdsList[indexToRemove].quantity--;
        }
    }

    changeQuantity(product, pcs) {
        const indexToChange = this.selectedProdsList.findIndex(e => e.prodInCart.uuid === product.uuid);

        if (indexToChange !== -1) this.selectedProdsList[indexToChange].quantity = pcs;
    }

    setDiscountCode(discountCodeValue) {
        this.discountCodeValue = discountCodeValue;
    }

    setCartDiscount(cartDiscountValue) {
        this.cartDiscountValue = cartDiscountValue;
    }

    countCartValue() {
        return ((this.selectedProdsList.map(e => e.quantity * e.prodInCart.discountedPrice).reduce((acc, prev) => acc + prev)) - (this.discountCodeValue + this.cartDiscountValue));
    }
}

const koszyk1 = new Cart()

koszyk1.addProduct(przedmiot1)
koszyk1.addProduct(przedmiot1)
koszyk1.addProduct(przedmiot1)
koszyk1.addProduct(przedmiot2)
koszyk1.addProduct(przedmiot2)
koszyk1.addProduct(przedmiot3)

koszyk1.setCartDiscount(25)
koszyk1.setDiscountCode(20)


console.log(koszyk1.selectedProdsList[0])
console.log(koszyk1.selectedProdsList[1])
console.log(koszyk1.selectedProdsList[2])

console.log(koszyk1.countCartValue())




// Jak się waliduje UUID zeby sie nie powtórzył?

// Jakie jest praktyczne zastosowanie met. statycznej in real life? Roznice ze zwykla met.

/* Jak robic deklaracje zmiennych w klasach.
 a)Jako wlasciwosc obiektu wspolna dla wszystkich - pisac bez let /const / this.
 b) dla konkretnej instancji pisac z this (w constructorze, ale nie tylko!)
 c) w funkcjach zmienne pomocnicze, np 'suma' juz const/let?*/

//wszystkie obliczenia robilem ze rabaty sa na konkretna wartosc w liczbie, a nie procentowe.

//walidacja w Item dla price i name jest taka pro forma. Dla reszty nie bylo sensu robic. Nalezy robic ale lepiej w typescripcie.