const db = require("../database");

// Select all commentlikes from the database.
exports.all = async (req, res) => {
  // Eager loading is used to join tables.
  const commentLike = await db.commentLike.findAll({
    include: [db.user, db.comment],
  });

  res.json(commentLike);
};

// Create a commentlike in the database.
exports.create = async (req, res) => {
  const commentLike = await db.commentLike.create({
    like: req.body.like,
    dislike: req.body.dislike,
    userEmail: req.body.userEmail,
    commentCommentId: req.body.commentCommentId,
  });

  res.json(commentLike);
};

// Update a commentlike in the database
exports.update = async (req, res) => {
  const commentLike = await db.commentLike.findByPk(req.body.commentlike_id);
  commentLike.like = req.body.like;
  commentLike.dislike = req.body.dislike;

  await commentLike.save();

  res.json(commentLike);
};

// delete a commentlike from the database.
exports.delete = async (req, res) => {
  // parse is needed since the datatype is in integer.
  const parseCommentLikeId = parseInt(req.params.commentlike_id);

  const commentLike = await db.commentLike.destroy({
    where: { commentlike_id: parseCommentLikeId },
  });

  res.json(commentLike);
};
