var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);
	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
	// console.log(arr);
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isValid(board,num,i,j,n){
	//Row and Col check
	for(let x=0;x<n;x++){
		if(board[i][x]==num || board[x][j]==num){
			return false;
		}
	}
	//subMatrix check
	let rn=Math.sqrt(n);
	//finding starting index of i and j in a subMatrix
	let si=i-i%rn;
	let sj=j-j%rn;

	for(let x=si;x<si+rn;x++){
		for(let y=sj; y<sj+rn;y++){
			if(board[x][y]==num){
				return false;
			}
		}
	}
	return true;
}

function SudokuSolver(board, i, j, n) {
		//base case
		if(i==n){
			console.log('logged i==n');
			FillBoard(board)
			return true;
		}
		if(j==n){
			console.log('logged j==n');
			return SudokuSolver(board, i+1, 0, n)
		}

if (board[i][j] != 0) {
	return SudokuSolver(board, i, j + 1, n);
}
		//filling numbers in empty space
		for(let num=1;num<=9;num++){
			console.log(n,i,j,num,isValid(board,num,i,j,n));
			console.log(board[i][j]);
			// if(isValid(board,n,i,j,num)){
			if(isValid(board,num,i,j,n)){

				board[i][j]=num;
				let subAns= SudokuSolver(board,i,j+1,n);
				if(subAns){
					return true;
				}
				//implementing backtracking
				board[i][j]=0; 
			}
		}
		return false;

	 }



