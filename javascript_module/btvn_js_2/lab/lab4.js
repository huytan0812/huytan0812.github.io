let growth = [
    [5,8,9,16],
    [2,7,1,9],
    [5,6,8,12],
    [10,2,1,8],
    [20,4,9,1]
];

function averageGrowthQuarter(arr = []) {
    let results = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (isNaN(results[j])) {
                results[j] = 0;
            }

            results[j] += arr[i][j] / arr.length;
        }

    }

    return results;
}

let avgGrowthQuarter = averageGrowthQuarter(growth);

console.log(avgGrowthQuarter);

function averageGrowthYear(arr = []) {
    let results = [];

    for (let i = 0; i < arr.length; i++) {
        results[i] = 0;

        for (let j = 0; j < arr[i].length; j++) {
            results[i] += arr[i][j] / arr[i].length;
        }
    }

    return results;
}

let avgGrowthYear = averageGrowthYear(growth);

console.log(avgGrowthYear);

function averageGrowthLargestQuarter(arr = []) {
    let quartersGrowth = [];
    let largestQuarterGrowth = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (isNaN(quartersGrowth[j])) {
                quartersGrowth[j] = 0;
            }

            quartersGrowth[j] += arr[i][j] / arr.length;

            if (quartersGrowth[j] > largestQuarterGrowth) {
                largestQuarterGrowth = quartersGrowth[j];
            }
        }
    }

    return largestQuarterGrowth;
}

let avgLargestQuarterGrowth = averageGrowthLargestQuarter(growth);
console.log(avgLargestQuarterGrowth);

function averageGrowthLargestYear(arr = []) {
    let yearGrowth;
    let largestYearGrowth = 0;

    for (let i = 0; i < arr.length; i++) {
        yearGrowth = 0;

        for (let j = 0; j < arr[i].length; j++) {
            yearGrowth += arr[i][j];
        }

        if (yearGrowth / arr[i].length > largestYearGrowth) {
            largestYearGrowth = yearGrowth / arr[i].length;
        }
    }

    return largestYearGrowth;
}

let avgLargestYearGrowth = averageGrowthLargestYear(growth);
console.log(avgLargestYearGrowth);