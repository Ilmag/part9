interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (a: number[], t: number): Result => {
  const periodLength = a.length;
  const trainingDays = a.filter((d) => d !== 0).length;
  const hours = a.reduce((curr, acc) => curr + acc);
  const average = hours / a.length;
  const success = average >= t ? true : false;

  let rating: number;
  let ratingDescription: string;

  if (average === 0) {
    rating = 0;
    ratingDescription = "nothing done";
  } else if (average > 0 && average <= t / 2) {
    rating = 1;
    ratingDescription = "bad";
  } else if (average > t / 2 && average < t) {
    rating = 2;
    ratingDescription = "not bad";
  } else {
    rating = 3;
    ratingDescription = "good";
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: t,
    average: average,
  };
};

const checkExercises = () => {
  const target = Number(process.argv[2]);
  const exHours = process.argv.slice(3).map((h) => Number(h));
  if (isNaN(exHours.reduce((curr, acc) => curr + acc))) {
    console.log("arguments must be numbers");
  } else if (target === 0) {
    console.log("target must be greater then 0");
  } else {
    console.log(calculateExercises(exHours, target));
  }
};

checkExercises();
