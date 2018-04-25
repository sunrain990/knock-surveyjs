Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({questions: [
    { type: "matrix", name: "rating", title: "Please rate",
        columns: [1, 2, 3, 4, 5],
        rows: ["Apple Pie", "Banana Split", "Strawberry Sundae"]}
]});

survey.onValidateQuestion.add(function(survey, options){
    if(options.name == "rating") {
        var values = {};
        for(var key in options.value) {
            var val = options.value[key];
            if(!val && val !== 0) continue;
            //Report the error
            if(values[val]) {
                options.error = "You have rated '" + values[val] + "' and '" + key + "' with the same value. Please correct."
            }
            values[val] = key;
        }
    }
});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


$("#surveyElement").Survey({
    model: survey
});

