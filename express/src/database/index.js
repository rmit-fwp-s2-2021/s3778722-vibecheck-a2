const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const user = require("./models/user.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  port: config.PORT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.postLike = require("./models/postLike.js")(db.sequelize, DataTypes);
db.commentLike = require("./models/commentLike.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);

// Provide the relationships between the tables
// Cascade is specified to delete all its child components
db.user.hasMany(db.post, { onDelete: "cascade", hooks: true });
db.post.belongsTo(db.user);

db.user.hasMany(db.comment, { onDelete: "cascade", hooks: true });
db.post.hasMany(db.comment, { onDelete: "cascade", hooks: true });

db.post.hasMany(db.postLike, { onDelete: "cascade", hooks: true });
db.postLike.belongsTo(db.post, {
  onDelete: "cascade",
});
db.postLike.belongsTo(db.user, {
  onDelete: "cascade",
});

db.comment.hasMany(db.commentLike, { onDelete: "cascade", hooks: true });
db.comment.belongsTo(db.user, {
  onDelete: "cascade",
});
db.comment.belongsTo(db.post, {
  onDelete: "cascade",
});

db.commentLike.belongsTo(db.comment, {
  onDelete: "cascade",
});
db.commentLike.belongsTo(db.user, {
  onDelete: "cascade",
});

db.follow.belongsTo(db.user, { foreignKey: "userEmail" });
db.follow.belongsTo(db.user, { foreignKey: "followEmail" });
db.user.hasMany(db.follow);

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  //await seedData();
};
module.exports = db;
