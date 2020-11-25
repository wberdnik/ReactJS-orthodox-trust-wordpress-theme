<?php
/**
 * Ortodox Trust WordPress Theme header.php
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Ortodox_Trust 
 */
?>
<!DOCTYPE html>
<html lang="ru-RU">
    <head>
        <meta charset="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Александровское благочиние Волоградской епархии">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Александровское благочиние Волоградской епархии">
        <meta name="rights" content="©Русская православная церковь">
        <!--script async="" src="http://graph.facebook.com/?callback=WPCOMSharing.update_
        facebook_count&amp;ids=http%3A%2F%2Fcentral-blag.ru%2Fxramy%2F&amp;_=1592802555084"></script -->
        <meta name="description" content="Официальный сайт Александровского благочиния Волоградской епархии"/>
        <!-- link rel="apple-touch-icon" href="/logo192.png"/ -->
        <link rel="manifest" href="/manifest.json"/>
        <title>Храмы благочиния - Александровское благочиние Волоградской епархии</title>
        <link rel="canonical" href="index.html">
        <meta property="og:locale" content="ru_RU">
        <meta property="og:type" content="article">
        <meta property="og:title" content="Храмы благочиния - Александровское благочиние Волоградской епархии">
        <meta property="og:url" content="http://central-blag.ru/xramy/">
        <meta property="og:site_name" content="Александровское благочиние Волоградской епархии">
        <meta property="article:published_time" content="2013-04-05T17:53:53+00:00">
        <meta property="article:modified_time" content="2014-07-24T13:18:10+00:00">
        <?php wp_head(); ?>

       
        <!--[if lt IE 9]>  <script src="/media/jui/js/html5.js"></script><![endif]-->
    </head>
    <body>
        <?php //wp_body_open(); ?>
        <noscript>Сайт использует Java Script. Без JS работа сайта не возможна.</noscript>
        <script>
            const SupportsCSS = (property, value, el) => {
                el = document.createElement('span')
                if (el.style[property] === undefined) return !1
                el.style.cssText = property + ':' + value
                return el.style[property] === value
            }

            if (!SupportsCSS('display', 'grid')) {
                alert('Браузер не поддерживает GridBox, обновите браузер')
            }
        </script>
        <span></span><div id="root"></div><span></span>

