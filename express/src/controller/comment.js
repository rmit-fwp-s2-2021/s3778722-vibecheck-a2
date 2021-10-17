const db = require("../database");

// Select all comments from the database.
exports.all = async (req, res) => {
  //const posts = await db.post.findAll();

  // Eager loading was used to join the tables of the user, post and commentlike.
  const comments = await db.comment.findAll({
    include: [db.user, db.post, db.commentLike],
  });

  res.json(comments);
};

// Create a comment in the database.
exports.create = async (req, res) => {
  const comment = await db.comment.create({
    text: req.body.text,
    date: req.body.date,
    userEmail: req.body.userEmail,
    postPostId: req.body.postPostId,
  });

  res.json(comment);
};

// Update a comment with the fields provided in the database.
exports.update = async (req, res) => {
  const comment = await db.comment.findByPk(req.body.comment_id);

  comment.comment_id = req.body.comment_id;
  comment.text = req.body.text;
  comment.date = req.body.date;
  comment.userEmail = req.body.userEmail;
  comment.postPostId = req.body.postPostId;

  await comment.save();

  res.json(comment);
};

// Delete a comment from the database
exports.delete = async (req, res) => {
  // parse is needed since the datatype is in integer.
  const parseCommentId = parseInt(req.params.comment_id);

  const comment = await db.comment.destroy({
    where: { comment_id: parseCommentId },
  });

  res.json(comment);
};
