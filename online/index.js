Survey.Survey.cssType = "bootstrap";
Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
Survey.defaultStandardCss.progressBar = "bar-green";
Survey.defaultStandardCss.progress = "progress";


window.survey = new Survey.Model(
    // 1unique_values_in_the_matrix_column
    {
        pages: [

            {
                questions: [
                    { type: "multipletext", name: "question1", title: "Auto Generated Items", colCount: 2,
                        items: [{ name: "mostamount", title: "Item 1" },
                            { name: "leastamount", title: "Item2" }]}
                ]
            },
            {
                questions: [
                    {
                        type: "matrix", name: "matrix", title: "Please select the question you wish to answer",
                        columns: [{value: 'yes', text: "Yes, I do"},
                            {value: 'no', text: "Please do not ask this question"}],
                        rows: [{value: "name", text: "Could you answer what is your name?"},
                            {value: "city", text: "Could you tell us the city you have born?"}]
                    },
                    {type: "text", name: "name", title: "What is your name?", visibleIf: "{matrix.name} = 'yes'"},
                    {
                        type: "text",
                        name: "city",
                        title: "What is the city you have born?",
                        visibleIf: "{matrix.city} = 'yes'"
                    },
                ]
            },
            {
                questions: [
                    {
                        type: "checkbox",
                        name: "cars",
                        title: "What car have you ever drived?",
                        isRequired: true,
                        colCount: 4,
                        choices: ["None", "Ford", "Vauxhall", "Volkswagen", "Nissan", "Audi", "Mercedes-Benz", "BMW", "Peugeot", "Toyota", "Citroen"]
                    },
                    {
                        type: "checkbox",
                        name: "selectCars",
                        title: "Please, select two cars you like the most",
                        isRequired: true,
                        colCount: 4,
                        choices: []
                    }
                ]
            },
            {
                questions: [
                    {
                        type: "matrixdynamic",
                        name: "teachersRate",
                        title: "Please rate your teachers",
                        addRowText: "Add Subject",
                        horizontalScroll: true,
                        columnMinWidth: "120px",
                        columnColCount: 1,
                        cellType: "radiogroup",
                        choices: [{value: 1, text: "Yes"}, {value: 0, text: "Sometimes"}, {value: -1, text: "No"}],
                        columns: [{
                            name: "subject",
                            cellType: "dropdown",
                            title: "Select a subject",
                            isRequired: true,
                            minWidth: "300px",
                            choices: ["English: American Literature", "English: British and World Literature", "Math: Consumer Math", "Math: Practical Math", "Math: Developmental Algebra", "Math: Continuing Algebra", "Math: Pre-Algebra", "Math: Algebra", "Math: Geometry", "Math: Integrated Mathematics", "Science: Physical Science", "Science: Earth Science", "Science: Biology", "Science: Chemistry", "History: World History", "History: Modern World Studies", "History: U.S. History", "History: Modern U.S. History", "Social Sciences: U.S. Government and Politics", "Social Sciences: U.S. and Global Economics", "World Languages: Spanish", "World Languages: French", "World Languages: German", "World Languages: Latin", "World Languages: Chinese", "World Languages: Japanese"]
                        },
                            {name: "explains", title: "Clearly explains the objectives"},
                            {name: "interesting", title: "Makes class interesting"},
                            {name: "effective", title: "Uses class time effectively"},
                            {name: "knowledge", title: "Knows the subject matter"},
                            {name: "recognition", title: "Recognizes and acknowledges effort"},
                            {name: "inform", title: "Keeps me informed of my progress"},
                            {name: "opinion", title: "Encourages and accepts different opinions"},
                            {name: "respect", title: "Has the respect of the student"},
                            {name: "cooperation", title: "Encourages cooperation and participation"},
                            {name: "parents", title: "Communicates with my parents"},
                            {name: "selfthinking", title: "Encourages me to think for myself"},
                            {
                                name: "frusturation",
                                cellType: "comment",
                                title: "Is there anything about this class that frustrates you?",
                                minWidth: "250px"
                            },
                            {
                                name: "likeTheBest",
                                cellType: "comment",
                                title: "What do you like best about this class and/or teacher?",
                                minWidth: "250px"
                            },
                            {
                                name: "improvements",
                                cellType: "comment",
                                title: "What do you wish this teacher would do differently that would improve this class?",
                                minWidth: "250px"
                            }],
                        rowCount: 2
                    }
                ]
            }
        ]
    }
);


function generate() {
    var generateEl = document.getElementById("itemsCount");
    var count = 2;
    if(generateEl) {
        var tmp = parseInt(generateEl.value);
        if(tmp) count = tmp;
    }
    if(count > 20) count = 20;
    var items = [];
    for(var i = 0; i < count; i ++) {
        var name = "itemName" + (i +1);
        var title = "Text title #" + (i + 1);
        var item = new Survey.MultipleTextItemModel(name, title);
        items.push(item);
    }
    survey.getQuestionByName("question1").items = items;
}

survey.onMatrixCellValidate.add(function (survey, options) {
    if (options.columnName !== "subject") return;

    var rows = options.question.visibleRows;
    for (var i = 0; i < rows.length; i++) {
        //we have the same row
        if (rows[i] === options.row) continue;
        if (rows[i].value && rows[i].value[options.columnName] == options.value) {
            options.error = "You have already select the same value";
        }
    }
});

survey.onComplete.add(function (result) {
    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
});

survey.onMatrixCellValueChanged.add(function (survey, options) {
    //validate value on change
    if (options.columnName === "subject") {
        options.getCellQuestion(options.columnName).hasErrors(true);
    }
});

survey.onValueChanged.add(function (sender, options) {
    if (options.name == "cars") {
        var choices = [];
        var newValue = options.value ? options.value : [];
        for (var i = 0; i < newValue.length; i++) {
            choices.push(newValue[i]);
        }
        sender.getQuestionByName("selectCars").choices = choices;
    } else {
        return;
    }
});

survey.showProgressBar = "bottom";
$("#surveyElement").Survey({model: survey});

