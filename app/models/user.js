var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user'
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    county: DataTypes.STRING,
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    floor: DataTypes.STRING,
    door: DataTypes.STRING
  }, {
    getterMethods: {
      fullName: function () {
        return `${this.lastName} ${this.firstName}`;
      }
    },
    setterMethods: {
      password: function (password) {
        let encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        this.setDataValue('encryptedPassword', encryptedPassword);
      }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.CartLine, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Token, { foreignKey: 'userId' });
  };
  return User;
};
