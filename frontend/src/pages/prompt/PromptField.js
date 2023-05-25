import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import CelebrationIcon from '@mui/icons-material/Celebration'
import LoadingModal from '../../components/LoadingModal'
import LockScroll from '../../components/LockScroll'

export default function PromptField() {
	const [open, setOpen] = useState(false)
	return (
		<Box
			component='form'
			sx={{
				marginBottom: { xs: 10, md: 20 },
				width: '100%',
				position: { md: 'sticky' },
				top: 30,
				zIndex: 100,
			}}
			noValidate
			autoComplete='off'
		>
			{open && <LockScroll />}
			<Box
				component='div'
				sx={{
					height: '100%',
					boxShadow:
						'0 4px 8px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.1);',
					padding: '10px',
					borderRadius: '10px',
					backgroundColor: 'rgba(255,255,255,0.95)',
					width: { md: '96%' },
					margin: '0 auto',
					'& textarea': {
						margin: '0 auto',
						resize: 'none',
						height: { xs: '100px', md: '25px' },
					},
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
				}}
			>
				<textarea
					style={{
						border: 'solid transparent',
						outline: 'none',
						padding: '0 5px',
						width: '100%',
						backgroundColor: 'transparent',
						fontSize: '16px',
						fontFamily: 'Poppins',
					}}
					placeholder='A mystical forest at twilight, where ancient trees stand tall and majestic.'
				></textarea>
				<Button
					sx={{
						background: 'transparent',
						border: 'transparent',
						cursor: 'pointer',
						padding: '0 20px',
						borderLeft: { md: '1px solid #ccc' },
						display: 'flex',
						alignItems: 'center',
					}}
					variant='text'
					endIcon={<CelebrationIcon />}
					onClick={() => setOpen(true)}
				>
					Generate
				</Button>
			</Box>
			<LoadingModal open={open} setOpen={setOpen} />
		</Box>
	)
}
