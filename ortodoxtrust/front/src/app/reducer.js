/**
 * CQRS pattern like Redux
 * <p>
 *     Notation of action.type
 *          events - loaded*
 *          command - Do*
 * @param Object state  previous State in React Context
 * @param Object action {type: Event or Action, data: payload}
 * @return {new State in React Context}
 * @author VLF(wberdnik@gmail.com)
 * @version 1.?
 */

let startState = {
    firstPage: {isLoaded: false}, //article of first page
    carousel: {isLoaded: false},
    finemenu: {isLoaded: false}, //category (taxonomy) list
    staticPagesContent: {isLoaded: false}, //decoration of pages (WP pages)
    calendar: [],
    List: [], // Array content List component by category_id
};


function Reducer(state = startState, action) {
    let newState;
    switch (action.type) {

        case 'loadedFinemenu':
            newState = Object.assign({}, state);
            newState.data.finemenu = Object.assign({}, action.data, {isLoaded: true});
            return newState;
        case 'loadedCarousel':
            newState = Object.assign({}, state);
            newState.data.carousel = Object.assign({}, action.data, {isLoaded: true});
            return newState;
        case 'loadedArticle1Page':
            newState = Object.assign({}, state);
            newState.data.firstPage = Object.assign({}, action.data, {isLoaded: true});
            return newState;
        case 'loadedStaticPagesContent':
            newState = Object.assign({}, state);
            newState.data.staticPagesContent = Object.assign({}, action.data, {isLoaded: true});
            return newState;
        case 'loadedCalendar':
            newState = Object.assign({}, state);
            newState.data.calendar = action.data;
            return newState;
        case 'loadedList': //event
            newState = Object.assign({}, state);
            newState.data.List[action.data.category_id] = action.data.content;
            return newState;

        default:
            return state;
    }
}



export {startState, Reducer}
