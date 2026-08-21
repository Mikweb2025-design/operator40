/* BMI + simple nutrition guidance (informational, not medical) */

export function calcBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  if (h <= 0) return null;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

export function bmiCategory(bmi) {
  if (bmi == null) return null;
  if (bmi < 18.5) return { key: 'under', color: '#9DB85A' };
  if (bmi < 25) return { key: 'ok', color: '#6FA75F' };
  if (bmi < 30) return { key: 'over', color: '#D9B34C' };
  return { key: 'obese', color: '#C1440E' };
}

export function estimateTDEE(weightKg, heightCm, age, activity = 1.35) {
  // Mifflin-St Jeor, male default (over-40 male target) + activity factor light
  if (!weightKg || !heightCm || !age) return null;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  return Math.round(bmr * activity);
}

export function simpleMealHint(goal) {
  // goal: 'cut' | 'maintain' | 'tone'
  const hints = {
    cut: { it: 'Deficit leggero ~300 kcal, proteine 1.8g/kg, verdure + camminata.', en: 'Small deficit ~300 kcal, protein 1.8g/kg, veg + walk.', de: 'Leichtes Defizit ~300 kcal, Protein 1,8g/kg, Gemüse + Gehen.' },
    maintain: { it: 'Mantieni TDEE, proteine 1.6g/kg, 3 pasti regolari.', en: 'Maintain TDEE, protein 1.6g/kg, 3 regular meals.', de: 'TDEE halten, Protein 1,6g/kg, 3 regelmäßige Mahlzeiten.' },
    tone: { it: 'Leggero surplus + forza, proteine 1.8g/kg.', en: 'Small surplus + strength, protein 1.8g/kg.', de: 'Leichter Überschuss + Kraft, Protein 1,8g/kg.' },
  };
  return hints[goal] || hints.cut;
}
