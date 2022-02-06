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
		await this.$Records.table.sync({ alter: true })
		await this.$Configs.table.sync({ alter: true })
		await this.$Servers.table.sync({ alter: true })
		await this.$Members.table.sync({ alter: true })
		await this.$Starred.table.sync({ alter: true })
	}
}