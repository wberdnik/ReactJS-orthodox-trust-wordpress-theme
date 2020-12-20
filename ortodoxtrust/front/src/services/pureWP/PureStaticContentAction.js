import m_axios from "../actions/Transport";

const type = 'loadedStaticPagesContent'

export default function PureStaticContentAction(url, dispatch) {
    m_axios('Static Pages Content (decoration)', url,
        data => {
            const content = [];
            for (let i = 0, n = data.length; i < n; i++) {
                const datum = data[i];
                content[datum.slug] = {
                    title: datum.title.rendered,
                    content: datum.content.rendered,
                };
            }
            dispatch({type, data: {content}})
        })
}
//[category_id] ={title:,content} - page
