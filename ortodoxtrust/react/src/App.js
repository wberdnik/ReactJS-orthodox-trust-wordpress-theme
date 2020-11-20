import React from 'react';
import './App.css';
import FirstPage from "./components/first-page/firstPage";
import Context from "./app/context";
import loadREST from "./app/RESTLoader";
import {BrowserRouter, Redirect, Route, Switch,} from "react-router-dom";
import {Reducer, startState} from "./app/reducer";
import Header from "./components/header";
import {config} from "./app/config";
import PatriarhContent from "./components/static-content/PatriarhContent";
import Contacts from "./components/contacts";
import {InnerStorage} from "./app/InnerStorage";


class App extends React.Component {

    constructor(props) {
        super(props);
        //  this.history = createBrowserHistory();
        this.state = {
            data: startState,
            handle: action => this.setState(Reducer(this.state, action)),
            fetchStaticContent: () => {
                const categoryId = InnerStorage.currentCategoryId,
                    filteredContent = this.state.data.staticPagesContent.content[categoryId];
                    return filteredContent ? filteredContent : {title: '', content: ''}
            }
        };
    }

    componentDidMount() {
        loadREST(this.state.handle, 'all');
    }


    render() {//history={this.history}
        return (
            <Context.Provider value={this.state}>
                <div className="App">
                    <BrowserRouter>

                        <Header/>
                        <Switch>
                            <Route exact path='/' component={FirstPage}/>
                            <Redirect from='/main' to='/'/>
                            <Route exact path='/patriarh' component={PatriarhContent}/>
                            <Route exact path='/more' component={PatriarhContent}/>
                            <Route exact path='/contacts' component={Contacts}/>
                            {Object.entries(config.listMap).map(item =>
                                <Route key={item[0]} path={'/' + item[0]} component={item[1]}/>
                            )}

                        </Switch>
                    </BrowserRouter>
                </div>
            </Context.Provider>
        );
    }
}


export default App;
