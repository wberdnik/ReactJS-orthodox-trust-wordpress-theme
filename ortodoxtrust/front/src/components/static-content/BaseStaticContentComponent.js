import React, {Component} from 'react';
import Context from "../../app/context";
import Spinner from "../spinner";
import {InnerStorage} from "../../app/InnerStorage";

/** Базовый класс статического содержимого страниц
 * Выбирается номер категории WordPress и забирается содержимое из State
 */
class BaseStaticContentComponent extends Component {
    PolyContent(clutch){
        return '';
    }
    render() {
        return <Context.Consumer>
            {contextValue => {
                if (contextValue.data.staticPagesContent.isLoaded) {
                    let filteredContent = contextValue.data.staticPagesContent.content[
                        InnerStorage.currentCategoryId
                        ];
                    if(!filteredContent)filteredContent = contextValue.data.staticPagesContent.content[
                        InnerStorage.currentCategorySlug
                        ];

                    return this.PolyContent(filteredContent ? filteredContent : {title: '', content: ''})
                }
                return <Spinner/>;
            }
            }
        </Context.Consumer>;
    }
}

export default BaseStaticContentComponent;
