
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var survey = new Survey.Model({ questions: [
    { type: "matrixdynamic", name: "cars", title: "Please tell us about your favorite cars", isRequired: true,
        columns: [ {cellType: "text", name: "name", title: "Your name"},
            {cellType: "checkbox", name: "cars", title: "Please select cars you have drived", isRequired: true,
                colCount: 2, choices: ["Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"] },
            { cellType: "checkbox", name: "selectCars", minWidth: "150px",  title: "Please, select two cars you like the most", isRequired: true,
                colCount: 2, choices: [] }], rowCount: 1}
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

survey.onMatrixCellValueChanged.add(function(sender, options) {
    if(options.columnName !=="cars") return;
    var choices = [];
    var newValue = options.value ? options.value : [];
    for(var i = 0; i < newValue.length; i ++) {
        choices.push(newValue[i]);
    }
    options.getCellQuestion("selectCars").choices = choices;
});


$("#surveyElement").Survey({model:survey});

