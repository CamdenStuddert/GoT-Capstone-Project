const favList = document.getElementById(`favList`)

const displayFavs = () => {
    favList.innerHTML = ''
    axios.get(`http://localhost:4000/characters/favs`)
    .then(res => {
        res.data.forEach(ele => {
            let characterCard = document.createElement(`div`)
            characterCard.setAttribute(`id`, `${ele.name}`)
            characterCard.setAttribute(`class`, `character-card`)
            
            characterCard.innerHTML = 
            `
                <h2>${ele.name}</h2>
                <img class="charImage" src="${ele.image}" alt="Char Image"/>
                <div id="bottomOfCharCard">
                <h3>Titles: ${ele.titles}</h3>
                <h3>Aliases: ${ele.aliases}</h3>
                <h3>House: ${ele.house}</h3>
                <p class="charId" id="${ele.character_id}charId">${ele.character_id}</p>
                <button class="waxSeal" id="${ele.character_id}favBtn">Unfav</button>
                </div>`;
                favList.appendChild(characterCard)
                const unfavBtn = document.getElementById(`${ele.character_id}favBtn`)
                const numberId = document.getElementById(`${ele.character_id}charId`).textContent
                unfavBtn.addEventListener('click', () => unFavorite(numberId))
        })
    })
}

document.addEventListener('DOMContentLoaded', displayFavs);

const unFavorite = (num) => {
    let numberId = +num
    const body = {
        character_id: numberId
    }
    axios.delete(`http://localhost:4000/characters/favs/${numberId}`)
    .then(() => alert(`Unfavorited Character`), location.reload())
}


