import React from 'react';
import FineMenu from "./fine-menu/index";
import ShortMenu from "./shortMenu";
import WhatCategory from "../app/whatCategory";
import {withRouter} from "react-router-dom";

function Header(props) {
    return <header className="App-header">
        <WhatCategory pathname={props.location.pathname}/>
        <FineMenu pathname={props.location.pathname}/>
        <ShortMenu className="short-menu"/>
        <div className="maria">
            <span>
                <h1 className="site-title">
                    <a href="/" rel="home">Александровское благочиние<br/>Волгоградской епархии</a>
                </h1>
                <h2 className="site-description">Сайт благочиния</h2>
            </span>
        </div>

    </header>;
}


export default withRouter(Header);
