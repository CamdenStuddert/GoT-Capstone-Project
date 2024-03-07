const favList = document.getElementById(`favList`)

const displayFavs = () => {
    favList.innerHTML = ''
    axios.get(`http://localhost:4000/characters/favs`)
    .then(res => {
        res.data.forEach(ele => {
            let characterCard = `<div class="character-card" id="${ele.name}">
                <h2>${ele.name}</h2>
                <img src="${ele.image}" alt="Char Image"/>
                <h3>Titles: ${ele.titles}</h3>
                <h3>Aliases: ${ele.aliases}</h3>
                <h3>House Loyalty: ${ele.house}</h3>
                <p class="charId" id="charId">${ele.character_id}</p>
                <button id="unfavBtn">Unfavorite</button>
                </div>`;
                favList.innerHTML += characterCard
                const unfavBtn = document.getElementById('unfavBtn')
                const numberId = document.getElementById(`charId`).textContent
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
    axios.put(`http://localhost:4000/characters/favs/${numberId}`, body)
    .then(() => alert(`Unfavorited Character`), location.reload())
}


