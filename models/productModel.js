import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
		},
		image: {
			type: String,
			required: [true, "Product image is required"],
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically manage createdAt and updatedAt fields
	}
);

const Product =
	mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
