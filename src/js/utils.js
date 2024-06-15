
let utils = {

    /**
     * Обработка полей в полях
     * @param form
     * @param defaultOptions
     * @param fieldOptions
     */
    mergeFieldOptions: function (form, defaultOptions, fieldOptions) {

        let options = $.extend(true, {}, defaultOptions);

        if (fieldOptions) {
            if (options.hasOwnProperty('attr') && typeof options.attr === 'object' &&
                fieldOptions.hasOwnProperty('attr') && typeof fieldOptions.attr === 'object'
            ) {
                fieldOptions.attr = this.mergeAttr(options.attr, fieldOptions.attr);
            }

            options = $.extend(true, {}, options, fieldOptions);
        }

        return options
    },


    /**
     * Объединение атрибутов
     * @param attr1
     * @param attr2
     * @returns {object}
     */
    mergeAttr: function (attr1, attr2) {

        let mergeAttr = Object.assign({}, attr1);

        if (typeof attr2 === 'object') {
            $.each(attr2, function (name, value) {
                if (mergeAttr.hasOwnProperty(name)) {
                    if (name === 'class') {
                        mergeAttr[name] += ' ' + value;

                    } else if (name === 'style') {
                        mergeAttr[name] += ';' + value;

                    } else {
                        mergeAttr[name] = value;
                    }

                } else {
                    mergeAttr[name] = value;
                }
            });
        }

        return mergeAttr;
    },


    /**
     * Проверка на объект
     * @param value
     */
    isObject: function (value) {

        return typeof value === 'object' &&
            ! Array.isArray(value) &&
            value !== null;
    }
}

export default utils;