/*
 * TP2: VISUALIZACAO DE DADOS
 * Arthur Câmara, Fernando Calazans, Gabriel Uber, Rodolfo Fortes, Thompson Moreira
 *
 * visualization.js : Elementos da Visualizacao
 * 
 */
 
 
/* Dataset Object */
var DataSet = function(times, sum) {
 
	this.dataset = times;
	this.words = new Array();
	
	for(i in times) {
		for(j in times[i]) {
			for(k in times[i][j]) {
			
				if(parseInt(times[i][j][k], 10) > 0) {
					
					if(this.words.indexOf(k) < 0) this.words.push(k);
					
				}
				
				//console.log(i+' '+j+' '+k+' : '+times[i][j][k]);
			}
		}
	}
	
	this.words.sort();
	
	this.getData = function() {
/* 		console.log("Dataset: SENDING DATA"); */
		return this.dataset;
	}
	
	this.getWords = function() {
		return this.words;
	}
	
	this.getNumberHour = function(words) {
		
		var hours = new Array();
		
		for(i in words) {
			var name_word = words[i];
			for(var j=7; j<20; j++) {
				var time = j.toString();
			
				if(hours[time] == undefined) hours[time] = new Array();
			
				hours[time][name_word] = parseInt(this.dataset[time][0][name_word],10) + parseInt(this.dataset[time][1][name_word],10);
				
				
			}
		}
		
		//printArrayConsole(hours);
		
		return hours;
		
	}
	
	this.getNumberWord = function(words) {
		
		var hours = new Array();
		
		for(i in words) {
			var name_word = words[i];
			for(var j=7; j<20; j++) {
				var time = j.toString();
			
				if(hours[name_word] == undefined) hours[name_word] = new Array();
			
				hours[name_word][time] = parseInt(this.dataset[time][0][name_word],10) + parseInt(this.dataset[time][1][name_word],10);
				
				
			}
		}
		
		//printArrayConsole(hours);
		
		return hours;
		
	}
	
	this.getHalfWord = function(words) {
		
		var hours = new Array();
		
		for(i in words) {
			var name_word = words[i];
			for(var j=7; j<20; j++) {
				var time = j.toString();
			
				if(hours[name_word] == undefined) hours[name_word] = new Array();
			
				if(hours[name_word][time] == undefined) hours[name_word][time] = new Array();
			
				hours[name_word][time][0] = parseInt(this.dataset[time][0][name_word],10);
				hours[name_word][time][1] = parseInt(this.dataset[time][1][name_word],10);
				
				
			}
		}
		
		//printArrayConsole(hours);
		
		return hours;
		
	}
 
}

/* Visualization Object */
var Visualization = function(dataset) {
 	 
/* 	console.log("Visualization: GOT DATA"); */
	
	this.draw = function() {
/* 		console.log("Visualization: START DRAWING"); */
	}
	
	this.clear = function() {
	}
 
}

var AddWord = function(word) {

	if(word == undefined)
		var newword = $("#selectwords option:selected").html();
	else 
		var newword = word;
		
	var qtd = 0;
	var existing = new Array();
	$("#words p.word").each(function() {
		existing.push($(this).html());
		qtd++;
	});
	if(qtd<5) {
		if(existing.indexOf(newword) < 0) NewWord(newword);
		else {
			alert("Você já inseriu esta palavra!");
		}
		
	}
	else alert("Remova uma palavra. Máximo de 5 palavras para comparação.");
	
	$("#selectwords option").removeAttr('selected');
}

var NewWord = function(word) {
	
	//adiciona na barra lateral
	$("#words").append("<p class='word' id='word_"+wordToIndex(word)+"'>"+word+"</p>");
	
	$("#word_"+wordToIndex(word)).dblclick(function() {
	
		RemoveWord(word);
	
	}).mouseenter(function() {
	
		SelectWord(word);
	
	}).mouseout(function() {
	
		UnselectAll();
	
	});
	
	//Desenha Barras
	DrawBars();
	
	//desenha gráfico acima
	DrawGraphs();
	
	//colore palavras
	ColorWords();
	
}

var ColorWords = function() {
	var i=1;
	$("#words p.word").each(function() {
		if(i<=5) {
			$(this).removeClass('color1');
			$(this).removeClass('color2');
			$(this).removeClass('color3');
			$(this).removeClass('color4');
			$(this).removeClass('color5');
			$(this).addClass('color'+i);
			$(this).addClass('highlight');
			i++;
		}
	});
}

var RemoveWord = function(word) {
	$("#word_"+wordToIndex(word)).remove();
	
	ColorWords();
	
	//remove barras e recalcula proporcoes
	DrawBars();
	
	//remove graficos
	DrawGraphs();
}


var UnselectAll = function () {
	$("#words p.word").each(function() {
		$(this).removeClass('selected');
	});
	$(".bar").each(function() {
		$(this).removeClass('highlight');
	});
}

var SelectWord = function (word) {
	UnselectAll();
	$("#word_"+wordToIndex(word)).addClass('selected');
	for(h = 7; h < 20; h++) {
		$("#bar_"+wordToIndex(word)+"_"+h).addClass('highlight');
	}
}


var CalculateProportions = function() {
	
}

var GetAllWords = function() {
	var allwords = new Array();
	$("#words p.word").each(function() {
		allwords.push($(this).html());
	});
	return allwords;
}


var DrawBars = function () {
	//remove existing
	RemoveBars();
	
	var allwords = GetAllWords();
	var hours = dataset.getNumberHour(allwords);

	for(h = 7; h < 20; h++) {
		
		var color = 1;
		
		var totalHour = arraySum(hours[h]);
		
		$("#total"+h).html(totalHour);
		
		for(i in hours[h]) {
		
			if(isNaN(parseInt(hours[h][i],10))) hours[h][i] = 0;
		
			var height = Math.ceil(parseInt(hours[h][i],10)/totalHour * 350);
			var word = i.toString;

			if(height > 0 ) $("#hour"+h).append("<div id='bar_"+wordToIndex(i)+"_"+h+"' class='bar bgcolor"+color+"' style='height: "+height+"px'>"+parseInt(hours[h][i],10)+"</div>");
			
			color++;
			
		}
		
	}
	
}

var RemoveBars = function () {
	
	for(h = 7; h < 20; h++) {
		$("#hour"+h).html('');
	}
	
} 

var showHideLines = function() {
	if($("#line1").hasClass('hidden')) {
		$(".line").removeClass('hidden');
		$("#esconder").val('Esconder Anotações');
	}
	else {
		$(".line").addClass('hidden');	
		$("#esconder").val('Mostrar Anotações');
	}
}

var clearGraphs = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
	canvas.width = 1;
	canvas.width = w;
}
var DrawGraphs = function() {

	clearGraphs();
	
	var allwords = GetAllWords();
	var words = dataset.getHalfWord(allwords);
	
	var highest = 0;
	for(w in words) {
		for(h = 7; h < 20; h++) {
			if(isNaN(parseInt(words[w][h][0],10))) words[w][h][0] = 0;
			if(isNaN(parseInt(words[w][h][1],10))) words[w][h][1] = 0;
			
			words[w][h][0] = parseInt(words[w][h][0],10);
			words[w][h][1] = parseInt(words[w][h][1],10);
			
			if(words[w][h][0] > highest) highest = words[w][h][0];	
			if(words[w][h][1] > highest) highest = words[w][h][1];
			
		}
	}
	
	//console.log("HIGHEST: "+highest);
	
	
	var colors = new Array(COLOR1,COLOR2,COLOR3,COLOR4,COLOR5);
	var color = 0;
	var started = false;
	var x;
	var y;
	var value;
	
	for(w in words) {
	
		context.beginPath();
		context.lineWidth = 2;
	
		var apply_color = colors[color];
		context.strokeStyle = apply_color;
	
		x = 0;
	
		for(h = 7; h < 20; h++) {
		
			for(i = 0; i < 2; i++) {
			
				value = parseInt(words[w][h][i],10);
				//console.log(value);
				
				value = Math.ceil(value / highest * 100);
				
				x = (70*(h-7)) + (35*i);
				y = 100 - value;
/* 				console.log(x+" "+y); */
				
				if(started==false) {
			
					 context.moveTo(x, y);
				} else {
					 context.lineTo(x, y);
				}
					
				started = true;
			
			}
		
		}
		
		color++;
		started = false;
		context.stroke();
	}
	
}