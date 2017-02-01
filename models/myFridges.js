// myFridges Table
module.exports = function(sequelize, DataTypes) {
	var myFridges = sequelize.define("myFridges", {
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		refill: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	}, {
		// We're saying that we want our User to have myFridge
		classMethods: {
			associate: function(models) {
				// When we delete a User, we'll also delete their fridge "cascade"
				// A User (foreignKey) is required or a fridge can't be made
				myFridges.belongsTo(models.users, {
					onDelete: "cascade",
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	}, {
		// may not need timestamps? OH: I think this is needed for Heroku 
		timestamps: false
	});
	return myFridges;
};