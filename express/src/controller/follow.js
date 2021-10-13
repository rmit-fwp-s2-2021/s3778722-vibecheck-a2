const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  //const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  const follow = await db.follow.findAll({
    include: [db.user],
  });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html
  res.json(follow);
};

// Create a comment in the database.
exports.create = async (req, res) => {
  const follow = await db.follow.create({
    userEmail: req.body.userEmail,
    followEmail: req.body.followEmail,
  });

  res.json(follow);
};

exports.delete = async (req, res) => {
  const followId = parseInt(req.params.follow_id);

  const follow = await db.follow.destroy({
    where: { follow_id: followId },
  });

  res.json(followId);
};
