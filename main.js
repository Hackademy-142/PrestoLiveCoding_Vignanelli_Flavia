// EVENTO SCROLL NAVBAR
let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})

// NUMERI 
let numUsers = document.querySelector("#numUsers")
let numPlants = document.querySelector("#numPlants")
let numComments = document.querySelector("#numComments")

function createInterval(elementId, finalNumber, frequency) {
    let counter = 0

    let intervallo = setInterval(() => {
        if (counter < finalNumber) {
            counter++
            elementId.innerHTML = counter;
        } else {
            clearInterval(intervallo)
        }
    }, frequency);
}

let isIntersected = false;

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && isIntersected == false) {

            createInterval(numUsers, 300, 10)
            createInterval(numPlants, 600, 5)
            createInterval(numComments, 100, 30)
            isIntersected = true;
            setTimeout(() => {
                isIntersected = false;
            }, 10000);
        }
    })
})

intersectionObserver.observe(numUsers)

// CATEGORIE PIANTE
const categories = [
    { name: "Piante Fiorite", description: "Raccolti di fiori: una sinfonia di colori e profumi per un giardino che incanterà i tuoi sensi.", img: "./media/cards/1.png" },

    { name: "Piante Succulente", description: "Scopri la bellezza delle succulente: un'armonia di forme e colori per ogni spazio verde.", img: "./media/cards/2.png" },

    { name: "Piante Aromatiche", description: "Esplora i profumi delle piante aromatiche: un'esplosione di gusto per il tuo giardino e la tua cucina.", img: "./media/cards/3.png" },

    { name: "Piante Tropicali", description: "Immergiti nel fascino tropicale: un'esperienza esotica di colori e vitalità per il tuo ambiente.", img: "./media/cards/4.png" },
];

let contenitoreCard = document.querySelector("#cardsWrapper")

function creaCard() {
    let tempo = 100;

    categories.forEach((el) => {
        let col = document.createElement("div");
        col.classList.add("col-12", "col-md-6", "col-lg-3", "d-flex", "justify-content-center");
        col.innerHTML = `<div class="card text-center img mx-auto my-3 mx-md-3" data-aos="flip-left" data-aos-delay="${tempo}">
                        <img src="${el.img}" class="card-img-top" alt="...">
                        <div class="card-body ">
                        <h4 class="card-title py-2">${el.name}</h4>

                        <p class="card-text">${el.description}</p>


                        <a href="#" class="btn bottone">Scopri</a>
                        </div>
                        </div>
                        `
        contenitoreCard.appendChild(col);
        tempo = tempo + 300;
    })

}
creaCard()


// ULTIMI ARTICOLI
fetch("./main.json").then((response) => response.json()).then((data) => {

    // CONTENITORE CARDS
    let lastWrapper = document.querySelector("#lastWrapper")

    function createCards(array) {
        lastWrapper.innerHTML = ""
        array.forEach((articolo, i) => {
            if (i >= array.length - 6) {
                let col = document.createElement("div");
                col.classList.add("col-11", "col-md-4", "col-lg-4", "mb-3")
                col.innerHTML = `
                                <div class="cardArticles position-relative h-100">
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-2">
                                NEW
                                </span>
                                <div class="overflow-hidden">
                                    <img src="${articolo.img}" class="img-card card-img-top" alt="...">
                                </div>
                                <div class="card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <h4 class="card-title text-center text-truncate my-2">${articolo.nome}
                                        </h4>
                                        <p class="card-text mb-1">Categoria: <span class="fw-bold">${articolo.categoria}</span>
                                        </p>
                                        <p class="card-text mb-2">Prezzo: <span class="fw-bold">${articolo.prezzo}</span>€</p>
                                    </div>
                                    <div>
                                        <div class="d-flex justify-content-between">
                                            <i class="bi bi-heart fs-5 tx-purple"></i>
                                            <a href="#" class="text-decoration-none text-reset bottonePiccolo">Aggiungi
                                                al Carrello</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                lastWrapper.appendChild(col)
            }
        });
    }
    createCards(data)
})
