// User Table
module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define("user", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		budget: {
			type: DataTypes.INTEGER,
			allowNull: false,
			Validate: {
				len: [1]
			}
		}
	}, {
		// We're saying that we want our User to have myFridge
		classMethods: {
			associate: function(models) {
				// Associating Author with Posts
				user.hasMany(models.myFridge);
			}
		}
	}, {
		// may not need timestamps? OH: I think this is needed for Heroku 
		timestamps: false
	});
	return user;
}