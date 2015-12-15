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
            FAUX_SELECT: 'fauxSelect'
        };

        this.$element = $element;
        this.$menu = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.SELECT + ']');
        this.$menuOptions = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.SELECT + '] > option');
        this.$fauxMenu = $element.find('[data-role=' + SelectMenuView.DATA_ATTRIBUTE.FAUX_SELECT + ']');


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

        return this;
    };

    proto.enable = function() {
        if (this.isEnabled === true) {
            return;
        }

        this.isEnabled = true;

        this.$fauxMenuOption.on('click', this.handleOptionClick);

        return this;
    };


    proto.layout = function () {
            var numberOfOptions = this.$menu.children('option').length;
          
            this.$fauxMenu.prepend('<div class="select-active"></div>');
            this.$fauxMenu.append('<ul class="select-options" role="combobox"></ul>');

            var $activeSelect = this.$fauxMenu.next('div.select-active');
            $activeSelect.text($(this).children('option').eq(0).text());
          
            var $list = $('<ul />', {
                'class': 'select-options'
            }).insertAfter($activeSelect);
          
            this.$menuOptions.each(function(){
                $('<li />', {
                    'class': 'select-options-item',
                    text: $(this).text(),
                    id: $(this).val(),
                    role: 'option'
                }).appendTo($('.select-options'));
            });


           
            // var $listItems = $list.children('li');
          
            // $activeSelect.click(function(e) {
            //     e.stopPropagation();
            //     $('div.select-active.active').each(function(){
            //         $(this).removeClass('active').next('ul.select-options').hide();
            //     });
            //     $(this).toggleClass('active').next('ul.select-options').toggle();
            // });
          
            // $listItems.click(function(e) {
            //     e.stopPropagation();
            //     $activeSelect.text($(this).text()).removeClass('active');
            //     $this.val($(this).attr('rel'));
            //     $list.hide();
            // });
          
            // $(document).click(function() {
            //     $activeSelect.removeClass('active');
            //     $list.hide();
            // });
        return this;
    };

    proto.createChildren = function () {
        this.$fauxMenuOption = $('.select-options-item');

        return this;
    };

    proto.handleOptionClick = function (event) {
        var activeOption = event.currentTarget.id;

        this.setActiveOption(activeOption);
    };


    proto.setActiveOption = function (activeOption) {
        // Sets real select menu value
        this.$menuOptions.prop('selected', false);

        this.$menuOptions.each(function (){
            if($(this).val() === activeOption) {
                $(this).prop('selected',true);
            }
        });
    };


    return SelectMenuView;
});