export const calculateBmi = (h: number, w: number): object => {
  const sq: number = (h / 100) * (h / 100);
  const bmi: number = w / sq;
  let result = "";

  if (isNaN(Number(h)) || isNaN(Number(w))) {
    return { error: "malformatted parameters" };
  }

  if (bmi < 16) {
    result = "Underweight (Severe thinness)";
  } else if (bmi >= 16 && bmi < 17) {
    result = "Underweight (Moderate thinness)";
  } else if (bmi >= 17 && bmi < 18.5) {
    result = "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25) {
    result = "Normal range";
  } else if (bmi >= 25 && bmi < 30) {
    result = "Overweight (Pre-obese)";
  } else if (bmi >= 30 && bmi < 35) {
    result = "Obese (Class I)";
  } else if (bmi >= 35 && bmi < 40) {
    result = "Obese (Class II)";
  } else if (bmi >= 40) {
    result = "Obese (Class III)";
  }

  return {
    weight: w,
    height: h,
    bmi: result,
  };
};
