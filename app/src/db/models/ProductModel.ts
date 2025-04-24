import { getDB } from "../config/mongodb";

export interface IProduct {
  name: string;
  images: string[];
  price: string;
  thumbnail: string;
  tags: string[];
  slug: string;
  createdAt: string;
  updateAt: string;
  description: string;
  excerpt: string;
}

export default class ProductModel {
  static getCollection() {
    const db = getDB();
    return db.collection<IProduct>("products");
  }

  static async findAll() {
    const collection = this.getCollection();
    const products = await collection.find().toArray();

    return products;
  }
}
