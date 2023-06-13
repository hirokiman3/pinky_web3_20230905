import * as React from "react"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Logout from "@mui/icons-material/Logout"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signout } from "../actions/userActions"
import CollectionsIcon from "@mui/icons-material/Collections"
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos"
import LockScroll from "./LockScroll"

export default function AccountMenu() {
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	//   Benny is here
	const dispatch = useDispatch()

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleSignOut = () => {
		dispatch(signout())
		navigate("/")
	}
	return (
    <React.Fragment>
      {open && <LockScroll />}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip
          title='Account settings'
          sx={{
            overflow: "hidden",
          }}
        >
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 0 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup='true'
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 42, height: 42 }}
              src='https://nftevening.com/wp-content/uploads/2022/03/1-19.png'
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/settings")}>
          <Avatar
            src='https://nftevening.com/wp-content/uploads/2022/03/1-19.png'
            alt='skelton king'
          />
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/")}>
          <ListItemIcon>
            <AddToPhotosIcon fontSize='small' />
          </ListItemIcon>
          Prompt
        </MenuItem>
        <MenuItem onClick={() => navigate("/your-nfts")}>
          <ListItemIcon>
            <CollectionsIcon fontSize='small' />
          </ListItemIcon>
          Your NFTs
        </MenuItem>
        <MenuItem onClick={() => navigate("/marketplace")}>
          <ListItemIcon>
            <CollectionsIcon fontSize='small' />
          </ListItemIcon>
          Marketplace
        </MenuItem>
        <Divider />
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
