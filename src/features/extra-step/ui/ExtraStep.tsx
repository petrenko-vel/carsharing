import DatePicker from 'react-datepicker';
import { ru } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useBookingStore } from '@/pages/booking/model/bookingStore';
import { CAR_COLORS, TARIFFS, EXTRA_SERVICES } from '../model/extraOptions.mock';
import './ExtraStep.scss';

const ExtraStep = () => {
    const { extra, setExtra } = useBookingStore();

    const dateFrom = extra.dateFrom ? new Date(extra.dateFrom) : null;
    const dateTo = extra.dateTo ? new Date(extra.dateTo) : null;

    const handleColorChange = (id: string, label: string) => {
        setExtra({ colorId: id, colorLabel: label });
    };

    const handleTariffChange = (id: string, label: string) => {
        setExtra({ tariffId: id, tariffLabel: label });
    };

    const handleDateFrom = (date: Date | null) => {
        setExtra({
            dateFrom: date ? date.toISOString() : null,
            dateTo: dateTo && date && date > dateTo ? null : extra.dateTo,
        });
    };

    const handleDateTo = (date: Date | null) => {
        setExtra({ dateTo: date ? date.toISOString() : null });
    };

    const handleServiceToggle = (id: string) => {
        const current = extra.services;
        const updated = current.includes(id)
            ? current.filter((s) => s !== id)
            : [...current, id];
        setExtra({ services: updated });
    };

    const today = new Date();

    const minDateTo = dateFrom
        ? new Date(dateFrom.getTime() + 60 * 60 * 1000)
        : today;

    return (
        <div className="extra-step">

            <section className="extra-step__section">
                <h3 className="extra-step__section-title">Цвет</h3>
                <div className="extra-step__radio-group" role="radiogroup" aria-label="Цвет автомобиля">
                    {CAR_COLORS.map((color) => (
                        <label key={color.id} className="extra-step__radio-label">
                            <input
                                className="extra-step__radio-input"
                                type="radio"
                                name="car-color"
                                value={color.id}
                                checked={extra.colorId === color.id}
                                onChange={() => handleColorChange(color.id, color.label)}
                            />
                            <span
                                className={[
                                    'extra-step__radio-text',
                                    extra.colorId === color.id ? 'extra-step__radio-text--active' : '',
                                ].join(' ').trim()}
                            >
                                {color.label}
                            </span>
                        </label>
                    ))}
                </div>
            </section>

            <section className="extra-step__section">
                <h3 className="extra-step__section-title">Дата аренды</h3>

                <div className="extra-step__date-row">
                    <span className="extra-step__date-label">С</span>
                    <div className="extra-step__date-input-wrapper">
                        <DatePicker
                            selected={dateFrom}
                            onChange={handleDateFrom}
                            selectsStart
                            startDate={dateFrom}
                            endDate={dateTo}
                            minDate={today}
                            showTimeSelect
                            popperPlacement="bottom-start"
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            dateFormat="dd.MM.yyyy HH:mm"
                            locale={ru}
                            placeholderText="Введите дату и время"
                            className="extra-step__date-input"
                            isClearable
                            clearButtonClassName="extra-step__date-clear"
                        />
                    </div>
                </div>

                <div className="extra-step__date-row">
                    <span className="extra-step__date-label">По</span>
                    <div className="extra-step__date-input-wrapper">
                        <DatePicker
                            selected={dateTo}
                            onChange={handleDateTo}
                            selectsEnd
                            startDate={dateFrom}
                            endDate={dateTo}
                            minDate={minDateTo}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={60}
                            dateFormat="dd.MM.yyyy HH:mm"
                            locale={ru}
                            placeholderText="Введите дату и время"
                            className="extra-step__date-input"
                            disabled={!dateFrom}
                            isClearable
                            clearButtonClassName="extra-step__date-clear"
                        />
                    </div>
                </div>
            </section>

            <section className="extra-step__section">
                <h3 className="extra-step__section-title">Тариф</h3>
                <div className="extra-step__radio-group" data-tarif role="radiogroup" aria-label="Тариф аренды">
                    {TARIFFS.map((tariff) => (
                        <label key={tariff.id} className="extra-step__radio-label">
                            <input
                                className="extra-step__radio-input"
                                type="radio"
                                name="tariff"
                                value={tariff.id}
                                checked={extra.tariffId === tariff.id}
                                onChange={() => handleTariffChange(tariff.id, tariff.label)}
                            />
                            <span
                                className={[
                                    'extra-step__radio-text',
                                    extra.tariffId === tariff.id ? 'extra-step__radio-text--active' : '',
                                ].join(' ').trim()}
                            >
                                {tariff.label}
                            </span>
                        </label>
                    ))}
                </div>
            </section>

            <section className="extra-step__section">
                <h3 className="extra-step__section-title">Доп услуги</h3>
                <div className="extra-step__checkbox-group">
                    {EXTRA_SERVICES.map((service) => {
                        const isChecked = extra.services.includes(service.id);
                        return (
                            <label key={service.id} className="extra-step__checkbox-label">
                                <input
                                    className="extra-step__checkbox-input"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleServiceToggle(service.id)}
                                />
                                <span
                                    className={[
                                        'extra-step__checkbox-box',
                                        isChecked ? 'extra-step__checkbox-box--checked' : '',
                                    ].join(' ').trim()}
                                    aria-hidden="true"
                                />
                                <span className={[
                                    'extra-step__checkbox-text',
                                    isChecked ? 'extra-step__checkbox-text--checked' : '',
                                ].join(' ').trim()}>
                                    {service.label}, {service.price}р
                                </span>
                            </label>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export { ExtraStep };