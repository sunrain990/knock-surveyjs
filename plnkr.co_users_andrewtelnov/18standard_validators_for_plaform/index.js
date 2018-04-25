Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({
    questions: [
        { type: "text", name: "socialid", title: "Please enter your social security number", isRequired: true,
            validators: [{type:"regex", regex:"^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$",
                text: "Please enter a valid social security number"
            }]}
    ]});


survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({
    model: survey
});