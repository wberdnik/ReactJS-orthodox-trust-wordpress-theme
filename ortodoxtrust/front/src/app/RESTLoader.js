/**
 * IOC-container of REST API through function LoadRest (see below)
 * @author VLF(wberdnik@gmail.com)
 * @version 1.?
 */
import CalendarAction from "../services/actions/CalendarAction";
import FineMenuAction from "../services/actions/FineMenuAction";
import StaticContentAction from "../services/actions/StaticContentAction";


const site = 'http://wp2020.loc',
    /**
     Implementation of IOC-container loadREST of WordPress REST API
     @see RESTLoader#loadRest
     */
    loadWP = (dispatch, choice, id) => {//aggregate root

        const testError = response => {
            if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
            }
            return Promise.reject(new Error(response.statusText))
        };

        const m_axios = (is, url, action) => { //items of aggregate
            fetch(url)
                .then(testError)
                .then(response => response.json())
                .then(action)
                .catch(function (err) {
                    console.log('Fetch Error ' + is + ' :-S', err);
                });
        };

        switch (choice) {

            case 'all':
                CalendarAction(dispatch)
                FineMenuAction(m_axios, site + '/wp-json/wp/v2/categories', dispatch)
                StaticContentAction(m_axios,site + '/wp-json/wp/v2/pages?status=publish', dispatch)
                m_axios('First page text',
                    site + '/wp-json/wp/v2/posts?categories=5&status=publish',
                    data => {
                        if (!data.length) {
                            return;
                        }
                        const datum = data[0];
                        dispatch({
                            type: 'loadedArticle1Page',
                            data: {
                                content: datum.content.rendered,
                                title: datum.title.rendered,
                                date: datum.date
                            }
                        });
                    })

                // load carousel ========================================================================
                m_axios('carousel',
                    site + '/wp-json/wp/v2/carusel',
                    data => {
                        let content = data.map(datum => {
                            return {
                                description: datum.title.rendered,
                                image: datum.acf.image.url,
                                user: datum.acf.CEO,
                                userProfile: datum.acf.iconCEO,
                            }
                        })

                        dispatch({
                            type: 'loadedCarousel',
                            data: {content: content},
                        });
                    });

                break; //all

            case 'list':
                if (id === undefined) {
                    console.error('reducer=>list: id == undefined')
                    return
                }
                switch (id) {
                    case 8:
                        list_fetch_duhovenstvo(dispatch);
                        break;
                    default:
                        list_fetch_by_id(id, dispatch)
                }
                break;
            default:
                console.log(`Unknown action of reducer: $(choice)`);
                break;
        }


        /**
         * Loading wp-posts from REST API filtered by category id
         * @param category_id
         * @param function dispatch  reducer of Redux or Context API
         */
        function list_fetch_by_id(category_id, dispatch) {
            //assert(category_id ===undefined)
            if (category_id === undefined) {
                console.error('function list_fetch_by_id: category_id == undefined')
                return
            }
            m_axios('Post list',
                site + '/wp-json/wp/v2/posts?categories=' + category_id + '&status=publish',
                data => {
                    if (data.length) {
                        let content = [];
                        for (let i = 0, n = data.length; i < n; i++) {
                            const datum = data[i];
                            content.push({
                                description: datum.content.rendered,
                                image: '',
                                featured_media: datum.featured_media,
                                title: datum.title.rendered,
                                id: datum.id,
                                date: datum.date,
                            });
                        }
                        m_axios('Images of post list',
                            site + '/wp-json/wp/v2/media',
                            data => {
                                for (let i = 0, n = data.length; i < n; i++) {
                                    const datum = data[i];
                                    const inx = content.findIndex(item => item.featured_media === datum.id);
                                    if (~inx) content[inx].image = datum.source_url;
                                }
                                dispatch({
                                    type: 'loadedList',
                                    data: {content: content, category_id: category_id},
                                });
                            }
                        );
                    } else {
                        dispatch({
                            type: 'loadedList',
                            data: {
                                content: [{
                                    description: 'Ничего не найдено',
                                    image: '',
                                    featured_media: 0,
                                    title: '',
                                    id: '',
                                    date: '',
                                }], category_id: category_id
                            },
                        });
                    }
                });

        }


        /**
         * Loading wp-duhovenstvo from REST API filtered
         * @param function dispatch  reducer of Redux or Context API
         */
        function list_fetch_duhovenstvo(dispatch) {

            m_axios('Post list',
                site + '/wp-json/wp/v2/duhovenstvo',
                data => {
                    if (data.length) {
                        let content = [];
                        for (let i = 0, n = data.length; i < n; i++) {
                            const datum = data[i];
                            content.push({
                                description: datum.content.rendered,
                                image: '',
                                featured_media: datum.featured_media,
                                title: datum.title.rendered,
                                id: datum.id,
                                date: datum.date,
                            });
                        }
                        m_axios('Images of post list',
                            site + '/wp-json/wp/v2/media',
                            data => {
                                for (let i = 0, n = data.length; i < n; i++) {
                                    const datum = data[i];
                                    const inx = content.findIndex(
                                        item => item.featured_media === datum.id);
                                    if (~inx) content[inx].image = datum.source_url;
                                }
                                dispatch({
                                    type: 'loadedList',
                                    data: {content: content, category_id: 8},
                                });
                            }
                        );
                    } else {
                        dispatch({
                            type: 'loadedList',
                            data: {
                                content: [{
                                    description: 'Ничего не найдено',
                                    image: '',
                                    featured_media: 0,
                                    title: '',
                                    id: '',
                                    date: '',
                                }], category_id: 8
                            },
                        });
                    }
                });

        }
    };


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
    loadWP.apply(null, arguments)
}


