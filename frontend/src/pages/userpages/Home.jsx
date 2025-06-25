import React from 'react'
import { Button } from '../../components/ui/Button.jsx';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <section className='min-h-[80vh] text-6xl px-4 py-12 flex flex-col items-center justify-center text-center '>
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight">Discover Your Style</h1>
        <p className="text-gray-400 text-base md:text-xl mt-6">Trendy products at your fingertips.</p>

        <Link to="/products">
        <Button className="bg-[#0D0D0D] text-[#E4E4E4] hover:bg-[#2c2c2c] px-6 py-3 text-sm rounded-md">
          Shop Now →
        </Button>
        </Link>
      </section>
    </div>
  )
}

export default Home
