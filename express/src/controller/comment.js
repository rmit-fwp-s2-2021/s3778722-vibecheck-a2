const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  //const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  const comments = await db.comment.findAll({
    include: [db.user, db.post, db.commentLike],
  });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html
  res.json(comments);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const comment = await db.comment.create({
    text: req.body.text,
    date: req.body.date,
    userEmail: req.body.userEmail,
    postPostId: req.body.postPostId,
  });

  res.json(comment);
};

// Update a profile in the database.
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

exports.delete = async (req, res) => {
  const parseCommentId = parseInt(req.params.comment_id);

  const comment = await db.comment.destroy({
    where: { comment_id: parseCommentId },
  });

  res.json(comment);
};
