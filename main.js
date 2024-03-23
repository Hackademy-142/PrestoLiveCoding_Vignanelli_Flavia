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

function createInterval(elementId, finalNumber, frequency){
    let counter = 0

    let intervallo = setInterval(() => {
        if(counter < finalNumber){
            counter++
            elementId.innerHTML = counter;
        } else {
            clearInterval(intervallo)
        }
    }, frequency);
}

let isIntersected = false;

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach( (entry)=>{
        if(entry.isIntersecting && isIntersected == false){
            
            createInterval(numUsers, 300, 10)
            createInterval(numPlants, 600, 5)
            createInterval(numComments, 100, 30)
            isIntersected = true;
            setTimeout(() => {
                isIntersected = false;
            }, 10000);
        }
    } )
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
        col.classList.add("col-12", "col-md-6", "col-lg-3");
        col.innerHTML = `<div class="card text-center img mx-auto my-3 mx-md-3" data-aos="flip-left" data-aos-delay="${tempo}">
                        <img src="${el.img}" class="card-img-top" alt="...">
                        <div class="card-body ">
                        <h4 class="card-title py-2">${el.name}</h4>

                        <p class="card-text">${el.description}</p>


                        <a href="#" class="btn bot">Scopri</a>
                        </div>
                        </div>
                        `
        contenitoreCard.appendChild(col);
    tempo = tempo + 300;
    })
    
}

creaCard()