Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

function surveyValidateQuestion(survey, options) {
    if (options.name == 'q1') {
        var hasValue = survey.getValue('q1') || survey.getValue('q2') || survey.getValue('q3');
        if(!hasValue) {
            options.error = "Please answer at least one question";
        }
    }
}
window.survey = new Survey.Model({
    questions: [
        { type: "text", name: "q1", title: "The first question"},
        { type: "text", name: "q2", title: "The second question"},
        { type: "text", name: "q3", title: "The third question"}
    ]
});


survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({
    model: survey,
    onValidateQuestion: surveyValidateQuestion
});

