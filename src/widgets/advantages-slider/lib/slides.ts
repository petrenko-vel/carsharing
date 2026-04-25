import slideOne from '@/assets/images/advantages/slide-1.jpg';
import slideTwo from '@/assets/images/advantages/slide-2.jpg';
import slideThree from '@/assets/images/advantages/slide-3.jpg';
import slideFour from '@/assets/images/advantages/slide-4.jpg';

import type { AdvantageSlide } from '@/entities/advantage/model/advantage-card.types';

export const advantagesData: AdvantageSlide[] = [
    {
        id: 1,
        title: 'Бесплатная парковка',
        menuLabel: 'ПАРКОВКА',
        description: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
        buttonText: 'Подробнее',
        buttonHref: '#',
        image: slideOne,
        buttonGradient: 'green',
    },
    {
        id: 2,
        title: 'Страховка включена',
        menuLabel: 'СТРАХОВКА',
        description: 'Полная страховка и КАСКО уже в тарифе. Пользуйтесь каршерингом без лишних расходов и бумажной волокиты.',
        buttonText: 'Подробнее',
        buttonHref: '#',
        image: slideTwo,
        buttonGradient: 'blue',
    },
    {
        id: 3,
        title: 'Бензин на нас',
        menuLabel: 'БЕНЗИН',
        description: 'Мы оплачиваем топливо. Просто выбирайте ближайшую машину, открывайте приложение и отправляйтесь в поездку.',
        buttonText: 'Подробнее',
        buttonHref: '#',
        image: slideThree,
        buttonGradient: 'red',
    },
    {
        id: 4,
        title: '24/7 поддержка',
        menuLabel: 'ОБСЛУЖИВАНИЕ',
        description: 'Служба поддержки всегда на связи. Поможем с любым вопросом: от бронирования до завершения аренды.',
        buttonText: 'Подробнее',
        buttonHref: '#',
        image: slideFour,
        buttonGradient: 'purple',
    },
];
