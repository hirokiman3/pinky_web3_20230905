import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Lottie from 'lottie-react'
import LoadingAnimation from '../assets/lottie-animations/loading.json'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 250,
	color: 'rgba(255,255,255,0.8)',
	textAlign: 'center',
	marginTop: -6,
	'& p': { marginTop: -6 },
}

export default function LoadingModal({ open, setOpen }) {
	const handleClose = () => setOpen(false)

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
				disableScrollLock
			>
				<Box sx={style}>
					<Lottie animationData={LoadingAnimation} loop={true} />
					<p>Generating NFT</p>
				</Box>
			</Modal>
		</div>
	)
}
