Survey
    .StylesManager
    .applyTheme("default");

var json = {
    questions: [
        {
            type: "radiogroup",
            name: "question1",
            choices: [ {value: 0, text: "none"}, {value: 1, text: "item 1"}, {value: 2, text: "item 2"}
            ]
        },
        {
            type: "text",
            name: "show_for_item_1",
            visibleIf: "displayText('question1') = 'item 1'"
        },
        {
            type: "text",
            name: "show_for_item_2",
            visibleIf: "displayText('question1') = 'item 2'"
        }
    ]
};

var survey = new Survey.Model(json);

function displayText(params) {
    if (!params && params.length !== 1) return null;
    var question = survey.getQuestionByName(params[0]);
    return question ? question.displayValue : null;
}

Survey.FunctionFactory.Instance.register("displayText", displayText);

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyElement").Survey({model: survey});
