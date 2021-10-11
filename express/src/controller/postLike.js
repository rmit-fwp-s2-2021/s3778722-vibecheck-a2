const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  //const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  const postLike = await db.postLike.findAll({ include: [db.user, db.post] });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html
  res.json(postLike);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const postLike = await db.postLike.create({
    like: req.body.like,
    dislike: req.body.dislike,
    userEmail: req.body.userEmail,
    postPostId: req.body.postPostId,
  });

  res.json(postLike);
};

// Update a profile in the database.
exports.update = async (req, res) => {
  const postLike = await db.postLike.findByPk(req.body.postlike_id);
  postLike.like = req.body.like;
  postLike.dislike = req.body.dislike;

  await postLike.save();

  res.json(postLike);
};

exports.delete = async (req, res) => {
  const parsePostLikeId = parseInt(req.params.postlike_id);

  const postLike = await db.postLike.destroy({
    where: { postlike_id: parsePostLikeId },
  });

  res.json(postLike);
};
