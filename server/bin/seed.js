const mongoose = require('mongoose');
const Guitar = require('../models/guitar.model')
const User = require('../models/user.model');

const dbtitle = 'guitarFound'
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true, useUnifiedTopology: true })

User.collection.drop()
Guitar.collection.drop()

const guitar = [
    {
        name: 'Fender',
        model: 'Stratocaster',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601740007/sdhbd0ycugovnbpba53n.png',
        state: 'casi nueva',
        price: 700,
        // owner: 'Oliver'

    },
    {
        name: 'Fender',
        model: 'Telecaster',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601740002/zkapyvkv0zhcrparplrp.jpg',
        state: 'mas de 7 años',
        price: 500,
        // owner: 'Oliver'
    },
    {
        name: 'Gibson',
        model: 'SG',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601739922/bpzbkoi1bnpuukmkbwlg.jpg',
        state: 'restaurada',
        price: 499,
        // owner:'Oliver'
    },
    {
        name: 'Ibanez',
        model: 'GRX70QA-TRB GIO',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601739974/qyyulanjsy2lsgdl3wdb.jpg',
        state: 'nueva',
        price: 200,
        // owner: 'Oliver'
    },
    {
        name: 'Ibanez',
        model: 'PIA3761-SLW',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601739985/vpslcbavuprnaouy5glb.png',
        state: 'nueva',
        price: 3333,
        // owner:'Oliver'
    },
    {
        name: 'Epiphone',
        model: 'Les Paul',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601912632/zgigzihlqai1gkozk64p.jpg',
        state: 'nueva',
        price: 411,
        // owner: 'Oliver'
    },
    {
        name: 'Gibson',
        model: 'Les Paul',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601739966/qilaxdmje1cl1jr3hbuk.jpg',
        state: 'casi nueva',
        price: 1599,
        // owner: 'Oliver'
    },
    {
        name: 'Fender',
        model: 'Telecaster',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601740007/sdhbd0ycugovnbpba53n.png',
        state: 'nueva',
        price: 1145,
        // owner: 'Oliver'
    },
    {
        name: 'Gibson',
        model: 'Flying',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601739950/bvk7l5kdi3ydwzusosnd.jpg',
        state: 'mas de 7 años',
        price: 999,
        // owner: 'Oliver'
    },
    {
        name: 'Fender',
        model: 'Jaguar',
        image: 'https://res.cloudinary.com/dpflfpgcj/image/upload/v1601739997/lqfrl2wu3o6zvwvqglko.jpg',
        state: 'restaurada',
        price: 700,
        // owner: 'Oliver'
    }
]

// const user = [
//     {
//         name: 'Oliver',
//         username: 'oli81oli',
//         password: 'pp',
//         email: 'oli.b.alonso@gmail.com',
//         phone: 654987654

//     },
//     {
//         name: 'Antonio',
//         username: 'antoñito',
//         password: 'pp',
//         email: 'oli.b.alonso@gmail.com',
//         phone: 654987654

//     }, {
//         name: 'Jose',
//         username: 'josito',
//         password: 'pp',
//         email: 'oli.b.alonso@gmail.com',
//         phone: 654987654

//     }

// ]
Guitar.create(guitar)
    .then(guitars => console.log('Se han creado', guitars.length, 'guitars en la BBDD'))
    .catch(err => console.log('ERROR: ', err))

// User.create(user)
//     .then(users => console.log('Se han creado', users.length, 'guitars en la BBDD'))
//     .catch(err => console.log('ERROR: ', err))
