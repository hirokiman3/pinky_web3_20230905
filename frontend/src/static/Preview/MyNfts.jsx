import { Container, Box, ImageList, ImageListItem } from "@mui/material"
import Navbar from "../../components/Navbar"

export default function MyNfts() {
	// dummy data
	const data = [
		{
			id: 1,
			img: "https://i.pinimg.com/736x/a7/3a/f7/a73af7c3f74533c2a862b9d5b6cc99e6.jpg",
			title: "Nature's Beauty",
			user: "artlover123",
			date: "2023-05-23",
			price: "0.0002 ETH",
			description:
				"Immerse yourself in the beauty of nature with this stunning NFT artwork.",
		},
		{
			id: 2,
			img: "https://i.pinimg.com/originals/a2/84/9b/a2849b91cef95b39a62b45d943152cd1.jpg",
			title: "Futuristic Cityscape",
			user: "digitalartist456",
			date: "2023-05-22",
			price: "0.0002 ETH",
			description:
				"Step into the future with this captivating NFT artwork showcasing a cityscape of tomorrow.",
		},
		{
			id: 3,
			img: "https://i.etsystatic.com/30251997/r/il/1aebd9/3715641872/il_fullxfull.3715641872_s24l.jpg",
			title: "Underwater Symphony",
			user: "aquaticart",
			date: "2023-05-21",
			price: "0.0002 ETH",
			description:
				"Dive into the depths of the ocean and explore the mesmerizing underwater world through this enchanting NFT artwork.",
		},
		{
			id: 4,
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpFXlOmDyzF-bsJJAIoyZAtSGImlnKsz-mln9YqonVXt-w86x3eysCRa-k4CLy4o7C3Lw&usqp=CAU",
			title: "Realm of Myth",
			user: "fantasyartist789",
			date: "2023-05-20",
			price: "0.0002 ETH",
			description:
				"Embark on a mythical journey through this captivating NFT artwork filled with fantastical creatures and magical landscapes.",
		},
		{
			id: 5,
			img: "https://i.pinimg.com/736x/10/d2/31/10d2313d6f321909c93b61c332371d0a.jpg",
			title: "Culinary Delights",
			user: "foodartfanatic",
			date: "2023-05-19",
			price: "0.0002 ETH",
			description:
				"Savor the flavors and indulge in the culinary delights presented in this delectable NFT artwork.",
		},
		{
			id: 6,
			img: "https://tiktechtalk.com/wp-content/uploads/2021/08/what-is-nft-1024x1024.png",
			title: "Art Meets Technology",
			user: "techartenthusiast",
			date: "2023-05-18",
			price: "0.0002 ETH",
			description:
				"Experience the seamless fusion of art and technology with this captivating NFT artwork.",
		},
		{
			id: 7,
			img: "https://fiverr-res.cloudinary.com/t_portfolio_project_grid,q_auto,f_auto,q_auto,f_auto/attachments/project_item/attachment/041fdfc49a6107766909e24e7b2636ce-1655888409840/Lalala3.png",
			title: "Urban Vibe",
			user: "streetartlover",
			date: "2023-05-17",
			price: "0.0002 ETH",
			description:
				"Capture the essence of street art and urban culture with this vibrant NFT artwork.",
		},
		{
			id: 8,
			img: "https://images-platform.99static.com/9b_8yMSi0gm9CCfUFTm_ZQkUUTg=/0x0:2000x2000/500x500/top/smart/99designs-contests-attachments/130/130669/attachment_130669166",
			title: "Cosmic Wonder",
			user: "spaceartlover",
			date: "2023-05-16",
			price: "0.0002 ETH",
			description:
				"Embark on a cosmic journey and witness the vastness and beauty of outer space through this mesmerizing NFT artwork.",
		},
		{
			id: 9,
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2DBQ13fgM7JtwWYPb8uJBA4meNwMVIPrnb0gG5IimiuVgJVsJRy0o0pdiyflflGT9qV4&usqp=CAU",
			title: "Pixel Art Mastery",
			user: "pixelartist789",
			date: "2023-05-15",
			price: "0.0002 ETH",
			description:
				"Immerse yourself in the nostalgic charm of pixel art through this meticulously crafted NFT artwork.",
		},
		{
			id: 10,
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfmWynylybGWHN6y6MdDHfJ_MpjofIop6WEQ&usqp=CAU",
			title: "Celestial Horizons",
			user: "astroartenthusiast",
			date: "2023-05-14",
			price: "0.0002 ETH",
			description:
				"Unlock the secrets of the universe with this ethereal NFT artwork inspired by horoscope and astrology themes.",
		},
		{
			id: 11,
			img: "https://i.pinimg.com/736x/9d/94/64/9d94641b3554c1ea2ede713a2650f362.jpg",
			title: "Tattooed Expression",
			user: "tattooartlover",
			date: "2023-05-13",
			price: "0.0002 ETH",
			description:
				"Experience the artistry and symbolism of tattoos through this expressive NFT artwork.",
		},
	]

	return (
		<>
			<Navbar />
			<Container>
				<Box sx={{ marginTop: 10, marginBottom: 5 }}>
					<h2 className="text-4xl font-bold mb-1 text-pink-600 dark:text-pink-500">
						Marketplace | Your NFTs
					</h2>
					<h5 className="text-slate-800 dark:text-slate-200">
						See how other creators created their art works.
					</h5>
				</Box>
				<ImageList sx={{ width: "100%", height: "100%", paddingY: 2 }} cols={5}>
					{data.map(item => {
						return (
							<ImageListItem key={item.id}>
								<Box
									className="nft-card"
									sx={{
										overflow: "hidden",
										minHeight: "200px",
										borderRadius: "4px",
										transition: "200ms",
										cursor: "pointer",
										margin: 1,
										"&:hover": {
											// boxShadow: "0px 6px 8px rgba(236, 72, 153, 0.6)",
											transform: "translateY(-10px)",
										},
									}}
								>
									<img
										src={item.img}
										srcSet={item.img}
										alt={item.title}
										loading="lazy"
										className="h-[300px] md:h-[200px]"
										style={{
											width: "100%",
											objectFit: "cover",
											overflow: "hidden",
											borderRadius: "4px",
											margin: 0,
											pointerEvents: "none",
										}}
									/>
									<div className="my-4">
										<h4 className="mt-3 font-bold text-[17px] dark:text-slate-200 text uppercase truncate lg:max-w-[200px]">
											{item.title}
										</h4>
										<h5 className="mt-1 text-slate-600 dark:text-slate-300">
											{item.price}
										</h5>
									</div>
								</Box>
							</ImageListItem>
						)
					})}
				</ImageList>
			</Container>
		</>
	)
}
