
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({ questions: [
    {type: "radiogroup", name: "driveToyota", isRequired: "true", colCount: 0, title: "Do you drive Toyota car ?", choices: ["Yes", "No"]},
    {type: "radiogroup", name: "toyotaCars", title: "What Toyota car you love the most?",
        isRequired: true, hasOther: true, colCount: 3, visibleIf: "{driveToyota} = 'Yes'",
        choices: ["Carola", "Camry", "RAV4", "Highlander", "Land Cruiser Prado", "Land Cruiser 200"]},
    { type: "radiogroup", name: "othersCar", title: "What car are you driving?", isRequired: true,
        colCount: 3, hasOther: true, visibleIf: "{driveToyota} = 'No'",
        choices: ["Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Citroen"] }
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({model:survey});

