"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	Card,
	CardContent,
	CardActions,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
	Checkbox,
	TextField,
	MenuItem,
	InputAdornment,
	CardHeader,
	Typography,
	Stack,
	Divider,
} from "@mui/material";
import MainLayout from "@/layout/MainLayout";
import dayjs from "dayjs";
import { IUser } from "@/types/data";
import axios from "@/service/axiosService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup.object({
	planType: yup.string().required("Plan Type is required"),
	additions: yup.array().of(yup.string()),
	user: yup.string().required("User is required"),
	expired: yup.string().required("Expiration date is required"),
	price: yup
		.number()
		.typeError("Price must be a number")
		.required("Price is required"),
});

const CreateOfferForm = () => {
	const [users, setUsers] = useState<IUser[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const {
		control,
		handleSubmit,
		register,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			planType: "monthly",
			additions: [],
			user: "",
			expired: "",
			price: 0,
		},
	});
	const [additions, setAdditions] = useState<string[]>([]);

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const formattedDate = dayjs(event.target.value).format("YYYY-MM-DD");
		setValue("expired", formattedDate); // Update form value
	};

	const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue("user", event.target.value); // Update form value
	};

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { value, checked } = event.target;
		setAdditions((prev) =>
			checked ? [...prev, value] : prev.filter((item) => item !== value)
		);
		setValue(
			"additions",
			checked
				? [...additions, value]
				: additions.filter((item) => item !== value)
		);
	};

	const getUsers = async () => {
		setLoading(true);
		await axios
			.get(`/users?page=1&per_page=1000`)
			.then((response) => {
				setUsers(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error.response.data.error);
			});
	};

	useEffect(() => {
		getUsers();
	}, []);

	const onSubmit = (data: any) => {
		const payload = {
			plan_type: data.planType,
			additions: data.additions,
			user_id: data.user,
			expired: data.expired,
			price: data.price,
		};
		setLoading(true);
		axios
			.post(`/offers`, payload)
			.then((response) => {
				reset();
				toast.success("Offer created successfully");
				setLoading(false);
				router.push("/dashboard");
			})
			.catch((error) => {
				setLoading(false);
				console.log(error.response.data.error);
			});
	};

	return (
		<MainLayout loading={loading}>
			<Card>
				<CardContent>
					<Stack>
						<Typography variant="h5">Create Offer</Typography>
						<Typography variant="caption">
							Send onboarding offer to new clinet
						</Typography>
						<Divider sx={{ my: 1 }} />
					</Stack>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl
							component="fieldset"
							fullWidth
							margin="normal"
						>
							<FormLabel>Plan Type</FormLabel>
							<Controller
								name="planType"
								control={control}
								render={({ field }) => (
									<RadioGroup {...field} row>
										<FormControlLabel
											value="pay_as_you_go"
											control={<Radio />}
											label="Pay As You Go"
										/>
										<FormControlLabel
											value="monthly"
											control={<Radio />}
											label="Monthly"
										/>
										<FormControlLabel
											value="yearly"
											control={<Radio />}
											label="Yearly"
										/>
									</RadioGroup>
								)}
							/>
						</FormControl>

						<FormControl
							component="fieldset"
							fullWidth
							margin="normal"
						>
							<FormLabel>Additions</FormLabel>
							<FormControlLabel
								control={
									<Checkbox
										value="refundable"
										checked={additions.includes(
											"refundable"
										)}
										onChange={handleCheckboxChange}
									/>
								}
								label="Refundable"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value="on_demand"
										checked={additions.includes(
											"on_demand"
										)}
										onChange={handleCheckboxChange}
									/>
								}
								label="On Demand"
							/>
							<FormControlLabel
								control={
									<Checkbox
										value="negotiable"
										checked={additions.includes(
											"negotiable"
										)}
										onChange={handleCheckboxChange}
									/>
								}
								label="Negotiable"
							/>
						</FormControl>

						<TextField
							select
							fullWidth
							label="User"
							{...register("user")}
							onChange={handleUserChange}
							error={!!errors.user}
							helperText={errors.user?.message}
							margin="normal"
						>
							{users.map((user) => (
								<MenuItem key={user.email} value={user.id}>
									{user.name}
								</MenuItem>
							))}
						</TextField>

						<TextField
							fullWidth
							label="Expired"
							type="date"
							InputLabelProps={{ shrink: true }}
							{...register("expired")}
							onChange={handleDateChange}
							error={!!errors.expired}
							helperText={errors.expired?.message}
							margin="normal"
						/>

						<TextField
							fullWidth
							label="Price"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										$
									</InputAdornment>
								),
							}}
							{...register("price")}
							error={!!errors.price}
							helperText={errors.price?.message}
							margin="normal"
						/>
					</form>
				</CardContent>
				<CardActions style={{ justifyContent: "flex-end" }}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleSubmit(onSubmit)}
					>
						Save
					</Button>
				</CardActions>
			</Card>
		</MainLayout>
	);
};

export default CreateOfferForm;

// import React from "react";
// import { useForm } from "react-hook-form";
// import {
// 	Card,
// 	CardContent,
// 	CardActions,
// 	Button,
// 	TextField,
// 	FormControl,
// 	FormControlLabel,
// 	FormLabel,
// 	RadioGroup,
// 	Radio,
// 	Checkbox,
// 	MenuItem,
// } from "@mui/material";

// const CreateOfferForm = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();

// 	const onSubmit = (data: any) => {
// 		console.log("Form Data:", data);
// 	};

// 	return (
// 		<Card>
// 			<CardContent>
// 				<form onSubmit={handleSubmit(onSubmit)}>
// 					{/* Plan Type */}
// 					<FormControl component="fieldset" fullWidth margin="normal">
// 						<FormLabel component="legend">Plan Type</FormLabel>
// 						<RadioGroup row defaultValue="monthly">
// 							<FormControlLabel
// 								value="pay-as-you-go"
// 								control={
// 									<Radio
// 										{...register("planType", {
// 											required: true,
// 										})}
// 									/>
// 								}
// 								label="Pay As You Go"
// 							/>
// 							<FormControlLabel
// 								value="monthly"
// 								control={
// 									<Radio
// 										{...register("planType", {
// 											required: true,
// 										})}
// 									/>
// 								}
// 								label="Monthly"
// 							/>
// 							<FormControlLabel
// 								value="yearly"
// 								control={
// 									<Radio
// 										{...register("planType", {
// 											required: true,
// 										})}
// 									/>
// 								}
// 								label="Yearly"
// 							/>
// 						</RadioGroup>
// 						{errors.planType && (
// 							<p style={{ color: "red" }}>
// 								Plan Type is required
// 							</p>
// 						)}
// 					</FormControl>

// 					{/* Additions */}
// 					<FormControl component="fieldset" fullWidth margin="normal">
// 						<FormLabel component="legend">Additions</FormLabel>
// 						<FormControlLabel
// 							control={<Checkbox {...register("refundable")} />}
// 							label="Refundable"
// 						/>
// 						<FormControlLabel
// 							control={<Checkbox {...register("onDemand")} />}
// 							label="On demand"
// 						/>
// 						<FormControlLabel
// 							control={<Checkbox {...register("negotiable")} />}
// 							label="Negotiable"
// 						/>
// 					</FormControl>

// 					{/* User */}
// 					<TextField
// 						select
// 						label="User"
// 						fullWidth
// 						margin="normal"
// 						{...register("user", { required: true })}
// 						defaultValue=""
// 					>
// 						<MenuItem value="jason_momoa">Jason Momoa</MenuItem>
// 						<MenuItem value="john_doe">John Doe</MenuItem>
// 						<MenuItem value="jane_doe">Jane Doe</MenuItem>
// 					</TextField>
// 					{errors.user && (
// 						<p style={{ color: "red" }}>User is required</p>
// 					)}

// 					{/* Expired */}
// 					<TextField
// 						label="Expired"
// 						type="date"
// 						fullWidth
// 						margin="normal"
// 						{...register("expired", { required: true })}
// 						InputLabelProps={{ shrink: true }}
// 					/>
// 					{errors.expired && (
// 						<p style={{ color: "red" }}>
// 							Expiration date is required
// 						</p>
// 					)}

// 					{/* Price */}
// 					<TextField
// 						label="Price"
// 						type="number"
// 						fullWidth
// 						margin="normal"
// 						{...register("price", { required: true, min: 1 })}
// 					/>
// 					{errors.price && (
// 						<p style={{ color: "red" }}>
// 							Price is required and must be greater than 0
// 						</p>
// 					)}
// 				</form>
// 			</CardContent>

// 			{/* Footer */}
// 			<CardActions style={{ justifyContent: "flex-end" }}>
// 				<Button
// 					type="submit"
// 					variant="contained"
// 					color="primary"
// 					onClick={handleSubmit(onSubmit)}
// 				>
// 					Save
// 				</Button>
// 			</CardActions>
// 		</Card>
// 	);
// };

// export default CreateOfferForm;
