
Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

window.survey = new Survey.Model({ questions: [
    { type: "checkbox", name: "car", title: "What car are you driving?", isRequired: true,
        colCount: 4, choices: ["Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen", {value: "none", text: "None of the above"}] }
]});
survey.onComplete.add(function(result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});


var onValueChangingProcessing = false;

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
    var prevValue = q.prevValue;
    var index = options.value.indexOf("none");
    onValueChangingProcessing = true;
    //has "None of the above selected"
    if(index > -1) {
        //"None of the above selected" was selected before
        if(prevValue.indexOf("none") > -1) {
            var value = q.value;
            value.splice(index, 1);
            q.value = value;
        } else {
            //none select just now
            q.value = ["none"];
        }
    }
    onValueChangingProcessing = false;
    q.prevValue = options.value;
});

$("#surveyElement").Survey({model:survey});

