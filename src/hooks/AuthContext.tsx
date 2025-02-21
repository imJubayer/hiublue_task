"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
	id: number;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (userData: User, token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	// Load token and user from localStorage when the app starts
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		if (!storedToken) {
			router.push("/login");
		}
	}, []);

	// Function to log in and save user & token
	const login = (userData: User, authToken: string) => {
		localStorage.setItem("token", authToken);
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
		setToken(authToken);
	};

	// Function to log out and clear storage
	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
