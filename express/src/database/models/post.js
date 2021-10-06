module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
      dateData: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
