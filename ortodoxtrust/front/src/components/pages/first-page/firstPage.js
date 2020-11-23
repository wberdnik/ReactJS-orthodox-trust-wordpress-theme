import React from 'react';

import PostOn1Page from './postOn1Page';
import Carousel from "./carousel";
import StaticHomePage from "../../static-content/StaticHomePage";
import NewsFeed from "../../news-feed";
import BootstrapFooter from "../../bootstrape-footer";

export default function FirstPage() {
    return (
        <>
            <div className="wrap-carousel">
                <Carousel/>
                <StaticHomePage/>
            </div>
            <footer>
                <div className="separator about_separator "/>
                <NewsFeed/>
                <div className="separator about_separator "/>
                <PostOn1Page/>
                <BootstrapFooter/>
            </footer>
        </>
    )
}
