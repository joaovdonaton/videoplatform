//middleware for generating a random 8 character id
module.exports = (req, res, next) => {
    const idChars = [...'abcdefghijklmnopqrstuvwxyz'.split(''),
        ...'0123456789'.split('')];

    const id = [];
    for(let i = 0; i < 8; i++){
        id.push(idChars[Math.floor(Math.random() * idChars.length)]);
    }

    req.id = id;
    next();
};