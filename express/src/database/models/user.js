module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        //The total length of an email address in the original standard was 320 characters.
        type: DataTypes.STRING(320),
        primaryKey: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      imgUrl: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
