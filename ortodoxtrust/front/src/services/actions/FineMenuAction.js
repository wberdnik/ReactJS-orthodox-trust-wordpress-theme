import m_axios from "./Transport";
import {config} from "../../app/config";

const type = 'loadedFinemenu'

export default function FineMenuAction(url, dispatch) {
    // finemenu =====================================================================
    m_axios('Fine menu - id',
        url,
        data => {
            if (!data.length)  return Promise.reject(new Error('Не найдено меню'))
            const row = data.find(item => item.slug === config.categories.CANDLE_MENU)
            if (row === undefined) {
                return Promise.reject(new Error('Не найдено меню slug ``'+config.categories.CANDLE_MENU+'``'))
            }

            let root_category_id = row.id,
                content = [],
                next_level = [],
                subPages = []

            // Menu
            data.forEach(item => {
                const {parent, id, description, name, slug} = item
                if (parent === root_category_id) {
                    next_level.push(id)
                    content.push({id, label:name, slug,
                        order: +description.match(/^.*(\d+)/)[1], // число в начале текста
                    })
                }
            })
            // Other pages
            data.forEach(item => {
                const {parent, id, name, slug} = item
                if (~next_level.indexOf(parent)) subPages.push({id, label:name, slug, parent_id:parent})
            })

            content.sort((a, b) => a.order < b.order ? -1 : (a.order > b.order ? 1 : 0))
            dispatch({type, data: {content, cnt: content.length, subPages}})
        })
}
// Иерархия категорий- ???
