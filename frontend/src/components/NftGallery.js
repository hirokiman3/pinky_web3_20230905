import { useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useTheme, useMediaQuery, Box } from '@mui/material'
import './Style.css'
import PreviewModal from '../pages/prompt/PreviewModal'
import LockScroll from './LockScroll'

export default function NftGallery({ nftsData }) {
	// Make Image List Responsive
	const theme = useTheme()
	const isXs = useMediaQuery(theme.breakpoints.only('xs'))
	const isSm = useMediaQuery(theme.breakpoints.only('sm'))
	const isMd = useMediaQuery(theme.breakpoints.only('md'))
	const isLg = useMediaQuery(theme.breakpoints.only('lg'))
	const isXl = useMediaQuery(theme.breakpoints.only('xl'))
	const getCols = () => {
		if (isXs) return 2
		if (isSm) return 3
		if (isMd) return 4
		if (isLg) return 5
		if (isXl) return 6
		return 2 // Default column configuration
	}

	// State variables
	const [previewOpen, setPreviewOpen] = useState(false)
	const [activeImage, setActiveImage] = useState({
		id: '',
		src: '',
		prompt: '',
		user: '',
		date: '',
	})
	const [imageLoaded, setImageLoaded] = useState(false)

	// Modal functions
	const handlePreview = (e, key) => {
		// Find the clicked item using the key
		const clickedItem = nftsData.find(item => item.id === key)

		// Check if the clicked item exists
		if (clickedItem) {
			// Set the active image and open the preview
			setActiveImage({
				src: clickedItem.img,
				prompt: clickedItem.prompt,
				date: clickedItem.date,
				user: clickedItem.user,
			})
			setPreviewOpen(true)
		}
	}

	const handlePreviewClose = () => {
		setImageLoaded(false)
		setPreviewOpen(false)
	}

	return (
		<>
			{previewOpen && <LockScroll />}
			<ImageList
				sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
				cols={getCols()}
			>
				{nftsData.map(item => (
					<ImageListItem
						key={item.id}
						onClick={e => handlePreview(e, item.id)}
						sx={{
							cursor: 'pointer',
							'& img': {
								transition: '300ms',
							},
						}}
					>
						<Box
							className='nft-card'
							sx={{
								backgroundColor: '#fff',
								overflow: 'hidden',
								minHeight: '200px',
								padding: 1,
								borderRadius: '10px',
								boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
								transition: '200ms',
								'&:hover': {
									transform: 'rotate(2deg)',
								},
							}}
						>
							<img
								src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
								srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
								alt={item.title}
								loading='lazy'
								style={{
									width: '100%',
									height: '200px',
									objectFit: 'cover',
									overflow: 'hidden',
									borderRadius: '10px',
									margin: 0,
									pointerEvents: 'none',
								}}
							/>
							<h4 style={{ margin: '3px 0' }}>{item.title}</h4>
						</Box>
					</ImageListItem>
				))}
			</ImageList>

			<PreviewModal
				previewOpen={previewOpen}
				handlePreviewClose={handlePreviewClose}
				activeImage={activeImage}
				imageLoaded={imageLoaded}
				setImageLoaded={setImageLoaded}
			/>
		</>
	)
}
