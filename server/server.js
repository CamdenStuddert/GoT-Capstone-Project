const express = require(`express`)
const cors = require(`cors`)

const sequelize = require(`./database.js`)

// const seed = require(`./seed.js`)
// seed()

const app = express()
app.use(express.json())
app.use(cors())

const {searchBar, addToFavorites, getFavorites, Unfavorite} = require(`./controller.js`)

app.get(`/characters`, searchBar)
app.post(`/characters/:id`, addToFavorites)
app.get(`/characters/favs`, getFavorites)
app.delete(`/characters/favs/:id`, Unfavorite)

app.listen(4000, () => console.log(`Up on 4K`))