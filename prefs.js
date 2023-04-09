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

        this.add(label);
    }
});