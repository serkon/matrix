var question = [
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 9, 0]
];

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
const nextStep = (rowIndex, columnIndex, step, path) => {
    console.log(rowIndex, columnIndex, step, path);
    if (rowIndex === 0 && columnIndex === 0) {
        matched = true;
        return step;
    }
    if (!matched) {
        if (rowIndex - 1 >= 0) {
            if (isExist(rowIndex - 1, columnIndex)) { // parent exist
                path.push([rowIndex - 1, columnIndex]);
                step = nextStep(rowIndex - 1, columnIndex, ++step, path);
            } else {
            }
        } else {
            --step;

        }
    }
    if (!matched) {
        if (columnIndex - 1 >= 0) {
            if (isExist(rowIndex, columnIndex - 1)) { // no parent && left exist
                path.push([rowIndex, columnIndex - 1]);
                step = nextStep(rowIndex, columnIndex - 1, ++step, path);
            } else {
                path.splice(-1, 1);
            }
        } else {
            --step;
            path.splice(-1, 1);
        }
    }
    return step;
};
const isExist = (rowIndex, columnIndex) => cleared[rowIndex].includes(columnIndex);
// const isExist = (rowIndex, columnIndex) => question[rowIndex][columnIndex];
const total = nextStep(selected.row, selected.column, 0, []);
console.log(selected, cleared);
console.log("total: ", total);
