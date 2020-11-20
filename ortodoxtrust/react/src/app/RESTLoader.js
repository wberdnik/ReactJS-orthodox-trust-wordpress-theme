/**
 * IOC-container of REST API through function LoadRest (see below)
 * @author VLF(wberdnik@gmail.com)
 * @version 1.?
 */
import SAXParser from "./SAXParser";


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
                // calendar ==========================

                let content = [
                    /*  {
                          day: 20,
                          month: 'августа',
                          weekday: 'Четверг',
                          oldstyle: '07 августа',
                          text: '<p>Попразднство Преображения Господня. Прмч. Дометия Персянина и двух учеников его (363). <b>Обретение мощей свт. Митрофана, еп. Воронежского</b> (1832). Прп. Антония Оптинского (1865).</p><p>Прп. Пимена Многоболезненного, Печерского, в Ближних пещерах (1110). Прп. Пимена, постника Печерского, в Дальних пещерах (XIII–XIV). Прп. Меркурия Печерского, еп. Смоленского, в Ближних пещерах (1239). Мчч. Марина и Астерия (260). Прп. Ора (ок. 390). Прмц. Потамии чудотворицы. Прп. Феодосия Нового (IX–X). Свт. Иерофея Венгерского (X). Св. Стефана I, короля Венгрии (1038). Прп. Феодоры Сихловской (начало XVIII) (Румын.).</p><p>Сщмчч. Александра Хотовицкого, Петра Токарева, Михаила Плышевского, Иоанна Воронца, Димитрия Миловидова и Алексия Воробьева пресвитеров, Елисея Штольдера диакона и прмч. Афанасия Егорова (1937); сщмч. Василия Аменицкого пресвитера (1938).</p><p>@Утр. – Ин., 35 зач. (от полу’), X, 1–9<a class="snsa" name="snstext1" href="#snscmnt1"><sup>1</sup></a>. Лит. – 2 Кор., 175 зач., IV, 1–6. Мф., 99 зач., XXIV, 13–28. Свт.: Евр., 318 зач., VII, 26 – VIII, 2. Ин., 36 зач., X, 9–16, или прмч.: Еф., 233 зач., VI, 10–17. Ин., 52 зач., XV, 17 – XVI, 2<a class="snsa" name="snstext2" href="#snscmnt2"><sup>2</sup></a>.@</p>',
                          img: 'https://days.pravoslavie.ru/jpg/is4431.jpg'
                      },*/
                ]


                const parser = new SAXParser();

                const asyncCalendarText = day => {
                    return new Promise(function (resolve, reject) {
                        const currentDay = new Date(),
                            jobDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + day),
                            dateFormater = val => val < 10 ? '0' + val :  val,
                            year = jobDate.getFullYear(),
                            month = dateFormater(jobDate.getMonth() + 1),
                            dateMonth =dateFormater(jobDate.getDate())

                        const xhr = new XMLHttpRequest();
                        xhr.open('get', `http://prihod.ru/days/?cd=${year}-${month}-${dateMonth}`, true);
                        xhr.setRequestHeader("Content-Type", "text/plain");
                        xhr.setRequestHeader("Accept", "text/html");
                        xhr.onload = function () {
                            if (this.status >= 200 && this.status < 300) {

                            //resolve(this.response);
                            debugger
                        }else {
                                console.log('Fetch Error Calendar Text :-S', this.status);
                                resolve(1)
                            }
                        };
                        xhr.onerror = function (err) {
                                console.log('Fetch Error Calendar Text :-S', err);
                                resolve(1)
                        }
                        xhr.send()

                        // Не работает - причина : https://bugs.chromium.org/p/chromium/issues/detail?id=457157&q=fetch%20no-cors&colspec=ID%20Pri%20M%20Week%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified
                       // fetch(`http://prihod.ru/days/?cd=${year}-${month}-${dateMonth}`, {


                    });
                }

                const head = document.getElementsByTagName('head').item(0)

                const asyncCalendarIcon = day => new Promise(function (resolve, reject) {
                    const script = document.createElement('script')
                    script.src = `http://script.pravoslavie.ru/icon.php?advanced=2&tmshift=${day * 24}`
                    script.type = 'text/javascript'
                    script.async = !0
                    script.onerror = a => {
                        head.removeChild(a.target);
                        resolve(1)
                    }
                    script.onload = a => {
                        const {dayicon} = window,
                            oldYear = +dayicon.monthnew === 1 && +dayicon.daynew < 14 ? +dayicon.year - 1 : +dayicon.year,
                            dateOld = new Date(oldYear, (+dayicon.monthold) - 1, +dayicon.dayold),
                            dateNew = new Date(+dayicon.year, (+dayicon.monthnew) - 1, +dayicon.daynew),
                            week = dateNew.toLocaleString("ru", {weekday: 'long'})

                        content.push({
                            day: +dayicon.daynew,
                            month: dateNew.toLocaleString("ru", {month: 'long', day: 'numeric'}).split(' ')[1],
                            weekday: week[0].toLocaleUpperCase() + week.slice(1),
                            oldstyle: dateOld.toLocaleString("ru", {month: 'long', day: 'numeric',}),
                            text: `<p>${dayicon.text}</p>`,
                            alt: dayicon.text,
                            img: dayicon.src,
                            glide: day,

                        })

                        head.removeChild(a.target)
                        resolve(2)
                    }
                    head.appendChild(script)
                })


                asyncCalendarIcon(-2)
                   // .then(response => asyncCalendarText(-1))
                    .then(response => asyncCalendarIcon(-1))
                    .then(response => asyncCalendarIcon(0))
                    .then(response => asyncCalendarIcon(1))
                    .then(response => asyncCalendarIcon(2))
                    .then(response => asyncCalendarIcon(3))
                    .then(response => asyncCalendarIcon(4))
                    .finally(x => dispatch({
                        type: 'loadedCalendar',
                        data: content
                    }))


                // finemenu =====================================================================
                m_axios('Fine menu - id',
                    site + '/wp-json/wp/v2/categories',
                    data => {
                        if (!data.length) {
                            return Promise.reject(new Error('Не найдено меню'))
                        }
                        let root_category_id = null;

                        for (let i = 0, n = data.length; i < n; i++) {
                            if (data[i].slug === 'candlemenu') {
                                root_category_id = data[i].id;
                                break;
                            }
                        }

                        if (root_category_id === null) {
                            return Promise.reject(new Error('Не найдено меню slug ``candlemenu``'))
                        }


                        let content = [], nextlevel = [], subPages = [];

                        // Menu
                        for (let i = 0, n = data.length; i < n; i++) {
                            const datum = data[i];
                            if (datum.parent !== root_category_id) continue;
                            const parser = datum.description.match(/^.*(\d+)/);
                            nextlevel.push(datum.id);
                            content.push({
                                id: datum.id,
                                label: datum.name,
                                order: +parser[1],
                                slug: datum.slug
                            });
                        }
                        // Other pages
                        for (let i = 0, n = data.length; i < n; i++) {
                            const datum = data[i];
                            if (nextlevel.indexOf(datum.parent) === -1) continue;

                            subPages.push({
                                id: datum.id,
                                label: datum.name,
                                slug: datum.slug,
                                parent_id: datum.parent
                            });
                        }
                        content.sort((a, b) => {
                            if (a.order < b.order) return -1;
                            return (a.order > b.order) ? 1 : 0;
                        });
                        dispatch({
                            type: 'loadedFinemenu',
                            data: {
                                content: content,
                                cnt: content.length,
                                subPages: subPages,
                            }
                        });


                    });

                // load pages decoration ========================================================================
                m_axios('Static Pages Content (decoration)',
                    site + '/wp-json/wp/v2/pages?status=publish',
                    data => {
                        let content = [];
                        for (let i = 0, n = data.length; i < n; i++) {
                            const datum = data[i];
                            content[+datum.acf.category] = {
                                title: datum.title.rendered,
                                content: datum.content.rendered,
                            };
                        }

                        dispatch({
                            type: 'loadedStaticPagesContent',
                            data: {
                                content: content,
                            }
                        });

                    });

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
                                    const inx = content.findIndex(item => item.featured_media === datum.id);
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


