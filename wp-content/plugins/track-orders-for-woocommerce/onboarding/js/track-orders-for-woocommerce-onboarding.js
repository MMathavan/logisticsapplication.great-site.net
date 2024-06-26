jQuery(document).ready(function($) {

    const MDCText = mdc.textField.MDCTextField;
    const textField = [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
        return new MDCText(el);
    });
    const MDCRipple = mdc.ripple.MDCRipple;
    const buttonRipple = [].map.call(document.querySelectorAll('.mdc-button'), function(el) {
        return new MDCRipple(el);
    });
    const MDCSwitch = mdc.switchControl.MDCSwitch;
    const switchControl = [].map.call(document.querySelectorAll('.mdc-switch'), function(el) {
        return new MDCSwitch(el);
    });

    var wps_deactivation_skip_button_id = wps_msp_onboarding.msp_current_supported_slug[0] + "-no_thanks_deactive";
    var wps_onboarding_popup_id = wps_msp_onboarding.msp_current_supported_slug[0] + "-onboarding_popup";


    var dialog = "";
    if ($('.track-orders-for-woocommerce').length > 0 ){
        if ('admin.php' == wps_msp_onboarding.msp_current_screen) {
            dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.' + wps_msp_onboarding.msp_current_supported_slug[0]));
        } else if ('plugins.php' == wps_msp_onboarding.msp_current_screen) {
            dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('#' + wps_onboarding_popup_id));   
        }
    }
    /*if device is mobile*/
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        jQuery('body').addClass('mobile-device');
    }

    var deactivate_url = '';

    // Add Select2.
    jQuery('.on-boarding-select2').select2({
        placeholder: 'Select All Suitable Options...',
    });

    // On click of deactivate.
    if ('plugins.php' == wps_msp_onboarding.msp_current_screen) {

        // Add Deactivation id to all deactivation links.
        wps_msp_embed_id_to_deactivation_urls();
        wps_msp_add_deactivate_slugs_callback(wps_msp_onboarding.msp_current_supported_slug);

        jQuery(document).on('change', '.msp-on-boarding-radio-field', function(e) {

            e.preventDefault();
            if ('other' == jQuery(this).attr('id')) {
                jQuery('#deactivation-reason-text').removeClass('wps-msp-keep-hidden');
            } else {
                jQuery('#deactivation-reason-text').addClass('wps-msp-keep-hidden');
            }
        });
    } else {
        // Show Popup after 1 second of entering into the wps pagescreen.
        if (jQuery('#wps-msp-show-counter').length > 0 && jQuery('#wps-msp-show-counter').val() == 'not-sent') {
            setTimeout(wps_msp_show_onboard_popup(), 1000);
        }
    }

    /* Close Button Click */
    jQuery(document).on('click', '.wps-msp-on-boarding-close-btn a', function(e) {
        e.preventDefault();
        wps_msp_hide_onboard_popup();
    });

    /* Skip and deactivate. */
    jQuery(document).on('click', '#' + wps_deactivation_skip_button_id, function(e) {

        window.location.replace(deactivate_url);
        wps_msp_hide_onboard_popup();
    });

    /* Skip For a day. */
    jQuery(document).on('click', '.wps-msp-on-boarding-no_thanks', function(e) {
        jQuery.ajax({
            type: 'post',
            dataType: 'json',
            url: wps_msp_onboarding.ajaxurl,
            data: {
                nonce: wps_msp_onboarding.msp_auth_nonce,
                action: 'msp_skip_onboarding_popup',
            },
            success: function(msg) {
                wps_msp_hide_onboard_popup();
            }
        });

    });

    /* Submitting Form */
    jQuery(document).on('submit', 'form.wps-msp-on-boarding-form', function(e) {

        e.preventDefault();
        var form_data = JSON.stringify(jQuery('form.wps-msp-on-boarding-form').serializeArray());

        jQuery.ajax({
            type: 'post',
            dataType: 'json',
            url: wps_msp_onboarding.ajaxurl,
            data: {
                nonce: wps_msp_onboarding.msp_auth_nonce,
                action: 'wps_msp_send_onboarding_data',
                form_data: form_data,
            },
            success: function(msg) {
                if ('plugins.php' == wps_msp_onboarding.msp_current_screen) {
                    window.location.replace(deactivate_url);
                }
                wps_msp_hide_onboard_popup();
            }
        });
    });

    /* Open Popup */
    function wps_msp_show_onboard_popup() {
        dialog.open();
        if (!jQuery('body').hasClass('mobile-device')) {
            jQuery('body').addClass('wps-on-boarding-wrapper-control');
        }
    }

    /* Close Popup */
    function wps_msp_hide_onboard_popup() {
        // jQuery( '.wps-on-boarding-wrapper-background' ).removeClass( 'onboard-popup-show' );
		// jQuery( '.wps-onboarding-section' ).hide();
        // const dialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('.mdc-dialog'));
        dialog.close();
        if (!jQuery('body').hasClass('mobile-device')) {
            jQuery('body').removeClass('wps-on-boarding-wrapper-control');
        }
    }



    /* Apply deactivate in all the wps plugins. */
    function wps_msp_add_deactivate_slugs_callback(all_slugs) {

        for (var i = all_slugs.length - 1; i >= 0; i--) {

            jQuery(document).on('click', '#deactivate-' + all_slugs[i], function(e) {

                e.preventDefault();
                deactivate_url = jQuery(this).attr('href');
                plugin_name = jQuery(this).attr('aria-label');
                plugin_name = plugin_name.replace('Deactivate ', '');
                jQuery('#plugin-name').val(plugin_name);
                jQuery('.wps-msp-on-boarding-heading').text(plugin_name + ' Feedback');
                var placeholder = jQuery('#wps-msp-deactivation-reason-text').attr('placeholder');
                jQuery('#wps-msp-deactivation-reason-text').attr('placeholder', placeholder.replace('{plugin-name}', plugin_name));
                wps_msp_show_onboard_popup();
            });
        }
    }

    /* Add deactivate id in all the plugins links. */
    function wps_msp_embed_id_to_deactivation_urls() {
        jQuery('a').each(function() {
            if ('Deactivate' == jQuery(this).text() && 0 < jQuery(this).attr('href').search('action=deactivate')) {
                if ('undefined' == typeof jQuery(this).attr('id')) {
                    var slug = jQuery(this).closest('tr').attr('data-slug');
                    jQuery(this).attr('id', 'deactivate-' + slug);
                }
            }
        });
    }

    // End of scripts.
});