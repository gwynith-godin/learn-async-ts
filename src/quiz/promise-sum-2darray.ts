const array2D_1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// sum one row of the 2D array
// then do promise.all() to colate the sums together
function sumOfArray(arr: number[][], rowIdx: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if(arr.length > rowIdx ) {
            let sum = 0;
            for(let i = 0; i < arr[rowIdx].length; i++) {
                sum += arr[rowIdx][i];
            }
            resolve(sum);  
        }
        else {
            // reject the index out of bounds
            // optimize further by putting this inside a setTimer()
            reject(`Row Index ${rowIdx} must be within 0 and ${arr.length}`);
        }
    });
}


async function sumAll(numArr: number[][]){
    if (numArr.length === 0) {
        throw 'Cannot calculate sum of an empty array';
    }
    const rowSumPromises = [];
    for (let x = 0; x < numArr.length; x++) {
        rowSumPromises.push(sumOfArray(numArr, x));
    }

    try{
        const rowSums = await Promise.all(rowSumPromises)
            let sum = 0;
            rowSums.forEach(rowSum => {
                sum += rowSum;
            });
            console.log(`Sum = ${sum}`);
            return 'done';
    } catch(error){
        console.log(`Error Msg: ${error}`)
        return 'failed';
    } ;
}

sumAll(array2D_1).then((status)=>console.log(status))
sumAll([]).catch((error) => console.log(error));