<?php

//Begin Really Simple SSL session cookie settings
@ini_set('session.cookie_httponly', true);
@ini_set('session.cookie_secure', true);
@ini_set('session.use_only_cookies', true);
//END Really Simple SSL cookie settings
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'if0_36159015_wp976' );

/** Database username */
define( 'DB_USER', '36159015_1' );

/** Database password */
define( 'DB_PASSWORD', '6i@SpX26o-' );

/** Database hostname */
define( 'DB_HOST', 'sql108.byetcluster.com' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'fo7nfctxqrwlgtgtstouodselljttkldodwvikwriqo9gextm14u0x3p3djqtpcg' );
define( 'SECURE_AUTH_KEY',  'ty2zrt26b1hs8ckwxdma4xisatigcncval8lgrliru9zdm4lwfgwzx7elftlqg17' );
define( 'LOGGED_IN_KEY',    '8aqanhiyxr3jje3ttcvtdgdjqwkmqcfkxcdk7q99wwhcirjuizqstw9r8v651syb' );
define( 'NONCE_KEY',        'whyfcm0uoc1mdmzocxjpli0cdqqjslcccahmqzzm3ifz93ikib1m2zxwdcowakdw' );
define( 'AUTH_SALT',        'kgwciknqk8s4qo1hzgmzuct0zauztdgv99eltxr1nleoxdwhbimgplzlumlwhjtm' );
define( 'SECURE_AUTH_SALT', 'ilmcyh4kq6wpxg54n8le9f4wgfcqguycxx7y4jscgkj1rn4ldjarou08chgzv2oq' );
define( 'LOGGED_IN_SALT',   '9q08umwc5tcyy5yehnueuzomltoei3kdr7aw7qlohbnhyeatgv6vixpfj88twqwa' );
define( 'NONCE_SALT',       'x1aerczfbelsp8ttoqmdosjjebszr3hqtxcfbxd5nhicdkd1fwqipdsl1fdhcbmd' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpyr_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
