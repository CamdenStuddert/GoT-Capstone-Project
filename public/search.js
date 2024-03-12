const getAllBtn = document.getElementById(`getAllBtn`)
const searchBar = document.getElementById(`searchBar`)
const characterList = document.getElementById(`characterList`)
const searchForm = document.getElementById('searchBarForm')
// const favBtn = document.getElementById('favBtn')
const favList = document.getElementById(`favList`)

const enterSearch = e => {
    e.preventDefault()

    if (searchBar.value < 1){
        alert ('You must enter a characters name')
        return
    }

    let easySearch = searchBar.value.toLowerCase()
    axios.get(`http://localhost:4000/characters/?text=${easySearch}`)
    .then(res => {
        characterList.innerHTML = ""

        res.data.forEach(ele => {
            let characterCard = document.createElement(`div`)
            characterCard.setAttribute(`id`, `${ele.name}`)
            characterCard.setAttribute(`class`, `character-card`)
            
            characterCard.innerHTML = 
                `<h2>${ele.name}</h2>
                <img src="${ele.image}" class="charImage" alt="Char Image"/>
                <div id="bottomOfCharCard">
                <h3>Titles: ${ele.titles}</h3>
                <h3>Aliases: ${ele.aliases}</h3>
                <h3>House Loyalty: ${ele.house}</h3>
                <p class="charId" id="${ele.character_id}charId">${ele.character_id}</p>
                <button class="waxSeal" id="${ele.character_id}favBtn">Fav</button>
                </div>`;
            characterList.appendChild(characterCard)
            const numberId = document.getElementById(`${ele.character_id}charId`).textContent
            const favBtn = document.getElementById(`${ele.character_id}favBtn`)
            favBtn.addEventListener('click', () => addToFavorites(numberId))
        })
    })
}

searchForm.addEventListener('submit', enterSearch)

const addToFavorites = (num) => {
    let numberId = +num
    const body = {
        character_id: numberId
    }
    axios.post(`http://localhost:4000/characters/${numberId}`, body)
    .then(() => alert(`Added to Favorites!`))
}
