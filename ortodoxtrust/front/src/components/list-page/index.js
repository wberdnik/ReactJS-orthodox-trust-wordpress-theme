import React, {Component, useRef} from 'react';
import {Virtuoso} from 'react-virtuoso';
import Context from "../../app/context";
import Spinner from "../spinner";
import EntryContent from "../static-content/entryContent";
import "./listPage.sass"
import NewsFeed from "../news-feed";
import {SimpleFooter} from "../bootstrape-footer";
import {InnerStorage} from "../../app/InnerStorage";

/*
import { Scrollbars } from 'react-custom-scrollbars';
onScrollFrame={this.handleScrollFrame}
    onScrollStart={this.handleScrollStart}
    onScrollStop={this.handleScrollStop}
    onUpdate={this.handleUpdate}
    renderView={this.renderView}
    renderTrackHorizontal={this.renderTrackHorizontal}
    renderTrackVertical={this.renderTrackVertical}
    renderThumbHorizontal={this.renderThumbHorizontal}
    renderThumbVertical={this.renderThumbVertical}
    onScroll={this.handleScroll}
     autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
    autoHeight
    autoHeightMin={0}
    autoHeightMax={200}
    thumbMinSize={30}
    universal={true}
 */
//https://github.com/malte-wessel/react-custom-scrollbars

const MyScrollContainer = ({
                               className,
                               style,
                               reportScrollTop,
                               scrollTo,
                               children,
                           }) => {
    const elRef = useRef(null)

    scrollTo(scrollTop => {
        elRef.current.scrollTo({ top: scrollTop })
    })

    return (
        <div
            ref={elRef}
            onScroll={e => reportScrollTop(e.target.scrollTop)}
            style={{
                ...style,
                overflowY: 'hidden'
            }}
            tabIndex={0}
            className={className}
        >
            {children}
        </div>
    )
}

export default class ListPage extends Component {

    generateItem(dataItem) {
        const {image, title, description} = dataItem
        return (
            <div className='listItem'>
                <img src={image} alt={title}/>
                <div className="itemBody">
                    <h3>{title}</h3>
                    <p dangerouslySetInnerHTML={{__html: description}}/>
                </div>
            </div>
        );
    }

    render() {
        return (<>
            <EntryContent/>
            <div className="wrap-list">
                <Context.Consumer>
                    {contextValue => {

                            const currentList = contextValue.data.List[InnerStorage.currentCategoryId]
                            if(currentList){
                            return (
                                <>
                                <div className={'list-pages-columns'} >
                                <Virtuoso className="virtuoso-list"
                                          ScrollContainer={MyScrollContainer}
                                              totalCount={currentList.length}
                                              item={index => this.generateItem(currentList[index])}/>
                                              <NewsFeed vertical={true} />
                                              </div>
                                    <SimpleFooter />
                                </>);
                        }
                        return <Spinner/>;
                    }}</Context.Consumer>
            </div>
        </>);
    }
}
