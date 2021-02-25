import './Alert.css';
import { useEffect, useState } from 'react';

const Alert = (props) => {
    const [ isShow, setIsShow ] = useState(true)

    useEffect(() => {
        showAlert()
    })

    const showAlert = () => {
        setTimeout(() => {
            setIsShow(false)
        }, 2000);
    }

    return (
        <div>
            {
                isShow && <div className={`alert custom-alert ${props.type}`} role="alert">
                {props.message}
                </div>
            }
        </div>
    )
}

export default Alert