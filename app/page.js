import React from "react";
import { Button } from "@/components/ui/button";
import { getProducts } from "./serverActions/productAction";
import { notFound } from "next/navigation";
import Image from "next/image";
import Items from "@/components/items";

const page = async () => {
	const products = await getProducts();
	console.log("====================================");
	console.log("Products:", products);
	console.log("====================================");

	if (products.length === 0) {
		return <div>No products found</div>;
	}

	if (!products) {
		notFound();
	}

	return (
		<>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl mb-2">Products</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{products.map((product) => (
						<Items product={product} key={product._id.toString()} />
					))}
				</div>
			</div>
		</>
	);
};

export default page;
