define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');

     /**
     * A script for tab triggers to display it's associated content when clicked
     *
     * @class SelectMenuView
     * @param {jQuery} $element A reference to the containing DOM element.
     * @constructor
     */
    var SelectMenuView = function ($element) {

        SelectMenuView.DATA_ATTRIBUTE = {
            SELECT: 'select',
            FAUX_SELECT: 'fauxSelect',
            ACTIVE_SELECTION: 'fauxSelect-selected',
            OPTIONS: 'fauxSelect-options'
        };

        SelectMenuView.STATES = {
            HIDDEN: 'isHidden',
            VISIBLE: 'isVisible',
            EXPANDED: 'isExpanded'
        };

        this.$element = $element;
        this.$menu = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.SELECT + ']');
        this.$menuOptions = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.SELECT + '] > option');
        this.$fauxMenu = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.FAUX_SELECT + ']');
        this.$fauxMenuSelection = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.ACTIVE_SELECTION + ']');
        this.$fauxMenuOptions = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.OPTIONS + ']');

        if (!$element.length) {
            return;
        }

        this.init();
    };

    var proto = SelectMenuView.prototype;

    proto.init = function () {

        this.layout()
            .createChildren()
            .setupHandlers()
            .enable();

        return this;
    };

    proto.setupHandlers = function () {
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleActiveSelectionClick = this.handleActiveSelectionClick.bind(this);

        return this;
    };

    proto.enable = function() {
        if (this.isEnabled === true) {
            return;
        }

        this.isEnabled = true;

        this.$fauxMenuSelection.on('click', this.handleActiveSelectionClick);
        this.$fauxMenuOption.on('click', this.handleOptionClick);

        return this;
    };


    proto.layout = function () {
        var numberOfOptions = this.$menu.children('option').length;

        this.$menuOptions.each(function(){
            $('<li />', {
                'class': 'select-options-item',
                text: $(this).text(),
                id: $(this).val(),
                role: 'option'
            }).appendTo($('.select-options'));
        });

        return this;
    };

    proto.createChildren = function () {
        this.$fauxMenuOption = $('.select-options-item');

        return this;
    };

    proto.handleActiveSelectionClick = function () {
        this.toggleOptionList();
    };

    proto.handleOptionClick = function (event) {
        var activeOption = event.currentTarget.id;
        var activeOptionText = $(event.currentTarget).text();

        this.setActiveOption(activeOption, activeOptionText);
        this.resetActiveState();
    };

    proto.setActiveOption = function (activeOption, activeOptionText) {
        this.$fauxMenuSelection.html(activeOptionText);

        // Sets real select menu value
        this.$menuOptions.prop('selected', false);

        this.$menuOptions.each(function (){
            if($(this).val() === activeOption) {
                $(this).prop('selected',true);
            }
        });
    };

    proto.toggleOptionList = function () {
        this.$fauxMenuOptions.toggleClass(SelectMenuView.STATES.HIDDEN);
        this.$fauxMenuSelection.toggleClass(SelectMenuView.STATES.EXPANDED);
    };

    proto.resetActiveState = function () {
        this.$fauxMenuSelection.removeClass(SelectMenuView.STATES.EXPANDED);
    };

    return SelectMenuView;
});