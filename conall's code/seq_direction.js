outlets = 1;

var outVal;

function direction(dir){
	if(dir == "forward"){
		outVal = 0;
		} else if(dir == "backward"){
			outVal = 1;
		} else if(dir == "both"){
			outVal = 2;
		} 
		outlet(0, outVal);
}
	
	