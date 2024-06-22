import templates from "./templates";
import utils     from "./utils";
import select2   from 'select2';
import 'ejs/ejs.min';


let fieldPrivate = {

    /**
     * Формирование контента
     * @param {FieldSelect2} field
     * @return {*}
     * @private
     */
    renderContent: function (field) {

        let that          = this;
        let options       = field.getOptions();
        let attributes    = [];
        let selectOptions = [];


        if ( ! options.hasOwnProperty('attr') ||
            typeof options.attr !== 'object' ||
            options.attr === null ||
            Array.isArray(options.attr)
        ) {
            options.attr = {};
        }

        if (options.name) {
            options.attr.name = field._options.name;
        }

        if (options.width) {
            options.attr = utils.mergeAttr(
                { style: 'width:' + options.width },
                options.attr
            );
        }

        if (options.required) {
            options.attr.required = 'required';
        }


        $.each(field._selectOptions, function (key, option) {

            if (typeof option === 'string' || typeof option === 'number') {
                selectOptions.push(that.renderOption(field._value, {
                    type: 'option',
                    value: key,
                    text: option
                }));

            } else if (typeof option === 'object') {
                let type = option.hasOwnProperty('type') && typeof option.type === 'string'
                    ? option.type
                    : 'option';

                if (type === 'group') {
                    let renderAttr   = [];
                    let groupAttr    = {};
                    let groupOptions = [];

                    if (option.hasOwnProperty('attr') &&
                        typeof option.attr === 'object' &&
                        option.attr !== null &&
                        ! Array.isArray(option.attr)
                    ) {
                        groupAttr = option.attr;
                    }

                    if (option.hasOwnProperty('label') && ['string', 'number'].indexOf(typeof(option.label)) >= 0) {
                        groupAttr.label = option.label;
                    }

                    $.each(groupAttr, function (name, value) {
                        renderAttr.push(name + '="' + value + '"');
                    });

                    if (Array.isArray(option.options)) {
                        $.each(option.options, function (key, groupOption) {
                            groupOptions.push(that.renderOption(field._value, groupOption));
                        });
                    }

                    selectOptions.push({
                        type: 'group',
                        attr: renderAttr.length > 0 ? (' ' + renderAttr.join(' ')) : '',
                        options: groupOptions,
                    });

                } else {
                    selectOptions.push(that.renderOption(field._value, option));
                }
            }
        });

        $.each(options.attr, function (name, value) {
            attributes.push(name + '="' + value + '"');
        });


        return ejs.render(templates['select.html'], {
            readonly: false,
            options: selectOptions,
            attr: attributes.length > 0 ? (' ' + attributes.join(' ')) : ''
        });
    },


    /**
     * @param {FieldSelect2} field
     * @return {string}
     * @private
     */
    renderContentReadonly: function (field) {

        let that            = field;
        let options         = field.getOptions();
        let selectedOptions = [];

        if (options.hasOwnProperty('options') &&
            typeof options.options === 'object' &&
            Array.isArray(options.options)
        ) {
            $.each(options.options, function (key, option) {
                let type = option.hasOwnProperty('type') && typeof option.type === 'string'
                    ? option.type
                    : 'option';

                if (type === 'group') {
                    if (Array.isArray(option.options)) {
                        $.each(option.options, function (key, groupOption) {
                            let optionText = groupOption.hasOwnProperty('text') && ['string', 'number'].indexOf(typeof(groupOption.text)) >= 0
                                ? groupOption.text
                                : '';

                            if ( ! optionText || optionText === '') {
                                return;
                            }

                            if (Array.isArray(that._value)) {
                                $.each(that._value, function (key, itemValue) {
                                    if (itemValue == groupOption.value) {
                                        selectedOptions.push(optionText);
                                        return false;
                                    }
                                });

                            } else if (that._value == groupOption.value) {
                                selectedOptions.push(optionText);
                            }
                        });
                    }

                } else {
                    let optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(typeof(option.text)) >= 0
                        ? option.text
                        : '';

                    if ( ! optionText || optionText === '') {
                        return;
                    }

                    if (Array.isArray(that._value)) {
                        $.each(that._value, function (key, itemValue) {
                            if (itemValue == option.value) {
                                selectedOptions.push(optionText);
                                return false;
                            }
                        });

                    } else if (that._value == option.value) {
                        selectedOptions.push(optionText);
                    }
                }
            });
        }


        return ejs.render(templates['select.html'], {
            readonly: true,
            selectedOptions: selectedOptions,
        });
    },


    /**
     * Сборка опции
     * @param {string|Array} value
     * @param {object}       option
     * @return {object}
     * @private
     */
    renderOption: function (value, option) {

        let optionAttr = [];
        let optionText = option.hasOwnProperty('text') && ['string', 'number'].indexOf(typeof(option.text)) >= 0
            ? option.text
            : '';

        $.each(option, function (name, value) {
            if (name !== 'text') {
                optionAttr.push(name + '="' + value + '"');
            }
        });


        if (Array.isArray(value)) {
            $.each(value, function (key, itemValue) {
                if (itemValue == option.value) {
                    optionAttr.push('selected="selected"');
                    return false;
                }
            });

        } else if (value == option.value) {
            optionAttr.push('selected="selected"');
        }

        return {
            type: 'option',
            text: optionText,
            attr: optionAttr.length > 0 ? (' ' + optionAttr.join(' ')) : ''
        };
    },


    /**
     * Инициализация событий
     * @param {FieldSelect2} field
     * @private
     */
    initEvents: function (field) {

        let options        = field.getOptions();
        let select2Options = options.hasOwnProperty('select2') && utils.isObject(options.select2)
            ? options.select2
            : {};

        if ( ! select2Options.hasOwnProperty('theme')) {
            select2Options.theme = "bootstrap-5";
        }

        if ( ! select2Options.hasOwnProperty('language')) {
            let formOptions = field._form.getOptions();

            if (typeof formOptions.lang === 'string') {
                select2Options.language = formOptions.lang;
            }
        }

        if ( ! select2Options.hasOwnProperty('closeOnSelect') &&
            options.hasOwnProperty('attr') &&
            utils.isObject(options.attr) &&
            options.attr &&
            options.attr.hasOwnProperty('multiple')
        ) {
            select2Options.closeOnSelect = false;
        }

        select2(null, $);
        $('.content-' + field.getContentId() + ' select').select2(select2Options);
    }
}

export default fieldPrivate;