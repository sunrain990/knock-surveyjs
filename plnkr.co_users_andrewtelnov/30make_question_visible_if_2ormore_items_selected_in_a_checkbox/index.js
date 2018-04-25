Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var json = { questions: [
    { type: "checkbox", name: "car", title: "What car are you driving?", isRequired: true,
        colCount: 4, choices: ["None", "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] },
    {type: "text", name: "q1", title: "Show me when two or more cars selected", visibleIf: "{car.length} >= 2"}
]};

// var json = { questions: [
//     { type: "checkbox", name: "car", title: "What car are you driving?", isRequired: true,
//         colCount: 4, choices: ["None", "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] },
//     {type: "text", name: "q1", title: "Show me when two or more cars selected", visibleIf: "{car.length} = 2 and ({car} contains 'Ford' and {car} cotains 'Audo'})"},
//     {type: "text", name: "q2", title: "Show me when two or more cars selected", visibleIf: "{car} contains 'Ford' and {car} cotains 'Audo'}"}
// ]};

// survey.data = {car: ["Ford", "Audi"]};


window.survey = new Survey.Model(json);


survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({
    model: survey
});