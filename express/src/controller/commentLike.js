const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  //const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  const commentLike = await db.commentLike.findAll({
    include: [db.user, db.comment]
  });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html
  res.json(commentLike);
};

// Create a comment in the database.
exports.create = async (req, res) => {
  const commentLike = await db.commentLike.create({
    like: req.body.like,
    dislike: req.body.dislike,
    userEmail: req.body.userEmail,
    commentCommentId: req.body.commentCommentId,
  });

  res.json(commentLike);
};

// Update a profile in the database.
exports.update = async (req, res) => {
  const commentLike = await db.commentLike.findByPk(req.body.commentlike_id);
  commentLike.like = req.body.like;
  commentLike.dislike = req.body.dislike;

  await commentLike.save();

  res.json(commentLike);
};

exports.delete = async (req, res) => {
  const parseCommentLikeId = parseInt(req.params.commentlike_id);

  const commentLike = await db.commentLike.destroy({
    where: { commentlike_id: parseCommentLikeId },
  });

  res.json(commentLike);
};
