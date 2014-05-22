/*
 * TP1: VISUALIZACAO DE DADOS
 * Arthur Câmara, Fernando Calazans, Gabriel Uber, Rodolfo Fortes, Thompson Moreira
 *
 * exec.js : Execucao da Visualizacao
 * 
 */
 
/* variaveis globais */
var target = undefined;
var dataset = undefined;
var canvas = undefined;
var context = undefined;

var COLOR2 = "#4dd2ff";
var COLOR1 = "#ff4d4d";
var COLOR3 = "#ffffff";
var COLOR4 = "#ffd24d";
var COLOR5 = "#999999";

/* objetos */


/*start function */
var Main = function (dataset) {

}

var AddAllWords = function (selector, words) {
	
	for(i in words) {
		$(selector).append("<option>"+words[i]+"</option>");	
	}
	
}

var Start = function() {
	
/* 	target = $("#visualization"); */

	dataset = new DataSet(t,s);
	var words = dataset.getWords();
	AddAllWords("#selectwords", words);
	
	AddWord('call');
	AddWord('home');
	AddWord('please');
	
	/*
var dataset = new DataSet();
	
	console.log("PARSING DATA COMPLETED");
	
	var visualization = new Visualization(dataset);	
	visualization.draw();
	
	console.log("VISUALIZATION COMPLETED");
*/

}


/* iniciar execucao apos carregar página*/
$(function() {

	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
     
	new Start();

});


