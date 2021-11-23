import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db";

interface PingPongAttributes {
  id: number;
  count: number;
}

export class Pingpong
  extends Model<PingPongAttributes>
  implements PingPongAttributes
{
  public id!: number;
  public count!: number;
}

Pingpong.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "pingpongs",
  }
);

Pingpong.sync()
  .then()
  .catch((error) => console.error(error));
Pingpong.findOrCreate({
  where: { id: 1 },
  defaults: { id: 1, count: 0 },
}).catch((error) => console.error(error));
