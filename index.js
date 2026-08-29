let input = getTableContent();
let visited = [];

for(let i = 0; i < input.length; i++){
    let visitedEl = [];
        for(let j = 0; j < input.length; j++){
            visitedEl.push(false);
    }
    visited.push(visitedEl);
}

let queue = [[0,0]];
let el;
let res = 1;


document.getElementsByTagName("table")[0].addEventListener('click', function(e){
    console.log(e.target);
    let x = parseInt(e.target.dataset.x);
    let y = parseInt(e.target.dataset.y);

    cluster(x,y,input.length);
    console.log(res);
});

function colorCell(x, y){
    const cell = document.querySelector(`td[data-x="${x}"][data-y="${y}"]`);
    cell.style.backgroundColor = 'yellow';
}

function getTableLength(){
    const tbody = document.querySelector("tbody");
    return tbody.children.length;
}

function getTableContent(){
    const tableLength = getTableLength();
    let input = [];
    for(let i = 0; i < tableLength; i++){
        let inputEl = [];
        for(let j = 0; j < tableLength; j++){
            const cell = document.querySelector(`td[data-x="${i}"][data-y="${j}"]`);
            inputEl.push(parseInt(cell.innerHTML));
        }
        input.push(inputEl);
    }
    return input;
}



function cluster(x, y, dim){

    visited[x][y] = true;
    colorCell(x, y);

    queryPosition(x, y, dim, "top");
    queryPosition(x, y, dim, "bottom");
    queryPosition(x, y, dim, "left");
    queryPosition(x, y, dim, "right");

    queue.shift();
    if(queue.length > 0){
        cluster(queue[0][0], queue[0][1], dim);
    }
}

function next(x, y, dim, dir){
    if(dir == "top" && y !== 0) return [x, y - 1];
    if(dir == "bottom" && y !== dim - 1) return [x, y + 1];
    if(dir == "left" && x !== 0) return [x - 1, y];
    if(dir == "right" && x !== dim - 1) return [x + 1, y];
    return false;
}

function queryPosition(x, y, dim, dir){

    let coord = false;

    switch (dir) {
        case "top": 
            coord = next(x, y, dim, "top");
            break;
        case "bottom":
            coord = next(x, y, dim, "bottom");
            break;
        case "left":
            coord = next(x, y, dim, "left");
            break;
        case "right":
            coord = next(x, y, dim, "right");
            break;
        default:
            break;
    }

    if(coord && !visited[coord[0]][coord[1]]){
        el = input[coord[0]][coord[1]];
        if(el == input[x][y]){
            queue.push(coord);
            visited[coord[0]][coord[1]] = true;
            res++;
        }
    }

}