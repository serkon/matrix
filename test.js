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

var question = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 1, 1],
    [1, 1, 1, 9, 1]
];
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
const nextStep = (rowIndex, columnIndex, route) => {
    console.log('--#', rowIndex, columnIndex);
    path.push([rowIndex, columnIndex]);
    if (rowIndex === 0 && columnIndex === 0) {
        matched = true;
    }

    let remove = 0;
    // left
    if (!matched) {
        if (isExist(rowIndex, columnIndex - 1)) {
            if (!found(rowIndex, columnIndex - 1)) {
                nextStep(rowIndex, columnIndex - 1);
            }
        }
    }
    // parent
    if (!matched) {
        if (isExist(rowIndex - 1, columnIndex)) {
            if (!found(rowIndex - 1, columnIndex)) {
                nextStep(rowIndex - 1, columnIndex);
            }
        }
    }
    // right
    if (!matched) {
        if (isExist(rowIndex, columnIndex + 1)) { // no parent && left exist
            if (!found(rowIndex, columnIndex + 1)) {
                nextStep(rowIndex, columnIndex + 1);
            }
        }
    }

    if (!matched) {
        let index = path.findIndex(item => item[0] === rowIndex && item[1] === columnIndex);
        path.splice(index, 1);
    }

    console.log('remove: ', remove, ' index: ', rowIndex, columnIndex);
};
const found = (rowIndex, columnIndex) => {
    return path.findIndex(item => item[0] === rowIndex && item[1] === columnIndex) >= 0;
};
const isExist = (rowIndex, columnIndex) => cleared[rowIndex].includes(columnIndex);
// const isExist = (rowIndex, columnIndex) => question[rowIndex][columnIndex];
const total = nextStep(selected.row, selected.column, [selected.row, selected.column]);
console.log(selected, cleared);
console.log("total: ", total, "path: ", path);

