import { DB, DataTypes } from "../config/index.js";

const StakingSet = DB.define("StakingSet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      // Add any specific validations for the format of user IDs if necessary
    },
    references: {
      model: 'Users', // Ensure this matches the table name for the User model
      key: 'userId'
    }
  },
  assetId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true, // Assuming Algorand asset IDs are numeric
      // You can add additional validations if there are specific format requirements for Algorand asset IDs
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1 // Ensure that the duration is at least 1 unit
    }
  },
  durationType: {
    type: DataTypes.ENUM,
    values: ['days', 'weeks', 'months'],
    allowNull: false,
    defaultValue: 'weeks' // Default to weeks if not specified
  },
  status: {
    type: DataTypes.ENUM,
    values: ['active', 'inactive'],
    allowNull: false,
    defaultValue: 'active'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export { StakingSet };
