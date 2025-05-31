"use server";

import { connectToDB } from "@/lib/connectToDB";
import Product from "@/models/productModel";
import { connect } from "mongoose";

export async function getProducts() {
	try {
		await connectToDB();
		const products = await Product.find({}).lean();
		return products;
	} catch (error) {
		console.error("Error fetching products:", error);
	}
}
