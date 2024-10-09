import React from 'react'
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineWarning } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import  './notification.css'

const iconStyle = {marginRight: '10px'}
const icon = {
    success: <AiOutlineCheck style={iconStyle} />,
    warning: <AiOutlineWarning style={iconStyle} />,
    info: <AiOutlineInfoCircle style={iconStyle} />,
    close: <AiOutlineCloseCircle style={iconStyle} />
}

const Notification = ({ type = 'info', message, onClose = () => { }}) => {
  return (
    <div className={`notification ${type}`}>
        {icon[type]}
        {message}
        <AiOutlineCloseCircle className='closeBtn' onClick={() => onClose()}/>
    </div>
  )
}

export default Notification
