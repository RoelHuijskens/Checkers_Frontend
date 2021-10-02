console.log("this runs")
const board = document.getElementById("board")

var previousSelected 

export function getIndex(event){
	console.log(event.target.tagName)
	if (event.target.tagName == "IMG"){
		splitName = event.target.parentNode.id.split(";")
	} else {
		splitName = event.target.id.split(";")
	}
	
	
	row = splitName[0][splitName[0].length-1]
	col = splitName[1][splitName[1].length-1]
	url = urlBase.concat(gameID.toString(10)).concat("/".concat(row)).concat("/".concat(col))
	var responseData = "Hello"
	fetch(url).then(function(response) {
			return response.json();
			}).then(function(data) {
			let turn = data[0]
			responseData =  data[1]
			
			
			cleanHighlightsCache()
			
			if(responseData == "NoMoves"){
				
			}else if( typeof responseData[0] === "string"){
				//Move <img piece> to selected desination. 
 				var locationSource = responseData[1]
				var locationTarget = responseData[2]
				
				var piece = document.getElementById(getSquare(locationSource[0],locationSource[1]))
				var target = document.getElementById(getSquare(locationTarget[0],locationTarget[1]))
				
				console.log("The response data")
				console.log(responseData[0])
				if(responseData[0]=="Completed King"){
					let King = document.createElement("img")
					King.id = "King:".concat(locationTarget[0].toString(10)).concat(";".concat(locationTarget[1].toString(10)))	
					King.style.width = "100%"
					King.style.height = "100%"
					King.innerHTML = "aKing"
					King.style.zIndex = "2"
					if (turn == "B"){
						King.src = "Assets/White_King.PNG"
					} else {
						King.src = "Assets/Black_King.PNG"
					}
					piece.innerHTML = ""
					target.appendChild(King)
				} else {
					target.appendChild(piece.childNodes[0])
				} 
				
				
				if(responseData.length == 4){
					//Remove piece if captured. 
					console.log("we triggerd this. ")
					var locationCapture = responseData[3]
					var capturePiece = document.getElementById(getSquare(locationCapture[0],locationCapture[1]))
					capturePiece.innerHTML = ""
				}
				
				
				
				if(responseData[0] == "You have won"){
					alert(turn + ", has won the game")
				} 
			}else{
			
				//Highlight all possible positions to move to. 
				saveHighlights(responseData)
			
			}
			
			
		
			});
	previousSelected = event.target.id


	
	
}

export function getSquare(row,col){
	return "Row:".concat(row.toString(10)).concat(";Col:".concat(col.toString(10)))	
}

export function saveHighlights(responseData){
	for(let i = 0;i < responseData.length; i++){
				let location = responseData[i]
				let id = getSquare(location[0],location[1])
				
				document.getElementById(id).style.backgroundColor = "LightGray"
				trackerBox = document.getElementById("selected")
				var trackerSpan = document.createElement("span")
				trackerSpan.id = "Tracker,".concat(id)
				trackerBox.appendChild(trackerSpan)
			}
}


export function cleanHighlightsCache(){
	trackerBox = document.getElementById("selected")
				for(let node =0; node < trackerBox.childNodes.length; node ++){
					document.getElementById(trackerBox.childNodes[node].id.split(",")[1]).style.backgroundColor = "Grey"
					
				}
				trackerBox.innerHTML = ''
}

export function setup_board(){
for(let rowInd=7; rowInd >= 0; rowInd--){

	let row = document.createElement("div") 
	row.style.display = "flex"
	//row.style.flex-direction = "row"
	row.style.border = '2px solid black'
	row.style.width = '48vw'
	row.style.height = "6vw"
	row.id = "Row".concat(toString(rowInd))
	
	for( let colInd = 0; colInd <8; colInd++){
		let col = document.createElement("span")
		col.style.border = '2px solid black'
		col.style.width = "6vw"
		col.style.height = "6vw"
		col.style.zIndex = "5"
		col.id = "Row:".concat(rowInd.toString(10).concat(";Col:".concat(colInd.toString(10))))
		col.addEventListener("click",getIndex)
		row.appendChild(col)	
		if( (colInd%2==0&&rowInd%2==0)||(colInd%2!=0&&rowInd%2!=0)){
			col.style.backgroundColor = "grey"
			
			if((rowInd<3||rowInd>4)){
				let piece = document.createElement("img")
				piece.id = "Piece:".concat(rowInd.toString(10)).concat(";".concat(colInd.toString(10)))	
				piece.style.width = "100%"
				piece.style.height = "100%"
				piece.innerHTML = "Apiece"
				piece.style.zIndex = "2"
			if(rowInd < 3){
				piece.src = "Assets/White_Piece.PNG"
				
			}else{
				
				piece.src = "Assets/Black_Piece.PNG"
				
			
		}
		col.appendChild(piece)
			}
			
			
		
			
	
	}
	
	board.appendChild(row)
	
	
} 
}

}

