const TOTAL = 8;

export function draw(row, col) {
    let arr = genArr(row * col);
    let index = 0;
    
    for (let i = 0; i < row; i++) {
        
        let container = $('<div class="container">').appendTo($('.play-field'));
        
        for (let j = 0; j < col; j++) {
            let div = `<div class="card">
                    <div class="card-front">
                        <img src="./images/door.jpg" alt="door">
                    </div>
                    <div class="card-back">
                        <img src="./images/${arr[index++]}.jpg" alt="cat">
                    </div>
                </div>`;
            $(div).appendTo(container);       
        }
    }
    return row * col;
}

function genArr(count) {
    let arr = new Array();
    let numb = Math.floor(Math.random() * TOTAL) + 1;

    //fill array
    for (let i = 0; i < count / 2; i++) {
        arr.push(numb);
        arr.push(numb);
        numb = numb % TOTAL + 1;
    }
    
    //shuffle array
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}