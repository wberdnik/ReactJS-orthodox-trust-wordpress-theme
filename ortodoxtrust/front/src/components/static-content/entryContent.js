import React from 'react';
import BaseStaticContentComponent from "./BaseStaticContentComponent";

class EntryContent extends BaseStaticContentComponent {
    PolyContent(clutch) {
        return (
            <div className="entry-content-list">
                <h2 className={'glory_text'} dangerouslySetInnerHTML={{__html: clutch.title}}/>
                <div style={{fontSize: '1em', fontStyle: 'italic', borderBottom: '3px solid #222', paddingBottom: '15px'}}>Центральное благочиние<br/>
                    Русская Православная Церковь, Волгоградская митрополия, <a href="http://volgeparhia.ru" target="_blank" rel="noopener noreferrer nofollow">Волгоградская епархия</a></div>
                {clutch.content?(<div style={{marginTop:50}} dangerouslySetInnerHTML={{__html: clutch.content}}/>):''}
            </div>
        );
    }
}

export default EntryContent;
