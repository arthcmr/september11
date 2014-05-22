/*
 * TP1: VISUALIZACAO DE DADOS
 * Arthur Câmara, Fernando Calazans, Gabriel Uber, Rodolfo Fortes, Thompson Moreira
 *
 * functions.js : FUNCOES UTEIS PARA A VISUALIZACAO
 * 
 */
 
//format number
function formatNumber(value) {

	return value.toFixed(2) + "%";
}

function printArrayConsole(arr) { 
	
	for(i in arr) {
		console.log("arr["+i+"] is =>"+arr[i]);
	}

}

function inArray(arr, element) {
	for(i in arr)
		if(arr[i]==element) return true;
	return false;
}

function arraySum(arr) {
	var sum = 0;
	for(i in arr) {
	
		if(isNaN(parseInt(arr[i],10))) arr[i] = 0;
	
		sum += parseInt(arr[i],10);
	}
	return sum;
}

function wordToIndex(word) {
	return word.split(' ').join('_');
}

function indexToWord(index) {
	return index.split('_').join(' ');
}

