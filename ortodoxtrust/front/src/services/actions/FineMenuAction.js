
export default function FineMenuAction(m_axios, url, dispatch){
    // finemenu =====================================================================
    m_axios('Fine menu - id',
        url,
        data => {
            if (!data.length) {
                return Promise.reject(new Error('Не найдено меню'))
            }
            let root_category_id = null;

            //Ищем стартовыю категорию
            for (let i = 0, n = data.length; i < n; i++) {
                if (data[i].slug === 'candlemenu') {
                    root_category_id = data[i].id
                    break
                }
            }

            if (root_category_id === null) {
                return Promise.reject(new Error('Не найдено меню slug ``candlemenu``'))
            }


            let content = [], next_level = [], subPages = []

            // Menu
            for (let i = 0, n = data.length; i < n; i++) {
                const {parent, id, description, name, slug} = data[i]
                if (parent !== root_category_id) continue;

                next_level.push(id);
                content.push({
                    id,
                    label: name,
                    order: +description.match(/^.*(\d+)/)[1], // число в начале текста
                    slug
                })
            }
            // Other pages
            for (let i = 0, n = data.length; i < n; i++) {
                const {parent, id, name, slug} = data[i];
                if (!~next_level.indexOf(parent)) continue;

                subPages.push({
                    id,
                    label: name,
                    slug,
                    parent_id: parent
                });
            }
            content.sort((a, b) => a.order < b.order ? -1 :
                       (a.order > b.order ? 1 : 0))

            dispatch({
                type: 'loadedFinemenu',
                data: {
                    content,
                    cnt: content.length,
                    subPages
                }
            })
        })
}
