//nav
const hambureger = document.querySelector('.HeaderNav__iconHamburger');
const HeaderNav = document.querySelector('.HeaderNav__List');
hambureger.onclick = () => {
    HeaderNav.classList.toggle('HeaderNav__List_isVisable');
    hambureger.classList.toggle('open');
};
const NavLinks = document.querySelectorAll('.HeaderNav__List--link');
for (let i = 0, len = NavLinks.length; i < len; i++) {
    NavLinks[i].onclick = () => {
        HeaderNav.classList.toggle('HeaderNav__List_isVisable')
        hambureger.classList.toggle('open');
    }
}


class Hero {
    constructor(name, description, image, price, isAvaible) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.isAvaible = isAvaible;

    }
}


let id = 0;
class UI {
    static displayCharacters() {
        const characters = Store.getCharacters();
        characters.forEach((character) => UI.addCharacterToList(character));

    }
    static addCharacterToList(hero) {

        const heroBox = document.createElement('div');
        heroBox.id = id;
        hero.id = id;
        id++;
        heroBox.className = 'heroesList_hero';

        heroBox.addEventListener('click',
            (e) => {
                UI.modal(e.target.parentElement.id);
            });
        heroBox.innerHTML = `
        <img src="${hero.image}" alt="${hero.name}" class="heroesList_hero__HeroImage">
                <p class="heroesList_hero--Name">${hero.name}</p>
                <p class="Price">Cena wynajmu:${hero.price} zł/h</p>`;
        const list = document.querySelector('.heroesList');
        list.appendChild(heroBox);
    }

    static displayCart() {
        const products = Store.getCart();
        products.forEach((prodcut) => UI.addProductToCart(prodcut));
        Store.cartSummary();
    }

    static addProductToCart(hero) {
        const shoopingCart = document.querySelector('.basket__Products');
        const product = document.createElement('div');
        product.className = 'basket__Products_product';
        product.id = `cart-${hero.id}`;
        product.innerHTML = `
            <img src="${hero.image}" alt="${hero.name}" class="basket_product__ProductImage">
            <div class="basket_product__infoProduct">
                <span class="infoProduct_element infoProduct_element--ProductName">${hero.name}</span>
                <span class="infoProduct_element">${hero.description}</span>
                <button class="infoProduct_element buttonDelete"> Usuń z koszyka | x </button>
            </div> 
                    `;
        hero.isAvaible = false;
        shoopingCart.appendChild(product);
        const deleteButton = document.getElementsByClassName('infoProduct_element buttonDelete');
        deleteButton[deleteButton.length - 1].addEventListener('click', UI.deleteProdcut);

    }

    static deleteProdcut(e) {
        id = e.target.parentElement.parentElement.id;
        document.getElementById(id).remove();
        Store.deleteProduct(id);
    }

    static modal(id) {
        const modal = document.querySelector('.modal');
        const characters = Store.getCharacters();
        let hero = new Hero();
        characters.forEach((character) => {
            if (character.id == id) {
                hero = characters[id];
            };
        });
        const heroInMdal = document.createElement('div');
        heroInMdal.className = 'heroInModal';
        heroInMdal.innerHTML = `
        <img src="${hero.image}" alt="${hero.name}" class="heroInModal__image">
        <div class="heroInModal_info">
            <span class="heroInModal__name">I'M THE ${hero.name}!</span>
            <span class="heroInModal__description">${hero.description} </span>
            <span class="heroInModal__price">WYNAJEM: ${hero.price} ZŁ/H</span>
            <button class="heroInModal__add "> DODAJ DO KOSZYKA </button>              
            </div>
            <img src="images/exit.png" alt="exit" class="heroInModal__exit">     
                `;
        modal.appendChild(heroInMdal);
        const add = document.querySelector('.heroInModal__add');
        add.addEventListener('click', function () {
            const cart = Store.getCart();
            let exists = 0;
            cart.forEach((product) => {
                if (product.id == id) {
                    alert("HEROS JEST JUŻ W KOSZYKU!");
                    exists = 1;
                    return;
                };
            });
            if (exists == 0) {
                const shoopingCart = document.querySelector('.basket__Products');
                const product = document.createElement('div');
                product.className = 'basket__Products_product';
                product.id = `cart-${hero.id}`;
                product.innerHTML = `
                    <img src="${hero.image}" alt="${hero.name}" class="basket_product__ProductImage">
                    <div class="basket_product__infoProduct">
                        <span class="infoProduct_element infoProduct_element--ProductName">${hero.name}</span>
                        <span class="infoProduct_element">${hero.description}</span>
                        <button class="infoProduct_element buttonDelete"> Usuń z koszyka | x </button>
                    </div>    `;
                hero.isAvaible = false;
                shoopingCart.appendChild(product);
                Store.addProduct(hero);
                modal.classList.remove('active');
                modal.innerHTML = '';
                const deleteButton = document.getElementsByClassName('infoProduct_element buttonDelete');
                deleteButton[deleteButton.length - 1].addEventListener('click', UI.deleteProdcut);
            };
        });
        const exit = document.querySelector('.heroInModal__exit');
        exit.addEventListener('click', function () {
            modal.classList.remove('active');
            modal.innerHTML = '';
        });
        modal.classList.add('active');
    }
}


class Store {
    static getCharacters() {
        let characters;
        if (localStorage.getItem('characters') === null) {
            characters = [{
                    name: 'Superman',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    image: 'images/Superman.jpg',
                    price: '3500',
                    isAvaible: true,
                    id: 0,
                },
                {
                    name: 'Hulk',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    image: 'images/Hulk.jpg',
                    price: '25000',
                    isAvaible: true,
                    id: 1,
                },
                {
                    name: 'Thor',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    image: 'images/Thor.jpg',
                    price: '55000',
                    isAvaible: true,
                    id: 2,
                },
                {
                    name: 'Ironman',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    image: 'images/Ironman.jpeg',
                    price: '75000',
                    isAvaible: true,
                    id: 3,
                },
                {
                    name: 'Potter',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    image: 'images/Potter.jpg',
                    price: '125000',
                    isAvaible: true,
                    id: 4,
                },
                {
                    name: 'Batman',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    image: 'images/Batman.jpg',
                    price: '2000',
                    isAvaible: true,
                    id: 5,
                },
            ];
            localStorage.setItem('characters', JSON.stringify(characters));
        } else {
            characters = JSON.parse(localStorage.getItem('characters'));
        }
        return characters;
    }
    static addCharacter(character) {
            const characters = Store.getCharacters();
           characters.push(character);
        localStorage.setItem('characters', JSON.stringify(characters));
    }
    static getCart() {
        let cart;
        if (localStorage.getItem('cart') === null) {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        return cart;
    }
    static addProduct(product) {
        const cart = Store.getCart();
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        Store.cartSummary();
    }
    static deleteProduct(product) {
        id = id.substring(5)
        const cart = Store.getCart();
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart.splice(i, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        Store.cartSummary();
    }
    static cartSummary() {
        const cart = Store.getCart();
        let price = 0;
        cart.forEach((prodcut) => {
            price += parseInt(prodcut.price);
        });
        document.querySelector('.priceRed').textContent = `${price} zł`;

    }
}




document.addEventListener('DOMContentLoaded', UI.displayCharacters);
document.addEventListener('DOMContentLoaded', UI.displayCart);

document.querySelector('.AddHero__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.form__name').value;
    const image = document.querySelector('.form__image').value;
    const price = document.querySelector('.form__price').value;
    const description = document.querySelector('.form__description').value;
    if (isValidURL(image) != true) {
        alert("Niepoprawny adres URL zdjęcia");
    } else {
        const hero = new Hero(name, description, image, price, true)
        UI.addCharacterToList(hero);
        document.querySelector('.form__name').value = '';
        document.querySelector('.form__image').value = '';
        document.querySelector('.form__price').value = '';
        document.querySelector('.form__description').value = '';
        document.querySelector('.AddHero__buttonForm').textContent = 'DODANO!';
        setTimeout(function () {
            document.querySelector('.AddHero__buttonForm').textContent = 'Submit';
        }, 3000);
        Store.addCharacter(hero);
     
    }
});

function isValidURL(str) {
    const patt = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/g;
    return (patt.test(str));
}


document.querySelector('#dodaj').addEventListener('click', function () {
    document.querySelector('.AddHero').classList.remove('off');
    document.querySelector('.basket').classList.add('off');
    document.querySelector('.heroesList').classList.add('off');
});
document.querySelector('.HeaderNav__LogoHamburgerBox__linkLogo').addEventListener('click', function () {
    document.querySelector('.AddHero').classList.add('off');
    document.querySelector('.basket').classList.remove('off');
    document.querySelector('.heroesList').classList.remove('off');
});