import React  from 'react';
import BootstrapFooter from "../bootstrape-footer";
import SuperStatic from "./SuperStatic";

class PatriarhContent extends SuperStatic {
    PolyContent(clutch) {
        return (
            <>
                <div className="entry-content-list">
                    <h2 className={'glory_text'} dangerouslySetInnerHTML={{__html: clutch.title}}/>
                    <div style={{fontSize: '1.1em',}} dangerouslySetInnerHTML={{__html: clutch.content}}/>
                </div>
                <footer>
                    <BootstrapFooter/>
                </footer>
            </>
        );
    }
}

export default PatriarhContent;