import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface CartItemAttributes {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at?: Date;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, 'id' | 'created_at'> {}

class CartItem extends Model<CartItemAttributes, CartItemCreationAttributes> implements CartItemAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public quantity!: number;
  public readonly created_at!: Date;
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    tableName: 'cart_items',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
  }
);

export default CartItem;
