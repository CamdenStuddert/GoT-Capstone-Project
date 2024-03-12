const sequelize = require(`./database.js`)

const seed = () => {
    sequelize.query(`
        DROP TABLE IF EXISTS GoT_chars CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS favorites_list;

        CREATE TABLE GoT_chars (
            character_id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            image VARCHAR(1000) NOT NULL,
            aliases VARCHAR(512),
            titles VARCHAR(512),
            house VARCHAR(255),
            favorited BOOLEAN NOT NULL DEFAULT false
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
            ('Eddard Stark', 'https://awoiaf.westeros.org/images/thumb/0/0a/Eddard_Amoka.jpg/300px-Eddard_Amoka.jpg', 'Ned, The quiet wolf', 'The Warden of the North, Hand of the King, Lord of Winterfell', 'House Stark', false),
            ('Jamie Lannister', 'https://artistmonkeys.com/wp-content/uploads/2023/12/Jaime-Lannister-portrait-1.jpg','King-Slayer, The Lion of Lannister, The Young Lion, The golden man, Cripple', 'The Lord Commander of the Kingsgaurd','House Lannister', false),
            ('Jon Arryn', 'https://awoiaf.westeros.org/images/9/9b/970110_1331165364981_full.jpg', NULL,'Keeper of the Gates of the Moon, Lord of the Eyrie, Defender of the Vale, Warden of the East, Hand of the King', 'House Arryn', false),
            ('Tyrion Lannister', 'https://awoiaf.westeros.org/images/thumb/f/f6/Tyrion_lannister_Sebastian_Giacobino.jpg/350px-Tyrion_lannister_Sebastian_Giacobino.jpg', 'The Imp, Halfman, Giant of Lannister, Lord Imp, Lord Tywins Doom, Lord Tywins Bane, Yollo, Hugor Hill, No Nose, Freak, Redhands, Ser Imp, The Bloody Hand, The demonic dwarf','Acting Hand of the King, Master of coin, Lord of Casterly Rock?','House Lannister', false),
            ('Howland Reed','https://awoiaf.westeros.org/images/thumb/2/2f/Howland_Reed_by_Sir_Heartsalot.jpg/250px-Howland_Reed_by_Sir_Heartsalot.jpg','The Little Crannogman','Lord of Greywater Watch','House Reed', false),
            ('Catelyn Stark','https://awoiaf.westeros.org/images/6/67/Catelyn_Stark.jpg','Catelyn Tully, Cat, Stoneheart, Lady Stoneheart, The Silent Sister, Mother Merciless, The Hangwoman','Dowager Lady of Winterfell','House Stark/Tully', false);
    `).then(() => console.log(`DB has been seeded!`))
}

module.exports = seed