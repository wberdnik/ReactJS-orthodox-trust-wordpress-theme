<?php

/**
 * Ortodox Trust WordPress Theme functions.php
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Ortodox_Trust 
 */
add_filter('xmlrpc_enabled', '__return_false');

function enqueue_assets() {
    $theme_uri = get_template_directory_uri();

    $id = 'vlf-style';
    wp_register_style($id, $theme_uri . "/front/build/css/vlf.css");
    wp_enqueue_style($id);

    $boundle = glob(__DIR__ . '/front/build/static/css/*.css');

    foreach ($boundle as $n => $link) {
        $id = 'chunk-style' . $n;
        wp_register_style($id, $theme_uri . str_replace(__DIR__, '', $link));
        wp_enqueue_style($id);
    }

    $boundle = glob(__DIR__ . '/front/build/static/js/*.js');

    foreach ($boundle as $n => $link) {
        $id = 'react' . $n . '-chunk';
        wp_register_script($id, $theme_uri . str_replace(__DIR__, '', $link));
        wp_enqueue_script($id, '', [], false, true);
    }
}

add_action('wp_enqueue_scripts', 'enqueue_assets');



//
//add_theme_support( 'responsive-embeds' );
//add_action( 'after_setup_theme', 'twentynineteen_setup' );
//add_action( 'widgets_init', 'twentynineteen_widgets_init' );
//add_action( 'after_setup_theme', 'twentynineteen_content_width', 0 );
//add_action( 'wp_enqueue_scripts', 'twentynineteen_scripts' );
//add_action( 'wp_print_footer_scripts', 'twentynineteen_skip_link_focus_fix' );
//add_action( 'enqueue_block_editor_assets', 'twentynineteen_editor_customizer_styles' );
//add_action( 'wp_head', 'twentynineteen_colors_css_wrap' );
