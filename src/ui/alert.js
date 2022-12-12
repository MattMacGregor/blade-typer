import { Alert as AlertBS, Container } from "react-bootstrap"
import { dismissAlert } from "../reducers/ui-reducer.js"
import { useDispatch } from "react-redux"

const Alert = (props) => {
    const dispatch = useDispatch()
    return(
        <AlertBS 
            className="uiAlert" 
            variant={ props.variant }
            dismissible={ props.dismissible ? true : undefined }  onClose={() => dispatch(dismissAlert())}>
            <AlertBS.Heading>{ props.message }</AlertBS.Heading>
        </AlertBS>
    )
}

export default Alert
