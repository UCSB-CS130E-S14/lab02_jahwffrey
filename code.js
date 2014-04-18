$(document).ready(function(){

	var counter = 0;
	var running;

	var pinList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var sizeLight = 10;
	
	//turns into an array of actions to take on simulation
	//pin 1 = delay!
	var doList= [{pin:0,val:0}]
	
	//recreate:
	function redraw(){
		var can = document.getElementById("arduinoPic");
		var canX = can.getContext("2d");
		canX.clearRect(0,0,700,700);
		go();
		
		//Red & Green
		if(pinList[0]===1){
			canX.beginPath();
			canX.arc(190,410,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,0,0,.65)";
			canX.fill();
		}
		if(pinList[1]===1){
			canX.beginPath();
			canX.arc(190,385,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(0,255,0,.65)";
			canX.fill();
		}
		if(pinList[2]===1){
			canX.beginPath();
			canX.arc(190,360,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,0,0,.65)";
			canX.fill();
		}
		if(pinList[3]===1){
			canX.beginPath();
			canX.arc(190,335,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(0,255,0,.65)";
			canX.fill();
		}
		if(pinList[4]===1){
			canX.beginPath();
			canX.arc(190,310,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,0,0,.65)";
			canX.fill();
		}
		if(pinList[5]===1){
			canX.beginPath();
			canX.arc(190,280,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(0,255,0,.65)";
			canX.fill();
		}
		if(pinList[6]===1){
			canX.beginPath();
			canX.arc(190,255,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,0,0,.65)";
			canX.fill();
		}
		
		//Orange, Blue, & Yellow
		if(pinList[7]===1){
			canX.beginPath();
			canX.arc(112,413,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,170,75,.65)";
			canX.fill();
		}
		if(pinList[8]===1){
			canX.beginPath();
			canX.arc(112,385,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,170,75,.65)";
			canX.fill();
		}
		if(pinList[9]===1){
			canX.beginPath();
			canX.arc(112,355,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,170,75,.65)";
			canX.fill();
		}
		if(pinList[10]===1){
			canX.beginPath();
			canX.arc(112,330,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(0,0,255,.65)";
			canX.fill();
		}
		if(pinList[11]===1){
			canX.beginPath();
			canX.arc(112,305,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(0,0,255,.65)";
			canX.fill();
		}
		if(pinList[12]===1){
			canX.beginPath();
			canX.arc(112,280,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,255,0,.65)";
			canX.fill();
		}
		if(pinList[13]===1){
			canX.beginPath();
			canX.arc(112,255,sizeLight,0,2*Math.PI);
			canX.fillStyle="rgba(255,255,0,.65)";
			canX.fill();
		}
	}

	//Light on:
	$(".high").click(function(){
		//Light Light
		pinList[parseInt($(this).attr("name"))-2]=1;
		
		//Add Text
		var textBox = document.getElementById("copyZone");
		var text=textBox.value.slice(0,textBox.value.length-1);
		text=text+"\tdigitalWrite("+parseInt($(this).attr('name'))+",HIGH);\n}";
		textBox.value=text;
		
		//Redraw Canvas
		redraw();
	});
	
	//Light off:
	$(".low").click(function(){
		//Dim Light
		pinList[parseInt($(this).attr("name"))-2]=0;
		
		//Add Text
		var textBox = document.getElementById("copyZone");
		var text=textBox.value.slice(0,textBox.value.length-1);
		text=text+"\tdigitalWrite("+parseInt($(this).attr('name'))+",LOW);\n}";
		textBox.value=text;
		
		//Redraw Canvas
		redraw();
	});
	
	//add delay command:
	$("#belay").click(function(){
		var textBox = document.getElementById("copyZone");
		var text=textBox.value.slice(0,textBox.value.length-1);
		text=text+"\tdelay("+document.getElementById("delayAmt").value+");\n}";
		textBox.value=text;
	});
	
	//interpret
	$("#start").click(function(){
		var text = document.getElementById("copyZone").value;
		var textArray = text.split(/;|\s/);
		doList.length = 0;
		for(var i = 0; i < textArray.length; i++){
			var furtherSplit = textArray[i].split("(");
			if(furtherSplit[0].search("digitalWrite")!=-1){
				if(furtherSplit[1].search("HIGH")!=-1){
					doList.push({pin:parseInt(furtherSplit[1]),val:1});
				}
				else {
					doList.push({pin:parseInt(furtherSplit[1]),val:0});
				}
			}
			else if(furtherSplit[0].search("delay")!=-1){
				doList.push({pin:1,val:parseInt(furtherSplit[1])});
			}
		}
		counter = 0;
		running = setInterval(function(){runProgram()},1);
	});
	
	$("#stop").click(function(){
		if(typeof(running)!="undefined"){
			clearInterval(running);
			doList.length=0;
		}
	});
	
	function runProgram(){
		if(counter === doList.length){
			counter=0;
		}
		if(doList[counter].pin===1){
			clearInterval(running);
			running = setInterval(function(){runProgram()},doList[counter].val);
		}
		else{
			pinList[doList[counter].pin-2]=doList[counter].val;
			clearInterval(running);
			running = setInterval(function(){runProgram()},1);
			redraw();
		}
		counter+=1;
	}
});