function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";


var survey = new Survey.Model({questions: [
    { type: "matrix", name: "Quality", title: "Please indicate if you agree or disagree with the following statements",
        columns: [{ value: 1, text: "Strongly Disagree" },
            { value: 2, text: "Disagree" },
            { value: 3, text: "Neutral" },
            { value: 4, text: "Agree" },
            { value: 5, text: "Strongly Agree" }],
        rows: [{ value: "affordable", text: "Product is affordable" },
            { value: "does what it claims", text: "Product does what it claims" },
            { value: "better then others", text: "Product is better than other products on the market" },
            { value: "easy to use", text: "Product is easy to use" }]}
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

var matrix = survey.getQuestionByName("Quality");
shuffle(matrix.rows);


$("#surveyElement").Survey({
    model: survey
});