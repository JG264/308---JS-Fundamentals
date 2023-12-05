//  JavaScript Fundamentals

//////////////////////////////////
//  JavaScript Fundamentals

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
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    if (CourseInfo.id !== AssignmentGroup.course_id) {
      throw new DataError("Course and Assignment id don't match.");
    }
  
    const LearnerResult = [];
    const AllAssignments = AssignmentGroup.assignments;
  
    LearnerSubmissions.forEach((submission) => {
      const assignment = findAssignment(submission, AllAssignments);
  
      const today = new Date();
      if (new Date(assignment.due_at) < today) {
        const submittedDate = submission.submission.submitted_at;
        if (new Date(submittedDate) > new Date(assignment.due_at)) {
          submission.submission.score -= 0.1 * assignment.points_possible;
        }
  
        const learner = findLearner(submission.learner_id, LearnerResult);
  
        if (assignment.points_possible <= 0) {
          throw new Error("Assignment possible score is 0");
        } else {
          if (typeof submission.submission.score === "number" && typeof assignment.points_possible === "number") {
            learner[submission.assignment_id] = ((submission.submission.score / assignment.points_possible) * 100).toFixed(2);
            learner.total_score += submission.submission.score;
            learner.total_possible += assignment.points_possible;
          } else {
            throw new Error("Submission score or possible points data are not numbers");
          }
        }
      }
    });
  
    LearnerResult.forEach((learner) => {
      learner.avg = (learner.total_score / learner.total_possible).toFixed(2);
      delete learner.total_score;
      delete learner.total_possible;
    });
  
    return LearnerResult;
  }
  
  function findAssignment(submission, AllAssignments) {
    const assignment = AllAssignments.find((assign) => assign.id === submission.assignment_id);
  
    if (assignment) {
      return assignment;
    }
  
    throw new Error("Learner submission assignment id doesn't match assignment id in assignment group.");
  }
  
  function findLearner(id, LearnerArray) {
    const existingLearner = LearnerArray.find((learner) => learner.id === id);
  
    if (existingLearner) {
      return existingLearner;
    }
  
    const newLearner = {
      id,
      total_score: 0,
      total_possible: 0,
    };
  
    LearnerArray.push(newLearner);
    return newLearner;
  }
  
  const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  class DataError extends Error {
    constructor(message) {
      super(message);
      this.name = "DataError";
    }
  }
  
  try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
  
