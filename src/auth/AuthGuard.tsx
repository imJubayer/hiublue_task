"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname(); // Ensure router context is available
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		// const token = Cookies.get("token");
		const token = localStorage.getItem("token");

		console.log("token", token);

		if (!token) {
			router.replace("/login");
			return;
		}

		try {
			const isExpired = false; // Implement proper JWT expiration check

			if (isExpired) {
				Cookies.remove("token");
				// router.replace("/login");
			} else {
				setIsAuthenticated(true);
			}
		} catch (error) {
			Cookies.remove("token");
			// router.replace("/login");
		}
	}, [router, pathname]); // Add pathname to dependencies to prevent hydration issues

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
};

export default AuthGuard;
