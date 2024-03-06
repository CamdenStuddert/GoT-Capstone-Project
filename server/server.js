const express = require(`express`)
const cors = require(`cors`)

const sequelize = require(`./database.js`)

// const seed = require(`./seed.js`)
// seed()

const app = express()
app.use(express.json())
app.use(cors())

const {searchBar, addToFavorites} = require(`./controller.js`)

app.get(`/characters`, searchBar)
app.put(`/characters`, addToFavorites)

app.listen(4000, () => console.log(`Up on 4K`))