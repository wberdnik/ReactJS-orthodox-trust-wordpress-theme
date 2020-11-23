import React from 'react';
import './Footer.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {config} from "../../app/config";

// Columns
function SocialIcons() {
    return config.socials.map(item =>
        <li className="footer-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', item.FontAwesomeIcon]} size="2x"/> &nbsp;
                {item.text}
            </a>
        </li>
    )
}

function Sites() {
    return config.footer_sites.map(item =>
        <li className="footer-item">
            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
        </li>
    )
}

function Contacts() {
    return config.contacts.map(item =>
        <li><FontAwesomeIcon icon={['fas', item.FontAwesomeIcon]} size="2x"/> &nbsp; {item.text}</li>
    )
}

/** Footer сайта сделанный в стиле Bootstrap
 *
 */
export default function BootstrapFooter() {
    return (
        <div className="f-container">
            <div className="f-rows">
                <div>
                    <h3>Социальные сети</h3>
                    <div className="footer-col-content">
                        <ul><SocialIcons/></ul>
                    </div>
                </div>
                <div>
                    <h3>Сайты</h3>
                    <div className="footer-col-content">
                        <ul><Sites/></ul>
                    </div>
                </div>
                <div>
                    <h3>Контакты</h3>
                    <div className="footer-col-content">
                        <ul className="list-contact"><Contacts/></ul>
                    </div>
                </div>
            </div>

            <div className="f-copyright">

                <p>© 2020 Работает на Prihod.ru <span className="sep">·</span>
                    <a href="http://ckoval.ru/home.php">Дизайнер</a> <span className="sep">·</span>
                    <a href="/privacy">Политика конфиденциальности</a> <span
                        className="sep">·</span> <a href="/sitemap">Карта сайта</a></p>
            </div>
        </div>
    )
}

export function SimpleFooter() {
    return <footer>
        <BootstrapFooter/>
    </footer>;

}
