import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import CustomError from "../exceptions/CustomError";

export interface IWishlist {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updateAt: string;
}

export interface IWishlistProduct {
  _id: ObjectId;
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
export interface IUserWishlist {
  productId: ObjectId;
  userId: ObjectId;
  createdAt: string;
  updateAt: string;
  wishlistProduct: IWishlistProduct;
}

export interface IInputWishlist {
  userId: string;
  productId: string;
}

export interface IInputDeleteWishlist {
  id: string;
  userId: string;
}

export default class WishlistModel {
  static getCollection() {
    const db = getDB();
    return db.collection<IWishlist>("wishlists");
  }

  static getUserWishlistCollection() {
    const db = getDB();
    return db.collection<IUserWishlist>("wishlists");
  }

  static async addWishlist(payload: IInputWishlist): Promise<string> {
    const collection = this.getCollection();
    if (!payload.userId) {
      throw new CustomError("userId is required", 400);
    }
    if (!payload.productId) {
      throw new CustomError("productId is required", 400);
    }

    const item = await collection.findOne({
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

  static async findByUserId(userId: string) {
    const collection = this.getUserWishlistCollection();
    const wishlists = await collection
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "wishlistProduct",
          },
        },
        {
          $unwind: {
            path: "$wishlistProduct",
          },
        },
      ])
      .toArray();

    return wishlists;
  }

  static async deleteWishlist(payload: IInputDeleteWishlist): Promise<string> {
    const collection = this.getCollection();

    if (!payload.id) {
      throw new CustomError("wishlistId is required", 400);
    }

    const wishlist = await collection.findOne({
      _id: new ObjectId(payload.id),
    });
    if (!wishlist) {
      throw new CustomError("Wishlist not found", 404);
    }

    if (wishlist.userId.toString() !== payload.userId) {
      throw new CustomError("Forbidden to delete wishlist", 403);
    }

    await collection.deleteOne({
      _id: new ObjectId(payload.id),
    });

    return "Successfully delete wishlist";
  }
}
