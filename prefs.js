const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
    Convenience.initTranslations();
}

function buildPrefsWidget() {
    let settings = Convenience.getSettings();

    let prefsWidget = new Gtk.Box({
        orientation: Gtk.Orientation.VERTICAL,
        border_width: 10,
        spacing: 10,
    });

    let mysettingSwitch = new Gtk.Switch();
    mysettingSwitch.set_active(settings.get_boolean('mysetting'));
    mysettingSwitch.connect('notify::active', (switchWidget) => {
        let active = switchWidget.get_active();
        settings.set_boolean('mysetting', active);
    });

    let mysettingLabel = new Gtk.Label({
        label: _('My Setting'),
        use_markup: true,
        xalign: 0,
    });

    let mysettingRow = new Gtk.Box({
        orientation: Gtk.Orientation.HORIZONTAL,
        spacing: 10,
    });
    mysettingRow.pack_start(mysettingLabel, false, false, 0);
    mysettingRow.pack_end(mysettingSwitch, false, false, 0);

    prefsWidget.pack_start(mysettingRow, false, false, 0);

    prefsWidget.show_all();

    return prefsWidget;
}
