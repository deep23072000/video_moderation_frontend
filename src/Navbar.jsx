import { Link } from "react-router-dom"
const Nav = ()=>{
    return(
        <>
            <Link to="/"> Home </Link>
            <Link to="/live_stream"> Live Stream </Link>
            <Link to="/video_upload"> Video Upload </Link>
        </>
    )
}

export default Nav