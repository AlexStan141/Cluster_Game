let queue = [];
let el;
let visited;
let res = 1;


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
            inputEl.push(cell.innerHTML);
        }
        input.push(inputEl);
    }
    return input;
}



function cluster(x, y, dimx, dimy){

    visited[x][y] = true;
    colorCell(x, y);

    queryPosition(x, y, dimx, dimy, "top");
    queryPosition(x, y, dimx, dimy, "bottom");
    queryPosition(x, y, dimx, dimy, "left");
    queryPosition(x, y, dimx, dimy, "right");

    queue.shift();
    if(queue.length > 0){
        cluster(queue[0][0], queue[0][1], dimx, dimy);
    }
}

function next(x, y, dimx, dimy, dir){
    if(dir == "top" && y !== 0) return [x, y - 1];
    if(dir == "bottom" && y !== dimy - 1) return [x, y + 1];
    if(dir == "left" && x !== 0) return [x - 1, y];
    if(dir == "right" && x !== dimx - 1) return [x + 1, y];
    return false;
}

function queryPosition(x, y, dimx, dimy, dir){

    let coord = false;

    switch (dir) {
        case "top": 
            coord = next(x, y, dimx, dimy, "top");
            break;
        case "bottom":
            coord = next(x, y, dimx, dimy, "bottom");
            break;
        case "left":
            coord = next(x, y, dimx, dimy, "left");
            break;
        case "right":
            coord = next(x, y, dimx, dimy, "right");
            break;
        default:
            break;
    }

    let resultedArray = getTableContent();

    if(coord && !visited[coord[0]][coord[1]]){
        el = resultedArray[coord[0]][coord[1]];
        if(el == resultedArray[x][y]){
            queue.push(coord);
            visited[coord[0]][coord[1]] = true;
            console.log(coord[0], coord[1]);
            res++;
        }
    }

}

document.getElementById("content_form").style.display = "none";

document.getElementsByTagName("input")[0].value = 2;
document.getElementsByTagName("input")[1].value = 2;

document.getElementById("dimensions_form").addEventListener("submit", function(e){
    e.preventDefault();
    let inputs = document.querySelectorAll("#dimensions_form input");
    let button = document.querySelector("#dimensions_form button");
    for(let input of inputs){
        input.disabled = true;
    }
    button.disabled = true;

    width = e.target.elements.width.value;
    height = e.target.elements.height.value;

    let contentForm = document.createElement("form");
    
    for(let i = 0; i < e.target.height.value; i++){
        let div = document.createElement("div");
        for(let j = 0; j < e.target.width.value; j++){
            let input = document.createElement("input");
            input.id = i + "-" + j;
            input.style.fontSize = "20px";
            div.append(input);
        }

        div.style.display = "flex";
        div.style.gap = "10px";

        contentForm.append(div);
    }

    const submitContent = document.createElement("button");
    submitContent.type = "submit";
    submitContent.textContent = "Submit content";
    contentForm.append(submitContent);

    contentForm.style.display = "flex";
    contentForm.style.flexDirection = "column";
    contentForm.style.gap = "10px";

    document.getElementById("content_form").append(contentForm);
    document.getElementById("content_form").style.display = "block";

})

document.getElementById("content_form").addEventListener("submit", function(e){
    e.preventDefault();
    let table = document.createElement("table");
    table.id = "zone";
    let tbody = document.createElement("tbody");
    table.append(tbody);
    for(let i = 0; i < height; i++){
        let tr = document.createElement("tr");
        for(let j = 0; j < width; j++){
            let td = document.createElement("td");
            td.dataset.x = i;
            td.dataset.y = j;
            td.textContent = e.target.elements[i + "-" + j].value;
            tr.append(td);
        }
        tbody.append(tr);
    }
    document.getElementById("table").append(table);

    visited = [];

    for(let i = 0; i < height; i++){
        let visitedEl = [];
        for(let j = 0; j < width; j++){
            visitedEl.push(false);
        }
        visited.push(visitedEl);
    }

    document.getElementsByTagName("table")[0].addEventListener('click', function(e){
        console.log(e.target);
        let x = parseInt(e.target.dataset.x);
        let y = parseInt(e.target.dataset.y);

        queue.push([x, y]);

        cluster(x, y, height, width);
        console.log(res);
    });
})