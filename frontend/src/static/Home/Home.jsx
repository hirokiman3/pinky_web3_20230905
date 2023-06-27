import { Container } from "@mui/material"
import Navbar from "../../components/Navbar"
import PromptField from "../../pages/root/PromptField"

export default function Home() {
	return (
    <>
      <Navbar />
      <Container>
        <div className='mt-[7rem]'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-600 leading-tight dark:text-slate-200'>
            <span className='text-pink-600'>Pinky:</span> Unleashing Generative
            <br />
            <span className='text-emerald-500'>AI</span> and
            <span className='text-purple-500'> Blockchain's </span>
            Potential
          </h1>
          <div className='mt-10'>
            <h5 className='dark:text-slate-200 text-slate-600 text-lg font-medium mb-1'>
              Let's Imagine a Cool NFT Together
            </h5>
            <PromptField />
          </div>
        </div>
        <div className='position-absolute bottom-10 flex items-center gap-4 max-md:mb-8'>
          <h4 className='text-lg font-bold dark:text-slate-200'>
            Powered With
          </h4>
          <div className='icons flex gap-2 items-center'>
            <img
              src='https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/chatgpt-icon.svg'
              className='w-[38px]'
              alt='OpenAI ChatGPT Logo'
            />
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Polygon_Blockchain_Matic_Logo.svg/640px-Polygon_Blockchain_Matic_Logo.svg.png'
              alt='polygon blockchain logo'
              className='w-[38px]'
            />
          </div>
        </div>
      </Container>
    </>
  )
}
