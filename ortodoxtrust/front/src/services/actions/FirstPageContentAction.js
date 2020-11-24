import m_axios from "./Transport";

const type = 'loadedArticle1Page'

export default function FirstPageContentAction(url, dispatch){
    m_axios('First page text',
        url,
        data => {
            if (!data.length) {
                return;
            }
            const {content, title, date} = data[0];
            dispatch({type,
                data: {date,
                    content: content.rendered,
                    title: title.rendered,
                }
            })
        })
}
