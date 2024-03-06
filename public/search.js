const getAllBtn = document.getElementById(`getAllBtn`)
const searchBar = document.getElementById(`searchBar`)
const characterList = document.getElementById(`characterList`)
const searchForm = document.getElementById('searchBarForm')
// const favBtn = document.getElementById('favBtn')
const favList = document.getElementById(`favList`)

const enterSearch = e => {
    e.preventDefault()
    characterList.innerHTML = ''

    if (searchBar.value < 1){
        alert ('You must enter a characters name')
        return
    }

    let easySearch = searchBar.value.toLowerCase()
    axios.get(`http://localhost:4000/characters/?text=${easySearch}`)
    .then(res => {
        res.data.forEach(elem => {
            let characterCard = `<div class="character-card" id="${elem.name}">
                <h2>${elem.name}</h2>
                <img src="${elem.image}" alt="Char Image"/>
                <h3>Titles: ${elem.titles}</h3>
                <h3>Aliases: ${elem.aliases}</h3>
                <h3>House Loyalty: ${elem.house}</h3>
                <button id="favBtn">Favorite Character</button>
                </div>`;
                let ElementId = elem.character_id
                characterList.innerHTML += characterCard
                const favBtn = document.getElementById('favBtn')
                favBtn.addEventListener('click', addToFavorites(ElementId))
        })
    })
}

searchForm.addEventListener('submit', enterSearch)

const addToFavorites = id => {
    let numberId = +id
    const body = {
        character_id: id
    }
    axios.put(`http://localhost:4000/characters/${numberId}`, body)
    .then(() => alert(`Added to Favorites!`))
}
