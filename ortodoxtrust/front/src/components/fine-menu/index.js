/**
 * Candle menu

 * @author VLF(wberdnik@gmail.com)
 * @version 1.?
 */

import React, {Component} from 'react';
import './FineMenu.css';
import {Circ, Elastic, Power2, TimelineMax} from "gsap";
import Context from "../../app/context";
import {Link} from "react-router-dom";
import {InnerStorage} from "../../app/InnerStorage";

function Candle() {
    return (<div className="holder" style={{visibility: 'hidden'}}>
        <div className="candle">
            <div className="blinking-glow"/>
            <div className="thread"/>
            <div className="glow"/>
            <div className="flame"/>
        </div>
    </div>)
}

class FineMenu extends Component {

    constructor(props) {
        super(props);
        this.isLoaded = false;
        this.MenuTableDescriptors = [];
        this.currentMenuCategoryId = 5;
    }


    groupPositionProcessing(current_x) {

        let moveLeft = 0, mathBase = this.svgItem.clientWidth * (current_x + 90) / 800,
            screenX = document.documentElement.clientWidth;
        if (screenX < 650) {
            this.svgItem.style.width = '170%';
            moveLeft = mathBase - document.documentElement.clientWidth / 2;
        } else if (screenX < 991) {
            this.svgItem.style.width = '125%';
            moveLeft = mathBase - document.documentElement.clientWidth / 2;
        } else {
            this.svgItem.style.width = '100%';
        }
        this.svgItem.style.marginLeft = '-' + moveLeft + 'px';

        return mathBase - current_x - moveLeft; //transform === current_x
    }


    PostLoadConstructor() {

        const _selectFunc = s => document.querySelector(s),
            _MenuItems = document.querySelectorAll('.menuItem')

        this.svgItem = _selectFunc('.wrap-finemenu svg')
        this.candle = _selectFunc('.wrap-finemenu>.holder')
        this.GroupItemsForMove = [...document.querySelectorAll('.svgItemsForMoving'), this.candle]
        this.MenuTableDescriptors = [].map.call(
            _MenuItems,

            (menuItem, index) => {
                const category_id = +menuItem.getAttribute('data-category'),
                    x = +_selectFunc(`#templateRect${category_id}`).getAttribute('x')

                return {x, category_id, menuItem}
            })

        this.svgItem.style.visibility = 'visible'// light on
    }


    componentDidUpdate() {
        if (!this.isLoaded) return; //Before load REST
        if (!this.MenuTableDescriptors.length) this.PostLoadConstructor()
        if (!this.MenuTableDescriptors.length) return;

        this.current_x = 0;
        this.MenuTableDescriptors.forEach((item) => {
            if (item.category_id === this.currentMenuCategoryId) {
                item.menuItem.style.cursor = 'auto'
                item.menuItem.setAttribute('fill', 'white');
                item.menuItem.setAttribute('stroke', 'white');
                this.current_x = item.x
            } else {
                item.menuItem.style.cursor = 'pointer';
                item.menuItem.setAttribute('fill', '#7b808b');
                item.menuItem.setAttribute('stroke', '#7b808b');
            }
        })

        window.onresize = (function () {
            const newMargin = this.groupPositionProcessing(this.current_x);
            this.candle.style.marginLeft = `${newMargin}px`;
        }).bind(this)

        const sx = this.groupPositionProcessing(this.current_x);

        (new TimelineMax())
            .to(this.candle, 0.1, {opacity: 0})
            .to(this.GroupItemsForMove, 0.5, {
                opacity: 0.5,
                ease: Power2.easeIn
            }, '+=0')

            .to(this.GroupItemsForMove, 0.5, {
                opacity: .2,
                marginLeft: sx,
                x: this.current_x,
                ease: Circ.easeInOut
            }, '+=0')
            .to(this.GroupItemsForMove, 0.2, {

                opacity: 1,
                //ease: Power2.easeIn
                ease: Elastic.easeOut.config(0.6, 0.8)
            }, '+=0')
            .to(this.candle, 0.1, {visibility: 'visible', opacity: 1})

    }

    render() {
        return (<Context.Consumer>
            {contextValue => {
                if (!contextValue.data.finemenu.isLoaded) {
                    return null
                }

                const {content, cnt} = contextValue.data.finemenu;
                this.currentMenuCategoryId = InnerStorage.menuCategoryId
                this.isLoaded = true;
                const buttonWidth = 100, buttonHeight = 25, buttonRounded = 2, buttonStep = 114, rowY =285

                return (

                    <div className="wrap-finemenu">
                        <svg viewBox="0 0 800 600" style={{marginLeft: 0}} xmlns="http://www.w3.org/2000/svg"
                             preserveAspectRatio="xMidYMid slice">

                            <defs>
                                <rect id="singularRectDefs"
                                      fill="#dd993388" y={rowY+2}
                                      width={buttonWidth} height={buttonHeight}
                                      rx={buttonRounded}ry={buttonRounded}/>

                                {content.map((item, index) =>
                                    <clipPath key={'menuMask' + item.id} id={'menuMask' + item.id}>

                                        <rect id={'templateRect' + item.id}
                                              x={700 - (cnt - index - 1) * buttonStep}
                                              y={rowY}
                                              width={buttonWidth} height={buttonHeight}
                                              rx={buttonRounded}ry={buttonRounded}/>

                                    </clipPath>
                                )}
                            </defs>


                            {//data-help="Цвет при выделении = свет свечи для каждого меню"
                                content.map((item, index) =>
                                    <g key={"a190b" + item.id}  id={"a190b" + item.id}

                                       clipPath={"url(#menuMask" + item.id + ")"}>

                                        <use xlinkHref="#singularRectDefs" className="svgItemsForMoving"/>

                                        <Link to={'/' + item.slug}>
                                            <text data-category={item.id}
                                                  className="menuItem"
                                                  fontWeight="bold"
                                                  fontSize="10px"
                                                  stroke="white"
                                                  strokeWidth="0.5"
                                                  fill="white"
                                                  y={rowY+17}
                                                  x={711 - (cnt - index - 1) * buttonStep +
                                                  (5 - Math.round(item.label.length / 2)) * 7}
                                            >
                                                {item.label}
                                            </text>
                                        </Link>
                                    </g>
                                )}
                        </svg>
                        <Candle/>
                    </div>
                );

            }
            }
        </Context.Consumer>);
    }
}

export default FineMenu;
