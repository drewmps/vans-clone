import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import CustomError from "../exceptions/CustomError";

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

  static async findAll(page: string | null, searchQuery: string | null) {
    const collection = this.getCollection();

    const limit = 5;
    if (page && searchQuery) {
      const skip = (+page - 1) * 5;
      const products = await collection
        .find({ name: { $regex: searchQuery, $options: "i" } })
        .skip(skip)
        .limit(limit)
        .toArray();
      return products;
    }

    if (page && !searchQuery) {
      const skip = (+page - 1) * 5;
      const products = await collection
        .find()
        .skip(skip)
        .limit(limit)
        .toArray();
      return products;
    }

    if (!page && searchQuery) {
      const products = await collection
        .find({ name: { $regex: searchQuery, $options: "i" } })
        .limit(limit)
        .toArray();
      return products;
    }

    const products = await collection.find().limit(limit).toArray();
    return products;
  }

  static async findProductById(id: string) {
    const collection = this.getCollection();
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) throw new CustomError("Product not found", 404);

    return product;
  }

  static async findProductBySlug(slug: string) {
    const collection = this.getCollection();
    const product = await collection.findOne({ slug });

    if (!product) throw new CustomError("Product not found", 404);

    return product;
  }
}
