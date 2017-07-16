/*
CS290 - Project 3
Tyler McSilva
*/

function createTable(sizeX, sizeY, headerArr){
    var table = document.createElement("table");
    table.style.setProperty("border-collapse", "collapse");
    table.style.setProperty("border", "1px solid #888");
    for(var y = 0; y < sizeY; y++){
        var newRow = document.createElement("tr");
        for(var x = 0; x < sizeX; x++){
            var newCell = (y == 0) ?  document.createElement("th") :  document.createElement("td");
            newCell.className = "tableCell";
            newCell.style.setProperty("border", "1px solid #888");
            newCell.style.setProperty("padding", "0.25em");
            newCell.style.setProperty("text-align", "center");
            if(y == 0) {
                newCell.innerHTML = headerArr[x];
            } else {
                newCell.innerHTML = (x+1) + " " + (y);
            }
            newCell.dataset.x = x+1;
            newCell.dataset.y = y;
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }
    return table;
}

function createButton(value){
    var newButton = document.createElement('button');
    newButton.value = value;
    newButton.innerHTML = value;
    return newButton;
}

function createDirectionalButton(value){
    var newButton = createButton(value);
    newButton.dataset.direction = value;
    return newButton;
}

function createMarkButton(value){
    var newButton = createButton(value);
    newButton.id = "markCell";
    return newButton;
}

function createDirectionalButtonGroup(){
    var directionalDIV = document.createElement("div")
    directionalDIV.id = "directional-div";
    directionalDIV.appendChild(createDirectionalButton("up"));
    directionalDIV.appendChild(createDirectionalButton("down"));
    directionalDIV.appendChild(createDirectionalButton("left"));
    directionalDIV.appendChild(createDirectionalButton("right"));
    return directionalDIV;
}

function createMarkerButtonGroup(){
    var markerDIV = document.createElement("div");
    markerDIV.id = "marker-div";
    markerDIV.appendChild(createMarkButton("Mark Cell"));
    return markerDIV;
}

function canMoveUp(currentCell, tableSize){
    return currentCell.y > 1;
}
function canMoveDown(currentCell, tableSize){
    return currentCell.y < tableSize.y-1;
}
function canMoveLeft(currentCell, tableSize){
    return currentCell.x > 1;
}
function canMoveRight(currentCell, tableSize){
    return currentCell.x < tableSize.x;
}

function findCell(cellLoc){
    var cellArr = document.getElementsByTagName("td");
    for(var i = 0; i < cellArr.length; i++){
        if(cellArr[i].dataset.x == cellLoc.x && cellArr[i].dataset.y == cellLoc.y){
            return cellArr[i];
        }
    }
    return false;
}

function clearSelectedCell(cell) {
    cell.style.setProperty("border", "1px solid #888");
    cell.style.removeProperty("box-shadow");
}

function setSelectedCell(cell){
    cell.style.setProperty("box-shadow", "inset 0 0 0 2px #000");
    cell.style.removeProperty("border");
}

function updateSelectedCell(currentCellLoc, newCellLoc){
    var currentCell = findCell(currentCellLoc);
    clearSelectedCell(currentCell);

    var newCell = findCell(newCellLoc);
    setSelectedCell(newCell);
}

function markCell(cellLoc){
    var cell = findCell(cellLoc);
    cell.style.setProperty("background-color", "yellow");
}

(function(){
    window.addEventListener("load", function(e){
        var bodyTag = document.getElementsByTagName("body")[0];
        bodyTag.style.setProperty("box-sizing", "border-box");
        var CURRENT_CELL = {x: 1, y: 1};
        var TABLE_SIZE = {x: 4, y: 4};

        // Add Table
        bodyTag.appendChild(
            createTable(TABLE_SIZE.x,TABLE_SIZE.y,["Header 1", "Header 2", "Header 3", "Header 4"])
        );

        // Add Direction Buttons
        bodyTag.appendChild(createDirectionalButtonGroup());

        // Add Marker
        bodyTag.appendChild(createMarkerButtonGroup());

        // mark first cell
        setSelectedCell(findCell(CURRENT_CELL));

        // mark cell when button is clicked
        document.getElementById("markCell").addEventListener("click", function(e){
            markCell(CURRENT_CELL);
        })

        // When clicking on directional buttons
        document.getElementById("directional-div").addEventListener("click", function(e){
            var btnClicked = e.target;
            switch(btnClicked.dataset.direction){
                case "up":
                    if(canMoveUp(CURRENT_CELL, TABLE_SIZE)){
                        var newSelection = {
                            x: CURRENT_CELL.x,
                            y: CURRENT_CELL.y-1    
                        };
                        updateSelectedCell(CURRENT_CELL, newSelection);
                        CURRENT_CELL = newSelection;
                        console.log(CURRENT_CELL);
                    }
                    break;
                case "down":
                    if(canMoveDown(CURRENT_CELL, TABLE_SIZE)){
                        var newSelection = {
                            x: CURRENT_CELL.x,
                            y: CURRENT_CELL.y+1    
                        };
                        updateSelectedCell(CURRENT_CELL, newSelection);
                        CURRENT_CELL = newSelection;
                    }
                    break;
                case "left":
                    if(canMoveLeft(CURRENT_CELL, TABLE_SIZE)){
                        var newSelection = {
                            x: CURRENT_CELL.x-1,
                            y: CURRENT_CELL.y    
                        };
                        updateSelectedCell(CURRENT_CELL, newSelection);
                        CURRENT_CELL = newSelection;
                    }
                    break;
                case "right":
                    if(canMoveRight(CURRENT_CELL, TABLE_SIZE)){
                        var newSelection = {
                            x: CURRENT_CELL.x+1,
                            y: CURRENT_CELL.y    
                        };
                        updateSelectedCell(CURRENT_CELL, newSelection);
                        CURRENT_CELL = newSelection;
                    }
                    break;
                default:
                    break;
            };
        });
    })
}());