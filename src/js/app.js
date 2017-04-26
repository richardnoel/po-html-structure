var app = angular.module('app', []);
app.controller('body', function ($scope) {
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
					auxHtml.html(_.template(template, config));
					newTemplate = auxHtml.get(0).innerHTML;
					break;
				case ("label"):
					template = document.querySelector('#tpl-fieldlabel').innerHTML;
					newTemplate = _.template(template,config);
					break;
				case ("input"):
					template = document.querySelector('#tpl-textInput').innerHTML;
					newTemplate = _.template(template, config);
					break;
				case ("panel"):
					console.log("panel")
					template = document.querySelector('#tpl-panel').innerHTML;
					newTemplate = _.template(template, config);
					break;
			}
			return newTemplate;
		};
	}]);

app.directive('uniAspect', ['$rootScope', function ($rootScope) {
		var getHTML = $rootScope.getHTML;
		var defaultGrid = {cols: [3, 3, 3, 3], colspan: 12},
						html,
						contBR = 0,
						tempContBR = 0,
						tempConfig;
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
					if(settings.type === "panel"){
						tempConfig = settings;
						tempContBR = 0;
						elem.data({config: tempConfig});
					}
					if(tagName !== "BR"){
						if (!settings.colspan) {
							if (elem.parent().attr("root")){
								pos = (elem.index() - contBR) % defaultGrid.cols.length;
								settings.colspan = defaultGrid.cols[pos];
							}else{
								pos = (elem.index() - tempContBR) % tempConfig.cols.length;
								settings.colspan = tempConfig.cols[pos];
							}
						}
					}else{
						if(elem.parent().attr("root")){
							contBR += 1;							
						}else{
							tempContBR += 1;							
						}
					}

				}
				html = getHTML(elem, settings);
				elem.data({config: settings})
				return html;
			}
		};
	}]);