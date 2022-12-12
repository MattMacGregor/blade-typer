import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router";

const LoggedInRoute = ({children}) => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.users)

    if (currentUser) {
        return (children)
    } else {
        return (<Navigate to={'/login'}/>)
    }
}
export default LoggedInRoute
