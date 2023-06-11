import "./Style.css"
import Logo from "./Logo"
import { Context } from "../App"
import { useContext } from "react"
import AccountMenu from "./AccountMenu"
import DashboardButton from "./DashboardButton"
import { Box, Container } from "@mui/material"
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded"
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded"

function Navbar() {
	const { isDarkMode, setIsDarkMode, userInfo } = useContext(Context)

	const handleModeChange = e => {
		const checked = e.target.checked
		setIsDarkMode(checked)
		document.documentElement.classList.remove("dark", checked)
		document.documentElement.classList.add("bright", !checked)
	}

	return (
		<Box sx={{ marginY: 2 }} className="navbar">
			<Container>
				<Box
					sx={{
						display: "flex",
						gap: 1,
						justifyContent: "space-between",
						alignItems: "center",
						textAlign: { xs: "center", sm: "left" },
						flexDirection: { xs: "column", sm: "row" },
					}}
				>
					<Logo
						sx={{
							width: 120,
							"&:hover": { cursor: "pointer" },
						}}
						isDarkMode={isDarkMode}
					/>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: { xs: 1, md: 2 },
							overflow: "hidden",
						}}
					>
						<Box className="toggle-switch">
							<input
								type="checkbox"
								id="toggle"
								className="toggle-input"
								checked={isDarkMode}
								onChange={handleModeChange}
							/>
							<label htmlFor="toggle" className="toggle-label">
								<LightModeRoundedIcon />
								<DarkModeRoundedIcon />
							</label>
						</Box>
						{userInfo ? (
							<AccountMenu userInfo={userInfo} />
						) : (
							<DashboardButton />
						)}
					</Box>
				</Box>
			</Container>
		</Box>
	)
}

export default Navbar
