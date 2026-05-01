import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import BottomNav, { BOTTOM_NAV_HEIGHT } from "../BottomNav";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

interface TopbarConfig {
	title: string;
	right?: ReactNode;
}

interface AppLayoutContextValue {
	setTopbar: (config: TopbarConfig) => void;
}

const AppLayoutContext = createContext<AppLayoutContextValue | undefined>(undefined);

export function useAppLayout() {
	const ctx = useContext(AppLayoutContext);
	if (!ctx) throw new Error("useAppLayout deve ser usado dentro de AppLayout");
	return ctx;
}

export default function AppLayout() {
	const theme = useTheme();
	const [topbar, setTopbarState] = useState<TopbarConfig>({ title: "" });

	const value = useMemo<AppLayoutContextValue>(
		() => ({ setTopbar: setTopbarState }),
		[],
	);

	return (
		<AppLayoutContext.Provider value={value}>
			<Box
				sx={{
					display: "flex",
					minHeight: "100vh",
					bgcolor: theme.palette.neutral.background,
				}}
			>
				<Sidebar />
				<Box
					component="main"
					sx={{
						flex: 1,
						display: "flex",
						flexDirection: "column",
						minWidth: 0,
						pb: { xs: `${BOTTOM_NAV_HEIGHT}px`, md: 0 },
					}}
				>
					<Topbar title={topbar.title} right={topbar.right} />
					<Box sx={{ p: { xs: 2, md: 4 }, flex: 1 }}>
						<Outlet />
					</Box>
				</Box>
				<BottomNav />
			</Box>
		</AppLayoutContext.Provider>
	);
}
