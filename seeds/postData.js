const { Post } = require('../models');

const postData = [
    {
        title: 'JS',
        description: 'Javascript is a very powerful language.',
        user_id: 1
    },
    {
        title: 'HTML',
        description: 'HTML is a markup language.',
        user_id: 1
    }
];

const seedPostData = () => Post.bulkCreate(postData);

module.exports = seedPostData;