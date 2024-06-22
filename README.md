# Coreui form field select2

[Online documentation](https://n2ref.github.io/coreui-form-field-select2)

[php repository](https://n2ref.github.io/coreui-form-field-php)


### Install

```shell
npm install coreui-form-field-select2
```


### Examples

```html
<div id="single-select"></div>

<script>
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
</script>
```