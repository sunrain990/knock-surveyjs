Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

var mainSurvey = new Survey.Model({
    questions: [{
        type: "matrixdynamic",
        name: "entities",
        title: "Please enter all members of your family",
        addRowText: "Add Family Member",
        columns: [{
            name: "surname",
            cellType: "text",
            title: "Family Name",
            isRequired: true
        }, {
            name: "givenname",
            cellType: "text",
            title: "Given Name",
            isRequired: true
        }, {
            name: "age",
            cellType: "dropdown",
            title: "Age",
            isRequired: true,
            choices: [1, 2, 3, 4, 5, 6, 20, 30, 40, 50, 60, 70]
        },{
            name: "medicaldrugusing",
            cellType: "radiogroup",
            title: "Do you use medical drugs?",
            isRequired: true,
            choices: ["Yes", "No"]
        }],
        rowCount: 1,
        minRowCount: 1
    }],
    completeText: "Go to fill detail information"
});

//Copy Family name into new created row
mainSurvey.onMatrixRowAdded.add(function(result, options) {
    var matrix = options.question;
    //get matrix value, an array
    var values = options.question.value;
    for (var i = 0; i < values.length; i++) {
        if (values[i].surname) {
            values.push({
                "surname": values[i].surname
            });
            options.question.value = values;
            break;
        }
    }
});

var entitySurvey = new Survey.Model({
    questions: [{
        name: "surname",
        type: "text",
        title: "Family Name",
        isRequired: true
    }, {
        name: "givenname",
        type: "text",
        title: "Given Name",
        isRequired: true
    }, {
        name: "age",
        type: "dropdown",
        title: "Age",
        isRequired: true,
        choices: [1, 2, 3, 4, 5, 6, 20, 30, 40, 50, 60, 70]
    }, {
        name: "cholesterolreducedrugusing",
        type: "radiogroup",
        visibleIf: "{medicaldrugusing} = 'Yes'",
        title: "Do you use a cholesterol reduce drug?",
        isRequired: true,
        choices: ["Yes", "No"]
    }, {
        name: "condition",
        type: "comment",
        title: "Please describe your condition",
        isRequired: true
    }]
});

var entitiesCount = 0;
var currentEntityIndex = 0;

mainSurvey.onComplete.add(function(result) {
    entitiesCount = mainSurvey.getQuestionByName("entities").rowCount;
    entitySurvey.data = mainSurvey.getQuestionByName("entities").value[currentEntityIndex];
    if(entitiesCount > 1) entitySurvey.completeText = "Next Member";
    $("#surveyElement").Survey({
        model: entitySurvey
    });
});

entitySurvey.onComplete.add(function(result) {
    var matrixValue = mainSurvey.getQuestionByName("entities").value;
    matrixValue[currentEntityIndex] = entitySurvey.data;
    mainSurvey.getQuestionByName("entities").value = matrixValue;
    currentEntityIndex++;
    if(currentEntityIndex == entitiesCount - 1) entitySurvey.completeText = "Complete";
    if (currentEntityIndex < entitiesCount) {
        //Clear the survey data and states
        entitySurvey.clear();
        entitySurvey.data = mainSurvey.getQuestionByName("entities").value[currentEntityIndex];
        $("#surveyElement").Survey({
            model: entitySurvey
        });
    } else {
        document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(mainSurvey.data);
    }
});


$("#surveyElement").Survey({
    model: mainSurvey
});