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
    let pointspossArr = [];
    let scoresArr = [];
    let assignmentidsArr = [];
    // filtered using Learner_id from learners submittions and created new array
    let filteredSubmissions = submissions.filter(a => a.learner_id == '125')
    //using for in to loop through filteredSubmssions array

    for (item in filteredSubmissions) {
        let obj = filteredSubmissions[item]
        let score = obj.submission.score;

        //pushed all the scores in scoresarray
        scoresArr.push(score)
        let assignmentid = obj.assignment_id;

// filtering  assignment group array for points_possible 

        let filterAssignmentGroup = ag.assignments.filter(a => a.id == assignmentid)
        // the learner scored on the assignment (submission.score / points_possible)
        console.log(filterAssignmentGroup)
    }


    let sumOfscores = sumOfArray(scoresArr)
    console.log(`scores Array:${scoresArr}`)
    console.log(`Sum of all the scores:${sumOfscores}`)
    return filteredSubmissions;
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










