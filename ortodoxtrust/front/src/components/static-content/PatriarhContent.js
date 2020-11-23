import React  from 'react';
import {SimpleFooter} from "../bootstrape-footer";
import BaseStaticContentComponent from "./BaseStaticContentComponent";

export default class PatriarhContent extends BaseStaticContentComponent {
    PolyContent({title,content}) {
        return (
            <>
                <div className="entry-content-list">
                    <h2 className={'glory_text'} dangerouslySetInnerHTML={{__html: title}}/>
                    <div style={{fontSize: '1.1em',}} dangerouslySetInnerHTML={{__html: content}}/>
                </div>
                <SimpleFooter />
            </>
        );
    }
}
