export function estimateBodyFat({ waistCm, weightKg, heightCm, age, sex = 'male' }) {
  if (!waistCm || !weightKg || !heightCm || !age) return null;
  // Navy + Deurenberg hybrid: simple estimate for male over 40
  // BF% ≈ 495/(1.0324 -0.19077*log10(waist - neck) +0.15456*log10(height)) -450 ; neck approx 38cm avg
  // Fallback: BMI based Deurenberg: BF% = 1.2*BMI +0.23*age -10.8*sex -5.4
  const bmi = weightKg / ((heightCm/100)**2);
  const bf = 1.2 * bmi + 0.23 * age - 10.8 * (sex === 'male' ? 1 : 0) - 5.4;
  // Blend with waist-to-height
  const wht = waistCm / heightCm;
  const whtAdj = (wht - 0.5) * 30; // +1% per 0.033 wht
  const est = Math.max(6, Math.min(42, Math.round((bf * 0.7 + (bf + whtAdj) * 0.3) * 10) / 10));
  return est;
}
export function whtCategory(wht) {
  if (wht < 0.5) return { key: 'ok', color: '#7FB069' };
  if (wht < 0.6) return { key: 'at', color: '#D9B34C' };
  return { key: 'high', color: '#C1440E' };
}
