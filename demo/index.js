$(function() {
    SurveyEditor
        .StylesManager
        .applyTheme("bootstrap");

    var editorOptions = {
        showJSONEditorTab: true,
        showTestSurveyTab: true,
        showEmbededSurveyTab: false,
        generateValidJSON: false,
        showOptions: false,
        // questionTypes : ["text", "checkbox", "radiogroup", "dropdown"]
    };

    Survey.JsonObject.metaData.addProperty("survey", "tag:number");
    Survey.JsonObject.metaData.addProperty("page", {
        name: "tag:number",
        default: 1
    });
// Survey.JsonObject.metaData.addProperty("questionbase", {
//     name: "tag:number",
//     default: 0
// });
    Survey.JsonObject.metaData.addProperty("questionbase", "tag");


//Add a tag property
    Survey.JsonObject.metaData.addProperty("questionbase", "tag");
//Make name and tag properties read-only
    Survey.JsonObject.metaData.findProperty("questionbase", "name").readOnly = true;
    Survey.JsonObject.metaData.findProperty("questionbase", "tag").readOnly = true;


//remove a property to the page object. You can't set it in JSON as well
    Survey.JsonObject.metaData.removeProperty("page", "visibleIf");
//remove a property from the base question class and as result from all questions
// Survey.JsonObject.metaData.removeProperty("questionbase", "visibleIf");

    SurveyEditor.SurveyQuestionEditorDefinition.definition["questionbase"]
        .properties = [
        "title",
        "name", {
            name: "tag",
            title: "Tag"
        }, {
            name: "visible",
            category: "checks"
        }, {
            name: "isRequired",
            category: "checks"
        }
    ];

    SurveyEditor.SurveyQuestionEditorDefinition.definition["questionbase"]
        .tabs = [
        {
            name: "visibleIf",
            index: 1
        }
    ];


    SurveyEditor.StylesManager.applyTheme("bootstrap");

    SurveyEditor.defaultStrings.ed.toolboxGeneralCategory = "Common";

    var editor = new SurveyEditor.SurveyEditor("editorElement", editorOptions);

    editor.toolbox.addItem({
        name: "countries",
        isCopied: true,
        iconName: "icon-default",
        title: "All countries",
        json: {
            "type": "dropdown",
            optionsCaption: "Select a country ...",
            choicesByUrl: {
                url: "https://restcountries.eu/rest/v1/all"
            }
        }
    })

// editor.toolbarItems.push({
//     id: "custom-preview",
//     visible: true,
//     title: "Survey Preview",
//     enabled: true,
//     action: function () {
//         var windowElement = document.getElementById("surveyContainerInPopup");
//         var testSurveyModel = new Survey.Model(editor.getSurveyJSON());
//         testSurveyModel.render("surveyContainerInPopup");
//         // $("#modalSurvey").modal("show");
//         alert('add bar!')
//     }
// });

    editor.toolbox.changeCategories([
        {
            name: "panel",
            category: "Panels"
        }, {
            name: "paneldynamic",
            category: "Panels"
        }, {
            name: "matrix",
            category: "Matrix"
        }, {
            name: "matrixdropdown",
            category: "Matrix"
        }, {
            name: "matrixdynamic",
            category: "Matrix"
        }
    ]);

    editor.onCanShowProperty.add(function (sender, options) {
        if (options.obj.getType() == "survey") {
            options.canShow = options.property.name == "title";
        }
    });


    editor.onDefineElementMenuItems.add(function (editor, options) {
        options.items.unshift({
            text: "Add Into Shared Repository",
            onClick: function (obj) {
                addIntoCustomItems(obj);
            }
        });
    });

// Add a button to the toolbar
    editor.toolbarItems.push({
        id: "toolboxCustomization",
        visible: true,
        title: "Toolbox Customization",
        enabled: true,
        action: function () {
            showToolboxCustomization();
        }
    });

    var questionCounter = 1;
//Set the name property different from the default value
//and set the tag property to a generated GUID value.
    editor.onQuestionAdded.add(function (sender, options) {
        var q = options.question;
        var t = q.getType();
        q.name = "Question" + t[0].toUpperCase() + t.substring(1) + questionCounter;
        q.tag = guid();
        questionCounter++;
    });

    function guid() {
        function s4() {
            return Math
                .floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }


    var allToolboxItems = [];

//You have to replace getCustomItems/setCustomItems functions with the code that get/set data in the database
    function getCustomItems() {
        var res = window
            .localStorage
            .getItem("sharedquestions");
        if (!res)
            return {};
        return JSON.parse(res);
    }

    function setCustomItems(items) {
        var str = JSON.stringify(items);
        window
            .localStorage
            .setItem("sharedquestions", str);
    }

    function addIntoCustomItems(element) {
        var json = new Survey
            .JsonObject()
            .toJsonObject(element);
        json.type = element.getType();
        var item = {
            name: element.name,
            iconName: 'icon-' + element.getType(),
            title: element.title,
            json: json,
            isCopied: false,
            isUsed: isItemUsed(element.name),
            isStandard: false
        };
        var items = getCustomItems();
        items[item.name] = item;
        setCustomItems(items);
    }

    function removeCustomItem(name) {
        var items = getCustomItems();
        delete items[name];
        setCustomItems(items);
        var container = document.getElementById("customItems");
        var div = document.getElementById("toobaritem_" + name);
        container.removeChild(div);
    }

    function isItemUsed(name) {
        return editor
            .toolbox
            .indexOf(name) > -1;
    }

    function addToolBoxItemIntoList(container, item) {
        allToolboxItems.push(item);
        var div = document.createElement("div");
        div.id = "toobaritem_" + item.name;
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = item.name;
        checkbox.checked = item.isUsed;
        checkbox.id = item.name;
        checkbox.dataItem = item;
        checkbox.onchange = function () {
            this.dataItem.isUsed = this.checked;
        }

        var label = document.createElement('label')
        label.style.marginLeft = "5px";
        label.htmlFor = item.name;
        label.appendChild(document.createTextNode(item.title));

        var removeButton = null;
        if (!item.isStandard) {
            removeButton = document.createElement("button");
            removeButton.style.marginLeft = "7px";
            removeButton.appendChild(document.createTextNode("Remove"));
            removeButton.onclick = function () {
                removeCustomItem(item.name)
            };
        }

        div.appendChild(checkbox);
        div.appendChild(label);
        if (removeButton) {
            div.appendChild(removeButton);
        }

        container.appendChild(div);
    }

    function createDefaultItem(typeName) {
        var question = Survey
            .ElementFactory
            .Instance
            .createElement(typeName, "q1");
        if (!question) {
            question = Survey
                .JsonObject
                .metaData
                .createClass(typeName);
        }
        var json = new Survey
            .JsonObject()
            .toJsonObject(question);
        json.type = question.getType();
        return {
            name: typeName,
            iconName: 'icon-' + typeName,
            title: SurveyEditor
                .editorLocalization
                .getString('qt.' + typeName),
            json: json,
            isCopied: false,
            isUsed: isItemUsed(typeName),
            isStandard: true
        };
    }

    function loadAllToolboxItems() {
        allToolboxItems = [];
        var container = document.getElementById("standardItems");
        container.innerHTML = "";
        var allTypes = Survey
            .ElementFactory
            .Instance
            .getAllTypes();
        for (var i = 0; i < allTypes.length; i++) {
            addToolBoxItemIntoList(container, createDefaultItem(allTypes[i]));
        }
        container = document.getElementById("customItems");
        container.innerHTML = "";
        var customItems = getCustomItems();
        for (var name in customItems) {
            var item = customItems[name];
            item.isUsed = isItemUsed(name);
            addToolBoxItemIntoList(container, item);
        }
        if (container.children.length == 0) {
            container.innerHTML = "Select the question, click on '...' and then click on the first item to add the question here.";
        }
    }

    function applyToolboxItems() {
        editor
            .toolbox
            .clearItems();
        var newItems = [];
        for (var i = 0; i < allToolboxItems.length; i++) {
            if (allToolboxItems[i].isUsed) {
                editor
                    .toolbox
                    .addItem(allToolboxItems[i]);
            }
        }
    }

    function showToolboxCustomization() {
        loadAllToolboxItems();
        $('#toolboxCustomization').modal('show');
    }
});