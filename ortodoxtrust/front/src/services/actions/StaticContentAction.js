export default function StaticContentAction(m_axios, url, dispatch){
    // load pages decoration ========================================================================
    m_axios('Static Pages Content (decoration)',
        url,
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

}
