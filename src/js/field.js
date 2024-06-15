
import fieldPrivate from './field.private';

/**
 * @property {string} _id
 * @property {object} _form
 * @property {string} _contentId
 * @property {boolean} _readonly
 * @property {string|Array} _value
 * @property {object} _options
 * @property {function} getId
 * @property {function} getContentId
 * @property {function} getOptions
 * @property {function} show
 * @property {function} hide
 * @property {function} isAlloySend
 */
class FieldSelect2 extends CoreUI.form.abstract.field {

    _selectOptions = [];

    /**
     * Инициализация
     * @param {object} form
     * @param {object} options
     */
    constructor(form, options) {

        options = $.extend(true, {
            type: 'select2',
            name: null,
            label: null,
            labelWidth: null,
            width: null,
            outContent: null,
            description: null,
            errorText: null,
            fields: null,
            attr: {
                class: 'form-select d-inline-block'
            },
            required: null,
            readonly: null,
            show: true,
            position: null,
            noSend: null,
            options: [],
        }, options);


        let selectOptions = [];

        if (options.hasOwnProperty('options') &&
            typeof options.options === 'object' &&
            options.options !== null
        ) {
            selectOptions   = options.options;
            options.options = [];
        }

        super(form, options);

        this._selectOptions = selectOptions

        if ( ! this._readonly) {
            let that = this;

            form.on('show', function () {
                fieldPrivate.initEvents(that);
            });
        }
    }


    /**
     * Изменение режима поля только для чтения
     * @param {boolean} isReadonly
     */
    readonly(isReadonly) {

        super.readonly(isReadonly)

        if ( ! isReadonly) {
            fieldPrivate.initEvents(this);
        }
    }


    /**
     * Получение значения из поля
     * @returns {array|string}
     */
    getValue() {

        if (this._readonly) {
            return this._value;

        } else {
            if (this._options.hasOwnProperty('attr') &&
                typeof this._options.attr === 'object' &&
                this._options.attr !== null &&
                ! Array.isArray(this._options.attr) &&
                this._options.attr.hasOwnProperty('multiple')
            ) {
                let values = [];

                $('.content-' + this.getContentId() + ' select option:selected').each(function () {
                    values.push($(this).val());
                });

                return values;

            } else {
                return $('.content-' + this.getContentId() + ' select option:selected').val()
            }
        }
    }


    /**
     * Установка значения в поле
     * @param {string} value
     */
    setValue(value) {

        if (['string', 'number', 'object'].indexOf(typeof value) < 0) {
            return;
        }

        if (typeof value === 'object') {
            if (value !== null && ! Array.isArray(value)) {
                return;
            }

        } else {
            value = [ value ];
        }

        let that      = this;
        let contentId = this.getContentId();
        this._value   = [];

        if (this._readonly) {
            $('.content-' + contentId).empty();

            if (Array.isArray(this._selectOptions) &&
                Array.isArray(value)
            ) {
                let selectedItems = [];

                $.each(this._selectOptions, function (key, option) {

                    if (option.hasOwnProperty('value')) {
                        $.each(value, function (key, val) {

                            if (option.value == val) {
                                if (option.hasOwnProperty('text') && ['string', 'number'].indexOf(typeof(option.text)) >= 0) {
                                    selectedItems.push(option.text);
                                }

                                that._value.push(val);
                                return false;
                            }
                        });
                    }
                });


                $('.content-' + contentId).text(selectedItems.join(', '));
            }

        } else {
            $('.content-' + contentId + ' select > option').prop('selected', false);

            if (Array.isArray(value)) {
                $('.content-' + contentId + ' select > option').each(function (key, itemValue) {
                    $.each(value, function (key, val) {
                        if (val == $(itemValue).val()) {
                            $(itemValue).prop('selected', true);
                            that._value.push(val);

                            return false;
                        }
                    });
                });
            }
        }
    }


    /**
     * Установка валидности поля
     * @param {boolean|null} isValid
     * @param {text} text
     */
    validate(isValid, text) {

        if (this._readonly) {
            return;
        }

        let container = $('.content-' + this.getContentId());
        let select    = $('select', container);

        container.find('.valid-feedback').remove();
        container.find('.invalid-feedback').remove();

        if (isValid === null) {
            select.removeClass('is-invalid');
            select.removeClass('is-valid');

        } else if (isValid) {
            select.removeClass('is-invalid');
            select.addClass('is-valid');

            if (typeof text === 'undefined' && typeof this._options.validText === 'string') {
                text = this._options.validText;
            }

            if (typeof text === 'string') {
                container.append('<div class="valid-feedback">' + text + '</div>');
            }
        } else {
            select.removeClass('is-valid');
            select.addClass('is-invalid');

            if (typeof text === 'undefined') {
                if (typeof this._options.invalidText === 'string') {
                    text = this._options.invalidText;

                } else if ( ! text && this._options.required) {
                    text = this._form.getLang().required_field;
                }
            }

            if (typeof text === 'string') {
                container.append('<div class="invalid-feedback">' + text + '</div>');
            }
        }
    }


    /**
     * Проверка валидности поля
     * @return {boolean|null}
     */
    isValid() {

        let select = $('.content-' + this.getContentId() + ' select');

        if (this._options.required && select.val() === '') {
            return false;
        }

        if (select[0]) {
            return select.is(':valid');
        }

        return null;
    }


    /**
     * Формирование контента поля
     * @return {*}
     */
    renderContent() {

        return this._readonly
            ? fieldPrivate.renderContentReadonly(this)
            : fieldPrivate.renderContent(this);
    }
}


export default FieldSelect2;