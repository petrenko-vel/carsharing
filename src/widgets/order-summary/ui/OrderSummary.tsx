import { Button } from '@/shared/ui/Button';
import './OrderSummary.scss';

interface OrderDetail {
    label: string;
    value: string;
}

interface OrderSummaryProps {
    className?: string;
    details: OrderDetail[];
    price?: string;
    buttonText: string;
    isButtonDisabled: boolean;
    onButtonClick: () => void;
}

const OrderSummary = (props: OrderSummaryProps) => {
    const {
        className = "",
        details,
        price,
        buttonText,
        isButtonDisabled,
        onButtonClick
    } = props;

    return (
        <aside className={`${className} order-summary`}>
            <h3 className="order-summary__title">Ваш заказ:</h3>

            <div className="order-summary__list">
                {details.map((item, index) => (
                    <div key={index} className="order-summary__row">
                        <span className="order-summary__label">{item.label}</span>
                        <span className="order-summary__dots"></span>
                        <span className="order-summary__value">{item.value}</span>
                    </div>
                ))}
            </div>

            {price && (
                <div className="order-summary__price">
                    <strong>Цена: </strong> {price}
                </div>
            )}

            <Button
                className="order-summary__button"
                disabled={isButtonDisabled}
                onClick={onButtonClick}
            >
                {buttonText}
            </Button>
        </aside>
    );
};

export { OrderSummary };