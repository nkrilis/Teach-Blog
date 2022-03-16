const { User } = require('../models');

const userData = [
    {
        user_name: 'nkrilis',
        password: '123456789',
    }
];

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;