function settleVisibleIf(statement) {
    // var statement = '{25_gov_own_interest_if} = "Yes"';
    var regx = /\{(\S+?)\}/g;
    var name = statement.split("=")[0].replace(regx, '$1');
    var value = statement.split("=")[1];
    return {
        name: name,
        value: value
    }
}

for(var i = 0 ; i< TPQuestionnaire.originSurvey.survey.pages.length; i++) {
    for( var j=0; j< TPQuestionnaire.originSurvey.survey.pages[i].elements.length; j ++) {
        var name = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].name;
        var answer = TPQuestionnaire.CURR_OBJ.surveyRes[name];
        var section = TPQuestionnaire.originSurvey.survey.pages[i].title[i18n];
        var title = (TPQuestionnaire.originSurvey.survey.pages[i].elements[j].title&&TPQuestionnaire.originSurvey.survey.pages[i].elements[j].title[i18n])?TPQuestionnaire.originSurvey.survey.pages[i].elements[j].title[i18n]:TPQuestionnaire.originSurvey.survey.pages[i].elements[j].title;
        var visibleIf = TPQuestionnaire.originSurvey.survey.pages[i].elements[j]['visibleIf'];
        // var vis = settleVisibleIf(visibleIf);

        // if(visibleIf) {
        //   var regx = /\{(\S+?)\}/g;
        //   var name = visibleIf.split("=")[0].replace(regx, '$1');
        //   var value = visibleIf.split("=")[1];
        //   if(value.indexOf(TPQuestionnaire.CURR_OBJ.surveyRes[name.trim()]) >= 0) {
        //     console.log('visible');
        //   }else {
        //     console.log('no visible');
        //     TPQuestionnaire.NEW_ANSWER_VIEW.push({
        //       answer: answer?answer:'N/A',
        //       hight: false,
        //       question: title,
        //       score: 0,
        //       section: section
        //     })
        //     continue;
        //   }
        // }


        if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'text') {
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?answer:'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'dropdown') {
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?answer:'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'checkbox') {
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?answer.join(','):'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'matrixdynamic') {
            // TPQuestionnaire.originSurvey.survey.pages[i].elements[j].columns

            function reAns(answer){
                var returnStr = '';
                for(var i=0;i<answer.length;i++) {
                    for(var j=0;j<Object.keys(answer[i]).length;j++) {
                        var key = Object.keys(answer[i])[j];
                        var value = answer[i][Object.keys(answer[i])[j]];
                        returnStr += key + ': ' + value + '<br/>'
                    }
                }
                return returnStr;
            }

            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?reAns(answer): 'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'radiogroup') {
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?answer: 'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'matrix') {
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: 'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })

            var answer = TPQuestionnaire.CURR_OBJ.surveyRes[name];
            for(var k=0;k<TPQuestionnaire.originSurvey.survey.pages[i].elements[j].rows.length;k++) {
                var question = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].rows[k]['text'][i18n]
                var answerValue = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].rows[k]['value']
                TPQuestionnaire.NEW_ANSWER_VIEW.push({
                    answer: (answer&&answer[answerValue])?answer[answerValue]:'N/A',
                    hight: false,
                    question: question,
                    score: 0,
                    section: section
                })
            }

        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'multipletext'){

            function reAnsNoArr(answer){
                var returnStr = '';

                for(var i=0;i<Object.keys(answer).length;i++) {
                    var key = Object.keys(answer)[i];
                    var value = answer[Object.keys(answer)[i]];
                    returnStr += key + ': ' + value + '<br/>'
                }
                return returnStr;
            }

            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?reAnsNoArr(answer):'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'comment'){
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?answer:'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })
        }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].type == 'panel'){
            TPQuestionnaire.NEW_ANSWER_VIEW.push({
                answer: answer?answer:'N/A',
                hight: false,
                question: title,
                score: 0,
                section: section
            })

            var answer = TPQuestionnaire.CURR_OBJ.surveyRes[name];
            for(var k=0;k<TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements.length;k++) {

                // questions in panel
                var name = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].name;
                var answer = TPQuestionnaire.CURR_OBJ.surveyRes[name];
                var section = TPQuestionnaire.originSurvey.survey.pages[i].title[i18n];
                var title = (TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].title&&TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].title[i18n])?TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].title[i18n]:TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].title;

                // var question = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k]['title']?TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k]['title'][i18n]:TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k]['title'];
                // var answerValue = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k]

                if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'text') {
                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?answer:'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'dropdown') {
                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?answer:'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'checkbox') {
                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?answer.join(','):'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'matrixdynamic') {
                    // TPQuestionnaire.originSurvey.survey.pages[i].elements[j].columns

                    function reAns(answer){
                        var returnStr = '';
                        for(var i=0;i<answer.length;i++) {
                            for(var j=0;j<Object.keys(answer[i]).length;j++) {
                                var key = Object.keys(answer[i])[j];
                                var value = answer[i][Object.keys(answer[i])[j]];
                                returnStr += key + ': ' + value + '<br/>'
                            }
                        }
                        return returnStr;
                    }

                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?reAns(answer): 'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'radiogroup') {
                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?answer: 'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'matrix') {
                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: 'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })

                    var answer = TPQuestionnaire.CURR_OBJ.surveyRes[name];
                    for(var l=0;l<TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].rows.length;l++) {
                        var question = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].rows[l]['text'][i18n]
                        var answerValue = TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].rows[l]['value']
                        TPQuestionnaire.NEW_ANSWER_VIEW.push({
                            answer: answer?answer[answerValue]:'N/A',
                            hight: false,
                            question: question,
                            score: 0,
                            section: section
                        })
                    }

                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'multipletext'){

                    function reAnsNoArr(answer){
                        var returnStr = '';

                        for(var i=0;i<Object.keys(answer).length;i++) {
                            var key = Object.keys(answer)[i];
                            var value = answer[Object.keys(answer)[i]];
                            returnStr += key + ': ' + value + '<br/>'
                        }
                        return returnStr;
                    }

                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?reAnsNoArr(answer):'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else if(TPQuestionnaire.originSurvey.survey.pages[i].elements[j].elements[k].type == 'comment'){
                    TPQuestionnaire.NEW_ANSWER_VIEW.push({
                        answer: answer?answer:'N/A',
                        hight: false,
                        question: title,
                        score: 0,
                        section: section
                    })
                }else {
                    console.log('else in panel, just one level panel')
                }
                // TPQuestionnaire.NEW_ANSWER_VIEW.push({
                //   answer: answer?answer[answerValue]:'N/A',
                //   hight: false,
                //   question: question,
                //   score: 0,
                //   section: section
                // })
            }
        }  else {
            // TPQuestionnaire.NEW_ANSWER_VIEW.push({
            //   answer: answer,
            //   hight: false,
            //   question: question,
            //   score: 0,
            //   section: section
            // })
            console.log('elelelele');
        }
    }
}