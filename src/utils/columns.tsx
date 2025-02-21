import { Edit, MoreVert } from "@mui/icons-material";
import {
	Box,
	Chip,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const ActionsMenu = ({ row }: { row: any }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleEdit = () => {
		console.log("Edit clicked for:", row);
		handleMenuClose();
	};

	const handleDelete = () => {
		console.log("Delete clicked for:", row);
		handleMenuClose();
	};

	return (
		<>
			<IconButton onClick={handleEdit} size="small" color="primary">
				<Edit />
			</IconButton>

			<IconButton onClick={handleMenuOpen} size="small">
				<MoreVert />
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={handleEdit}>Edit</MenuItem>
				<MenuItem onClick={handleDelete}>Delete</MenuItem>
			</Menu>
		</>
	);
};

export const DashboardTableColumns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 90 },
	{
		field: "user_name",
		headerName: "Name",
		flex: 1,
		renderCell: (params) => (
			<Stack justifyContent="center">
				<Typography variant="overline" fontWeight="bold">
					{params.row.user_name}
				</Typography>
				<Typography variant="caption" color="textSecondary">
					{params.row.email}
				</Typography>
			</Stack>
		),
	},
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "company", headerName: "Company", flex: 1 },
	{ field: "jobTitle", headerName: "Job Title", flex: 1 },
	{ field: "type", headerName: "Type", flex: 1 },
	{
		field: "status",
		headerName: "Status",
		flex: 1,
		renderCell: (params) => {
			const status = params.value; // Get status value

			const statusColors: Record<
				string,
				"success" | "error" | "warning" | "default"
			> = {
				accepted: "success", // Green
				rejected: "error", // Red
				pending: "warning", // Yellow
			};

			return (
				<Chip
					size="small"
					label={status.toUpperCase()}
					color={statusColors[status] || "default"}
				/>
			);
		},
	},
	{
		field: "actions",
		headerName: "Actions",
		width: 120,
		sortable: false,
		renderCell: (params) => <ActionsMenu row={params.row} />,
	},
];
