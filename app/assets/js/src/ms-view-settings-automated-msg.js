/*global jQuery:false */
/*global window:false */
/*global document:false */
/*global ms_data:false */
/*global ms_functions:false */

window.ms_init.view_settings_automated_msg = function init () {
	var is_dirty = false;

	jQuery( '#switch_comm_type' ).click(function() {
		var me = jQuery( this ),
			form = me.closest( 'form' ),
			ind = 0;

		for ( ind = 0; ind < window.tinymce.editors.length; ind += 1 ) {
			if ( window.tinymce.editors[ind].isDirty() ) { is_dirty = true; break; }
		}

		if ( is_dirty ) {
			if ( ! window.confirm( ms_data.lang_confirm ) ) {
				return false;
			}
		}

		form.submit();
	});

	jQuery( 'input, select, textarea', '.ms-editor-form' ).change(function() {
		is_dirty = true;
	});

	/**
	 * Add the javascript for our custom TinyMCE button
	 *
	 * @see class-ms-controller-settings.php (function add_mce_buttons)
	 * @see class-ms-view-settings-edit.php (function render_tab_messages_automated)
	 */
	window.tinymce.PluginManager.add(
		'ms_variable',
		function( editor, url ) {
			var key, item, items = [];

			// This function inserts the variable to the current cursor position.
			function insert_variable() {
				editor.insertContent( this.value() );
			}

			// Build the list of available variabled (defined in the view!)
			for ( key in ms_data.var_button.items ) {
				if ( ! ms_data.var_button.items.hasOwnProperty( key ) ) {
					continue;
				}

				item = ms_data.var_button.items[key];
				items.push({
					text: item,
					value: key,
					onclick: insert_variable
				});
			}

			// Add the custom button to the editor.
			editor.addButton( 'ms_variable', {
				text: ms_data.var_button.title,
				icon: false,
				type: 'menubutton',
				menu: items
			});
		}
	);
};
