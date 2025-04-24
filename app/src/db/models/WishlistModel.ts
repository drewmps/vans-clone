import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import CustomError from "../exceptions/CustomError";

export interface IWishlist {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updateAt: string;
}

export interface IInputWishlist {
  userId: string;
  productId: string;
}

export default class WishlistModel {
  static getCollection() {
    const db = getDB();
    return db.collection<IWishlist>("wishlists");
  }

  static async addWishlist(payload: IInputWishlist): Promise<string> {
    const collection = this.getCollection();
    if (!payload.userId) {
      throw new CustomError("userId is required", 400);
    }
    if (!payload.productId) {
      throw new CustomError("productId is required", 400);
    }

    let item = await collection.findOne({
      productId: new ObjectId(payload.productId),
      userId: new ObjectId(payload.userId),
    });
    if (item) {
      throw new CustomError("Product is already in wishlist", 400);
    }

    await collection.insertOne({
      productId: new ObjectId(payload.productId),
      userId: new ObjectId(payload.userId),
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    });

    return "Successfully added to wishlist";
  }
  static async findAll() {
    const collection = this.getCollection();
    const wishlists = await collection.find().toArray();

    return wishlists;
  }
}
