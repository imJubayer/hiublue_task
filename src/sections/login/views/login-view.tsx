"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import axios from "@/service/axiosService";
import { useAuth } from "@/hooks/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: "auto",
	[theme.breakpoints.up("sm")]: {
		maxWidth: "450px",
	},
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
	minHeight: "100%",
	padding: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
	},
	"&::before": {
		content: '""',
		display: "block",
		position: "absolute",
		zIndex: -1,
		inset: 0,
		backgroundImage:
			"radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
		backgroundRepeat: "no-repeat",
		...theme.applyStyles("dark", {
			backgroundImage:
				"radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
		}),
	},
}));

export default function SignIn() {
	const [loading, setLoading] = React.useState(false);
	const { login } = useAuth();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		setLoading(true);
		axios
			.post("login", data)
			.then((response) => {
				const { user, token } = response.data;
				login(user, token);

				toast.success("Login Successful");
				router.push("/dashboard");
			})
			.catch((error) => {
				setLoading(false);
				console.log(error.response.data.error);
				toast.error(error.response.data.error);
			});
	};

	return (
		<>
			<CssBaseline enableColorScheme />
			<SignInContainer direction="column" justifyContent="space-between">
				<Card variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						sx={{
							width: "100%",
							fontSize: "clamp(2rem, 10vw, 2.15rem)",
						}}
					>
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<TextField
								type="email"
								{...register("email", {
									required: "Email is required",
								})}
								defaultValue="test@example.com"
								placeholder="your@email.com"
								autoComplete="email"
								autoFocus
								required
								fullWidth
								variant="outlined"
								size="small"
								sx={{ mt: 1 }}
								error={!!errors.email}
								helperText={errors.email?.message as string}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<TextField
								type="password"
								{...register("password", {
									required: "Password is required",
								})}
								defaultValue="password123"
								placeholder="••••••"
								autoComplete="current-password"
								required
								fullWidth
								variant="outlined"
								size="small"
								sx={{ mt: 1 }}
								error={!!errors.password}
								helperText={errors.password?.message as string}
							/>
						</FormControl>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={loading}
						>
							Sign in
						</Button>
						<Link
							component="button"
							type="button"
							onClick={() => {}}
							variant="body2"
							sx={{ alignSelf: "center" }}
						>
							Forgot your password?
						</Link>
					</Box>
				</Card>
			</SignInContainer>
		</>
	);
}
