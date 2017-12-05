
$(function() {
    Survey.Survey.cssType = "bootstrap";
    Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

    var json = {
        "pages": [
            {
                "name": "page1",
                "elements": [
                    { "type": "rating", "name": "satisfaction", "title": "How satisfied are you with the Product?", "mininumRateDescription": "Not Satisfied", "maximumRateDescription": "Completely satisfied" },
                    {
                        "type": "panel", "innerIndent": 1, "name": "panel1", "title": "Please, help us improve our product", "visibleIf": "{satisfaction} < 3",
                        "elements": [
                            { "type": "checkbox", "choices": [ { "value": "1", "text": "Customer relationship" }, { "value": "2", "text": "Service quality" }, { "value": "3", "text": "Support response time" } ], "name": "What should be improved?" },
                            { "type": "comment", "name": "suggestions", "title":"What would make you more satisfied with the Product?" }
                        ]
                    }
                ]
            }
        ]
    };

    window.survey = new Survey.Model(json);


    survey.onComplete.add(function(result) {
        document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
    });

    survey.data = {satisfaction: 2};

    $("#surveyElement").Survey({
        model: survey
    });
})
