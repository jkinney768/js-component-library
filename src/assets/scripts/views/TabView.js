define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');

     /**
     * A script for tab triggers to display it's associated content when clicked
     *
     * @class TabView
     * @param {jQuery} $element A reference to the containing DOM element.
     * @constructor
     */
    var TabView = function ($element) {

        TabView.STATES = {
            activeClass: 'active'
        };

        TabView.DATA_ATTRIBUTE = {
            TRIGGER: 'tab-trigger',
            CONTENT: 'tab-content'
        };

        this.$element = $element;
        this.$triggers = $element.find('[data-' + TabView.DATA_ATTRIBUTE.TRIGGER + ']'); 
        this.$contents = $element.find('[data-' + TabView.DATA_ATTRIBUTE.CONTENT + ']');
        this.currentTab = null;

        if (!$element.length) {
            return;
        }

        this.init();
    };

    var proto = TabView.prototype;

    proto.init = function () {

        this.setupHandlers()
            .enable();

        return this;
    };

    proto.setupHandlers = function () {
        this.handleTriggerClick = this.handleTriggerClick.bind(this);

        return this;
    };

    proto.enable = function () {
        if (this.isEnabled === true) {
            return;
        }

        this.isEnabled = true;

        this.$triggers.on('click', this.handleTriggerClick);

        return this;
    };

    proto.handleTriggerClick = function (e) {
        e.preventDefault();

        this.setActiveTab($(e.currentTarget).data(TabView.DATA_ATTRIBUTE.TRIGGER));
    };

    proto.setActiveTab = function (activeTab) {
        this.currentTab = activeTab;

        this.toggleActiveTabContent();
        this.toggleActiveTabButton();

        return this;
    };

    proto.toggleActiveTabContent = function () {
        var _self = this;

        this.$contents.removeClass(TabView.STATES.activeClass);
        this.$contents.attr('aria-hidden', true);

        this.$activeContent = this.$contents.filter(function() {
            return $(this).data(TabView.DATA_ATTRIBUTE.CONTENT) === _self.currentTab;
        }).addClass(TabView.STATES.activeClass).attr('aria-hidden', false);
    };


    proto.toggleActiveTabButton = function () {
        var _self = this;

        this.$triggers.removeClass(TabView.STATES.activeClass);
        this.$triggers.attr('aria-selected', false);

        this.$activeTrigger = this.$triggers.filter(function() {
            return $(this).data(TabView.DATA_ATTRIBUTE.TRIGGER) === _self.currentTab;
        }).addClass(TabView.STATES.activeClass).attr('aria-selected', true);

        return this;
    };


    return TabView;
});