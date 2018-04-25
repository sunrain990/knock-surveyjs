
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({ questions: [
    { type: "checkbox", name: "car", title: "What car are you driving?", isRequired: true,
        colCount: 4, choices: ["Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen",
        {value: "na", text: "None of the above"}, {value: "pn", text:"Prefer not to Answer"}] }
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


var onValueChangingProcessing = false;

function specialValueSelected(options, specialValue) {
    var q = options.question;
    var prevValue = q.prevValue;
    var index = options.value.indexOf(specialValue);
    onValueChangingProcessing = true;
    //has special value selected
    if(index > -1) {
        //special value was selected before
        if(prevValue.indexOf(specialValue) > -1) {
            var value = q.value;
            value.splice(index, 1);
            q.value = value;
        } else {
            //special value select just now
            q.value = [specialValue];
        }
    }
    onValueChangingProcessing = false;
    return index > -1;
}

survey.onValueChanged.add(function(survey, options) {
    if(onValueChangingProcessing) return;
    var q = options.question;
    //If question is not defined or question is not checkbox do nothing
    if(!q || q.getType() != "checkbox") return;
    //returns if the value set for the first time or there is nothing to do
    if(!q.prevValue || !options.value) {
        q.prevValue = options.value;
        return;
    }
    if(!specialValueSelected(options, "na")) {
        specialValueSelected(options, "pn");
    }
    q.prevValue = q.value;
});

$("#surveyElement").Survey({model:survey});

