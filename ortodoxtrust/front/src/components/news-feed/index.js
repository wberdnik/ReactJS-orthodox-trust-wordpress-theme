/*  Ortodoxal calendar so http://days.pravoslavie.ru/script/icon.htm
    *
    * @author VLF(wberdnik@gmail.com)
    * @version 1.?
    * @see code of http://script.pravoslavie.ru/listings/a8127a7443b6e0f25b1324b35a409c9b.htm
    */
import React, {Component} from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import Context from "../../app/context";
import Spinner from "../spinner";

const Card =
    ({alt, img, text, day, weekday, oldstyle, month}) => (
        <>
            <img alt={alt} src={img}/>

            <div style={{textAlign: 'center', fontWeight: 600}}>
                <div>
                    <span className={'news-feed__day'}>{day}</span> {month},
                    <span className={'new-feed__weekday'}> {weekday}</span>
                    <span className='news-feed__oldstyle_date'>
                                                        ({oldstyle} по ст.ст.)</span>
                </div>
            </div>
            <div className='new-feed__text-of-day'
                 dangerouslySetInnerHTML={{__html: text}}/>
            <div>
                <a target="_blank" href="http://prihod.ru/days/">подробнее</a>
            </div>
        </>);


//http://kenwheeler.github.io/slick/

export default class NewsFeed extends Component {
    render() {
        return (<Context.Consumer>
            {contextValue => {

                const currentList = contextValue.data.calendar;
                if (currentList.length) {
                    return <Spinner/>;
                }

                if (this.props.vertical) {
                    const item = currentList.filter(x => x.glide === 0)[0];
                    return (
                        <div style={{marginLeft: 20}}>
                            <Card item={item}/>
                        </div>
                    );

                } else {
                    return (
                        <div className="news-feed-carusel">
                            <InfiniteCarousel
                                breakpoints={[
                                    {
                                        breakpoint: 500,
                                        settings: {
                                            slidesToShow: 2,

                                        },
                                    },
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 3,
                                        },
                                    },
                                ]}
                                adaptiveHeight={true}
                                dots={false}
                                rows={4}
                                autoplay={true}
                                showSides={true}
                                sidesOpacity={.2}
                                sideSize={.1}
                                slidesToScroll={1}
                                slidesToShow={3}
                                scrollOnDevice={true}
                            >
                                {currentList.map(
                                    (item, inx) => (
                                        <div key={inx} style={
                                            {display: 'grid', gridTemplateColumns: "30% auto"}}>
                                            <Card item={item}/>
                                        </div>))}
                            </InfiniteCarousel>
                        </div>
                    );
                }
            }}
        </Context.Consumer>)
    }
}
