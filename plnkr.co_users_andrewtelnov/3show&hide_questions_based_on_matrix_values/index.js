
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({questions: [
    { type: "matrix", name: "matrix", title: "Please select the question you wish to answer",
        columns: [{ value: 'yes', text: "Yes, I do" },
            { value: 'no', text: "Please do not ask this question" }],
        rows: [{ value: "name", text: "Could you answer what is your name?" },
            { value: "city", text: "Could you tell us the city you have born?" }]},
    {type: "text", name: "name", title: "What is your name?", visibleIf: "{matrix.name} = 'yes'"},
    {type: "text", name: "city", title: "What is the city you have born?", visibleIf: "{matrix.city} = 'yes'"},
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({model:survey});