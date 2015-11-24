define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    require('velocity');
    var $ = require('jquery');

    var CollapsibleView = function($element, localConfig) {

        CollapsibleView.STATES = {
            COLLAPSED: 'collapsed',
            ACTIVE: 'active'
        };

        CollapsibleView.DATA_ATTRIBUTE = {
            TRIGGER: 'trigger',
            PANEL: 'panel'
        };
        
        this.$element = $element;
        this.$document = $(document);
        this.$trigger = $element.find('[data-' + CollapsibleView.DATA_ATTRIBUTE.TRIGGER + ']'); 
        this.$panel = $element.find('[data-' + CollapsibleView.DATA_ATTRIBUTE.PANEL + ']');
        this.isAnimating = false;
        
        this.config = {
            triggerEvent: 'click',
            singleOpen: false,
            clickoff: false,
            transitionDuration: 300,
            transitionTiming: 'ease'
        };

        this.settings = $.extend({}, this.config, localConfig);
        
        if (!$element.length) {
            return;
        }

        this.init();
    };

    var proto = CollapsibleView.prototype;

    proto.init = function() {

        this.setupHandlers()
            .layout()
            .enable();

        return this;
    };

    proto.setupHandlers = function() {
        this.onClickHandler = this.handleOnClick.bind(this);
        //this.onDocumentClickHandler = this.onDocumentClick.bind(this);
        this.onHoverHandler = this.handleOnHover.bind(this);

        return this;
    };

    proto.layout = function() {

        return this;
    };

    proto.enable = function() {
        if (this.isEnabled === true) {
            return;
        }

        this.isEnabled = true;

        if(this.settings.triggerEvent === 'hover') {
            this.$trigger.on('mouseenter mouseleave', this.onHoverHandler);
        } else {
            this.$trigger.on('click', this.onClickHandler);
        }

        if(this.settings.clickoff === true) {
            this.$document.on('click', this.onDocumentClickHandler);
        }
        
        return this;
    };

    proto.handleOnClick = function(e) {
        e.preventDefault();

        var activeTarget = $(e.currentTarget);
        var activeValue = $(e.currentTarget).data(CollapsibleView.DATA_ATTRIBUTE.TRIGGER);

        this.togglePanelVisibility(activeTarget, activeValue);
    };

    proto.handleOnHover = function(e) {
        e.preventDefault();

        var activeTarget = $(e.currentTarget);
        var activeValue = $(e.currentTarget).data(CollapsibleView.DATA_ATTRIBUTE.TRIGGER);

        if(e.type === 'mouseenter' || 'mouseleave') {
            this.togglePanelVisibility(activeTarget, activeValue);
        }
    };

    proto.togglePanelVisibility = function (activeTarget, activeValue) {
        this.currentPanel = activeValue;

        if(activeTarget.hasClass(CollapsibleView.STATES.ACTIVE)) {
            this.hidePanel(activeTarget);
        } else {
            this.showPanel(activeTarget);
        }
    };

    proto.showPanel = function (activeTarget) {
        var _self = this;

        if(this.settings.singleOpen === true) {
            this.$panel.addClass(CollapsibleView.STATES.COLLAPSED);
            this.$trigger.removeClass(CollapsibleView.STATES.ACTIVE);
        } 

        activeTarget.addClass(CollapsibleView.STATES.ACTIVE);

        this.$activePanel = this.$panel.filter(function() {
            return $(this).data(CollapsibleView.DATA_ATTRIBUTE.PANEL) === _self.currentPanel;
        }).velocity({height: 100}, this.settings.transitionDuration).removeClass(CollapsibleView.STATES.COLLAPSED);
    };

    proto.hidePanel = function (activeTarget) {
        var _self = this;

        if(this.settings.singleOpen === true) {
            this.$panel.addClass(CollapsibleView.STATES.COLLAPSED);
            this.$trigger.removeClass(CollapsibleView.STATES.ACTIVE);
        } else {
            activeTarget.removeClass(CollapsibleView.STATES.ACTIVE);
        }

        this.$activePanel = this.$panel.filter(function() {
            return $(this).data(CollapsibleView.DATA_ATTRIBUTE.PANEL) === _self.currentPanel;
        }).addClass(CollapsibleView.STATES.COLLAPSED).velocity({height: 0}, this.settings.transitionDuration);
    };

    return CollapsibleView;

});