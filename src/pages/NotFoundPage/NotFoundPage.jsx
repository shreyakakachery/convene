import { useLocation, useNavigate } from "react-router-dom"
function NotFoundPage() {

  const location = useLocation()
  const navigate = useNavigate()

  // shortcut to navigate to previous page (-1) OR use full path eg. change address, change routes, change stops

  return (
    <div>
        <p>404 Error: Not Found</p>
        {/* <p>Please use the link to navigate back to the main page</p> */}

        {/* <p>{location.state.addressA}</p> */}
        {/* <button onClick={() => navigate(-1)} >  back</button>  */}
    </div>
  )
}

export default NotFoundPage