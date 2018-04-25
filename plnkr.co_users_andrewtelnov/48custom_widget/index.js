var json = {
    elements: [
        {
            type: "textwithbutton",
            name: "q1",
            placeHolder: "put some text here",
            buttonText: "Custom button text"

        }
    ]
};


var survey = new Survey.Model(json);
//survey.data = { q1: "Initial text" };

survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyElement").Survey({model: survey});
