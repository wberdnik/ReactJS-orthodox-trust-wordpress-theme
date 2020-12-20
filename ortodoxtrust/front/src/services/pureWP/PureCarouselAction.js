import m_axios from "../actions/Transport";
import {config} from "../../app/config";

const  type = 'loadedCarousel'

export default function PureCarouselAction(url, url_media, dispatch){
    m_axios('pure carousel',url,
        data => {
            if (!data.length)  return Promise.reject(new Error('Не найдены страницы'))
            const row = data.find(item => item.slug === config.categories.PARENT_PAGE_OF_CAROUSEL)
            if (row === undefined) {
                return Promise.reject(new Error('Не найдена карусель slug ``'+config.categories.CANDLE_MENU+'``'))
            }

            let root_page_id = row.id,
                next_level = [], content=[] //!!! синхронные по индексам

            // hram - parents pages
            data.forEach(item => {
                const {parent, id, title,featured_media} = item
                if (parent === root_page_id) {
                    next_level.push(id)
                    content.push({
                        id,
                        description: title.rendered,
                        image_id: featured_media,
                        image: '',
                        user: '',
                        userProfile: '',
                        imgProfileId: '',
                    })
                }
            })
            // Pages of pastors
            data.forEach(item => {
                const {parent, title,featured_media} = item
                const whr = next_level.indexOf(parent)
                if (~whr) {
                    content[whr].user = title.rendered
                    content[whr].imgProfileId = featured_media
                }
            })

            m_axios('Images of post list',
                url_media,
                data => {
                    data.forEach(item => {
                        const {id, source_url} = item
                        let inx = content.findIndex(x => x.image_id === id);
                        if (~inx) content[inx].image = source_url;
                        inx = content.findIndex(x => x.imgProfileId === id);
                        if (~inx) content[inx].userProfile = source_url;
                    })
                    dispatch({type,data: {content}})
                }
            );

        })
}
