import React from 'react';
import EntryContent from "../../static-content/entryContent";
import {SimpleFooter} from "../../bootstrape-footer";
import {Map, YMaps} from 'react-yandex-maps';

//http://kenwheeler.github.io/slick/

export default function ContactsPage() {
    const headItem = document.getElementsByTagName("head")[0],
        src = 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    document.createStyleSheet ?
        document.createStyleSheet(src) :
        headItem.appendChild(<link rel="stylesheet" href={src}/>)

    return (<>
        <EntryContent/>
        <div className="map-info" style={{marginTop: 50}}>
            <YMaps>
                <div>
                    <Map width={'100%'} height={320}
                         defaultState={{center: [48.7201340, 44.5379960], zoom: 15, type: 'yandex#map'}}/>
                </div>
            </YMaps>
        </div>

        {//aTypeGrp=[{id:0,ti:'Все объекты'}], aType={}, autoZoom=true, geoLoc=false,fullscreenOn=false, fullscreenControl=true;
            // var searchControl=false, prihodLogo=false;
        }
        <SimpleFooter/>
    </>);
}
