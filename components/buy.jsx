"use client";
import React, { use, useCallback } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const Buy = ({ id }) => {
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	);
	const fetchClientSecret = useCallback(async () => {
		const response = await fetch("/api/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }), // Example amount in cents
		});
		const data = await response.json();
		if (data?.error) {
			console.error("Error fetching client secret:", data.error);
			throw new Error(data.error);
		}
		return data.clientSecret;
	}, []);

	const options = {
		fetchClientSecret,
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Purchase</Button>
			</DialogTrigger>
			<DialogContent className="my-4 py-7 xl:max-w-screen-xl">
				<DialogHeader>
					<DialogTitle>Estore Stripe Payment</DialogTitle>
				</DialogHeader>
				<div className="my-2">
					<EmbeddedCheckoutProvider options={options} stripe={stripePromise}>
						<EmbeddedCheckout className="max-h-[80dvh] overflow-y-auto" />
					</EmbeddedCheckoutProvider>
				</div>

				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel Purchase
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default Buy;
