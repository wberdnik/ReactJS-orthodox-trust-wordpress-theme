import React from 'react';
import {Link} from "react-router-dom";

export default function ShortMenu() {
    return (
        <div className="top-line">

            <a target="_blank" rel="noopener noreferrer" href="http://volgeparhia.ru/">Епархия</a>|
            <a target="_blank" rel="noopener noreferrer" href="https://www.crrtt.com/">Заказ треб онлайн</a>|
            <a target="_blank" rel="noopener noreferrer" href="https://basement.studio/">Вопрос священику</a>|
            <a target="_blank" rel="noopener noreferrer" href="https://www.limely.co.uk/">Пожертвовать</a>|
            <a target="_blank" rel="noopener noreferrer"
               href="https://merehead.com/ru/blog/top-graphic-design-trends-2020/">Поиск</a>
            <Link to={'/contacts'}>Контакты</Link>
        </div>
    );
}
