var app = angular.module('app', []);
app.controller('body', function ($scope) {
	$scope.pageURL = '/case/input.html';
	$scope.pivot = {};
});

app.run(['$rootScope', '$xhrFactory', function ($rootScope, $xhrFactory) {
		$rootScope.getTpl = function () {
		};
		$rootScope.getHTML = function(elem, config){
			var template, auxHtml = $("div");
			type = config.type || elem.get(0).tagName.toLowerCase();
			switch (type) {
				case ("grid"):
					template = document.querySelector('#tpl-grid').innerHTML;
					//return $(_.template(template, {"colspan": "1", "id": "2"})).insertBefore(elem);
				 auxHtml.html(_.template(template, {"colspan": config.col, "id": "2"}));
					//console.log(auxHtml);
					return auxHtml.get(0).innerHTML;
					//auxHtml.insertBefore(elem);
					break;
				case ("label"):
					template = document.querySelector('#tpl-fieldlabel').innerHTML;
					return _.template(template, {"colspan": config.col});
					break;
				case ("input"):
					template = document.querySelector('#tpl-textInput').innerHTML;
					return _.template(template, {"colspan": config.col});
				 //_.template(template, {"colspan": config.col});
					//return auxHtml.get(0).innerHTML;
					break;
			}
		};
	}]);

app.directive('uniAspect', ['$rootScope', function ($rootScope) {
		var getHTML = $rootScope.getHTML;
		var config,
			html,
			parentConfig,
			contCols = 0,
			contElements = 0;
		return {
			restrict: 'A',
			transclude: true,
			replace: true,
			template: function (elem, attributes) {
				config = {};
				if (attributes.uniAspect){
					config = JSON.parse(attributes.uniAspect);
				}
				if(config.type === "grid"){
					//elem.children().data({"parentConfig": config});
					parentConfig = config;
				} else {
					if (!config.col){
							config.col = parentConfig.cols[cont];
					}
					contCols = contCols + config.col;
				}
				html = getHTML(elem, config);
				console.log(html);
				return html;					
				//elem.remove();
				//return html;
				//console.log(elem)
			}
		};
	}]);