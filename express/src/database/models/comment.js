module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
