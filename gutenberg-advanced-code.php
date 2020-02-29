<?php
/*
Plugin Name: Gutenberg Advanced Code
Description: Extends the default code block in Gutenberg
Author: Abraham Przewodnik
Version: 0.1
Author URI: https://partiellkorrekt.de
*/

add_action('enqueue_block_editor_assets', function () {
  wp_enqueue_script(
    'gutenberg-advanced-code',
    plugin_dir_url(__FILE__) . 'dist/main.js',
    ['jquery', 'lodash'],
    null,
    true
  );
  wp_enqueue_style(
    'gutenberg-advanced-code-css',
    plugin_dir_url(__FILE__) . 'ace-patches.css'
  );
});
