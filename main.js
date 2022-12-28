const card = document.getElementsByClassName('card');
const addBTN = document.getElementsByClassName("btn-success");
const cardBTN = document.querySelector('.btn-cart');
const cardList = document.querySelector('.shopping-cart-list')

class Shopping {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.image = image;
    }
}

class UI {
    addToCart(shopping) {
        const listItem = document.createElement('div');
        listItem.classList = "list-item";

        listItem.innerHTML =
            `
        <div class="row aling-items-center text-white-50">
            <div class="col-md-3">
                <img src="${shopping.image}" alt="xbox" class="img-fluid">
            </div>
        <div class="col-md-5">
            <div class="title">${shopping.title}</div>
        </div>
        <div class="col-md-2">
            <div class="price">
                ${shopping.price}
            </div>
        </div>
        <div class="col-md-2">
                <button type="button" class="btn btn-delete">
                    <i class="fas fa-trash-alt text-danger"></i>
                </button>
            </div>
        </div>
        `
        cardList.appendChild(listItem);
    };

    removeCart() {
        let removeBTN = document.getElementsByClassName('btn-delete');
        let self = this;
        for (let i = 0; i < removeBTN.length; i++) {
            removeBTN[i].addEventListener('click', function () {
                this.parentElement.parentElement.parentElement.remove();
                // ? Sepetten silme işlemi yapılınca count değerini düşürüyor.
                self.cartCount();
                // ? Sepetten silme işlemi yapılınca count değerini düşürüyor.
            })
        }
    };

    cartCount() {
        let cardListItem = cardList.getElementsByClassName('list-item');
        let itemCount = document.getElementById('item-count');
        itemCount.innerHTML = cardListItem.length;
    };

    cardToggle() {
        cardBTN.addEventListener('click', function () {
            cardList.classList.toggle('d-none');
        })
    }
}

// ? Burası tıklanan butona göre card içeriğindeki title,price,image değerlerini getiriyor.
for (let i = 0; i < card.length; i++) {
    addBTN[i].addEventListener('click', function (event) {
        let title = card[i].getElementsByClassName('card-title')[0].textContent;
        // console.log(title)

        let price = card[i].getElementsByClassName('price')[0].textContent;
        // console.log(price)

        let image = card[i].getElementsByClassName('card-img-top')[0].src;
        // console.log(image);

        // ? Butonlara tek sefer tıklanabilir hale getiriyor. Böylelikle birden fazla ekleme durumu ortadan kalkmış oluyor.
        addBTN[i].classList.add("disabled");
        addBTN[i].textContent = "In Card";
        // ? Butonlara tek sefer tıklanabilir hale getiriyor. Böylelikle birden fazla ekleme durumu ortadan kalkmış oluyor.

        let shopping = new Shopping(title, price, image);
        // ? burası shopping değikenini class UI'ye gönderiyor.
        let ui = new UI();
        ui.addToCart(shopping);
        // ? burası shopping değikenini class UI'ye gönderiyor.

        // ? Silme işleminin çalışması için gerekli.
        ui.removeCart();
        // ? Silme işleminin çalışması için gerekli.

        // ? Sepete eklenen ürün sayısı için gerekli.
        ui.cartCount();
        // ? Sepete eklenen ürün sayısı için gerekli.

        event.preventDefault();
    })
}
// ? Burası tıklanan butona göre card içeriğindeki title,price,image değerlerini getiriyor.

// ? Toggle işlemi için gerekli. DOM yüklendiğinde çalışacak.
document.addEventListener("DOMContentLoaded", () => {
    let ui = new UI();
    ui.cardToggle();
})
// ? Toggle işlemi için gerekli. DOM yüklendiğinde çalışacak.