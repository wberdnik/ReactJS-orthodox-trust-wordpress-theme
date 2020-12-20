/**
 * IOC-container of REST API through function LoadRest (see below)
 * @author VLF(wberdnik@gmail.com)
 * @version 1.?
 */
import CalendarAction from "../services/actions/CalendarAction";
import FineMenuAction from "../services/actions/FineMenuAction";
import {config} from "./config";
import CommonListAction from "../services/actions/CommonListAction";
import PureStaticContentAction from "../services/pureWP/PureStaticContentAction";
import PureCarouselAction from "../services/pureWP/PureCarouselAction";
import DuhoventstvoListAction from "../services/pureWP/DuhoventstvoListAction";
import {InnerStorage} from "./InnerStorage";

const site = config.site,

    pureWP = (dispatch, choice, id) => {//aggregate root
        switch (choice) {
            case 'all':
                CalendarAction(dispatch)
                FineMenuAction( site + '/wp-json/wp/v2/categories?per_page=100', dispatch)
                PureStaticContentAction(site + '/wp-json/wp/v2/pages?status=publish&per_page=100', dispatch)
                PureCarouselAction(site + '/wp-json/wp/v2/pages?per_page=100',
                    site + '/wp-json/wp/v2/media', dispatch)
                break;

            case 'list':
                if(id.isDuh) {
                    DuhoventstvoListAction(site + '/wp-json/wp/v2', dispatch,
                        site + '/wp-json/wp/v2/media')
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


export default pureWP;
