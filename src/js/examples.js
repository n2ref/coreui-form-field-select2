document.addEventListener('DOMContentLoaded', function () {

    // Single select
    let options = [
        '--',
        'Reactive',
        'Solution',
        'Conglomeration',
        'Algoritm',
        'Holistic',
    ];

    CoreUI.form.create({
        send    : {
            url   : '/path/to/object/1',
            method: 'post'
        },
        record  : {
            select_field: null
        },
        fields  : [
            {
                type: 'select2', name: 'select_field', label: 'Select', width: 250, options: options, select2: {
                    placeholder: 'Choose one thing',
                }
            },
        ],
        onSubmit: function (form, data) {
            alert(JSON.stringify(data));
            return false;
        },
        controls: [
            {type: "submit", content: "Send"},
        ],
    }).render('single-select');



    // Multiple select
    let multipleOptions = [
        { value: 'Reactive',       text: 'Reactive' },
        { value: 'Solution',       text: 'Solution' },
        { value: 'Conglomeration', text: 'Conglomeration' },
        { value: 'Algoritm',       text: 'Algoritm' },
        { value: 'Holistic',       text: 'Holistic' },
    ];

    CoreUI.form.create({
        send    : {
            url   : '/path/to/object/1',
            method: 'post'
        },
        record  : {
            select_field: [ 'Reactive', 'Algoritm' ]
        },
        fields  : [
            {
                type: 'select2', name: 'select_field', label: 'Select', width: 250, attr: { multiple: "multiple" },
                options: multipleOptions
            },
        ],
        onSubmit: function (form, data) {
            alert(JSON.stringify(data));
            return false;
        },
        controls: [
            {type: "submit", content: "Send"},
        ],
    }).render('multiple-select');



    // Group select
    let groupOptions = [
        { value: '', text: 'No value' },
        { type: "group", label: 'Group 1',
            options : [
                { value: 1, text: 'Adams John' },
                { value: 2, text: 'Johnson Peter' },
            ]
        },
        { type: "group", label: 'Group 2', attr: { class: "group-class" },
            options : [
                { value: 3, text: 'Lewis Frank' },
                { value: 4, text: 'Cruz Steve' },
                { value: 5, text: 'Donnun Nick' }
            ]
        }
    ];

    CoreUI.form.create({
        send    : {
            url   : '/path/to/object/1',
            method: 'post'
        },
        record  : {
            select_field: null
        },
        fields  : [
            {
                type: 'select2', name: 'select_field', label: 'Select', width: 300, attr: { multiple: "multiple" },
                options: groupOptions
            },
        ],
        onSubmit: function (form, data) {
            alert(JSON.stringify(data));
            return false;
        },
        controls: [
            {type: "submit", content: "Send"},
        ],
    }).render('groups');





    // Dynamic select
    let dynamicOptions = [
        { value: 'Reactive',       text: 'Reactive' },
        { value: 'Solution',       text: 'Solution' },
        { value: 'Conglomeration', text: 'Conglomeration' },
        { value: 'Algoritm',       text: 'Algoritm' },
        { value: 'Holistic',       text: 'Holistic' },
    ];

    CoreUI.form.create({
        send    : {
            url   : '/path/to/object/1',
            method: 'post'
        },
        record  : {
            select_field: null
        },
        fields  : [
            {
                type: 'select2', name: 'select_field', label: 'Select', width: 250, attr: { multiple: "multiple" },
                options: dynamicOptions,
                select2: {
                    placeholder: 'Write your value',
                    tags: true,
                    tokenSeparators: [',', ' ']
                }
            },
        ],
        onSubmit: function (form, data) {
            alert(JSON.stringify(data));
            return false;
        },
        controls: [
            {type: "submit", content: "Send"},
        ],
    }).render('dynamic-select');



    // Validation select
    let validationOptions = {
        '' : '--',
        'Reactive' : 'Reactive',
        'Solution' : 'Solution',
        'Conglomeration' : 'Conglomeration',
        'Algoritm' : 'Algoritm',
        'Holistic' : 'Holistic',
    };

    CoreUI.form.create({
        send    : {
            url   : '/path/to/object/1',
            method: 'post'
        },
        validate: true,
        record  : {
            select_field: null
        },
        fields  : [
            {
                type: 'select2', name: 'select_field', label: 'Select', width: 250, required: true,
                invalidText: 'SELECT Value!!!',
                options: validationOptions,
                select2: {
                    placeholder: 'Submit form for validation',
                }
            },
        ],
        onSubmit: function (form, data) {
            alert(JSON.stringify(data));
            return false;
        },
        controls: [
            {type: "submit", content: "Send"},
        ],
    }).render('validation');



    // Autocomplete select
    CoreUI.form.create({
        send    : {
            url   : '/path/to/object/1',
            method: 'post'
        },
        record  : {
            select_field: null
        },
        fields  : [
            {
                type: 'select2', name: 'select_field', label: 'Select', width: 300,
                select2: {
                    minimumInputLength: 1,
                    ajax: {
                        url: 'data/autocomplete.json', // https://select2.org/data-sources/formats
                        dataType: 'json'
                    }
                }
            },
        ],
        onSubmit: function (form, data) {
            alert(JSON.stringify(data));
            return false;
        },
        controls: [
            {type: "submit", content: "Send"},
        ],
    }).render('autocomplete');


    // Code highlight
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
});