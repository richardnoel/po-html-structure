var myApp = angular.module('uniKit', []);
myApp.directive('uniText', function () {
	return {
		template: function (elem, attributes) {
      var data = {
        id: "text",
        colSpan: 12,
        colSpanLabel: 3,
        colSpanControl: 9
      };
      var html = $("<div></div>");
      var parentNode = elem.parent();
      for (attr in attributes){
        if (typeof attributes[attr] === "string" ){
          data[attr] = attributes[attr];
        }
      }
      _.extend(data, attr.$attr);
      var tplContent = document.querySelector('#tpl-fieldContent'),
          tplLabel = document.querySelector('#tpl-fieldlabel'),
          tplControl = document.querySelector('#tpl-textInput');

      if (tplContent){
        tplContent = tplContent.innerHTML;
        content = $(_.template(tplContent, data)).insertBefore(elem);
      }
      if (tplLabel){
        tplLabel = tplLabel.innerHTML;
        content.append(_.template(tplLabel, data));
      }
      if (tplControl){
        tplControl = tplControl.innerHTML;
        content.append(_.template(tplControl, data));
      }
      elem.remove();
		}
	};
});

/*var myApp = angular.module('uniKit', []);
myApp.directive("mainCtrl", function(){
  return {
    template : function(element, attr){
          var data = {
            button: 'button',
            list: [5,6,7,345,23434,78723,1,2,3,4,5]
        };  
        template = document.querySelector('#text').innerHTML;
        element.html(_.template(template, data));
      }
    }
});*/