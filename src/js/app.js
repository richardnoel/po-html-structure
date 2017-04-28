var app = angular.module('app', []);
app.controller('body', function ($scope) {
	$scope.pivote = {};
});

app.run(['$rootScope', '$xhrFactory', function ($rootScope, $xhrFactory) {
		$rootScope.getTpl = function () {
		};
		$rootScope.inheritConfig = function (childrens, parentConfig) {
			var contBR = 0;
			_.each(childrens, function (node, index) {
				var config = node.getAttribute("uni-aspect") || {};
				if (node.tagName === "BR") {
					contBR += 1;
				} else {
					var colspan;
					if (_.isEmpty(config)) {
						config.colspan = parentConfig.cols[(index - contBR) % parentConfig.cols.length];
						node.setAttribute('uni-aspect', JSON.stringify(config));
					} else {
						config = JSON.parse(config);
					}
				}
			});
		};

		$rootScope.getHTML = function (elem, config) {
			var template, auxHtml = $("<div></div>"), newTemplate = '<br></br>';
			type = config.uniAspect.type || elem.get(0).tagName.toLowerCase();
			switch (type) {
				case ("grid"):
					template = document.querySelector('#tpl-grid').innerHTML;
					auxHtml.html(_.template(template, config));
					newTemplate = auxHtml.get(0).innerHTML;
					break;
				case ("label"):
					config.label = elem.text();
					template = document.querySelector('#tpl-fieldlabel').innerHTML;
					newTemplate = _.template(template, config);
					break;
				case ("text"):
					template = document.querySelector('#tpl-textInput').innerHTML;
					newTemplate = _.template(template, config);
					auxHtml.append(newTemplate);
					var attr;
					for (attr in attributes) {
						var typeOf = typeof attributes[attr];
						if (typeOf !== "object" && typeOf !== "function") {
							var value = attributes[attr];
							if (attr.substring(0, 2) === "ng") {
								attr = attr.substring(0, 2) + "-" + attr.substring(2, attr.length);
							}
							auxHtml.find("input").get(0).setAttribute(attr, value);
						}
					}
					newTemplate = auxHtml.html();
					break;
				case ("panel"):
					console.log("panel")
					template = document.querySelector('#tpl-panel').innerHTML;
					newTemplate = _.template(template, config);
					break;
				case ("checkbox"):
					template = document.querySelector('#tpl-checkbox').innerHTML;
					newTemplate = _.template(template, {});
					break;
			}
			return newTemplate;
		};
	}]);

app.directive('uniAspect', ['$rootScope', function ($rootScope) {
		var getHTML = $rootScope.getHTML;
		var inheritConfig = $rootScope.getHTML;
		var defaultGrid = {cols: [3, 3, 3, 3], colspan: 12},
										html,
										contBR = 0,
										tempContBR = 0,
										tempConfig,
										parse;
		var createConfig = function (attributes) {
			var config = {}, i, param;
			config.prefix = attributes.$attr;
			for (param in config.prefix){
				if(attributes.hasOwnProperty(param)){
					if (typeof attributes[param] === "string"){
						parse = $rootScope.$eval(attributes[param]);
						config[param] = parse?parse: attributes[param];
					}else{
						config[param] = attributes[param];
					}
				}
			}
			return config;
		};
		return {
			restrict: 'A',
			replace: true,
			scope: true,
			template: function (elem, attributes) {
				var tagName = elem.get(0).tagName;
				var settings = {}, pos;
				settings = createConfig(attributes);
				if (settings.uniAspect.type === "grid") {
					_.extend(defaultGrid, settings);
					inheritConfig(elem.children(), defaultGrid);
					//elem.attr('ng-transclude','')
				} else {
					if (settings.uniAspect.type === "panel") {
						elem.data({config: tempConfig});
					}
				}
				html = getHTML(elem, settings, attributes);
				if (settings.uniAspect.type === "grid") {
					var aux = $("<div></div>");
					aux.append(html);
					aux.find("[root]").append(elem.html()).html();
					html = aux.html();
				} else {
					console.log(tagName);
					//elem.remove();
				}
				return html;
			}
		};
	}]);