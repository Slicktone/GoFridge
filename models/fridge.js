// Inventory Table
module.exports = function(sequelize, DataTypes) {
	var myFridge = sequelize.define("myFridge", {
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
			},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
        refill: {
            type: DataTypes.DATE,
            allowNull: false
        }
	}, 
		// may not need timestamps? 
		// timestamps: false
		});
	return myFridge;
};
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
	
	});
	return user;
}