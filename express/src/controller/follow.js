const db = require("../database");

// Select all follows from the database.
exports.all = async (req, res) => {
  // Can use eager loading to join tables
  const follow = await db.follow.findAll({
    include: [db.user],
  });

  res.json(follow);
};

// Create a follow in the database.
exports.create = async (req, res) => {
  const follow = await db.follow.create({
    userEmail: req.body.userEmail,
    followEmail: req.body.followEmail,
  });

  res.json(follow);
};

// Delete a follow from the database
exports.delete = async (req, res) => {
  // parse is needed since the datatype is in integer.
  const followId = parseInt(req.params.follow_id);

  const follow = await db.follow.destroy({
    where: { follow_id: followId },
  });

  res.json(followId);
};
