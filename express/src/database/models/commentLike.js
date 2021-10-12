module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "commentLike",
    {
      commentlike_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      like: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
      },
      dislike: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
