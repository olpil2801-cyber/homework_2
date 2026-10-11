import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode,
} from 'react'
import s from './SuperInputText.module.css'

// Тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

// Пропсы обычного инпута, кроме type, и наши дополнительные пропсы
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
    onChange,
    onChangeText,
    onKeyDown,
    onEnter,
    error,
    className,
    spanClassName,
    id,
    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // Вызываем переданные обработчики, если они есть
        onChange?.(e)
        onChangeText?.(e.currentTarget.value)
    }

    const onKeyDownCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        // Вызываем стандартный обработчик из пропсов
        onKeyDown?.(e)

        // При нажатии Enter вызываем наш дополнительный обработчик
        if (e.key === 'Enter') {
            onEnter?.()
        }
    }

    const finalSpanClassName =
        s.error + (spanClassName ? ' ' + spanClassName : '')

    const finalInputClassName =
        s.input +
        (error ? ' ' + s.errorInput : ' ' + s.superInput) +
        (className ? ' ' + className : '')

    return (
        <div className={s.inputWrapper}>
            <input
                {...restProps}
                id={id}
                type="text"
                onChange={onChangeCallback}
                onKeyDown={onKeyDownCallback}
                className={finalInputClassName}
                
            />

            <span
                id={id ? id + '-span' : undefined}
                className={finalSpanClassName}
            >
                {error}
            </span>
        </div>
    )
}

export default SuperInputText