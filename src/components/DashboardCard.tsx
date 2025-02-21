import { Card, CardContent, Typography } from "@mui/material";

type DashboardCardPropsType = {
	title: string;
	value: string;
	subtitle?: string;
};

export default function DashboardCard({
	title,
	value,
	subtitle,
}: DashboardCardPropsType) {
	return (
		<Card>
			<CardContent>
				<Typography variant="body1">{title}</Typography>
				<Typography variant="h4">{value}</Typography>
				<Typography variant="body2">{subtitle}</Typography>
			</CardContent>
		</Card>
	);
}
