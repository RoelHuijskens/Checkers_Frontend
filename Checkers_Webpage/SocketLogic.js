
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let url = 'ws://20.93.236.72:80'



webSocket = new WebSocket(url);




webSocket.addEventListener('close', function (event){
	console.log("Disconnected from the server")
	
})




webSocket.addEventListener('message', function(event){
	const message = JSON.parse(event.data)
	const type = message["msg"] 
	const color = message["content"]
	
	
	switch(type){
		case "game_input":
			game_response(message["content"])
			break;
		case "error":
			console.log("ERROR" + message["content"])
			break;
		case "update_list":
			console.log("Yo evaluated")
			option_list = document.getElementById("challenge-select")
			option_list.innerHTML = ""
			others_online = message["content"]
			for(let i =0;i < others_online.length;i++){
					let option_item = document.createElement("option")
					option_item.value = others_online[i]
					option_item.innerHTML = others_online[i]

					option_list.appendChild(option_item)
			}
			break;
		case "start_game":
			document.getElementById("game_lobby").innerHTML = ""
			//import { setup_board } from './modules/GameLogic.js';
			setup_board(color);	
		default:
			console.log("ayo bru ")
			
			
			
			
		
	
	
}
})


const send_butt = document.getElementById("send_button")

send_butt.onclick = function(event){
	name = document.getElementById("username").value
	webSocket.send('{"msg":"'+"sign_in"+'","content":"'+name+'"}');
}

const challenge_button = document.getElementById("challenge_button")

challenge_button.onclick = function(event){
	let oponent = document.getElementById("challenge-select").value
	webSocket.send('{"msg":"'+"challenge"+'","content":"'+oponent+'"}');
}


function setup_board(color){
	if(color == "White"){
		my_color = "Assets/White_Piece.PNG"
		opponent_color = "Assets/Black_Piece.PNG"
	} else if (color == "Black"){
	    my_color = "Assets/Black_Piece.PNG"
		opponent_color = "Assets/White_Piece.PNG"
	} else {
		console.log("Unusual color choice.")
	}
	
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
				piece.src = my_color
				
			}else{
				
				piece.src = opponent_color
				
			
		}
		col.appendChild(piece)
			}
			
			
		
			
	
	}
	
	board.appendChild(row)
	
	
} 
}

}

function getIndex(event){
	console.log(event.target.tagName)
	if (event.target.tagName == "IMG"){
		splitName = event.target.parentNode.id.split(";")
	} else {
		splitName = event.target.id.split(";")
	}
	
	
	row_index = splitName[0][splitName[0].length-1]
	col_index = splitName[1][splitName[1].length-1]
	var message = {msg:"game_input",content:{row:row_index,col:col_index}} 
	webSocket.send(JSON.stringify(message))
	
	
}

function game_response(message){
	cleanHighlightsCache();
	switch(message['type']){
		case "possible_moves":
			saveHighlights(message['content'])
			break;
		case "Move":
			makeMove(message)
			break;
		case "Attack":
			attackPiece(message)
			break;
			
			
		
	}
		
		
			
}

function cleanHighlightsCache(){
	trackerBox = document.getElementById("selected")
				for(let node =0; node < trackerBox.childNodes.length; node ++){
					document.getElementById(trackerBox.childNodes[node].id.split(",")[1]).style.backgroundColor = "Grey"
					
				}
				trackerBox.innerHTML = ''
}

function saveHighlights(moves){
	for(let i = 0;i < moves.length; i++){
				let location = moves[i]
				let id = getSquare(location[0],location[1])
				
				document.getElementById(id).style.backgroundColor = "LightGray"
				trackerBox = document.getElementById("selected")
				var trackerSpan = document.createElement("span")
				trackerSpan.id = "Tracker,".concat(id)
				trackerBox.appendChild(trackerSpan)
			}
			
}


function makeMove(move_message){
	//Move <img piece> to selected desination.
	Move = move_message['content']
	console.log("The moive")
	console.log(Move)
 	var locationSource = Move[0]
	var locationTarget = Move[1]


	
	var piece = document.getElementById(getSquare(locationSource[0],locationSource[1]))
	var target = document.getElementById(getSquare(locationTarget[0],locationTarget[1]))
	
	if(move_message['updgrade']){
		let King = document.createElement("img")
		King.id = "King:".concat(locationTarget[0].toString(10)).concat(";".concat(locationTarget[1].toString(10)))	
		King.style.width = "100%"
		King.style.height = "100%"
		King.innerHTML = "aKing"
		King.style.zIndex = "2"
		
		if (piece.childNodes[0].src == "Assets/White_Piece.PNG"){
			King.src = "Assets/White_King.PNG"
		} else {
			King.src = "Assets/Black_King.PNG"
			}
		piece.innerHTML = ""
		target.appendChild(King)
	} else {
		target.appendChild(piece.childNodes[0])
	}
	
	
}


function attackPiece(move_message){
	makeMove(move_message)
	capture_location = move_message["content"][2]
	document.getElementById(getSquare(capture_location[0],capture_location[1])).innerHTML = ""
	
 	
}

function getSquare(row,col){
	return "Row:".concat(row.toString(10)).concat(";Col:".concat(col.toString(10)))	
}