define(function(require, exports, module) { // jshint ignore:line
    'use strict';
    
    var $ = require('jquery');
    var TabView = require('./views/TabView');
    var CollapsibleView = require('./views/CollapsibleView');

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        // Create your views here
        // Pass in a reference to DOM elements that need functionality attached to them
        this.tabView = new TabView($('[data-view=Tabs]'));

        this.collapsibleView = new CollapsibleView($('[data-view=Collapsible]'), {
            triggerEvent: 'click',
            singleOpen: false
        });
    };

    return App;

});