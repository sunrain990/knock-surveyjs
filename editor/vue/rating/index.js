var json = {
    "elements": [
        {
            "type": "barrating",
            "name": "barrating1",
            "ratingTheme": "fontawesome-stars",
            "title": "Please rate the movie you've just watched",
            "choices": ["1", "2", "3", "4", "5"]
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

var app = new Vue({
    el: '#surveyElement',
    data: {
        survey: survey
    }
});