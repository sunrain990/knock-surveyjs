function init(Survey) {
    var widget = {
        name: "editor",
        title: "Editor",
        iconName: "icon-editor",
        widgetIsLoaded: function() {
            return typeof SimpleMDE != "undefined";
        },
        isFit: function(question) {
            return question.getType() === "editor";
        },
        htmlTemplate:
            "<textarea></textarea>",
        activatedByChanged: function(activatedBy) {
            Survey.JsonObject.metaData.addClass("editor", [], null, "empty");
            /*
            Survey.JsonObject.metaData.addProperty("editor", {
              name: "height",
              default: 300
            });
            */
        },
        afterRender: function(question, el) {
            var simplemde = new SimpleMDE({ element: el.firstChild,  initialValue: question.value});
            var isValueChanging = false;
            var updateValueHandler = function() {
                if (isValueChanging) return;
                simplemde.value(question.value);
            };
            simplemde.codemirror.on('change', function() {
                isValueChanging = true;
                question.value = simplemde.value();
                isValueChanging = false;
            });
            question.valueChangedCallback = updateValueHandler;
        },
        willUnmount: function(question, el) {}
    };

    Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
    init(Survey);
}