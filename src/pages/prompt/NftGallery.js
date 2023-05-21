import { useState } from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useTheme, useMediaQuery, Modal, Box, Skeleton } from '@mui/material'
import './Styles.css'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

export default function NftGallery() {
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
	const [previewOpen, setPreviewOpen] = useState(false)
	const [activeImage, setActiveImage] = useState({ src: '', title: '' })
	const [imageLoaded, setImageLoaded] = useState(false)
	const handlePreviewClose = () => {
		setImageLoaded(false)
		setPreviewOpen(false)
	}
	const handlePreview = e => {
		// Find the nearest image element by traversing up the DOM tree
		const imageElement = e.currentTarget.querySelector('img')
		// Check if an image element exists
		if (imageElement) {
			// Access the source of the image and remove any query parameters
			const src = imageElement.src.split('?')[0]

			// Set the active image and open the preview
			setActiveImage({ src: src, title: e.target.alt })
			setPreviewOpen(true)
		}
	}

	return (
		<>
			<ImageList
				sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
				cols={getCols()}
			>
				{itemData.map(item => (
					<ImageListItem
						key={item.img}
						onClick={handlePreview}
						sx={{
							cursor: 'pointer',
							'& img': {
								transition: '300ms',
							},
							// '&:hover img': {
							// 	transition: '300ms',
							// 	transform: 'scale(1.1)',
							// },
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
								}}
							/>
							<h4 style={{ margin: '3px 0' }}>{item.title}</h4>
						</Box>
					</ImageListItem>
				))}
			</ImageList>
			<Modal
				open={previewOpen}
				onClose={handlePreviewClose}
				disableScrollLock
				sx={{ height: '100%' }}
				className='nft-modal'
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						outline: 'none',
					}}
				>
					<Box
						sx={{
							minHeight: { md: 350 },
							width: { xs: 300, sm: 350 },
							margin: 'auto',
							backgroundColor: '#fff',
							borderRadius: 5,
							outline: 'none',
							padding: 2,
						}}
					>
						{!imageLoaded && (
							<Skeleton variant='rectangular' width='100%' height={350} />
						)}
						<img
							src={`${activeImage.src}`}
							onLoad={() => setImageLoaded(true)}
							style={{
								display: imageLoaded ? 'block' : 'none',
								height: '350px',
								width: '100%',
								objectFit: 'cover',
								borderRadius: '10px',
								overflow: 'hidden',
							}}
							alt='preview'
						/>
						<Box
							component='div'
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								marginTop: 1,
							}}
						>
							<h4 style={{ margin: '5px 0' }}>
								{activeImage.title === undefined ? (
									<Skeleton width={200} />
								) : (
									activeImage.title
								)}
							</h4>
							<FavoriteBorderRoundedIcon sx={{ cursor: 'pointer' }} />
						</Box>
					</Box>
				</Box>
			</Modal>
		</>
	)
}

const itemData = [
	{
		img: 'https://i.pinimg.com/736x/a7/3a/f7/a73af7c3f74533c2a862b9d5b6cc99e6.jpg',
		title: 'Tiny Azuki',
	},
	{
		img: 'https://i.pinimg.com/originals/a2/84/9b/a2849b91cef95b39a62b45d943152cd1.jpg',
		title: 'Makima',
	},
	{
		img: 'https://i.etsystatic.com/30251997/r/il/1aebd9/3715641872/il_fullxfull.3715641872_s24l.jpg',
		title: 'Sealed',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpFXlOmDyzF-bsJJAIoyZAtSGImlnKsz-mln9YqonVXt-w86x3eysCRa-k4CLy4o7C3Lw&usqp=CAU',
		title: 'Thorfin Ape',
	},
	{
		img: 'https://i.pinimg.com/736x/10/d2/31/10d2313d6f321909c93b61c332371d0a.jpg',
		title: 'Rabbit Pizzaster',
	},
	{
		img: 'https://tiktechtalk.com/wp-content/uploads/2021/08/what-is-nft-1024x1024.png',
		title: 'Chetosta',
	},
	{
		img: 'https://fiverr-res.cloudinary.com/t_portfolio_project_grid,q_auto,f_auto,q_auto,f_auto/attachments/project_item/attachment/041fdfc49a6107766909e24e7b2636ce-1655888409840/Lalala3.png',
		title: 'Street Doggo',
	},
	{
		img: 'https://images-platform.99static.com/9b_8yMSi0gm9CCfUFTm_ZQkUUTg=/0x0:2000x2000/500x500/top/smart/99designs-contests-attachments/130/130669/attachment_130669166',
		title: 'Gallactic Dog',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2DBQ13fgM7JtwWYPb8uJBA4meNwMVIPrnb0gG5IimiuVgJVsJRy0o0pdiyflflGT9qV4&usqp=CAU',
		title: 'Pixels Freak',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5P4Qb00yse7qpXZBEyjNZ8ym54ZHCbBNC-w&usqp=CAU',
		title: 'Koala Beast',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmWynylybGWHN6y6MdDHfJ_MpjofIop6WEQ&usqp=CAU',
		title: 'Horoscopic Ape',
	},
	{
		img: 'https://i.pinimg.com/736x/9d/94/64/9d94641b3554c1ea2ede713a2650f362.jpg',
		title: 'Tattoo Bunny',
	},
]
