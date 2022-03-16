const { Comment } = require('../models');

const CommentData = [
    {
       description: "I dont believe so",
       user_id: 1,
       post_id: 1,
    }
];

const seedCommentData = () => Comment.bulkCreate(CommentData);

module.exports = seedCommentData;