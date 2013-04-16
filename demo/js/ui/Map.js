define(['Conditioner'],function(Conditioner){

    "use strict";

    // reference to parent class
    var _parent = Conditioner.Module;

    // Map Class
    var Map = function(element) {

        // test if geolocation support, otherwise map won't function
        if (!navigator.geolocation) {
            return;
        }

        // Call BehaviourBase constructor
        _parent.call(this,element);

        // backup content
        this._inner = this._element.innerHTML;

        // loading map
        this._element.innerHTML = 'Loading map...';

        // get position
        navigator.geolocation.getCurrentPosition(this._success.bind(this),this._error.bind(this));
    };

    // Extend from BehaviourBase
    var p = Map.prototype = Object.create(_parent.prototype);

    // get position success
    p._success = function(position) {

        // clear
        this._element.innerHTML = '';

        // append map
        var image = document.createElement('img');
        image.src = 'http://maps.googleapis.com/maps/api/staticmap?center=' + position.coords.latitude + ',' + position.coords.longitude + '&zoom=14&size=' + 500 + 'x' + 300 + '&maptype=roadmap&sensor=false';
        image.alt = '';
        image.className = 'map';
        this._element.appendChild(image);

    };

    // get position fail
    p._error = function(error) {
        this._element.innerHTML = error.message;
    };

    // Unload Map behaviour
    p._unload = function() {

        // call BehaviourBase unload method
        _parent.prototype._unload.call(this);

        // restore content
        this._element.innerHTML = this._inner;

    };

    return Map;

});