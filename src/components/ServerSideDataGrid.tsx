import React, { useState, useEffect, useCallback } from "react";
import {
	Box,
	TextField,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
	debounce,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataGridTableProps {
	loading: boolean;
	columns: GridColDef[];
	data: any[];
	page: number;
	rowsPerPage: number;
	totalRows: number;
	onPageChange: (newPage: number) => void;
	onRowsPerPageChange: (newRowsPerPage: number) => void;
	onSearchChange: (query: string) => void;
	onFilterChange: (filterValue: string) => void;
	filterOptions: { label: string; value: string }[];
}

const ServerSideDataGrid: React.FC<DataGridTableProps> = ({
	columns,
	data,
	page,
	rowsPerPage,
	totalRows,
	onPageChange,
	onRowsPerPageChange,
	onSearchChange,
	onFilterChange,
	filterOptions,
	loading,
}) => {
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("");

	const debouncedSearch = useCallback(
		debounce((query) => onSearchChange(query), 500),
		[]
	);

	useEffect(() => {
		debouncedSearch(search);
	}, [search, debouncedSearch]);

	useEffect(() => {
		onFilterChange(filter);
	}, [filter]);

	return (
		<Box sx={{ height: 500, width: "100%", mt: 2 }}>
			{/* Toolbar with Search & Filter */}
			<Box display="flex" justifyContent="space-between" mb={2}>
				{/* Search Input */}
				<TextField
					label="Search..."
					variant="outlined"
					size="small"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				{/* Filter Dropdown */}
				<FormControl size="small" sx={{ minWidth: 150 }}>
					<InputLabel>Type</InputLabel>
					<Select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						label="Filter"
					>
						<MenuItem value="">All</MenuItem>
						{filterOptions.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<DataGrid
				loading={loading}
				columns={columns}
				rows={data}
				paginationMode="server"
				rowCount={totalRows}
				paginationModel={{ page, pageSize: rowsPerPage }} // ✅ Correct for v7
				onPaginationModelChange={(model) => {
					onPageChange(model.page);
					onRowsPerPageChange(model.pageSize);
				}}
				pageSizeOptions={[5, 10, 25, 50]} // ✅ Use this instead of rowsPerPageOptions
				autoHeight
			/>
		</Box>
	);
};

export default ServerSideDataGrid;
