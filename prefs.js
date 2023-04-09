const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

function init () {
    return new Extension();
}

function buildPrefsWidget () {
    let widget = new MyPrefsWidget();
    widget.show_all();
    return widget;
}

const MyPrefsWidget = new GObject.Class({
    Name: 'My.Prefs.Widget',
    GTypeName: 'MyPrefsWidget',
    Extends: Gtk.Box,

    _init: function (params) {
        this.parent(params);
        this.margin = 24;
        this.set_spacing(15);
        this.set_orientation(Gtk.Orientation.VERTICAL);

        let label = new Gtk.Label({
            label : "Translated Text",
        });

        let spinButton = new Gtk.SpinButton();
        spinButton.set_sensitive(true);
        spinButton.set_range(-60, 60);
        spinButton.set_value(0);
        spinButton.set_increments(1, 2);

        spinButton.connect('value-changed', function (widget) {
            log('spinButton value-changed: ' + widget.get_value());
        });

        let hBox = new Gtk.Box();
        hBox.set_orientation(Gtk.Orientation.HORIZONTAL);

        hBox.pack_start(label, false, false, 0);
        hBox.pack_end(spinButton, false, false, 0);

        this.add(hBox);
    }
});