const sequelize = require(`./database.js`)

module.exports = {
    searchBar: (req, res) => {
        sequelize.query(`
            SELECT * FROM GoT_chars
            WHERE lower(name) LIKE '%${req.query.text}%';
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err,`in Controller searchBar FUNC`))
    },
    addToFavorites: (req, res) => {
        console.log(req.body.character_id)
        sequelize.query(`
            UPDATE GoT_chars
            SET favorited = true
            WHERE character_id = ${req.body.character_id};
        `).then(dbRes => res.status(200).send(dbRes[0]))
    }
}