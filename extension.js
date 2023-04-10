const Gio = imports.gi.Gio;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;


class Extension {
    constructor() {
        this._indicator = null;
    }

    enable() {
        log(`enabling ${Me.metadata.name}`);

        this.settings = ExtensionUtils.getSettings(
            'org.gnome.shell.extensions.power-menu');

        //building icons
        let indic_logout = `${Me.metadata.name} indic_logout`;
        let indic_reboot = `${Me.metadata.name} indic_reboot`;
        let indic_shutdown = `${Me.metadata.name} indic_shutdown`;

        // Create panel buttons
        this._indic_logout = new PanelMenu.Button(0.0, indic_logout, false);
        this._indic_reboot = new PanelMenu.Button(0.0, indic_reboot, false);
        this._indic_shutdown = new PanelMenu.Button(0.0, indic_shutdown, false);

        // Add icons
        let icon_logout = new St.Icon({
            icon_name: "system-log-out-symbolic",
            style_class: "system-status-icon"
        });
        let icon_reboot = new St.Icon({
            gicon: new Gio.ThemedIcon({name: 'face-laugh-symbolic'}),
            style_class: 'system-status-icon'
        });
        let icon_shutdown = new St.Icon({
            icon_name: "system-shutdown-symbolic",
            style_class: "system-status-icon"
        });

        this._indic_logout.add_child(icon_logout);
        this._indic_reboot.add_child(icon_reboot);
        this._indic_shutdown.add_child(icon_shutdown);

        // Bind our indicator visibility to the GSettings value
        //
        // NOTE: Binding properties only works with GProperties (properties
        // registered on a GObject class), not native JavaScript properties
        this.settings.bind(
            'show-logout-button',
            this._indic_logout,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );
        this.settings.bind(
            'show-reboot-button',
            this._indic_reboot,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );
        this.settings.bind(
            'show-shutdown-button',
            this._indic_shutdown,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );

        Main.panel.addToStatusArea(indic_logout, this._indic_logout);
        Main.panel.addToStatusArea(indic_reboot, this._indic_reboot);
        Main.panel.addToStatusArea(indic_shutdown, this._indic_shutdown);
    }

    disable() {
        log(`disabling ${Me.metadata.name}`);

        this._indic_logout.destroy();
        this._indic_logout = null;
        this._indic_reboot.destroy();
        this._indic_reboot = null;
        this._indic_shutdown.destroy();
        this._indic_shutdown = null;
    }
}


function init() {
    log(`initializing ${Me.metadata.name}`);

    return new Extension();
}