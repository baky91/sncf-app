import CityCards from '../components/CityCards'

function Home({onSelectStation}) {
  return (
    <main>
      <CityCards onSelectStation={onSelectStation}/>
    </main>
  )
}

export default Home
