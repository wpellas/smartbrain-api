import express, { json } from 'express';
import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';
import cors from 'cors';

//////////// SEPARATION OF CONCERNS
import { handleRegister } from './controllers/register';
import { handleSignin } from './controllers/signin';
import { handleProfileGet } from './controllers/profile';
import { handleImage } from './controllers/image';
import { handleApiCall } from './controllers/imageurl';

//////////// KNEX DB
const db = knex({
  client: 'pg',
  connection: {
    host : 'db.dgmsidmkmfthpvriptyo.supabase.co',
    port : 5432,
    user : 'postgres',
    password : 'lokeLokEL12927--.1dLokE',
    database : 'postgres'
  }
});

//////////// EXPRESS & CORS
const app = express();
app.use(json());
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
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt)})
//////////// REGISTER
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
//////////// USER ID
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db)})
//////////// RANK INCREMENT
app.put('/image', (req, res) => { handleImage(req, res, db)})
//////////// API
app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

//////////// HOST
const port = process.env.PORT || 9001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});