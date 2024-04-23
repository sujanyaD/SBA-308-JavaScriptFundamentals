// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];

//     return result;
//   }

//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//   console.log(result);

// {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores
// } 

//
function getLearnerData(courseinfo, ag, submissions) {
    //checking if course id is valid not not using if condition with notequal operator and in try catch block.
    if (ag.course_id != courseinfo.id) {
        throw "input was Invalid";
        return;
    }
    try {
        let result = [];
        // getting distinct learner id from all the exixting ids
        const distinctlearnerids = [...new Set(submissions.map(itm => itm.learner_id))];
        // iterating trough learner-id,s.
        for (let k = 0; k < distinctlearnerids.length; k++) {
        let pointspossArr = [];
        let scoresArr = [];
        let assignmentidsArr = [];
        // filtered using Learner_id from learners submittions and created new array
        let filteredSubmissions = submissions.filter(a => a.learner_id == distinctlearnerids[k])
        //using for in to loop through filteredSubmssions array
        for (item in filteredSubmissions) {
            let obj = filteredSubmissions[item]
            let score = obj.submission.score;
            //creating a new variable for storing assignment ID
            let assignmentid = obj.assignment_id;
            //creating a new variable to store submited_at from submission object.
            let submittedAt = obj.submission.submitted_at;

            // filterning points possible by assignmentid 
            let assignmentGroup = ag.assignments.filter(a => a.id == assignmentid)
            // looping through assignment group array
            for (i = 0; i < assignmentGroup.length; i++) {
                //getting object from array elements
                let obj2 = assignmentGroup[i]
                let pointspossible = obj2.points_possible;

                let dueat = obj2.due_at;
                let today = new Date();
                //checking due date with current date /todays date
                //using split thod formatted date .
                if (today.toISOString().split('T')[0] >= dueat) {
                    // pushed all the points possible in points possible array.
                    pointspossArr.push(pointspossible)
                    // created an empty object.
                    let newobj2 = {}
                    newobj2.id = assignmentid;
                    let weightedavgscore = 0;
                    // check if submitted at due date , for late submission deduct 10%.and caluculating deduction.
                    if (submittedAt > dueat) {
                        let pointspossibleDeduction = (pointspossible * 10) / 100;
                        //1: 0.94, // 47 / 50
                        weightedavgscore = (score - pointspossibleDeduction) / pointspossible;
                        scoresArr.push(score - pointspossibleDeduction);
                    }
                    else {
                        weightedavgscore = score / pointspossible;
                        //pushed all the scores in scoresarray
                        scoresArr.push(score)
                    }
                    //pushing weigted averarage scode along with id into newob2
                    newobj2.value = weightedavgscore;
                    //pushed into new array.
                    assignmentidsArr.push(newobj2);

                }
            }

        }

        //const sumOfPointspossArr = pointspossArr.reduce((a, b) => a + b, 0);
        // const scoresArrsum = scoresArr.reduce((a, b) => a + b, 0);
        //caluclating for sum of scores 
        let sumOfscores = sumOfArray(scoresArr)
        console.log(`scores Array:${scoresArr}`)
        console.log(`Sum of all the scores:${sumOfscores}`)
        // caluculating sum for posints possible
        let sumOfPointsPossible = sumOfArray(pointspossArr)
        console.log(`points possible array:${pointspossArr}`)
        console.log(`sum of all POints Possible:${sumOfPointsPossible}`)
        // caluculating average 
        let avg = sumOfscores / sumOfPointsPossible
        console.log(`Average for Learner-id-125: ${avg}`)
        // creating an empty object for entire object.
        let resultobj = {};
        resultobj.id = distinctlearnerids[k];// learner_id
        resultobj.avg = avg;
        for (j = 0; j < assignmentidsArr.length; j++) {
            let obj3 = assignmentidsArr[j];
            let id = obj3.id;
            resultobj[id] = obj3.value;
        }
        result.push(resultobj);
    }
        return result; // returning entire output in result array
    }
    catch (err) {
        return err.name;
    }

}
function sumOfArray(arr) {
    // initalize sum S
    let s = 0;
    // iterating through alla elements
    for (let i = 0; i < arr.length; i++) {
        // adding them to sum
        s = s + arr[i];
    }
    return s;
}
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions))










