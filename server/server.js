const express = require(`express`)
const cors = require(`cors`)

const sequelize = require(`./database.js`)

const seed = require(`./seed.js`)
// seed()

sequelize.sync()

const app = express()

app.listen(4000, console.log(`Up on 4K`))