import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database.js';

interface CategoryAttributes {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  created_at?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'created_at'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
  public slug!: string;
  public image_url!: string;
  public readonly created_at!: Date;
}

Category.init(
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
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
  }
);

export default Category;
