const sequelize = require(`./database.js`)

const seed = () => {
    sequelize.query(`
        DROP TABLE IF EXISTS GoT_chars cascade;
        DROP TABLE IF EXISTS users cascade;
        DROP TABLE IF EXISTS favorites_list;

        CREATE TABLE GoT_chars (
            character_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            image VARCHAR(1000) NOT NULL,
            aliases VARCHAR(512),
            titles VARCHAR(512),
            house VARCHAR(255),
            house_img VARCHAR(1000),
            favorited BOOLEAN
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

        INSERT INTO GoT_chars (name, image, aliases, titles, house, favorited)
        VALUES ('Jon Snow','https://awoiaf.westeros.org/images/a/a0/Cristi_Balanescu_Jon_SnowGhost.png', 'The Goat, The Bastard of Winterfell, The Black Bastard of the Wall, Lord Crow, Lord Snow, The Snow of Winterfell', 'The Lord Commander of the Nights Watch', 'House Stark', false),
            ('Eddard Stark', 'https://i.seadn.io/gae/nMGO_hc7SfUwkFWBdy9XQzIAvl6WciP3vQZsn9NECSd_s1W9VzQkd54ZGlh10LnVCWrtnH9i7GuzXnXN069AbnFogZ7KGG2-YKqH?auto=format&dpr=1&w=1000', 'Ned, The quiet wolf', 'The Warden of the North, Hand of the King, Lord of Winterfell', 'House Stark', false),
            ('Jamie Lannister', 'https://artistmonkeys.com/wp-content/uploads/2023/12/Jaime-Lannister-portrait-1.jpg','King-Slayer, The Lion of Lannister, The Young Lion, The golden man, Cripple', 'The Lord Commander of the Kingsgaurd','House Lannister', false),
            ('Jon Arryn', 'https://awoiaf.westeros.org/images/9/9b/970110_1331165364981_full.jpg', NULL,'Keeper of the Gates of the Moon, Lord of the Eyrie, Defender of the Vale, Warden of the East, Hand of the King', 'House Arryn', false);
        
        INSERT INTO users (username)
            VALUES ('mcman597');
    `).then(() => console.log(`DB has been seeded!`))
}

module.exports = seed