import { DB, DataTypes } from "../config/index.js";

const AddressSet = DB.define("AddressSet", {
  algorandAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      notEmpty: true,
      isCorrectLength(value) {
        if (value.length !== 58) {
          throw new Error("Invalid Algorand address length!");
        }
      },
    },
  },
  cardanoAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
      notEmpty: true,
    },
  },
  maticAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isAlphanumeric: true,
      notEmpty: true,
    },
  },
});

export { AddressSet };
