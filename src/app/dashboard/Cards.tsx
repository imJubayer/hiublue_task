import DashboardCard from "@/components/DashboardCard";
import { DashboardData } from "@/types/data";
import { Grid } from "@mui/material";

type CardsPropsType = {
	weekData: DashboardData | undefined;
};

export default function Cards({ weekData }: CardsPropsType) {
	return (
		<Grid container spacing={3} sx={{ marginTop: 3 }}>
			<Grid item xs={12} sm={6} md={4}>
				<DashboardCard
					title="Total active users"
					value={`${
						weekData?.clicks
							? parseInt(weekData.active_users, 10) / 1000
							: 0
					}k`}
					subtitle="Last month"
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<DashboardCard
					title="Total clicks"
					value={`${
						weekData?.clicks
							? parseInt(weekData.clicks, 10) / 1000
							: 0
					}k`}
					subtitle="Last month"
				/>
			</Grid>
			<Grid item xs={12} sm={6} md={4}>
				<DashboardCard
					title="Total apperances"
					value={`${
						weekData?.clicks
							? parseInt(weekData.appearance, 10) / 1000
							: 0
					}k`}
					subtitle="Last month"
				/>
			</Grid>
		</Grid>
	);
}
