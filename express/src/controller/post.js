const db = require("../database");

// Select all posts from the database.
exports.all = async (req, res) => {
  //const posts = await db.post.findAll();

  // Can use eager loading to join tables if needed, for example:
  const posts = await db.post.findAll({ include: db.user });

  // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html
  res.json(posts);
};

// Create a post in the database.
exports.create = async (req, res) => {
  const post = await db.post.create({
    text: req.body.text,
    userEmail: req.body.userEmail,
    imgUrl: req.body.imgUrl,
    date: req.body.date,
    dateData: req.body.dateData,
  });

  res.json(post);
};
