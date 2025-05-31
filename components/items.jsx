import React from "react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardFooter,
	CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import Buy from "./buy";

const Items = ({ product }) => {
	return (
		<>
			<Card className="flex flex-col h-full">
				<div className="relative flex justify-center items-center h-72 bg-white">
					<Image
						src={product.image}
						width={300}
						height={300}
						alt={product.name}
						className="object-contain max-h-60"
					/>
				</div>
				<CardHeader className="flex flex-col items-start">
					<CardTitle className="text-lg font-semibold">
						{product.name}
					</CardTitle>
					<CardDescription className="text-sm text-gray-500">
						{product.description}
					</CardDescription>
				</CardHeader>

				<CardFooter className="flex justify-between items-center mt-auto">
					<span className="text-lg font-bold text-gray-900">
						${product.price}
					</span>
					<Buy id={product._id.toString()} />
				</CardFooter>
			</Card>
		</>
	);
};

export default Items;
