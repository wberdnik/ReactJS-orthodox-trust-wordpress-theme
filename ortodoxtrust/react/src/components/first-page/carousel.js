import React, {Component} from "react";

//slider
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import Context from "../../app/context";
import {Spinner} from "../spinner";

export class Carousel extends Component {
    render() {
        return <Context.Consumer>
            {contextValue => {
                const {carousel} = contextValue.data;
                if (carousel.isLoaded) {
                    return <Slider autoplay={7000} classNames={horizontalCss}
                                className="slider-wrapper">
                            {carousel.content.map((item, index) => (
                                <div
                                    key={index}
                                    className="slider-content"
                                    style={{background: `url('${item.image}') no-repeat center center`}}
                                >
                                    <div className="inner">
                                        <p>{item.description}</p>
                                        <button style={{backgroundColor:'#dd9933'}}>Подробнее</button>
                                    </div>
                                    <section>
                                        <img src={item.userProfile} alt={item.user}/>
                                        <span>
							                Настоятель <strong>{item.user}</strong>
						                </span>
                                    </section>
                                </div>
                            ))}
                        </Slider>
                }
                return <Spinner/>;
            }
            }
        </Context.Consumer>
    }
}

export default Carousel
