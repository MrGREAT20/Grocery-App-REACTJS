import React, { useEffect } from 'react';
import './index.css';

function Alert(prop){
    useEffect(() => {
        const timeout = setTimeout(() => {
            prop.removeAlert();
        }, 3000)
        return () => clearTimeout(timeout)
    }, [prop.items])
    return <p className={`alert alert-${prop.type}`}>{prop.msg}</p>
}
export default Alert;