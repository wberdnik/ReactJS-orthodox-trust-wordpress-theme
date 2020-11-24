import m_axios from "./Transport";

const type = 'loadedList', image = ''

export default function CommonListAction(url, dispatch, url_media, category_id) {
    m_axios('Post list', url,
        data => {
             if (data.length) {
                const contentOut = data.map(item => {
                    const {id, date, featured_media, content, title} = item
                    return {
                        id, date, image, featured_media,
                        description: content.rendered,
                        title: title.rendered,
                    }
                })

                m_axios('Images of post list',
                    url_media,
                    data => {
                        data.forEach(item => {
                            const {id, source_url} = item,
                                inx = contentOut.findIndex(x => x.featured_media === id);
                            if (~inx) contentOut[inx].image = source_url;
                        })
                        dispatch({type, data: {content: contentOut, category_id}})
                    }
                );
                return
            }
            const contentOut = [{
                description: 'Ничего не найдено',
                image,
                featured_media: 0,
                title: '',
                id: '',
                date: '',
            }];
            dispatch({type, data: {content: contentOut, category_id}})
        }
    )
}
