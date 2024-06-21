
import fieldPrivate from './field.private';


/**
 *
 */
class FieldSelect2 {

    _id            = null;
    _form          = null;
    _contentId     = '';
    _readonly      = null;
    _value         = null;
    _selectOptions = [];

    _options = {
        type: 'select2',
        name: null,
        label: null,
        labelWidth: null,
        width: null,
        description: null,
        descriptionHelp: null,
        invalidText: null,
        validText: null,
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
        select2: {},
    };


    /**
     * Инициализация
     * @param {object} form
     * @param {object} options
     */
    constructor(form, options) {

        if (options.hasOwnProperty('options') &&
            typeof options.options === 'object' &&
            options.options !== null
        ) {
            this._selectOptions = options.options
            options.options = [];
        }


        this._form      = form;
        this._id        = options.hasOwnProperty('id') && typeof options.id === 'string' ? options.id : '';
        this._contentId = options.hasOwnProperty('contentId') && typeof options.contentId === 'string' ? options.contentId : '';
        this._readonly  = options.hasOwnProperty('readonly') && typeof options.readonly === 'boolean' ? options.readonly : false;
        this._value     = options.hasOwnProperty('value') && ['string', 'number', 'object'].indexOf(typeof options.value) >= 0 ? options.value : null;
        this._options   = $.extend(true, this._options, options);


        if ( ! this._readonly) {
            let that = this;

            form.on('show', function () {
                fieldPrivate.initEvents(that);
            });
        }
    }


    /**
     * Получение id поля
     * @return {string}
     */
    getId() {
        return this._id;
    }


    /**
     * Получение id контентаполя
     * @return {string}
     */
    getContentId() {
        return this._contentId;
    }


    /**
     * Получение параметров
     * @returns {object}
     */
    getOptions() {
        return $.extend(true, {}, this._options);
    }


    /**
     * Показ поля
     * @param {int} duration
     */
    show(duration) {

        $('#coreui-form-' + this.getId())
            .addClass('d-flex')
            .removeClass('d-none')
            .css('opacity', 0)
            .animate({
                opacity: 1,
            }, duration || 200, function () {
                $(this).css('opacity', '');
            });
    }


    /**
     * Скрытие поля
     * @param {int} duration
     */
    hide(duration) {

        $('#coreui-form-' + this.getId())
            .animate({
                opacity: 0,
            }, duration || 200, function () {
                $(this).removeClass('d-flex').addClass('d-none').css('opacity', '');
            });
    }


    /**
     * Изменение режима поля только для чтения
     * @param {boolean} isReadonly
     */
    readonly(isReadonly) {

        this._value    = this.getValue();
        this._readonly = !! isReadonly;

        $('.content-' + this._contentId).html(
            this.renderContent()
        );

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
     * @param {string} text
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
     * Проверка на то, что поле можно отправлять
     * @return {boolean}
     */
    isAlloySend() {
        return ! this._options.noSend;
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