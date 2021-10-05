const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.email);

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.email);
  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else {
    res.json(user);
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    email: req.body.email,
    password_hash: hash,
    name: req.body.name,
    date: req.body.date,
  });

  res.json(user);
};

// Update a profile in the database.
exports.update = async (req, res) => {
  const user = await db.user.findByPk(req.body.email);
  if (req.body.password) {
    const hash = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
    });
    if (req.body.password !== user.password_hash) {
      user.password_hash = hash;
    }
  }

  if (req.body.password_hash) {
    user.password_hash = req.body.password_hash;
  }

  user.email = req.body.email;
  user.name = req.body.name;
  user.date = req.body.date;
  user.imgUrl = req.body.imgUrl;

  await user.save();

  res.json(user);
};

exports.delete = async (req, res) => {
  const user = await db.user.destroy({
    where: { email: req.body.email },
  });

  res.json(user);
};
