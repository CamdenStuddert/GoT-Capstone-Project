const sequelize = require(`./database.js`)

const seed = () => {
    sequelize.query(`
        DROP TABLE IF EXISTS GoT_chars;

        CREATE TABLE GoT_chars (
            character_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            aliases VARCHAR(512),
            titles VARCHAR(512),
            house VARCHAR(255)
        );

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL
        );

        CREATE TABLE favorites_list (
            list_id SERIAL PRIMARY KEY,
            character_id INTEGER REFERENCES GoT_chars(character_id),
            user_id INTEGER REFERENCES users(user_id)
        );

        INSERT INTO GoT_chars (name, aliases, titles, house)
        VALUES ('Jon Snow', 'The Goat, The Bastard of Winterfell, The Black Bastard of the Wall, Lord Crow, Lord Snow, The Snow of Winterfell', 'The Lord Commander of the Nights Watch', 'House Stark'),
            ('Eddard Stark', 'Ned, The quiet wolf', 'The Warden of the North, Hand of the King, Lord of Winterfell', 'House Stark'),
            ('Jamie Lannister', 'King-Slayer, The Lion of Lannister, The Young Lion, The golden man, Cripple', 'The Lord Commander of the Kingsgaurd','House Lannister');
    `).then(() => console.log(`DB has been seeded!`))
}

module.exports = seed