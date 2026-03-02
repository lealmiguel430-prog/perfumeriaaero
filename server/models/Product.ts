import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  brand?: string;
  gender_target?: 'women' | 'men' | 'unisex';
  is_new?: boolean;
  on_sale?: boolean;
  sale_price?: number;
  category_id?: number;
  created_at?: Date;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'created_at'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image_url!: string;
  public brand!: string;
  public gender_target!: 'women' | 'men' | 'unisex';
  public is_new!: boolean;
  public on_sale!: boolean;
  public sale_price!: number;
  public category_id!: number;
  public readonly created_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender_target: {
      type: DataTypes.ENUM('women', 'men', 'unisex'),
      allowNull: true,
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    on_sale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
  }
);

export default Product;
