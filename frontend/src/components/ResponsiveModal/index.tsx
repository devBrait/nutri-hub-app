import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";

interface ResponsiveModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: ReactNode;
	maxWidth?: number;
}

export default function ResponsiveModal({
	open,
	onClose,
	title,
	children,
	maxWidth = 380,
}: ResponsiveModalProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	if (isMobile) {
		return (
			<SwipeableDrawer
				anchor="bottom"
				open={open}
				onClose={onClose}
				onOpen={() => {}}
				disableSwipeToOpen
				slotProps={{
					paper: {
						sx: {
							borderRadius: "20px 20px 0 0",
							p: 3,
							pb: "calc(36px + env(safe-area-inset-bottom))",
							bgcolor: theme.palette.neutral.card,
						},
					},
				}}
			>
				<Box
					sx={{
						width: 36,
						height: 4,
						bgcolor: theme.palette.divider,
						borderRadius: "99px",
						mx: "auto",
						mb: 2.5,
					}}
				/>
				<Typography
					sx={{
						fontSize: "1.05rem",
						fontWeight: 700,
						color: theme.palette.typography.mainText,
						textAlign: "center",
						mb: 2.5,
					}}
				>
					{title}
				</Typography>
				{children}
			</SwipeableDrawer>
		);
	}

	return (
		<Dialog
			open={open}
			onClose={onClose}
			slotProps={{
				paper: {
					sx: { borderRadius: "20px", p: 3, width: maxWidth },
				},
			}}
		>
			<Box sx={{ position: "relative" }}>
				<IconButton
					onClick={onClose}
					sx={{
						position: "absolute",
						top: -8,
						right: -8,
						width: 28,
						height: 28,
						bgcolor: theme.palette.neutral.background,
					}}
				>
					<CloseIcon sx={{ fontSize: "0.95rem" }} />
				</IconButton>
				<Typography
					sx={{
						fontSize: "1.05rem",
						fontWeight: 700,
						color: theme.palette.typography.mainText,
						textAlign: "center",
						mb: 2.5,
					}}
				>
					{title}
				</Typography>
				{children}
			</Box>
		</Dialog>
	);
}
