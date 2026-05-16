import { useState, useRef, useEffect } from 'react';
import './Input.scss';

interface InputProps {
    className?: string;
    label: string;
    placeholder: string;
    value: string;
    options?: string[];                 // Массив строк для выпадающего списка
    disabled?: boolean;
    onChange: (value: string) => void;  // Вызывается при вводе текста
    onSelect?: (value: string) => void; // Вызывается при клике на элемент списка
    onClear?: () => void;               // Вызывается при клике на крестик
}

const Input = (props: InputProps) => {

    const {
        className = "",
        label,
        placeholder,
        value,
        options = [],
        disabled = false,
        onChange,
        onSelect,
        onClear,
    } = props;

    const [isOpenList, setIsOpenList] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Закрытие списка при клике в другое место экрана
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpenList(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`${className} custom-input`} ref={wrapperRef}>
            <label className="custom-input__label">{label}</label>

            <div className="custom-input__wrapper">
                <input
                    type="text"
                    className="custom-input__field"
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setIsOpenList(true);
                    }}
                    onFocus={() => setIsOpenList(true)}
                />

                {/* Крестик очистки показываем только если есть текст и поле активно */}
                {value && !disabled && onClear && (
                    <button className="custom-input__clear" type="button" onClick={onClear}>
                        &times;
                    </button>
                )}
            </div>

            {/* Выпадающий список */}
            {isOpenList && options.length > 0 && !disabled && (
                <ul className="custom-input__dropdown">
                    {options.map((opt, index) => (
                        <li
                            key={index}
                            className="custom-input__option"
                            onClick={() => {
                                if (onSelect) onSelect(opt);
                                setIsOpenList(false);
                            }}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export { Input };