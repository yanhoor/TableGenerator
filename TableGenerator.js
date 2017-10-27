/*
* @Author: yanhoor
* @Date:   2017-10-26 22:37:06
* @Last Modified by:   yanhoor
* @Last Modified time: 2017-10-27 23:02:39
*/
window.onload = function(){
	var columnE = document.getElementById("column");
	var rowE = document.getElementById("row");
	var button = document.getElementById("generate");
	var numberE = document.getElementById("number");
	var colorE = document.getElementById("color");
	var displayE = document.getElementById("infoDiv");

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
		EventUtil.addHandler(table, "click", displayInfo);

		var tbody =document.createElement("tbody");
		table.appendChild(tbody);

		for(var i = 0; i < rows; i++){
			tbody.insertRow(i);
			for(var j = 0; j < columns; j++){
				tbody.rows[i].insertCell(j);
				var randomNum = 1 + 15 * Math.random();
				var randomColorNum = (0xf0f0f0 + 1) * Math.random();
				var randomColor = (Math.floor(randomColorNum)).toString(16);
				while(randomColor.length < 6){
					randomColor += "0";
				}
				tbody.rows[i].cells[j].appendChild(document.createTextNode(Math.floor(randomNum)));
				tbody.rows[i].cells[j].style.background = "#" + randomColor;
			}
		}

		document.body.appendChild(table);
	}

	function displayInfo(){
		displayE.style.display = "block";
		var currentTd = event.target;
		
		//判断作用：防止选择多个单元格时current为table
		if (currentTd.tagName.toLowerCase() == "td") {
			var innerHTML = "<span>你所选的区域数字为：" + currentTd.innerText + "</span>" +
			"<span>，颜色为：</span>" +
			"<em style=\"background: " + currentTd.style.backgroundColor + "\"></em>" +
			"<span>" + currentTd.style.background + "</span>";
			displayE.innerHTML = "";
			displayE.innerHTML = innerHTML;
		}
	}
};