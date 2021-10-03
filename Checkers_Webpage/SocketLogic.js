
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let url = 'ws://checkersbackend.westeurope.azurecontainer.io:5000'



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
			input_tag = document.getElementById('username_input')
			if (input_tag.style.display != 'none'){
				input_tag.style.display = 'none'
				document.getElementById('challenge_selection').style.display = 'block'
			}
				

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
			document.getElementById("game_lobby").style.display = "none"
			//import { setup_board } from './modules/GameLogic.js';
			setup_board(color);	
		default:
			console.log("ayo bru ")
			
			
			
			
		
	
	
}
})


const send_butt = document.getElementById("send_button")

send_butt.onclick = function(event){
	name = document.getElementById("username").value
	webSocket.send('{"msg":"'+"sign_in"+'","content":"'+ name +'"}');
}

const challenge_button = document.getElementById("challenge_button")

challenge_button.onclick = function(event){
	let oponent = document.getElementById("challenge-select").value
	webSocket.send('{"msg":"'+"challenge"+'","content":"'+oponent+'"}');
}


function setup_board(color){
	if(color == "White"){
		my_color = "https://lh3.googleusercontent.com/fife/AAWUweWfiETV1z6dAC2-Lmf9mAvALwLhfE5GkvWIZwdctpBMS9Al9Seec5XXW5Uvi_mwXyzvxImYG9Wia8eDo4RbPQpivb8RypakngVa-8GBdBzaqWXCZdC0Rebiu609nAIpQ60vEUqiG2m9W8litvNVEEDiSUBdDKcnAWq04UIKeyLPbR_7CS2pcLxxxKejvUwmbutZKCBycBNIguvTR_0PZmyhbakEIGfLdpTH63q8OI4SB2bR6ukLwrKkTbDKJ7xuFB6DotVeNVdeazbRKFzGdvQ4EgVN2fucTS_t5KB68NTxEXz-vs14Y8hU0zT9KTzeB7ZAxWrOCT49t0OE_udaONYjulu7KGUPkMP_kb61H2JYSq4T9CkfDgorKtk-uy32CEWmFQAHPrFtJrmMfyv1c1Hp0plLbB0FQddguBpvYJ3J-LhAA_FOmANWB8C4I65IUMvMhbNBSc67VTKzEFqv0_STlG8qOY3ydvPeSNZYDGu3wPQZza_7MnZyk_zTTaV6LnCQ_JktlsTCA58QIQjqrm65XKrdgZ17-MY6CFvU5opbUagDb7XBWAgLIgbUb7OrVJ5w4YvCQ14KcpfxgpGSAO7QbeT2M2SxCQ1rvsBewAbZMgZDvFS8cp8ot07cmRcCT_QjVha52mMx7s-qFKG7dWE9bnwJJzCzUfR8-w74yMsOmJVrg7fhkY92SyQpW1L5mDO45sNZE-cILjCLDySO131vyfO74_69JN8gksZSba3cuwH6ETslz_C_OVVhhALkQPr56SqT7hOezcqnNKzPAw=s100-no?authuser=0"
		opponent_color = "https://lh3.googleusercontent.com/_cYroDi7KmHMQXkPnorMC79PzDrOAVFfSeMLKL5okg0Cy0xQH-W1Eq2WrWaUMWzCN4NxJXbSkC0XRS0LPeAG2FKV8b8AEuz0SYdFvutTzxiZy4GsUuqkROWuJvH773xFXX8Yug6L7w=s100-p-k"
		
	} else if (color == "Black"){
	    my_color = "https://lh3.googleusercontent.com/_cYroDi7KmHMQXkPnorMC79PzDrOAVFfSeMLKL5okg0Cy0xQH-W1Eq2WrWaUMWzCN4NxJXbSkC0XRS0LPeAG2FKV8b8AEuz0SYdFvutTzxiZy4GsUuqkROWuJvH773xFXX8Yug6L7w=s100-p-k"
		opponent_color = "https://lh3.googleusercontent.com/fife/AAWUweWfiETV1z6dAC2-Lmf9mAvALwLhfE5GkvWIZwdctpBMS9Al9Seec5XXW5Uvi_mwXyzvxImYG9Wia8eDo4RbPQpivb8RypakngVa-8GBdBzaqWXCZdC0Rebiu609nAIpQ60vEUqiG2m9W8litvNVEEDiSUBdDKcnAWq04UIKeyLPbR_7CS2pcLxxxKejvUwmbutZKCBycBNIguvTR_0PZmyhbakEIGfLdpTH63q8OI4SB2bR6ukLwrKkTbDKJ7xuFB6DotVeNVdeazbRKFzGdvQ4EgVN2fucTS_t5KB68NTxEXz-vs14Y8hU0zT9KTzeB7ZAxWrOCT49t0OE_udaONYjulu7KGUPkMP_kb61H2JYSq4T9CkfDgorKtk-uy32CEWmFQAHPrFtJrmMfyv1c1Hp0plLbB0FQddguBpvYJ3J-LhAA_FOmANWB8C4I65IUMvMhbNBSc67VTKzEFqv0_STlG8qOY3ydvPeSNZYDGu3wPQZza_7MnZyk_zTTaV6LnCQ_JktlsTCA58QIQjqrm65XKrdgZ17-MY6CFvU5opbUagDb7XBWAgLIgbUb7OrVJ5w4YvCQ14KcpfxgpGSAO7QbeT2M2SxCQ1rvsBewAbZMgZDvFS8cp8ot07cmRcCT_QjVha52mMx7s-qFKG7dWE9bnwJJzCzUfR8-w74yMsOmJVrg7fhkY92SyQpW1L5mDO45sNZE-cILjCLDySO131vyfO74_69JN8gksZSba3cuwH6ETslz_C_OVVhhALkQPr56SqT7hOezcqnNKzPAw=s100-no?authuser=0"
	} else {
		console.log("Unusual color choice.")
	}

	let board = document.createElement("div")
	board.id = 'board'
	board.style.width = "50rem"
	board.style.height = "50rem"


	for(let rowInd=7; rowInd >= 0; rowInd--){

		let row = document.createElement("div") 
		row.classList.add('row')
		row.id = "Row".concat(toString(rowInd))
		
		for( let colInd = 0; colInd <8; colInd++){
			let col = document.createElement("span")
			col.classList.add("column")
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
				
				
			
				
		
		} else {
			col.style.backgroundColor = "white"
		}
		
		board.appendChild(row)
		
		
	} 
		document.getElementById("board_container").style.display = 'flex'
		document.getElementById("board_container").appendChild(board)
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
		
		if (piece.childNodes[0].src == "https://lh3.googleusercontent.com/fife/AAWUweW4bREihuwg7quPk_TGeE71PV47qQudu627YWABWf6k_nDT9MYJxb4SHFhqr4Ze14pJbtJ5HGsQ1SufEMKBcXTeyHqm4oXP8qyFb4KCre7I54esK7qUF4CO5moJXmq1-txDlqRmlLOtD_Aqt6kPViHpe9ZlvAaoZmR6p3_bibcZoG5cVtiMzxv5cBk1Ab8n1pjrRkCRZv-yNrt7nOPK-Ee_IBqXxIol1Yzr6hxROaU8NE161lBjb8QOitq6wWzArx0__yIVJ5GOodMAOwvOZEy_0wjC_jf6TmsxkCDUQo8CgcHLrO4xkZ3o0clwQk2kf0TSIzvIbKeY2Y4tvfPaxfD1aoH1VqbEbK_32ux5WKLJRnAdTAL1VvDKufuBsBG15iwXsYwaPhrMwnI58DOpe8cRdnS5T8aptMhMF-8CBOFtkYn92qora7FYNKtZWplLSr92Yr7OxmfTnSKCjvnlCqIIAVVvovaf9nNqtR4ybXtmfnyD0_m_iXFKS-3N8GkBNGZ8OdG-ZQUOOLh7z3AOKrP8iXbYEWWuvJOyaifiJ68i2V05EgCHHp4_c5bNfMOOkWvrflvyxEo5d13Jn7iB6lpNpWBxybGCVHEIsFq_nSfKo1n3AZmFgKVrt8ZlV2wbCDwnaB6erBh--3rj6dhoBzVmvctwLLtLAJsJ5nIarX8751Cc7Z1jyrJKmZBwXvfTfoiJvAbb68iJsTVmshGU6OOtj1UKNbQGgR_JmGGIC1CL4Ib4H6izBDony-WVd6t-H5TMzm2T8xrKZ_8Eqma0wQ=s100-no?authuser=0"){
			King.src = "https://lh3.googleusercontent.com/fife/AAWUweW4bREihuwg7quPk_TGeE71PV47qQudu627YWABWf6k_nDT9MYJxb4SHFhqr4Ze14pJbtJ5HGsQ1SufEMKBcXTeyHqm4oXP8qyFb4KCre7I54esK7qUF4CO5moJXmq1-txDlqRmlLOtD_Aqt6kPViHpe9ZlvAaoZmR6p3_bibcZoG5cVtiMzxv5cBk1Ab8n1pjrRkCRZv-yNrt7nOPK-Ee_IBqXxIol1Yzr6hxROaU8NE161lBjb8QOitq6wWzArx0__yIVJ5GOodMAOwvOZEy_0wjC_jf6TmsxkCDUQo8CgcHLrO4xkZ3o0clwQk2kf0TSIzvIbKeY2Y4tvfPaxfD1aoH1VqbEbK_32ux5WKLJRnAdTAL1VvDKufuBsBG15iwXsYwaPhrMwnI58DOpe8cRdnS5T8aptMhMF-8CBOFtkYn92qora7FYNKtZWplLSr92Yr7OxmfTnSKCjvnlCqIIAVVvovaf9nNqtR4ybXtmfnyD0_m_iXFKS-3N8GkBNGZ8OdG-ZQUOOLh7z3AOKrP8iXbYEWWuvJOyaifiJ68i2V05EgCHHp4_c5bNfMOOkWvrflvyxEo5d13Jn7iB6lpNpWBxybGCVHEIsFq_nSfKo1n3AZmFgKVrt8ZlV2wbCDwnaB6erBh--3rj6dhoBzVmvctwLLtLAJsJ5nIarX8751Cc7Z1jyrJKmZBwXvfTfoiJvAbb68iJsTVmshGU6OOtj1UKNbQGgR_JmGGIC1CL4Ib4H6izBDony-WVd6t-H5TMzm2T8xrKZ_8Eqma0wQ=s100-no?authuser=0"
		} else {
			King.src = "https://lh3.googleusercontent.com/fife/AAWUweU2mqr9EV4vE_h97_R73M3i91au4bdvlvL-S4KXdbEfRnbN4IhhNTuCaGGTmLNFCQsI9mKj6nTCzjYZduDqZ6-meLpfyFnL1lLlXpMau1pjosfOXwYX5ceCPBOHWEkxx-JxkWeDBzt0aj6T_nmRa2_cxef5PgAJSAmsTW-88HXsBFLr30FlJVs8Xf0QXutBMAU1CWVKlZuLscZ9LgWTYyztvY9gI7XNLMta_nZV325nSacbVQKxm9dbvm4mSQHQYvhLfKFyhAgE29JW4b2iUNor1iIHuiA74Vl2467e8USJA4_z6NRgys1G5pTrCzuhanHbMDgWO5GWr70RCmwDaxVOjJ8g7PBwZlqixkRtXiAB1nvNGyzMTWSpD8YBmb7m8eGCWAIpBY7Q4VKYgSZNaDISWCL9Af-K4EeULtAN6vsgIdvdWhzRo1kLftErCLanoBrzghLh_KvTMBI45TAsQoM4PVnB9xytGPoBbR23Yygz0EGxene2o5wljeIsOadgzJwsfg4sKEZtSd_VhJ3_y-vJG0MrBkFQ5zP1S1syOR2ylrJbbuUwN75s9zsJMqCaUzLdz7rZ0age1K7r_gtwPXYSzThQXUXu6tDQ0V0f9wHQVQ-OzidR3d_En4VVs5NeE-HXolDCXXOBFwV7LFJ92gjLT_Nlg9kkendPubP_XyfeOtsUY56rlGbxKGka4QWaFj1Wh-636KNnEiTMOc0u8UKvJ2eGbTJhZ5uAtL9yQhDIPIsGkJX8ZtyVhPkA4pco_LPX3Rc0CZnWsW_UMn6hwg=s100-no?authuser=0"
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