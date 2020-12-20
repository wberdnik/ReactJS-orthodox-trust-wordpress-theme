/**
 * IOC-container of REST API through function LoadRest (see below)
 * @author VLF(wberdnik@gmail.com)
 * @version 1.?
 */
import CalendarAction from "../services/actions/CalendarAction";
import FineMenuAction from "../services/actions/FineMenuAction";
import StaticContentAction from "../services/actions/StaticContentAction";
import CarouselAction from "../services/actions/CarouselAction";
import {config} from "./config";
import CommonListAction from "../services/actions/CommonListAction";
import pureWP from "./pureRESTLoader";

const site = config.site,

    loadWP = (dispatch, choice, id) => {//aggregate root
        switch (choice) {
            case 'all':
                CalendarAction(dispatch)
                FineMenuAction( site + '/wp-json/wp/v2/categories?per_page=100', dispatch)
                StaticContentAction(site + '/wp-json/wp/v2/pages?status=publish', dispatch)
                CarouselAction(site + '/wp-json/wp/v2/carusel', dispatch)
                break;

            case 'list':
                if (id.id === undefined) {
                    console.error('reducer=>list: id == undefined')
                    return
                }
                if(id.isDuh) {
                    CommonListAction(site + '/wp-json/wp/v2/duhovenstvo', dispatch,
                        site + '/wp-json/wp/v2/media', id.id)
                }else{
                        CommonListAction(
                            site + '/wp-json/wp/v2/posts?categories=' + id.id + '&status=publish',
                            dispatch,
                            site + '/wp-json/wp/v2/media', id.id)
                }
                break;
            default:
                console.log(`Unknown action of reducer: $(choice)`);
                break;
        }
    }


/**
 IOC-container of REST API through function
 <p>
 If you need change backend REST API You'll write new function with switch:case to implement this interface
 @param function dispatch - ()=>setState(reducer()) of Context API or Redux
 @param string choice - variant of loading
 @param mixed id - extra parameter of loading
 @return nothing, Only side effect through reducer
 lightConnasensce
 @see App#constructor(props).state.handle
 @see reducer#Reducer(state,action)

 choice      id                                 action.type (event driven) of reducer
 all          -                                 loadedFinemenu, loadedArticle1Page, loadedCarousel
 listBySlug   string, slug of post category     loadedList
 list         number, id of post category       loadedList
 **/
export default function loadREST(dispatch, choice, id) {
    pureWP.apply(null, arguments)
    //loadWP.apply(null, arguments)
}
