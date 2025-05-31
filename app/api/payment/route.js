import { connectToDB } from "@/lib/connectToDB";
import { stripe } from "@/lib/stripe";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const data = await request.json();
		// data.id
		await connectToDB();
		const product = await Product.findById(data.id);
		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 400 });
		}
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			line_items: [
				{
					price_data: {
						unit_amount: product.price * 100, // Convert to cents
						currency: "usd",
						product_data: {
							name: product.name,
							description: product.description,
							images: [product.image],
						},
					},
					quantity: 1,
				},
			],
			custom_fields: [
				{
					key: "location",
					label: {
						type: "custom",
						custom: "Delivery Location",
					},
					type: "text",
				},
			],
			payment_method_types: ["card"],
			mode: "payment",
			customer_creation: "always",
			automatic_tax: { enabled: false }, // Keep false unless tax is configured
			return_url: `${request.headers.get(
				"referer"
			)}/payment-result?session_id={CHECKOUT_SESSION_ID}`,
		});
		return NextResponse.json(
			{
				id: session.id,
				clientSecret: session.client_secret,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Stripe session creation failed:", error);
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 400 }
		);
	}
}
