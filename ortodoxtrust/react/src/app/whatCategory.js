/**
 * No rendering component to calculate category_id from url
 * and refresh ListPage
 *
 * @author VLF(wberdnik@gmail.com)
 * @version 1.1
 */
import {useContext} from "react";
import Context from "./context";
import {config} from "./config";
import loadREST from "./RESTLoader";
import {InnerStorage} from "./InnerStorage";


export default function WhatCategory(props) {
    const state = useContext(Context);
    if (!state.data.finemenu.isLoaded) {
        return null
    }
    //debugger
    const path = props.pathname === '/' ? '/main' : props.pathname,
        currentCategoryIdBefore = InnerStorage.currentCategoryId

    //looking for category_id

    let newId, filtered = state.data.finemenu.content.filter(
        item => '/' + item.slug === path || '/' + item.slug + '/' === path)

    if (filtered.length && filtered[0].id) {
        newId = filtered[0].id;
        InnerStorage.currentCategoryId = newId
        InnerStorage.menuCategoryId = newId
    } else {
        filtered = state.data.finemenu.subPages.filter(
            item => '/' + item.slug === path || '/' + item.slug + '/' === path)

        if (filtered.length && filtered[0].id) {
            InnerStorage.currentCategoryId = filtered[0].id
            InnerStorage.menuCategoryId = filtered[0].parent_id
        }
    }

    //  loading ListPage
    newId = InnerStorage.currentCategoryId
    if (currentCategoryIdBefore !== newId
        && path.slice(1) in config.listMap
        && !state.data.List[newId]) {
        loadREST(state.handle, 'list', newId)
    }
    return null
}
