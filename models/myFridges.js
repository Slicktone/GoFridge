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
		// User to have myFridge
		classMethods: {
			associate: function(models) {
				// delete fridge when user deleted
				// A User is required or a fridge can't be made
				myFridges.belongsTo(models.users, {
					onDelete: "cascade",
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	}, {
		timestamps: false
	});
	return myFridges;
};