const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//////////// SEPARATION OF CONCERNS
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageurl = require('./controllers/imageurl')

//////////// KNEX DB
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'loke',
    database : 'smartbrain'
  }
});

//////////// EXPRESS & CORS
const app = express();
app.use(express.json());
app.use(cors());

//////////// TEMP DATABASE
/*/ const database = {
//     users: [
//         {
//             id: '123',
//             name: 'Loke',
//             password: "snackies",
//             email: 'loke@keasimp.se',
//             entries: 0,
//             joined: new Date()
//         },{
//             id: '124',
//             name: 'Kea',
//             password: "lokecute",
//             email: 'missindependent@gmail.com',
//             entries: 0,
//             joined: new Date()
//         },
//     ],
//     login: [
//         {
//             id: '987',
//             hash: '',
//             email: 'loke@keasimp.se'
//         }
//     ]
// }
///////////*/

//-------------------------------------ENDPOINTS-------------------------------------///

//////////// HOME DATABASE SELECT
app.get('/', (req, res) => { res.send(db.users) })
//////////// SIGNIN
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
//////////// REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
//////////// USER ID
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
//////////// RANK INCREMENT
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
//////////// API
app.post('/imageurl', (req, res) => { imageurl.handleApiCall(req, res)})

//////////// HOST
const port = process.env.PORT || 9001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});