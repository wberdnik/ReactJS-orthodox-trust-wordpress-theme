import React, {Component, useRef} from 'react';
import {VirtuosoGrid } from 'react-virtuoso';
import styled from '@emotion/styled';
import Context from "../../app/context";
import {Spinner} from "../spinner";
import EntryContent from "../static-content/entryContent";
import "./PriesthoodList.sass"
import NewsFeed from "../news-feed";
import BootstrapFooter from "../bootstrape-footer";
import {InnerStorage} from "../../app/InnerStorage";


const ItemContainer = styled.div`
  padding: 0.5rem;
  width: 25%; 
  display: flex;
  flex: none;
  align-content: stretch;

  @media (max-width: 1024px) {
    width: 33%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`

const ItemWrapper = styled.div`
    flex: 1;
    text-align: center;
    font-size: 80%;
    padding: 2rem;
    box-shadow: 0 5px 6px -6px #777;
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`


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

class PriesthoodList extends Component {


    generateItem(dataItem) {
        return (
            <div className='listItem-duh'>
                <div className="modern-clirick-photo">
                    <img src={dataItem.image} alt={dataItem.title}/>
                </div>
                <div className="itemBody">
                    <h3>{dataItem.title}</h3>
                    <p dangerouslySetInnerHTML={{__html: dataItem.description}}/>
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

                            const currentList = contextValue.data.List[InnerStorage.currentCategoryId];
                            if(currentList){
                            return (
                                <>
                                <div className={'list-pages-columns'}>
                                <VirtuosoGrid className="virtuoso-list"
                                              ItemContainer={ItemContainer}
                                              ListContainer={ListContainer}
                                          ScrollContainer={MyScrollContainer}
                                              totalCount={currentList.length}
                                              item={index => <ItemWrapper>{this.generateItem(currentList[index])}</ItemWrapper>}/>
                                              <NewsFeed vertical={true} />
                                              </div>
                                    <footer>
                                        <BootstrapFooter />
                                    </footer>
                                </>);
                        }
                        return <Spinner/>;
                    }}</Context.Consumer>
            </div>
        </>);
    }
}

export default PriesthoodList;
