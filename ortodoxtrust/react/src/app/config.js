import ListPage from "../components/list-page";
import PriesthoodList from "../components/priesthood-list"

export const config = {
    socials: [
        {
            url: 'https://vk.com/club172766164',
            text: 'ВКонтакте',
            FontAwesomeIcon: 'vk',
        },
        {
            url: 'https://www.instagram.com/central_blag/',
            text: 'Instagram',
            FontAwesomeIcon: 'instagram',
        },
    ],
    footer_sites: [
        {'url': 'http://www.patriarchia.ru/', 'text': 'Официальный сайт Московского Патриархата'},
        {'url': 'http://volgeparhia.ru/', 'text': 'Официальный сайт Волгоградской епархии'},
        {'url': 'http://sobor-aleksandra-nevskogo.ru/', 'text': 'Храм Александра Невского'},
    ],
    contacts: [
        {
            text: 'site@central-blag.ru',
            FontAwesomeIcon: 'envelope',
        },
        {
            text: '+7 (999) 628-84-86, телефон секретаря',
            FontAwesomeIcon: 'phone',
        },
    ],
    listMap: {
        hrams: ListPage,
        holy: ListPage,
        duhovenstvo: PriesthoodList
    },
};
