export const rateWork = (daily_exercises: number[], target: number): object => {
  const average: number =
    daily_exercises.reduce((curr, acc) => curr + acc) / daily_exercises.length;
  const success = average >= target ? true : false;

  let rating: number;
  let ratingDescription: string;

  if (average === 0) {
    rating = 0;
    ratingDescription = "nothing done";
  } else if (average > 0 && average <= target / 2) {
    rating = 1;
    ratingDescription = "bad";
  } else if (average > target / 2 && average < target) {
    rating = 2;
    ratingDescription = "not bad";
  } else {
    rating = 3;
    ratingDescription = "good";
  }

  console.log("av", average);

  if (!daily_exercises || !target || daily_exercises.length === 0) {
    return { error: "parameters missing" };
  }

  if (
    typeof target === "string" ||
    daily_exercises.filter((h) => typeof h === "string").length > 0
  ) {
    return { error: "malformatted parameters" };
  }

  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((h) => h !== 0).length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};
