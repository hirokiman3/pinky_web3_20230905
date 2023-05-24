import { useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useTheme, useMediaQuery, Box } from '@mui/material'
import './Styles.css'
import PreviewModal from './PreviewModal'

export default function NftGallery() {
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
		const clickedItem = itemData.find(item => item.id === key)

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
			<ImageList
				sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
				cols={getCols()}
			>
				{itemData.map(item => (
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

const itemData = [
	{
		id: 1,
		img: 'https://i.pinimg.com/736x/a7/3a/f7/a73af7c3f74533c2a862b9d5b6cc99e6.jpg',
		prompt: 'Generate an NFT artwork inspired by nature.',
		user: 'artlover123',
		date: '2023-05-23',
	},
	{
		id: 2,
		img: 'https://i.pinimg.com/originals/a2/84/9b/a2849b91cef95b39a62b45d943152cd1.jpg',
		prompt: 'Create an NFT representing a futuristic cityscape.',
		user: 'digitalartist456',
		date: '2023-05-22',
	},
	{
		id: 3,
		img: 'https://i.etsystatic.com/30251997/r/il/1aebd9/3715641872/il_fullxfull.3715641872_s24l.jpg',
		prompt: 'Design an NFT artwork showcasing underwater life.',
		user: 'aquaticart',
		date: '2023-05-21',
	},
	{
		id: 4,
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpFXlOmDyzF-bsJJAIoyZAtSGImlnKsz-mln9YqonVXt-w86x3eysCRa-k4CLy4o7C3Lw&usqp=CAU',
		prompt: 'Create a fantasy-themed NFT artwork with mythical creatures.',
		user: 'fantasyartist789',
		date: '2023-05-20',
	},
	{
		id: 5,
		img: 'https://i.pinimg.com/736x/10/d2/31/10d2313d6f321909c93b61c332371d0a.jpg',
		prompt: 'Design an NFT artwork inspired by food and culinary delights.',
		user: 'foodartfanatic',
		date: '2023-05-19',
	},
	{
		id: 6,
		img: 'https://tiktechtalk.com/wp-content/uploads/2021/08/what-is-nft-1024x1024.png',
		prompt:
			'Create an NFT representing the intersection of technology and art.',
		user: 'techartenthusiast',
		date: '2023-05-18',
	},
	{
		id: 7,
		img: 'https://fiverr-res.cloudinary.com/t_portfolio_project_grid,q_auto,f_auto,q_auto,f_auto/attachments/project_item/attachment/041fdfc49a6107766909e24e7b2636ce-1655888409840/Lalala3.png',
		prompt: 'Design an NFT artwork showcasing street art and urban culture.',
		user: 'streetartlover',
		date: '2023-05-17',
	},
	{
		id: 8,
		img: 'https://images-platform.99static.com/9b_8yMSi0gm9CCfUFTm_ZQkUUTg=/0x0:2000x2000/500x500/top/smart/99designs-contests-attachments/130/130669/attachment_130669166',
		prompt:
			'Create an NFT representing the vastness and beauty of outer space.',
		user: 'spaceartlover',
		date: '2023-05-16',
	},
	{
		id: 9,
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2DBQ13fgM7JtwWYPb8uJBA4meNwMVIPrnb0gG5IimiuVgJVsJRy0o0pdiyflflGT9qV4&usqp=CAU',
		prompt: 'Design an NFT artwork using pixel art techniques.',
		user: 'pixelartist789',
		date: '2023-05-15',
	},
	{
		id: 10,
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmWynylybGWHN6y6MdDHfJ_MpjofIop6WEQ&usqp=CAU',
		prompt: 'Create an NFT artwork based on horoscope and astrology themes.',
		user: 'astroartenthusiast',
		date: '2023-05-14',
	},
	{
		id: 11,
		img: 'https://i.pinimg.com/736x/9d/94/64/9d94641b3554c1ea2ede713a2650f362.jpg',
		prompt: 'Design an NFT artwork inspired by tattoo art.',
		user: 'tattooartlover',
		date: '2023-05-13',
	},
]
