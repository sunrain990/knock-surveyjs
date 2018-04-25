
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({title: "Select 'Neutral' or 'Agree' in the first row", questions: [
    { type: "matrix", name: "quality", title: "Please indicate if you agree or disagree with the following statements",
        isRequired: true, isAllRowRequired: true,
        columns: [{ value: 1, text: "Strongly Disagree" },
            { value: 2, text: "Disagree" },
            { value: 3, text: "Neutral" },
            { value: 4, text: "Agree" },
            { value: 5, text: "Strongly Agree" }],
        rows: [{ value: "affordable", text: "Product is affordable" },
            { value: "doeswhatitclaims", text: "Product does what it claims" },
            { value: "betterthenothers", text: "Product is better than other products on the market" },
            { value: "easytouse", text: "Product is easy to use" }]},
    {name:"Affordable", type:"text", title: "Visible when you select 'Product is affordable' is Neutral or Agree", visibleIf: "{quality.affordable} >= 3"},
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


var app = new Vue({
    el: '#surveyElement',
    data: {
        survey: survey
    }
});

