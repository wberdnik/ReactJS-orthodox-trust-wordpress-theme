import m_axios from "./Transport";

const  type = 'loadedCarousel'

export default function CarouselAction(url, dispatch){
    m_axios('carousel',url,
        data => {
            let content = data.map(datum => {
                return {
                    description: datum.title.rendered,
                    image: datum.acf.image.url,
                    user: datum.acf.CEO,
                    userProfile: datum.acf.iconCEO,
                }
            })
            dispatch({type,data: {content}})
        })
}
