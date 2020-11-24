import m_axios from "./Transport";

const type = 'loadedStaticPagesContent'

export default function StaticContentAction(url, dispatch) {
    m_axios('Static Pages Content (decoration)', url,
        data => {
            const content = [];
            for (let i = 0, n = data.length; i < n; i++) {
                const datum = data[i];
                content[+datum.acf.category] = {
                    title: datum.title.rendered,
                    content: datum.content.rendered,
                };
            }
            dispatch({type, data: {content}})
        })
}
