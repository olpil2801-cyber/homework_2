import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

// Проверяем имя, добавляем пользователя и очищаем поле
export const pureAddUser = (
    name: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    addUserCallback: (name: string) => void
) => {
    // Убираем пробелы по краям
    const trimmedName = name.trim()

    if (!trimmedName) {
    setError('Ошибка! Введите имя!')
    return
}

    addUserCallback(trimmedName)
    setName('')
    setError('')
}

// Проверяем имя, когда пользователь уходит из поля
export const pureOnBlur = (
    name: string,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    if (!name.trim()) {
        setError('Ошибка! Введите имя!')
    }
}

// Вызываем добавление только при нажатии Enter
export const pureOnEnter = (
    e: KeyboardEvent<HTMLInputElement>,
    addUser: () => void
) => {
    if (e.key === 'Enter') {
        addUser()
    }
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // Состояние: текущий текст и текущая ошибка
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    // При вводе сохраняем текст и убираем старую ошибку
    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)

        if (error) {
            setError('')
        }
    }

    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length

    // Если массив пустой, получим undefined — приветствия не будет
    const lastUserName = users[users.length - 1]?.name

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer