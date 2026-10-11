import React from 'react'
import type { MessageType } from '../HW1'
import s from './Message.module.css'

export type MessagePropsType = {
    message: MessageType
}

const Message = ({ message }: MessagePropsType) => {
    return (
        <div className={s.message}>
            <div className={s.imageAndText}>
                <img
                    src={message.user.avatar}
                    alt={message.user.name}
                />

                <div className={s.text}>
                    <div className={s.name}>
                        {message.user.name}
                    </div>

                    <div className={s.messageText}>
                        {message.message.text}
                    </div>
                </div>
            </div>

            <div className={s.time}>
                {message.message.time}
            </div>
        </div>
    )
}

export default Message


