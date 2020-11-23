import React, {Component} from 'react';
import EntryContent from "../static-content/entryContent";
import BootstrapFooter from "../bootstrape-footer";
import { YMaps, Map } from 'react-yandex-maps';

//http://kenwheeler.github.io/slick/

class Contacts extends Component {

    render() {
        const headItem = document.getElementsByTagName("head")[0];
        [
            'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        ].forEach(src =>

            document.createStyleSheet? document.createStyleSheet(src):headItem.appendChild(
                (function(a){
                    a = document.createElement('link')
                    a.setAttribute('rel', 'stylesheet')
                    a.setAttribute('href', src)
                    return a})()
            )

        )
        return (<div>
            <EntryContent/>

            <div className="map-info" style={{marginTop: 50}}>
                <YMaps>
                    <div>
                        <Map width={'100%'} height = {320}
                             defaultState={{ center: [48.7201340, 44.5379960], zoom: 15, type: 'yandex#map' }} />
                    </div>
                </YMaps>
            </div>

            {//aTypeGrp=[{id:0,ti:'Все объекты'}], aType={}, autoZoom=true, geoLoc=false,fullscreenOn=false, fullscreenControl=true;
                // var searchControl=false, prihodLogo=false;
            }
            <footer>
                <BootstrapFooter/>
            </footer>

        </div>);
    }
}

export default Contacts;
