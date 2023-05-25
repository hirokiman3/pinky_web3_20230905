import { Box, Container } from '@mui/material'
import { useEffect, useState } from 'react'
import NftGallery from '../../components/NftGallery'

export default function GeneratedNfts() {
	// Fetch data
	const [nftsData, setNftsData] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/edoitachi/Enver/master/nftsdata.json'
				)
				const data = await response.json()
				setNftsData(data)
			} catch (error) {
				console.log('Error fetching data:', error)
			}
		}

		fetchData()
	}, [])

	return (
		<Container>
			<Box sx={{ marginTop: 10, marginBottom: 5 }}>
				<h2 style={{ marginBottom: 5 }}>My Generated NFTS</h2>
				<p style={{ margin: 0 }} className='sub-description'>
					Explore and manage your collection of personally generated NFTs
				</p>
			</Box>
			<NftGallery nftsData={nftsData} />
		</Container>
	)
}
