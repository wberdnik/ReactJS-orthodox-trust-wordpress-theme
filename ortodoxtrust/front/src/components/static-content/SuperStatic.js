import React, {Component} from 'react';
import Context from "../../app/context";
import Spinner from "../spinner";

class SuperStatic extends Component {
    PolyContent(clutch){
        return '';
    }
    render() {
        return <Context.Consumer>
            {contextValue => {
                if (contextValue.data.staticPagesContent.isLoaded) {
                     return this.PolyContent(
                        contextValue.fetchStaticContent()
                    )
                }
                return <Spinner/>;
            }
            }
        </Context.Consumer>;
    }
}

export default SuperStatic;
