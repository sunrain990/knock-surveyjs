Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var json = { questions: [
    { type: "dropdown", name: "region", title: "Select the region", isRequired: true, choices: ["Africa", "Americas", "Asia", "Europe", "Oceania"]},
    { type: "dropdown", name: "country", title: "Select the country...", isRequired: true,
        choicesByUrl: {url: "https://restcountries.eu/rest/v2/region/{region}", valueName: "name"} }
]};

window.survey = new Survey.Model(json);


survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({
    model: survey
});