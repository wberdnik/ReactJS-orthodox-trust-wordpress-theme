import React from 'react';
import BaseStaticContentComponent from "./BaseStaticContentComponent";

/** Статическая часть Главной страницы сайта
 * Переопределяется метод PolyContent
 */
export default class StaticHomePage extends BaseStaticContentComponent {
    PolyContent(clutch) {
        const {title,content} = clutch
        return <div className="entry-content">
            <h2 className={'glory_text'}>{title}</h2>
            <div dangerouslySetInnerHTML={{__html: content}}/>
        </div>;
    }
}
