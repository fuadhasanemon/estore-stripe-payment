import Header from "@/components/layouts/header";
import "./globals.css";
import Footer from "@/components/layouts/footer";
import { Outfit } from "next/font/google";
const outfit = Outfit({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
	title: "E-commerce App",
	description: "An e-commerce application built with Next.js and Tailwind CSS",
	keywords: "e-commerce, next.js, tailwind css, react",
	authors: [
		{
			name: "Fuad Hasan Emon",
			url: "https://fuadhasanemon.vercel.app/",
		},
	],
	creator: "Fuad Hasan Emon",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={` antialiased`}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
