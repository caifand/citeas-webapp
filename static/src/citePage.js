var stubbedResp =
{
  "citations": [
    {
      "citation": "Wickham, H., & RStudio.  (n.d.). stringr: Simple, Consistent Wrappers for Common String Operations. <i>R package version 1.2.0.9000</i>. Retrieved from https://CRAN.R-project.org/package=stringr",
      "style_fullname": "American Psychological Association 6th edition",
      "style_shortname": "apa"
    },
    {
      "citation": "Wickham, H. & RStudio, stringr: Simple, Consistent Wrappers for Common String Operations. <i>R package version 1.2.0.9000</i>. Available at: https://CRAN.R-project.org/package=stringr.",
      "style_fullname": "Harvard Reference format 1 (author-date)",
      "style_shortname": "harvard1"
    },
    {
      "citation": "1.Wickham, H. & RStudio. stringr: Simple, Consistent Wrappers for Common String Operations. <i>R package version 1.2.0.9000</i>",
      "style_fullname": "Nature",
      "style_shortname": "nature"
    },
    {
      "citation": "Wickham, Hadley, and RStudio. \u201cStringr: Simple, Consistent Wrappers for Common String Operations\u201d. <i>R package version 1.2.0.9000</i>. Web. <https://CRAN.R-project.org/package=stringr>...",
      "style_fullname": "Modern Language Association 7th edition (with URL)",
      "style_shortname": "modern-language-association-with-url"
    },
    {
      "citation": "Wickham, Hadley, and RStudio. n.d.. \u201cStringr: Simple, Consistent Wrappers for Common String Operations\u201d. <i>R Package Version 1.2.0.9000</i>. https://CRAN.R-project.org/package=stringr.",
      "style_fullname": "Chicago Manual of Style 16th edition (author-date)",
      "style_shortname": "chicago-author-date"
    },
    {
      "citation": "1. Wickham H, RStudio. stringr: Simple, Consistent Wrappers for Common String Operations [Internet]. R package version 1.2.0.9000.. Available from: https://CRAN.R-project.org/package=stringr",
      "style_fullname": "Vancouver",
      "style_shortname": "vancouver"
    }
  ],
  "doi": null,
  "exports": [
    {
      "export": "container-title,URL,type,title,note,year,id,author\nR package version 1.2.0.9000,https://CRAN.R-project.org/package=stringr,Manual,stringr: Simple, Consistent Wrappers for Common String Operations,R package version 1.2.0.9000,2017,ITEM-1,[{'suffix': u'', 'given': u'Hadley', 'family': u'Wickham'}, {'family': u'RStudio'}]",
      "export_name": "csv"
    },
    {
      "export": "%T stringr: Simple, Consistent Wrappers for Common String Operations\n%J R package version 1.2.0.9000\n%V \n%N \n%P \n%D 2009\n%I \n%A Wickham, Hadley\n%A RStudio, ",
      "export_name": "enw"
    },
    {
      "export": "T1 stringr: Simple, Consistent Wrappers for Common String Operations\nJO R package version 1.2.0.9000\nVL \nIS \nSP \nV1 2009\nPB \nA1 Wickham, Hadley\nA1 RStudio, ",
      "export_name": "ris"
    },
    {
      "export": "@article{piwowar2007sharing,\n              title={Sharing detailed research data is associated with increased citation rate},\n              author={Piwowar, Heather A and Day, Roger S and Fridsma, Douglas B},\n              journal={PloS one},\n              volume={2},\n              number={3},\n              pages={e308},\n              year={2007},\n              publisher={Public Library of Science}\n            }\n            ",
      "export_name": "bibtex"
    }
  ],
  "metadata": {
    "URL": "https://CRAN.R-project.org/package=stringr",
    "author": [
      {
        "family": "Wickham",
        "given": "Hadley",
        "suffix": ""
      },
      {
        "family": "RStudio"
      }
    ],
    "container-title": "R package version 1.2.0.9000",
    "id": "ITEM-1",
    "note": "R package version 1.2.0.9000",
    "title": "stringr: Simple, Consistent Wrappers for Common String Operations",
    "type": "Manual",
    "year": "2017"
  },
  "name": "stringr: Simple, Consistent Wrappers for Common String Operations",
  "provenance": [
    {
      "context": "base library url",
      "location": "http://api.citeas.org/product/https://cran.r-project.org/web/packages/stringr",
      "source_type": "request parameters"
    },
    {
      "context": "GitHub URL",
      "location": "http://cran.r-project.org/web/packages/stringr",
      "source_type": "webpage content"
    },
    {
      "context": "GitHub DESCRIPTION file",
      "location": "https://github.com/tidyverse/stringr/raw/master/DESCRIPTION",
      "source_type": "DESCRIPTION metadata"
    }
  ],
  "url": "https://github.com/tidyverse/stringr"
}


angular.module('citePage', [
    'ngRoute',
    'ngMessages'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/cite/:projectId*', {
            templateUrl: "cite-page.tpl.html",
            controller: "CitePageCtrl"
        })
    })






    .controller("CitePageCtrl", function ($scope,
                                          $mdDialog,
                                          $mdToast,
                                          $routeParams,
                                          $rootScope,
                                          $location,
                                          $http) {

        // define stuff
        var apiResp
        var url = "https://api.citeas.org/product/" + $routeParams.projectId
        var feedbackurl = "/feedback"
        $scope.apiUrl = url
        $scope.apiResp = "loading"
        $scope.user = {}
        $scope.error = {}
        $scope.ShowLightBox = false;
        // load the data from the API
        load()

        // just for testing
        //onDataLoad(stubbedResp)


        // call once the API has returned a good response
        function onDataLoad(resp) {
            apiResp = resp
            $scope.apiResp = apiResp
            if('error_message' in apiResp){
                console.log('error message found')
            } else {
                $scope.user.selectedCitation = resp.citations[0]
                $scope.setCitationMetaTags(apiResp.metadata)
            }
        }

        function load(){
            $http.get(url).success(function(resp){
                console.log("response from api yay", resp)
                onDataLoad(resp)
            }).error(function(resp){
                console.log("bad response from api", resp)
                $scope.apiResp = "error"
            })

        }

        $scope.copy = function(){
            copyText("citation")
            var toast = $mdToast.simple()
                  .textContent('Copied to clipboard')
                  .action('OK')

            $mdToast.show(toast)
        }

        var originatorEv;
        $scope.openMenu = function($mdOpenMenu, ev){
            originatorEv = ev;
            console.log("open menu")
            $mdOpenMenu(ev);
        }

        $scope.HideLightBox = function(e){

            if(e.target.classList.contains('lightbox'))
                $scope.ShowLightBox = false;

            if(e.target.classList.contains('close'))
                $scope.ShowLightBox = false;
        }

        $scope.CloseLightBox = function(){
            $scope.ShowLightBox = false;
        }

        $scope.stepInfo = function(stepName){
            var stepInfo = $rootScope.steps[stepName]
            console.log("stepInfo!", stepName, stepInfo)

            $mdDialog.show({
                controller: DialogController,
                templateUrl: "step-info.tpl.html",
                clickOutsideToClose:true
            })

            function DialogController($scope, $mdDialog) {
                $scope.stepInfo = stepInfo

                $scope.hide = function() {
                    $mdDialog.hide();
                };

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }
        }
        $scope.NotExpected = function(){
            console.log("NotExpected!")
            $scope.ShowLightBox =true;
        }
        $scope.SubmitFeedback = function(){
            console.log($scope.feedback)
            $http.post(feedbackurl,$scope.feedback).success(function(resp){
                console.log("response from api yay", resp)

            }).error(function(resp){
                console.log("bad response from api", resp)
                $scope.apiResp = "error"
            })
            $scope.ShowLightBox =false;
            console.log($scope.feedback);
        }

        $scope.modify = function(){
            console.log("modify!")
            var myInput = $scope.apiResp.url;
            var sourceIndex = $scope.apiResp.provenance.length - 2;
            var sourceURL = $scope.apiResp.provenance[sourceIndex].content_url;
            var secondaryURL = $scope.apiResp.provenance[sourceIndex].additional_content_url;
            var secondaryMessage = (secondaryURL ? ` and <a href="${secondaryURL.url}">${secondaryURL.url}</a>` : '');
            var myAlert = $mdDialog.confirm()
                    .clickOutsideToClose(true)
                    .title("Are you the owner of this software project?")
                    .htmlContent(
                        `The citation for <a href="${myInput}">${myInput}</a> was ultimately built from data at 
                        <a href="${sourceURL}">${sourceURL}</a>${secondaryMessage}. 
                        You can modify this citation by editing metadata associated with the project.`
                    )
                    .ok("Learn more")
                    .cancel("Dismiss")

            $mdDialog.show(myAlert).then(
                function(){
                    console.log("success function")
                    $location.url("modify-your-citation")
                }
            )
        }


        $scope.saveAs = function(format){
            var extensions = {
                endnote: "enw",
                refworks: "ris",
                bibtex: "bibtex"
            }

            var myExt = extensions[format]
            var myExportObj = apiResp.exports.find(function(expObj){
                return expObj.export_name == myExt
            })

            console.log("export obj", myExportObj)

            var filename = "citation." + myExportObj.export_name
            var fileMime = "text/" + format

            // using external download.js library
            download(myExportObj.export, filename, fileMime)
        }

    })