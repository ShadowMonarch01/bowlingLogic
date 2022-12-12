{/*
    Frame 1 roll: 8 0
    Frame 2 roll: 1 9
    Frame 3 roll: 4 0
    Frame 4 roll: 9 0
    Frame 5 roll: 10
    Frame 6 roll: 9 1
    Frame 7 roll: 4 2
    Frame 8 roll: 0 3
    Frame 9 roll: 5 5
    Frame 10 roll: 9 1 8
    Your score: 115
*/}

// Require package to get user input
const readline = require('readline')

//global state array
var arr = []

// Initialize it
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Getting user input
function question(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}

const verifyInput = (frame, input) => {
    s = input.split(' ')
    lgth = s.length
    //check if its frame 10
    if (frame < 10 && lgth == 2) {
        var num = s.map(function (str) {
            if (str === '' || str === '-') {
                return 0
            }
            return parseInt(str)
        })

        if (num[0] + num[1] <= 10) {
            return num
        }
        return 'Error in scroes Inputed'
    }
    if (frame === 10) {
        var num = s.map(function (str) {
            if (str === '') {
                return 0
            }
            return parseInt(str)
        })

        if (lgth === 2) {
            if (num[0] + num[1] <= 10) {
                return num
            }
            return 'Error in scroes Inputed'
        }

        if (lgth === 3) {

            if (num[0] + num[1] === 10 && num[0] !== 10 && num[1] !== 10) {
                return num
            }
            else if (num[0] + num[1] === 10 && num[0] === 0 && num[1] === 10) {
                return num
            }

            return 'Error in scroes Inputed'
        }

        if (lgth === 4) {
            if (num[0] + num[1] === 10 && num[0] === 10 && num[1] === 0) {
                return num
            }
            return 'Error in scroes Inputed'
        }
        return 'Error in scroes Inputed'
    }
    return 'Error in scroes Inputed Possibly Lenght error'
}


const CalculateScore = () => {
    let score = 0
    for (var i = 0; i <= 9; i++) {
        // If its not the 10th frame
        if (i !== 9) {
            if (arr[i][0] + arr[i][1] !== 10) {
                score += arr[i][0] + arr[i][1]
            }
            //spear both add up to 10
            else if (arr[i][0] + arr[i][1] === 10 && arr[i][0] !== 0 && arr[i][1] !== 0) {
                if (arr[i + 1][0] !== 0) {
                    score += arr[i][0] + arr[i][1] + arr[i + 1][0]
                }
                else if (arr[i + 1][0] === 0 && arr[i + 1][1] !== 0) {
                    score += arr[i][0] + arr[i][1] + arr[i + 1][1]
                }
                else if (arr[i + 1][0] === 0 && arr[i + 1][1] === 0) {
                    score = score
                }
            }
            // SPear 0 and 10
            else if (arr[i][0] + arr[i][1] === 10 && arr[i][0] === 0 && arr[i][1] === 10) {
                if (arr[i + 1][0] !== 0) {
                    score += arr[i][0] + arr[i][1] + arr[i + 1][0]
                }
                else if (arr[i + 1][0] === 0 && arr[i + 1][1] !== 0) {
                    score += arr[i][0] + arr[i][1] + arr[i + 1][1]
                }
                else if (arr[i + 1][0] === 0 && arr[i + 1][1] === 0) {
                    score = score
                }
            }
            // Strike 10 and 0
            else if (arr[i][0] + arr[i][1] === 10 && arr[i][0] === 10 && arr[i][1] === 0) {
                // Next frame is a strike and the frame after that could be a strike strike 
                if (arr[i + 1][0] === 10 && arr[i + 2][0] !== 10 && i + 1 !== 9) { // i+1 checks if its the 9th frame
                    score += arr[i][0] + arr[i + 1][0] + arr[i + 2][0]
                }

                // Next frame is a strike but its the 10th frame
                else if (arr[i + 1][0] === 10 && i + 1 === 9) { // i+1 checks if its the 9th frame
                    score += arr[i][0] + arr[i + 1][0] + arr[i + 1][2]
                }

                // Next frame is not a strike
                else if (arr[i + 1][0] !== 10) {
                    score += arr[i][0] + arr[i][1] + arr[i + 1][0] + arr[i + 1][1]
                }

            }
        }
        if (i === 9) {
            let count = arr[i].length
            //Normal
            if (count === 2) {
                score += arr[i][0] + arr[i][1]
            }
            //SPear
            if (count === 3) {
                score += arr[i][0] + arr[i][1] + arr[i][2]
            }
            //Strike
            if (count === 4) {
                score += arr[i][0] + arr[i][1] + arr[i][2] + arr[i][3]
            }
        }

    }

    return score
}


const main = async () => {

    for (let i = 1; i <= 10; i++) {
        const input = await question(`Frame ${i} roll: `)
        const output = verifyInput(i, input)
        if (output === 'Error in scroes Inputed') {
            console.log(`Error in scroes Inputed on Frame: ${i}`)
            break
        }
        else if (output === 'Error in scroes Inputed Possibly Lenght error') {
            console.log("Error in scroes Inputed Possibly Lenght error, if the frame has a single score represent the other score with either a '-', 0 or a space ")
        }
        arr.push(output)
    }

    if (arr.length === 10) {
        const score = CalculateScore()
        console.log("Your Score: ", score)

        // console.log(arr)
    }

    rl.close()
}

main();

