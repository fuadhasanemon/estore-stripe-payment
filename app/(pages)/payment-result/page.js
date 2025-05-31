import React from "react";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { CircleCheckBig, TicketIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

async function getSession(sessionId) {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		return session;
	} catch (error) {
		console.error("Error retrieving session:", error);
		return null;
	}
}

const PaymentResult = async ({ searchParams }) => {
	const sessionId = await searchParams?.session_id;
	if (!sessionId) {
		redirect("/");
	}
	const session = await getSession(sessionId);
	if (!session) {
		return <h1>Error retrieving payment session.</h1>;
	}

	if (session.payment_status !== "paid") {
		return <h1>Payment not completed.</h1>;
	}

	if (session?.status === "expired") {
		return <h1>Payment session expired.</h1>;
	}

	if (session?.status === "open") {
		return <h1>Your payment is in progress</h1>;
	}
	return (
		<div className="h-[85dvh] flex items-center justify-center">
			<Card className="max-w-2xl mx-auto p-6 bg-accent shadow-lg rounded-lg my-20">
				<div className="flex flex-col gap-4 items-center my-10">
					<div className="w-12 h12">
						<CircleCheckBig className="w-12 h-12 text-green-600" />
					</div>
					<h1 className="text-3xl font-bold text-green-600">
						Payment Successful!
					</h1>
					<p className="text-lg max-w-md text-center font-medium">
						Hello,{" "}
						<span className="text-violet-600 font-semibold">
							{session.customer_details?.name || "Customer"}
						</span>
						, your payment was successful. Thank you for your purchase! Your
						order has been successfully placed! Expect delivery within 3-5
						business days. Purchase receipt has been sent to your email:{" "}
						<span className="text-violet-600 font-semibold">
							{session.customer_details?.email}
						</span>
						.
					</p>
					<Link href={"/"}>
						<Button>Go to home</Button>
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default PaymentResult;
