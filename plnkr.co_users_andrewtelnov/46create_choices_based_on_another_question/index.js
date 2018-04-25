Survey
    .StylesManager
    .applyTheme("default");

var json = {
    questions: [
        {
            type: "checkbox",
            name: "know",
            title: "Please select the language(s) you are speaking",
            isRequired: true,
            colCount: 4,
            choices: [
                "English",
                "German",
                "Italian",
                "Franch",
                "Spain"
            ]
        },
        {
            type: "checkbox",
            name: "learn",
            visible: false,
            title: "Please select languages you want to learn",
            isRequired: true,
            colCount: 4
        }
    ]
};

var survey = new Survey.Model(json);

survey.onValueChanged.add(function(survey, options){
    if(options.name !== "know") return;
    knownChoices = options.question.choices;
    var choices = [];
    for(var i = 0; i < knownChoices.length; i ++) {
        var item = knownChoices[i];
        //the item is not selected
        if(options.value.indexOf(item.value) < 0) {
            choices.push(item);
        }
    }
    var learnQuestion = survey.getQuestionByName("learn");
    learnQuestion.choices = choices;
    learnQuestion.visible = choices.length > 0;
});

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyElement").Survey({model: survey});
