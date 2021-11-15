import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

interface TodoAttributes {
  text: string;
  done: boolean;
}

export class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public text!: string;
  public done!: boolean;
}

Todo.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "todos",
  }
);

Todo.sync()
  .then()
  .catch((error) => console.error(error));
