"use client";
import Link from "next/link";

export default function DashboardView() {
	return (
		<Link href="/dashboard">
			<button>Go to Dashboard</button>
		</Link>
	);
}
