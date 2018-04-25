Survey
    .StylesManager
    .applyTheme("default");

var json = {
    pages:[{
        elements: [
            {
                type: "checkbox",
                name: "car",
                title: "What car(s) have you drived?",
                isRequired: true,
                colCount: 4,
                choices: [
                    "Ford",
                    "Vauxhall",
                    "Volkswagen",
                    "Nissan",
                    "Audi",
                    "Mercedes-Benz",
                    "BMW",
                    "Peugeot",
                    "Toyota",
                    "Citroen"
                ]
            }
        ]},
        { elements: [
            {
                type:"paneldynamic",
                name:"carUsage",
                title: "Please tell us more about your experience",
                "templateTitle": "How long did you drive: {panel.car}",
                "templateElements": [
                    {
                        "name": "years",
                        "type": "dropdown",
                        "title": "Years",
                        "choices": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20],
                        "isRequired": true
                    }]
            }
        ]}
    ]
};

var survey = new Survey.Model(json);

survey.onValueChanged.add(function(survey, options){
    if(options.name !== "car") return;
    var val = options.value;
    var panel = survey.getQuestionByName("carUsage");
    //clear dynamic panel values
    panel.maxPanelCount = 0;
    panel.minPanelCount = 0;

    var panelValue = [];
    for(var i = 0; i < val.length; i++) {
        panelValue.push({car: val[i]});
    }
    //set value and hide add/remove buttons
    panel.value = panelValue;
    panel.maxPanelCount = val.length;
    panel.minPanelCount = val.length;
})


survey
    .onComplete
    .add(function (result) {
        document
            .querySelector('#surveyResult')
            .innerHTML = "result: " + JSON.stringify(result.data);
    });

$("#surveyElement").Survey({model: survey});
