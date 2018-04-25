
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var survey = new Survey.Model({ questions: [
    { type: "checkbox", name: "car", title: "What car have you ever drived?", isRequired: true,
        colCount: 4, choices: ["Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] }
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

var cars = survey.getQuestionByName("car").choices;

for(var i = 0; i < cars.length; i ++) {
    var carName = cars[i].value;
    var rateQuestion = survey.pages[0].addNewQuestion("rating", "rate_" + carName);
    rateQuestion.title = "Please rate " + carName;
    rateQuestion.visibleIf = '{car} contains "' + carName + '"'
    rateQuestion.isRequired = true;
    rateQuestion.visible = false;
}

$("#surveyElement").Survey({model:survey});

