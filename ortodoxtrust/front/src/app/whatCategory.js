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

/**
 * Псевдокомпонент. По URL определяет номер категории WordPress
 * @param props
 * @return {null}
 * @constructor
 */
export default function WhatCategory(props) {
    const state = useContext(Context);
    if (!state.data.finemenu.isLoaded) {
        return null
    }
    //debugger
    let menuItem
    const path = props.pathname === '/' ? '/main' : props.pathname,
        currentCategoryIdBefore = InnerStorage.currentCategoryId,
        filterUrl = item => '/' + item.slug === path || '/' + item.slug + '/' === path,
        findByPatch = haystack => {
            const probe = haystack.filter(filterUrl)
            return probe.length && probe[0].id ? probe[0] : null
        }
    // finemenu загружалось с категориями
    if (menuItem = findByPatch(state.data.finemenu.content)) {
        InnerStorage.currentCategoryId = menuItem.id
        InnerStorage.menuCategoryId = menuItem.id
    } else if (menuItem = findByPatch(state.data.finemenu.subPages)){
        InnerStorage.currentCategoryId = menuItem.id
        InnerStorage.menuCategoryId = menuItem.parent_id
    }

    //  post loading ListPage
    const id = InnerStorage.currentCategoryId
    currentCategoryIdBefore !== id
        && path.slice(1) in config.listMap
        && !state.data.List[id] &&
        loadREST(state.handle, 'list', id)

    return null
}
