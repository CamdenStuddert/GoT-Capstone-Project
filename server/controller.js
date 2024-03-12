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
        sequelize.query(`
            INSERT INTO favorites_list (character_id)
            VALUES ('${+req.body.character_id}');
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },
    getFavorites: async (req, res) => {
        let favChar = []
        let newFavChar = []
        let passedChars = []
        await sequelize.query(`
            SELECT character_id FROM favorites_list
        `).then(dbRes => {
                // console.log(dbRes[0][0])})
            for(let i = 0; i < dbRes[0].length; i++){
                // console.log(dbRes[0][i])
                favChar.push(dbRes[0][i].character_id)
            }
            let favCharSet = new Set(favChar)
            newFavChar = favCharSet
            favChar = Array.from(newFavChar)
            console.log(favChar)
        })
            for(let i = 0; i < favChar.length; i++){
                await sequelize.query(`
                SELECT * FROM GoT_chars WHERE character_id = ${favChar[i]};
                `).then(dbRes2 => {
                    passedChars.push(dbRes2[0][0])
                })
            }
            console.log(passedChars)
            res.status(200).send(passedChars)
    },
    Unfavorite: (req, res) => {
        let {id} = req.params
        console.log(req.params)
        sequelize.query(`
            DELETE FROM favorites_list
            WHERE character_id = ${+id};
        `).then(dbRes => res.status(200).send(dbRes[0]))
    },
}