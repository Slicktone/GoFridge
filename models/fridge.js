module.exports = function(sequelize, DataTypes) {
	var groceries = sequelize.define("groceries", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false,
			Validate: {
				len: [1]
			}
		},
        refill: {
            type: DataTypes.STRING,
            allowNull: false
        }
	}, {
		timestamps: false
	});
	return groceries;
};