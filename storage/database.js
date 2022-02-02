// Uses Sequelize To Handle The Database

const { Sequelize, DataTypes } = require('sequelize')
const configs = require('../config.json').data

// Storage Uses Global 'Self' Identifier
module.exports = Self => {
	// Initialize DB Connection
	Self.DB = new Sequelize(configs)

	// Import Our Global Helpers
	// Database Functions/Tables Prefixed With $
	require('./$global.js')(Self)

	// Import Our Tables / Models
	require('./$records.js')(Self, DataTypes)
	require('./$configs.js')(Self, DataTypes)
	require('./$servers.js')(Self, DataTypes)
	require('./$members.js')(Self, DataTypes)
	require('./$starred.js')(Self, DataTypes)

	// Syncing Our Tables (Updating)
	Self.$Sync = async function () {
		await this.$records.table.sync({ alter: true })
		await this.$configs.table.sync({ alter: true })
		await this.$servers.table.sync({ alter: true })
		await this.$members.table.sync({ alter: true })
		await this.$starred.table.sync({ alter: true })
	}
}