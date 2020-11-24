import React, {useContext} from "react";
import Context from "../../app/context";
import Spinner from "../../components/spinner";

/**  Статья на главной странице
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function PostOn1Page() {
    const {isLoaded, content, title, date} = useContext(Context).data.firstPage;
    if (isLoaded) {
        return (
            <article>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{__html: content}}></div>
                <p>Опубликовано {date}</p>
            </article>
        )
    }
    return (<Spinner/>);
}
