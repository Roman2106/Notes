var board = document.getElementById("board"),
	btnNewNote = document.getElementById("newnote"),
	dX,
	dY,
	arrWithNotes = [];

if(localStorage.getItem("arrWithNotes")){
	arrWithNotes = JSON.parse(localStorage.getItem("arrWithNotes"));
	createNotes(arrWithNotes);
};

var posX = function(min, max){
	return Math.random()*(500-0)+0;
	}(),
	posY = function(min, max){
	return Math.random()*(500-0)+0;
	}();

btnNewNote.onclick = function(){
	
	var textNote = "New Note";
		createNote(textNote, posX, posY);
		createNotes(arrWithNotes);
	};


function UserNote(textNote, posX, posY){
	this.textNote = textNote;
	this.posX = posX;
	this.posY = posY;
};

function createNote(textNote, posX, posY){
	var userObj = new UserNote(textNote, posX, posY);
	arrWithNotes.push(userObj);
};

function createMurkup(textNote, posX, posY, index, arr){
	var divNote = document.createElement("div"),
		spanClose = document.createElement("span"),
		textarea = document.createElement("textarea"),
		spanSave = document.createElement("span"),
		divNewText = document.createElement("div");

		divNote.setAttribute("id", "note");
		spanClose.setAttribute("id", "spanClose");
		textarea.setAttribute("id", "forText");
		spanSave.setAttribute("id", "spanSave");
		divNewText.setAttribute("id", "nextText");

		board.appendChild(divNote);
		divNote.appendChild(spanClose);
		divNote.appendChild(spanSave);
		divNote.appendChild(divNewText);
		divNote.appendChild(textarea);

		divNewText.textContent = textNote;
		divNote.style.left = posX +"px";
		divNote.style.top = posY +"px";

		textarea.style.display = "none";
		divNewText.style.display = "block";

		spanClose.onclick = function(){
			arr.splice(index, 1);
			createNotes(arr);
		};

		divNewText.ondblclick = function(){
			textarea.style.display = "block";
			divNewText.style.display = "none";
			textarea.textContent = arr[index].textNote;
		};

		textarea.onchange = function(evt){
			arr[index].textNote = evt.target.value;
			createNotes(arr);
		};

		var deg = function(min, max){
			return Math.random()*(-15+0)+15;
		}();
		divNote.style.transform = "rotate(" + deg + "deg)";
		return divNote;
	};	

function createNotes(arr){
	board.innerHTML = "";
	arrWithNotes.map(function(item,index,arr){	
		var newNote = createMurkup(item.textNote, item.posX, item.posY, index, arr);
		drag(newNote, index, arr);
	});
	localStorage.setItem("arrWithNotes", JSON.stringify(arr));
};

// перетаскивание заметки
		
function drag(divNote, index, arr){
	function getMouse(evt){
		var pX = evt.pageX,
			pY = evt.pageY;
			divNote.style.left = (pX - dX) + "px";
			divNote.style.top = (pY - dY) + "px";
	};

divNote.onmousedown = function(evt){
	pX = evt.pageX;
	pY = evt.pageY;
	dX = pX - divNote.offsetLeft;
	dY = pY - divNote.offsetTop;
	var focus = evt.target;
	if(focus.id === "note" || focus.id === "nextText"){
		window.addEventListener("mousemove", getMouse);
	};
};

divNote.onmouseup = function(evt){
	arr[index].posX = evt.pageX-dX;
	arr[index].posY = evt.pageY-dY;
	var targetX = evt.pageX-dX;
	var targetY = evt.pageY-dY;
	posX = targetX;
	posY = targetY;
	console.log(targetX, targetY);
	window.removeEventListener("mousemove", getMouse);
	localStorage.setItem("arrWithNotes", JSON.stringify(arr));
	};
};


	

