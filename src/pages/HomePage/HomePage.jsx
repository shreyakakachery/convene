import RoutesList from "../../components/RoutesList/RoutesList.jsx"
import StopPairsList from "../../components/StopPairsList/StopPairsList.jsx"
import PlacesList from "../../components/PlacesList/PlacesList.jsx"

function HomePage() {
  return (
    <div>
        <p>HomePage.jsx</p>
        <RoutesList />
        <StopPairsList />
        <PlacesList />
    </div>
  )
}

export default HomePage