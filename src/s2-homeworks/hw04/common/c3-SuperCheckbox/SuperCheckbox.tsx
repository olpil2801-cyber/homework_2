import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react'
import s from './SuperCheckbox.module.css'

// Стандартные пропсы HTML-инпута.
type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
    onChange,
    onChangeChecked,
    className,
    spanClassName,
    children,
    id,

    ...restProps
}) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // Передаём событие стандартному обработчику.
        onChange?.(e)

        // Передаём состояние чекбокса: true или false.
        onChangeChecked?.(e.currentTarget.checked)
    }

    const finalInputClassName =
        s.checkbox + (className ? ' ' + className : '')

    const finalSpanClassName =
        s.spanClassName + (spanClassName ? ' ' + spanClassName : '')

    return (
        <label className={s.label}>
            <input
                id={id}
                type="checkbox"
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />

            {children && (
                <span
                    id={id ? id + '-span' : undefined}
                    className={finalSpanClassName}
                >
                    {children}
                </span>
            )}
        </label>
    )
}

export default SuperCheckbox