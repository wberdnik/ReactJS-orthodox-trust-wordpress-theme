import React from 'react';

import PostOn1Page from './postOn1Page';
import Carousel from "./carousel";
import StaticHomePage from "../../components/static-content/StaticHomePage";
import NewsFeed from "../../components/news-feed";
import BootstrapFooter from "../../components/bootstrape-footer";

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
