// EVENTO SCROLL NAVBAR
let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        navbar.classList.add("nav-scrolled")
    } else {
        navbar.classList.remove("nav-scrolled")
    }
})

fetch("./catalogo.json").then((response) => response.json()).then((data) => {

    // CONTENITORE CARDS
    let articlesWrapper = document.querySelector("#articlesWrapper")

    function createCards(array) {
        articlesWrapper.innerHTML = ""
        array.forEach((articolo, i) => {
            let col = document.createElement("div");
            col.classList.add("col-11", "col-md-4", "col-lg-4", "mb-3")
            col.innerHTML = `
                                <div class="cardArticles h-100">
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
            articlesWrapper.appendChild(col)

        });
    }
    createCards(data)

    
    //Categorie
    let radioWrapper = document.querySelector("#radioWrapper")

    function setCategories() {
        let categories = data.map((el) => el.categoria)
        let uniqueCategories = [];
        categories.forEach((category) => {
            if (uniqueCategories.includes(category) == false) {
                uniqueCategories.push(category)
            }
        })

        uniqueCategories.sort().forEach((categoria) => {
            let div = document.createElement("div")
            div.classList.add("form-check")
            div.innerHTML = `
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${categoria}">
                                <label class="form-check-label" for="flexRadioDefault1">
                                ${categoria}
                                </label>
                            `
            radioWrapper.appendChild(div)
        })
    }
    setCategories()


    // FILTRO PER CATEGORIA

    let checksInput = document.querySelectorAll(".form-check-input")


    function filterByCategory() {
        let radiosBtn = Array.from(checksInput)
        let checked = radiosBtn.find((el) => el.checked)
        if (checked.id == "All") {
            createCards(data)
        } else {
            let filtered = data.filter((el) => el.categoria == checked.id)
            createCards(filtered)
        }
    }

    //Click bottone categorie
    checksInput.forEach((input) => {
        input.addEventListener("click", () => {
            filterByCategory()
        })
    })


    // Assegnazione range minimo e massimo del prezzo
    let inputPrice = document.querySelector("#inputPrice")
    let currentValue = document.querySelector("#currentValue")


    function findMaxAndMinPrice() {
        let prices = data.map((articolo) => articolo.prezzo)
        let max = Math.max(...prices)
        let min = Math.min(...prices)
        inputPrice.max = max
        inputPrice.min = min
        inputPrice.value = max
        currentValue.innerHTML = max
    }
    findMaxAndMinPrice()


    //Filtro per prezzo
    function filterByPrice() {
        let filtered = data.filter((el) => el.prezzo <= inputPrice.value)
        createCards(filtered)
    }

    inputPrice.addEventListener("input", () => {
        currentValue.innerHTML = inputPrice.value
        filterByPrice()
    })


    //Filtro per parola
    let inputWord = document.querySelector("#inputWord")

    function filterByWord() {
        let filtered = data.filter((el) => el.nome.toLowerCase().includes(inputWord.value.toLowerCase()))
        createCards(filtered)

    }

    inputWord.addEventListener("input", () => {
        filterByWord()
    })

})