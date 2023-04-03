/**********************************************************************
 *
 *   Extension created by :
 *   ___   _____ _______ ___  _____  _    _  _____ ______
 *  / _ \ / ____|__   __/ _ \|  __ \| |  | |/ ____|  ____|
 * | | | | |       | | | | | | |__) | |  | | |    | |__
 * | | | | |       | | | | | |  ___/| |  | | |    |  __|
 * | |_| | |____   | | | |_| | |    | |__| | |____| |____
 *  \___/ \_____|  |_|  \___/|_|     \____/ \_____|______|
 *
 * PowerMenu is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 **********************************************************************/

const GETTEXT_DOMAIN = 'my-indicator-extension';
const { GObject, St, Clutter, Gio } = imports.gi;
const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const _ = ExtensionUtils.gettext;

let myButton1, myButton2, myButton3;
let mySettings;


function buildPrefsWidget() {
    let prefsWidget = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        spacing: 12,
        margin_top: 24,
        margin_bottom: 24,
        margin_start: 24,
        margin_end: 24
    });
    // Add checkboxes for enabling/disabling buttons
    let button1Enabled = new Gtk.CheckButton({ label: "Enable button 1" });
    let button2Enabled = new Gtk.CheckButton({ label: "Enable button 2" });
    let button3Enabled = new Gtk.CheckButton({ label: "Enable button 3" });
    prefsWidget.add(button1Enabled);
    prefsWidget.add(button2Enabled);
    prefsWidget.add(button3Enabled);
    // Add a combo box for selecting button 1's action
    let button1Action = new Gtk.ComboBoxText();
    button1Action.append_text("Action 1");
    button1Action.append_text("Action 2");
    button1Action.set_active(mySettings.get_enum("button1-action"));
    prefsWidget.add(button1Action);
    // Add a combo box for selecting button 2's action
    let button2Action = new Gtk.ComboBoxText();
    button2Action.append_text("Action 1");
    button2Action.append_text("Action 2");
    button2Action.set_active(mySettings.get_enum("button2-action"));
    prefsWidget.add(button2Action);
    // Add a combo box for selecting button 3's action
    let button3Action = new Gtk.ComboBoxText();
    button3Action.append_text("Action 1");
    button3Action.append_text("Action 2");
    button3Action.set_active(mySettings.get_enum("button3-action"));
    prefsWidget.add(button3Action);

    return prefsWidget;
}


function _updateButtons() {
    // Get the enabled/disabled state of each button from the settings
    let button1Enabled = mySettings.get_boolean("button1-enabled");
    let button2Enabled = mySettings.get_boolean("button2-enabled");
    let button3Enabled = mySettings.get_boolean("button3-enabled");
    // Set the visibility of each button based on its enabled/disabled state
    myButton1.actor.visible = button1Enabled;
    myButton2.actor.visible = button2Enabled;
    myButton3.actor.visible = button3Enabled;
}


const Indicator = GObject.registerClass(
    class Indicator extends PanelMenu.Button {
        _init() {
            super._init(0.0, _('My Shiny Indicator'));

            let button;

            button = new St.Bin({
                style_class: "panel-button",
                reactive: true,
                can_focus: false,
                track_hover: false,
            });

            let icon = new St.Icon({
                icon_name: "system-log-out-symbolic",
                style_class: "system-status-icon"
            });

            button.set_child(icon);

            function forceLogout() {
                let [success, pid] = GLib.spawn_async(null, ['gnome-session-quit', '--force'], null, GLib.SpawnFlags.SEARCH_PATH, null, null);
            }

            button.connect("button-press-event", forceLogout);

            this.add_child(button);
        }
    });

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }
    enable() {
        //button.connect("button-press-event", forceLogout);
        this._indicator = new Indicator();
        Main.panel.addToStatusArea(this._uuid, this._indicator);
    }
    disable() {
        //button.disconnect("button-press-event", forceLogout);
        this._indicator.destroy();
        this._indicator = null;
    }
}

function init(meta) {
    // Load the settings schema
    mySettings = new Gio.Settings({
        schema:"org.gnome.shell.extensions.power-menu",
        path:"/org/gnome/shell/extensions/power-menu/"
    });

    // Connect to the settings-changed signal to update the buttons when the settings change
    mySettings.connect("changed::button1-enabled", _updateButtons);
    mySettings.connect("changed::button2-enabled", _updateButtons);
    mySettings.connect("changed::button3-enabled", _updateButtons);

    // Create the buttons
    myButton1 = new PanelMenu.Button(0.0, "Button 1");
    myButton2 = new PanelMenu.Button(0.0, "Button 2");
    myButton3 = new PanelMenu.Button(0.0, "Button 3");

    // Create the menu items for each button
    let button1MenuItem1 = new PopupMenu.PopupMenuItem("Button 1 - Action 1");
    let button1MenuItem2 = new PopupMenu.PopupMenuItem("Button 1 - Action 2");
    let button2MenuItem1 = new PopupMenu.PopupMenuItem("Button 2 - Action 1");
    let button2MenuItem2 = new PopupMenu.PopupMenuItem("Button 2 - Action 2");
    let button3MenuItem1 = new PopupMenu.PopupMenuItem("Button 3 - Action 1");
    let button3MenuItem2 = new PopupMenu.PopupMenuItem("Button 3 - Action 2");

    // Add the menu items to the buttons
    myButton1.menu.addMenuItem(button1MenuItem1);
    myButton1.menu.addMenuItem(button1MenuItem2);
    myButton2.menu.addMenuItem(button2MenuItem1);
    myButton2.menu.addMenuItem(button2MenuItem2);
    myButton3.menu.addMenuItem(button3MenuItem1);
    myButton3.menu.addMenuItem(button3MenuItem2);

    // Connect the menu items to their respective actions
    button1MenuItem1.connect('activate', function() {
        // Do action 1 for button 1
        // ...
    });
    button1MenuItem2.connect('activate', function() {
        // Do action 2 for button 1
        // ...
    });
    button2MenuItem1.connect('activate', function() {
        // Do action 1 for button 2
        // ...
    });
    button2MenuItem2.connect('activate', function() {
        // Do action 2 for button 2
        // ...
    });
    button3MenuItem1.connect('activate', function() {
        // Do action 1 for button 3
        // ...
    });
    button3MenuItem2.connect('activate', function() {
        // Do action 2 for button 3
        // ...
    });

    // Add the buttons to the top panel
    Main.panel.addToStatusArea("my-button-1", myButton1);
    Main.panel.addToStatusArea("my-button-2", myButton2);
    Main.panel.addToStatusArea("my-button-3", myButton3);

    // Update the visibility of the buttons based on the settings
    _updateButtons();
    return new Extension(meta.uuid);
}