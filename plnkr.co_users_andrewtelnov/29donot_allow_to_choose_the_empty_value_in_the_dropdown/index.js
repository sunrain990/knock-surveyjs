Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var json = {
    questions: [
        {
            type: "dropdown",
            name: "car",
            title: "What car are you driving?",
            isRequired: true,
            defaultValue: "BMW",
            choices: [
                "None",
                "Ford",
                "Vauxhall",
                "Volkswagen",
                "Nissan",
                "Audi",
                "Mercedes-Benz",
                "BMW",
                "Peugeot",
                "Toyota",
                "Citroen"
            ]
        }
    ]
};

function preventSetEmptyValueInDropdown(survey, options) {
    var q = options.question;
    if(!q || q.getType() != "dropdown") return;
    if(!options.value) {
        var value = q.oldValue;
        if(!value) value = q.defaultValue;
        if(value) {
            q.value = value;
        }
    } else {
        q.oldValue = options.value;
    }
}

function afterRenderRemoveOptionItem(survey, options) {
    if(!options.question || options.question.getType() !== "dropdown" || !options.question.value) return;
    var sel = options.htmlElement.querySelector("select");
    if(sel && sel.options && sel.options.length > 0) {
        if(!sel.options[0].value) {
            sel.options.remove(0);
        }
    }
}

var survey = new Survey.Model(json);

survey
    .onValueChanged
    .add(preventSetEmptyValueInDropdown);

survey
    .onAfterRenderQuestion
    .add(afterRenderRemoveOptionItem);


survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });



$("#surveyElement").Survey({model: survey});
