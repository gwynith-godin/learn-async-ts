const array2D_3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

function negsPerRow(arr: number[][], rowIdx: number): Promise<string> {
    return new Promise((resolve, reject) => {
        if(arr.length > rowIdx ) {
            arr[rowIdx].filter((e) => {
                return e < 0;
            }).length > 0 ? resolve(`Found Evidence : ${arr[rowIdx]}`) : reject('Not Found')
        }
        else {
            reject(`Row Index ${rowIdx} must be within 0 and ${arr.length}`);
        }
    });
}

async function getNegs(numArr: number[][]) {
    if (numArr.length === 0) {
        throw 'Cannot calculate negatives of an empty array';
    }
    
    const negsPromises = [];
    for (let x = 0; x < numArr.length; x++) {
        negsPromises.push(negsPerRow(numArr, x).catch(() => null)); // catch errors locally
    }

    try {
        const rowNegs = await Promise.all(negsPromises);
        const rowsWithNegs = rowNegs.filter(row => row !== null); // remove nulls
        if (rowsWithNegs.length > 0) {
            // rows with negatives
            console.log(`${rowsWithNegs}`);
        } else {
            console.log('No rows with negatives found');
        }
        return 'done';
    } catch (error) {
        console.log(`Error: ${error}`);
        return 'failed';
    }
}

getNegs(array2D_3).then((status)=>console.log(status))
getNegs([]).catch((error) => console.log(error));
