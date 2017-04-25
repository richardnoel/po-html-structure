var app = angular.module('app', []);
app.controller('body', function ($scope) {
	$scope.pageURL = '/case/input.html';
	$scope.pivot = {};
});

app.run(['$rootScope', '$xhrFactory', function ($rootScope, $xhrFactory) {
		$rootScope.getTpl = function () {
		};
		$rootScope.getHTML = function (elem, config) {
			var template, auxHtml = $("div"), newTemplate = '<br></br>';
			type = config.type || elem.get(0).tagName.toLowerCase();
			switch (type) {
				case ("grid"):
					template = document.querySelector('#tpl-grid').innerHTML;
					auxHtml.html(_.template(template, {"colspan": config.col, "id": "2"}));
					newTemplate = auxHtml.get(0).innerHTML;
					break;
				case ("label"):
					template = document.querySelector('#tpl-fieldlabel').innerHTML;
					newTemplate = _.template(template, {"colspan": config.col});
					break;
				case ("input"):
					template = document.querySelector('#tpl-textInput').innerHTML;
					return _.template(template, {"colspan": config.col});
					break;
			}
			return newTemplate;
		};
	}]);

app.directive('uniAspect', ['$rootScope', function ($rootScope) {
		var getHTML = $rootScope.getHTML;
		var defaultItem = {col: 3}, defaultGrid = {cols: [3, 3, 3, 3], col: 12},
										html,
										parentConfig,
										contCols = 0,
										contElements = 0,
										contBR = 0;
		return {
			restrict: 'A',
			transclude: true,
			replace: true,
			template: function (elem, attributes) {
				var tagName = elem.get(0).tagName;
				var settings = {}, pos;

				if (attributes.uniAspect) {
					settings = JSON.parse(attributes.uniAspect);
				}
				if (settings.type === "grid") {
					_.extend(defaultGrid, settings);
				} else {
					if(tagName !== "BR"){
					if (!settings.col) {
						pos = (elem.index()-contBR) % defaultGrid.cols.length;
						settings.col = defaultGrid.cols[pos];
					}						
					}else{
						contBR+=1;
					}
				}
				html = getHTML(elem, settings);
				return html;
			}
		};
	}]);