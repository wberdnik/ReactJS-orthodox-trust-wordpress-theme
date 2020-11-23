import React from 'react';
import SuperStatic from "./SuperStatic";


class StaticHomePage extends SuperStatic {
    PolyContent(clutch) {
        return <div className="entry-content">
            <h2 className={'glory_text'}>{clutch.title}</h2>
            <div dangerouslySetInnerHTML={{__html: clutch.content}}/>
        </div>;
    }
}

export default StaticHomePage;