Survey
    .StylesManager
    .applyTheme("default");

var json = {
    questions: [
        {
            type: "matrixdynamic",
            name: "q1",
            columns: [
                {
                    name: "region",
                    title: "Region",
                    isRequired: true,
                    minWidth: "180px",
                    choices: ["Africa", "Americas", "Asia", "Europe", "Oceania"]
                },
                {
                    name: "country",
                    title: "Country",
                    isRequired: true,
                    minWidth: "300px",
                    enableIf: "{row.region} notempty",
                    choicesByUrl: {url: "https://restcountries.eu/rest/v2/region/{row.region}", valueName: "name"}
                }
            ],
            rowCount: 2
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
