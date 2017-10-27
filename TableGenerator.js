/*
* @Author: yanhoor
* @Date:   2017-10-26 22:37:06
* @Last Modified by:   yanhoor
* @Last Modified time: 2017-10-27 12:23:21
*/
window.onload = function(){
	var columnE = document.getElementById("column");
	var rowE = document.getElementById("row");
	var button = document.getElementById("generate");
	var numberE = document.getElementById("number");
	var colorE = document.getElementById("color");

	var EventUtil = {
		addHandler: function(element, type, handler){
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			}else if (event.attachEvent) {
				event.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		},

		removeHandler: function(element, type, handler){
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			}else if (event.detachEvent) {
				event.detachEvent("on" + type, handler);
			}else{
				element["on" + type] = null;
			}
		}
	};

	EventUtil.addHandler(button, "click", generateTable);

	function generateTable(){
		var columns = columnE.value;
		var rows = rowE.value;

		//重复点击generate时删除已有表格
		if (document.getElementsByTagName("table").length != 0) {
			var formerTable = document.getElementsByTagName("table");
			document.body.removeChild(formerTable[0]);
		}

		var table = document.createElement("table");
		table.border = 1;
		table.width = "1100px";

		var tbody =document.createElement("tbody");
		table.appendChild(tbody);

		for(var i = 0; i < rows; i++){
			tbody.insertRow(i);
			for(var j = 0; j < columns; j++){
				tbody.rows[i].insertCell(j);
			}
		}

		document.body.appendChild(table);
	}
};