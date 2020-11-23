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


//http://kenwheeler.github.io/slick/

class NewsFeed extends Component {
    constructor(props) {
        super(props);

    }

    render() {
       return (<Context.Consumer>
            {contextValue => {

                const currentList = contextValue.data.calendar;
                if (currentList.length) {

                    if (this.props.vertical) {
                        const item = currentList.filter(x => x.glide === 0)[0];
                        return (
                            <div style={{marginLeft: 20}}>
                                <div style={{textAlign: 'center', fontWeight: 600}}>
                                    <img
                                        alt={item.alt}
                                        src={item.img}

                                    /><br/> <br/>
                                    <span
                                        style={{
                                            fontSize: '1.5em', fontWeight: 600, lineHeight: 1.1,
                                            fontFamily: 'sans-serif'
                                        }}>{item.day}</span> {item.month},
                                    <span style={{
                                        fontSize: '1em',
                                        fontWeight: 'normal',
                                        fontFamily: 'sans-serif'
                                    }}> {item.weekday}</span>
                                    <span style={{
                                        fontSize: '0.8em', display: 'INLINE_TAGS-BLOKS_TAGS',
                                        width: '100%', fontWeight: 'normal',
                                        fontFamily: 'sans-serif'
                                    }}> ({item.oldstyle} по ст.ст.)</span>
                                </div>
                                <div style={{
                                    fontSize: '0.9em', fontWeight: 'normal',
                                    fontFamily: 'sans-serif'
                                }} dangerouslySetInnerHTML={{__html: item.text}}/>
                                <div>
                                    <a target="_blank" href="http://prihod.ru/days/">подробнее</a>
                                </div>

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
                                    {currentList.map((item, inx) => (
                                        <div key={inx} style={
                                            {display: 'grid', gridTemplateColumns: "30% auto"}}>
                                            <img
                                                alt={item.alt}
                                                src={item.img}

                                            />
                                            <div style={{padding: 10}}>
                                                <div style={{textAlign: 'center', fontWeight: 600}}>
                                                    <div>
                                <span
                                    style={{
                                        fontSize: '1.5em', fontWeight: 600, lineHeight: 1.1,
                                        fontFamily: 'sans-serif'
                                    }}>{item.day}</span> {item.month},
                                                        <span style={{
                                                            fontSize: '1em',
                                                            fontWeight: 'normal',
                                                            fontFamily: 'sans-serif'
                                                        }}> {item.weekday}</span>
                                                        <span style={{
                                                            fontSize: '0.7em', display: 'INLINE_TAGS-BLOKS_TAGS',
                                                            width: '100%', fontWeight: 'normal',
                                                            fontFamily: 'sans-serif'
                                                        }}> ({item.oldstyle} по ст.ст.)</span>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    fontSize: '0.8em', fontWeight: 'normal',
                                                    fontFamily: 'sans-serif'
                                                }} dangerouslySetInnerHTML={{__html: item.text}}/>
                                                <div><a target="_blank" href="http://prihod.ru/days/">подробнее</a>
                                                </div>
                                            </div>

                                        </div>))}


                                </InfiniteCarousel>
                            </div>
                        );
                    }
                }
                return <Spinner/>;
            }}
        </Context.Consumer>)
    }
}

export default NewsFeed;
