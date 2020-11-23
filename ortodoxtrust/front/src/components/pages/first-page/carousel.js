import React, {useContext} from "react";
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import Context from "../../app/context";
import Spinner from "../../spinner";

/**
 * Карусель фотографий на главной странице
 */
export default function Carousel() {
    const carousel = useContext(Context).data.carousel
    if (!carousel.isLoaded) {
        return <Spinner/>;
    }
    return <Slider autoplay={7000} classNames={horizontalCss}
                   className="slider-wrapper">
        {carousel.content.map(({image,description, userProfile, user}, index) => (
            <div
                key={index}
                className="slider-content"
                style={{background: `url('${image}') no-repeat center center`}}
            >
                <div className="inner">
                    <p>{description}</p>
                    <button style={{backgroundColor: '#dd9933'}}>Подробнее</button>
                </div>
                <section>
                    <img src={userProfile} alt={user}/>
                    <span> Настоятель <strong>{user}</strong> </span>
                </section>
            </div>
        ))}
    </Slider>
}
