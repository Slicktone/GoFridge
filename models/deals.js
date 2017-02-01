// Deals Table
module.exports = function(sequelize, DataTypes) {
	var deals = sequelize.define("deals", {
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
		
	}, {
		// may not need timestamps? OH: I think this is needed for Heroku 
		timestamps: false
	});
	return deals;
};