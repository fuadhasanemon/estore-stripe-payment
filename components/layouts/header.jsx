import Link from "next/link";

function Header() {
	return (
		<header className="bg-gray-800 text-white p-4">
			<nav className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-xl font-bold">
					My App
				</Link>
				<ul className="flex space-x-6">
					<li>
						<Link href="/about">About</Link>
					</li>
					<li>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
