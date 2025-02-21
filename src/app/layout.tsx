import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ThemeProvider from "@/theme/index";
import { AuthProvider } from "@/hooks/AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<InitColorSchemeScript attribute="class" />
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<AuthProvider>
						<ThemeProvider>
							<Toaster
								position="top-right"
								toastOptions={{
									style: {
										background: "#000", // Black background
										color: "#fff", // White text
										borderRadius: "8px",
										padding: "12px",
									},
									success: {
										iconTheme: {
											primary: "#4CAF50", // Green for success icon
											secondary: "#000",
										},
									},
									error: {
										iconTheme: {
											primary: "#F44336", // Red for error icon
											secondary: "#000",
										},
									},
								}}
							/>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />
							{props.children}
						</ThemeProvider>
					</AuthProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
