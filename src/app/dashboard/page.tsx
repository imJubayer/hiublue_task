"use client";
import {
	Typography,
	Grid,
	Card,
	CardContent,
	TextField,
	MenuItem,
	Box,
} from "@mui/material";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";
import axios from "@/service/axiosService";
import { DashboardData } from "@/types/data";
import Cards from "./Cards";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import ServerSideDataGrid from "@/components/ServerSideDataGrid";
import { DashboardTableColumns } from "@/utils/columns";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const filterOptions = [
	{ label: "Yearly", value: "yearly" },
	{ label: "Monthly", value: "monthly" },
];

export default function Dashboard() {
	const [filter, setFilter] = useState("this-week");
	const [tableFilter, setTableFilter] = useState("");
	const [weekData, setWeekData] = useState<DashboardData>();
	const [data, setData] = useState<any>(null);
	const [tableData, setTableData] = useState<any>(null);
	const [loading, setLoading] = useState(false);
	const [tableDataloading, setTableLoading] = useState(false);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [totalRows, setTotalRows] = useState(0);
	const [search, setSearch] = useState("");

	const getDashboardData = async () => {
		setLoading(true);
		await axios
			.get(`/dashboard/summary?filter=${filter}`)
			.then((response) => {
				if (filter === "this-week") {
					setWeekData(response.data.current);
				} else {
					setWeekData(response.data.previous);
				}
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.log(error.response.data.error);
			});
	};

	const getDashboardChartData = async () => {
		await axios
			.get(`/dashboard/stat?filter=${filter}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error.response.data.error);
			});
	};

	const getDashboardTableData = async () => {
		setTableLoading(true);
		await axios
			.get(
				`/offers?page=${
					page + 1
				}&per_page=${rowsPerPage}&search=${search}&type=${tableFilter}`
			)
			.then((response) => {
				setTableData(response.data.data);
				setTotalRows(response.data.meta.total);
				setTableLoading(false);
			})
			.catch((error) => {
				console.log(error.response.data.error);
				setTableLoading(false);
			});
	};

	useEffect(() => {
		getDashboardData();
		getDashboardChartData();
	}, [filter]);

	useEffect(() => {
		if (search) {
			setPage(0);
		}
		getDashboardTableData();
	}, [page, rowsPerPage, tableFilter, search]);

	// Categories (Days of the week)
	const categories = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	// Bar Chart Data (Website Visits)
	const barChartOptions: ApexOptions = {
		chart: { type: "bar", toolbar: { show: false } },
		xaxis: { categories },
		plotOptions: { bar: { columnWidth: "50%", borderRadius: 4 } },
		colors: ["#ebbd34", "#1a6926"], // Blue for Desktop, Green for Mobile
		dataLabels: { enabled: false },
	};

	const barChartSeries = [
		{
			name: "Desktop Visits",
			data: categories.map(
				(day) => data?.website_visits[day.toLowerCase()]?.desktop || 0
			),
		},
		{
			name: "Mobile Visits",
			data: categories.map(
				(day) => data?.website_visits[day.toLowerCase()]?.mobile || 0
			),
		},
	];

	// Line Chart Data (Offers Sent)
	const lineChartOptions: ApexOptions = {
		chart: { type: "line", toolbar: { show: false } },
		stroke: { curve: "smooth" },
		xaxis: { categories },
		colors: ["#FF5733"], // Red for Offers Sent
		dataLabels: { enabled: false },
	};

	const lineChartSeries = [
		{
			name: "Offers Sent",
			data: categories.map(
				(day) => data?.offers_sent[day.toLowerCase()] || 0
			),
		},
	];

	return (
		<MainLayout loading={loading}>
			<Grid
				container
				justifyContent={"space-between"}
				alignItems="center"
			>
				<Grid item>
					<Typography variant="h5">Dashboard</Typography>
				</Grid>
				<Grid item>
					<TextField
						select
						value={filter}
						fullWidth
						variant="outlined"
						size="small"
						onChange={(e: any) => setFilter(e.target.value)}
					>
						<MenuItem value="this-week">This Week</MenuItem>
						<MenuItem value="previous-week">Previous Week</MenuItem>
					</TextField>
				</Grid>
			</Grid>
			<Cards weekData={weekData} />

			<Grid container spacing={3} sx={{ marginTop: 3 }}>
				{/* Bar Chart Card */}
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant="h6">Website Visits</Typography>
							<Chart
								options={barChartOptions}
								series={barChartSeries}
								type="bar"
								height={300}
							/>
						</CardContent>
					</Card>
				</Grid>

				{/* Line Chart Card */}
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant="h6">Offers Sent</Typography>
							<Chart
								options={lineChartOptions}
								series={lineChartSeries}
								type="line"
								height={300}
								width="100%"
							/>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
			<Grid container spacing={3} sx={{ marginY: 3 }}>
				<Grid item xs={12}>
					<Card
						sx={{
							display: "flex",
							flexDirection: "column",
							minHeight: "100%",
						}}
					>
						<CardContent
							sx={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Typography variant="h6">Offers List</Typography>
							<Box sx={{ flexGrow: 1, overflow: "auto" }}>
								<ServerSideDataGrid
									loading={tableDataloading}
									columns={DashboardTableColumns}
									data={tableData}
									page={page}
									rowsPerPage={rowsPerPage}
									totalRows={totalRows}
									onPageChange={setPage}
									onRowsPerPageChange={setRowsPerPage}
									onSearchChange={setSearch}
									onFilterChange={setTableFilter}
									filterOptions={filterOptions}
								/>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</MainLayout>
	);
}
