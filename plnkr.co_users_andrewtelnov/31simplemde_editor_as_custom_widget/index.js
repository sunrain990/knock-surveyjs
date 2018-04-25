Survey
    .StylesManager
    .applyTheme("default");

var json = {
    "elements": [
        {
            "type": "editor",
            "name": "SimpleMDE"
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyElement").Survey({model: survey});
