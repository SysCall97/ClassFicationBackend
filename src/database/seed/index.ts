import crypto from 'crypto'
export const users = [
    {
        "email": "shuvo_06_cse@yahoo.com",
        // "password": "abcdefgh",
        "password": crypto.createHash('md5').update("abcdefgh").digest('hex'),
        "role": 1,
        "name": "Md. Mahfuz Reza"
    },
    {
        "email": "kazimashry@gmail.com",
        // "password": "abcdefgh",
        "password": crypto.createHash('md5').update("abcdefgh").digest('hex'),
        "role": 2,
        "name": "Kazi Mashry"
    },
    {
        "email": "shahid@gmail.com",
        // "password": "abcdefgh",
        "password": crypto.createHash('md5').update("abcdefgh").digest('hex'),
        "role": 2,
        "name": "Shahidul Islam"
    },
    {
        "email": "nafis@gmail.com",
        // "password": "abcdefgh",
        "password": crypto.createHash('md5').update("abcdefgh").digest('hex'),
        "role": 2,
        "name": "Nafis Shahriar"
    },
    {
        "email": "subrata@gmail.com",
        // "password": "abcdefgh",
        "password": crypto.createHash('md5').update("abcdefgh").digest('hex'),
        "role": 2,
        "name": "Subrata Sutradhar"
    }
];

export const _class = [{
    "className": "CSE5000"
}];

export const post = [
    {
        "post": "this is teacher post-1."
    }, 
    {
        "post": "this is student post-1."
    }
];

export const comment = [
    {
        "comment": "Thank you sir for the information"
    },
    {
        "comment": "Informative post"
    }
]