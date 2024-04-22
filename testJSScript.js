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

function getLearnerData(course, ag, submissions) {
    let result = [];

    let filteredSubmissions = submissions.filter((a) => { if (a.learner_id == 125) { return a } });
    let pointspossArr = [];
    let scoresArr = [];
    let assignmentidsArr = [];
    for (itm in filteredSubmissions) {
        let obj = filteredSubmissions[itm];
        let score = obj.submission.score;
        let assignmentid = obj.assignment_id;
        let submittedat = obj.submission.submitted_at;

        let filteredag = ag.assignments.filter((a) => { if (a.id == assignmentid) { return a } });
        for (itm in filteredag) {
            let objAg = filteredag[itm];
            let dueat = objAg.due_at;
            let pointspossible = objAg.points_possible;
            let today = new Date();

            if (today.toISOString().split('T')[0] >= dueat) {

                pointspossArr.push(pointspossible);
                scoresArr.push(score);
                let newObj = {}
                newObj.id = assignmentid;
                let weighteavgscore = 0.0;
                if (submittedat > dueat) {
                    pointspossiblededuction = (pointspossible * 10) / 100;
                    weighteavgscore = (score - pointspossiblededuction) / pointspossible;
                }
                else{
                    weighteavgscore = score / pointspossible;
                }
                newObj.value = weighteavgscore;

                assignmentidsArr.push(
                    newObj
                );
            }

        }

    }
    const sumpointspossArr = pointspossArr.reduce((a, b) => a + b, 0);
    const scoresArrsum = scoresArr.reduce((a, b) => a + b, 0);

    let avg = scoresArrsum / sumpointspossArr
    console.log(pointspossArr);
    console.log(scoresArr);

    console.log()
    console.log(avg);
    console.log(assignmentidsArr);
    console.log(assignmentidsArr[0].id);

    // const object3 = {...object1, ...object2 }
    let resultObj = {};
    resultObj.id = 125 //learner_id
    resultObj.avg = avg

    // let retObjArr = [];
    for (i = 0; i < assignmentidsArr.length; i++) {
        let ob = assignmentidsArr[i];
        const keys = Object.keys(ob);
        let retObj = {};
        let obval = ob.value;
        resultObj[key] = keys[0];
        // retObjArr.push(retObj);
    }

    return resultObj;

}
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));