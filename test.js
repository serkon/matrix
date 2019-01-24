var question = [
    [1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 1],
    [0, 9, 1, 1, 1],
];

// güzel örnek
// var question = [
//     [1, 0, 1, 1, 1],
//     [1, 1, 1, 1, 1],
//     [0, 0, 1, 0, 1],
//     [1, 0, 1, 1, 9]
// ];

// hata var
// var question = [
//     [1, 1, 1, 1, 1],
//     [1, 1, 0, 1, 1],
//     [0, 0, 1, 1, 1],
//     [1, 1, 1, 1, 9]
// ];

// var question = [
//   [1, 0, 1, 1, 1],
//   [1, 1, 1, 0, 1],
//   [1, 0, 1, 9, 1],
//   [1, 1, 1, 1, 0]
// ]
// Hedef: 2, 3
// 0, 2, 3, 4
// 0, 1, 2, 4
// 0, 2, 3, 4
// 0, 1, 2, 3
const selected = question.slice(0).reduce((r, row, rowIndex, arr) => {
    const index = row.findIndex(item => item === 9);
    return index > -1 ? (arr.splice(1), {
        row: rowIndex,
        column: index
    }) : {}
}, {});
const cleared = question.map(row => row.reduce((r, v, i) => v >= 1 ? (r.push(i), r) : r, []));
let matched = false;
let path = [];
let reset = false;
const found = (rowIndex, columnIndex) => {
    return path.findIndex(item => item[0] === rowIndex && item[1] === columnIndex) >= 0;
};
const nextStep = (rowIndex, columnIndex, step) => {
    console.log(rowIndex, columnIndex, step);
    if (rowIndex === 0 && columnIndex === 0) {
        matched = true;
        return step;
    }
    if (!matched) {
        if (columnIndex - 1 >= 0) {
            if (isExist(rowIndex, columnIndex - 1) && !found(rowIndex, columnIndex-1)) { // no parent && left exist
                path.push([rowIndex, columnIndex - 1]);
                step = nextStep(rowIndex, columnIndex - 1, ++step);
            } else {
                // path.splice(-1, step - 1);
                // path.splice(-1, 1);
                reset = false;
            }
        } else {
            --step;
            // path.splice(-1, 1);
        }
    }
    if (!matched) {
        if (rowIndex - 1 >= 0) {
            if (isExist(rowIndex - 1, columnIndex)) { // parent exist
                if (reset) {
                    // path.push([rowIndex + 1, columnIndex], [rowIndex, columnIndex]);
                    let index = path.findIndex(item => item[0] === rowIndex && item[1] === columnIndex);
                    path = path.splice(0, index + 1);
                    // path.push([rowIndex, columnIndex]);
                }
                path.push([rowIndex - 1, columnIndex]);
                step = nextStep(rowIndex - 1, columnIndex, ++step);
            } else {

                reset = true;
            }
        } else {
            --step;
        }
    }
    if (!matched) {
        if (isExist(rowIndex, columnIndex + 1) && !found(rowIndex, columnIndex+1)) { // no parent && left exist
            path.push([rowIndex, columnIndex + 1]);
            step = nextStep(rowIndex, columnIndex + 1, ++step);
        }
    }





    return step;
};
const isExist = (rowIndex, columnIndex) => cleared[rowIndex].includes(columnIndex);
// const isExist = (rowIndex, columnIndex) => question[rowIndex][columnIndex];
const total = nextStep(selected.row, selected.column, 0, []);
console.log(selected, cleared);
console.log("total: ", total, "path: ", path);
