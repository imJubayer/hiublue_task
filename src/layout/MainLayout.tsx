"use client";
import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Drawer,
	List,
	ListItemIcon,
	ListItemText,
	Typography,
	Avatar,
	Divider,
	Box,
	ListItemButton,
	useMediaQuery,
	useTheme,
	Menu,
	MenuItem,
	Backdrop,
	CircularProgress,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Dashboard as DashboardIcon,
	Lock as LockIcon,
	Logout,
} from "@mui/icons-material";
import AuthGuard from "@/auth/AuthGuard";
import { useAuth } from "@/hooks/AuthContext";
import { usePathname, useRouter } from "next/navigation";

type MainLayoutPropsType = {
	children: React.ReactNode;
	loading?: boolean;
};

export default function MainLayout({
	children,
	loading = false,
}: MainLayoutPropsType) {
	const pathname = usePathname();
	const router = useRouter();
	const { logout, user } = useAuth();
	const [open, setOpen] = useState(true);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	function getInitials(name: string) {
		const words = name.trim().split(" ");
		return words
			.slice(0, 2)
			.map((word) => word[0].toUpperCase())
			.join("");
	}

	return (
		<AuthGuard>
			<Box sx={{ display: "flex" }}>
				{/* Sidebar */}
				<Drawer
					variant={isMobile ? "temporary" : "permanent"}
					open={open}
					sx={{ width: open ? 180 : 70, flexShrink: 0 }}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							padding: 2,
							justifyContent: open ? "space-between" : "center",
						}}
					>
						{open && <Typography variant="h6">hiu</Typography>}
						<IconButton onClick={() => setOpen(!open)}>
							<MenuIcon />
						</IconButton>
					</Box>
					<Divider />
					<List>
						<ListItemButton
							selected={pathname === "/dashboard"}
							onClick={() => router.push("/dashboard")}
						>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							{open && <ListItemText primary="Dashboard" />}
						</ListItemButton>
						<ListItemButton
							selected={pathname === "/offer"}
							onClick={() => router.push("/offer")}
						>
							<ListItemIcon>
								<LockIcon />
							</ListItemIcon>
							{open && <ListItemText primary="Onboarding" />}
						</ListItemButton>
					</List>
				</Drawer>

				{/* Main Content */}
				<Box sx={{ flexGrow: 1, padding: 1 }}>
					<Backdrop
						sx={(theme) => ({
							color: "#fff",
							zIndex: theme.zIndex.drawer + 1,
						})}
						open={loading}
					>
						<CircularProgress color="inherit" />
					</Backdrop>
					<AppBar
						position="static"
						sx={{
							background: "white",
							color: "black",
							boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.1)",
							padding: "8px 16px",
						}}
					>
						<Toolbar
							sx={{
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{ ml: 2 }}
								aria-controls={
									open ? "account-menu" : undefined
								}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Avatar sx={{ width: 32, height: 32 }}>
									{getInitials(user?.name || "M")}
								</Avatar>
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								id="account-menu"
								open={menuOpen}
								onClose={handleClose}
								onClick={handleClose}
								slotProps={{
									paper: {
										elevation: 0,
										sx: {
											padding: 2,
											overflow: "visible",
											filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
											mt: 1.5,
											"& .MuiAvatar-root": {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											"&::before": {
												content: '""',
												display: "block",
												position: "absolute",
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: "background.paper",
												transform:
													"translateY(-50%) rotate(45deg)",
												zIndex: 0,
											},
										},
									},
								}}
								transformOrigin={{
									horizontal: "right",
									vertical: "top",
								}}
								anchorOrigin={{
									horizontal: "right",
									vertical: "bottom",
								}}
							>
								<Box sx={{ p: 1 }}>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
									>
										Hello, {user?.name}
									</Typography>
								</Box>
								<MenuItem onClick={handleClose}>
									<Avatar /> Profile
								</MenuItem>
								<MenuItem onClick={logout}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									Logout
								</MenuItem>
							</Menu>
						</Toolbar>
					</AppBar>

					{/* Main Children */}
					<Box sx={{ margin: 3 }}>{children}</Box>
				</Box>
			</Box>
		</AuthGuard>
	);
}
