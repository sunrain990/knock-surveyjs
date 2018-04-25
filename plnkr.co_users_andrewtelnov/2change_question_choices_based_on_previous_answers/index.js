
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({ questions: [
    { type: "checkbox", name: "cars", title: "What car have you ever drived?", isRequired: true,
        colCount: 4, choices: ["None", "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] },
    { type: "checkbox", name: "selectCars", title: "Please, select two cars you like the most", isRequired: true,
        colCount: 4, choices: [] }
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

survey.onValueChanged.add(function(sender, options) {
    if(options.name !=="cars") return;
    var choices = [];
    var newValue = options.value ? options.value : [];
    for(var i = 0; i < newValue.length; i ++) {
        choices.push(newValue[i]);
    }
    sender.getQuestionByName("selectCars").choices = choices;
});


$("#surveyElement").Survey({model:survey});

