export const parse = (number) => {
  const parsed = parseFloat(parseFloat(number).toFixed(2));
  return parsed;
}

export const formatDollars = (money) => {
  if (money >= 0) {
    const positiveFormat = "$" + money.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    return positiveFormat;
  } else {
    const negativeFormat = "-$" + Math.abs(money).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    return negativeFormat;
  }
}

export const getAssetTotal = (checking, savings, realEstate, crypto, retirement, ira, publicEquity, privateEquity, rsu, car) => {
  const totalAssets = parse(checking + savings + realEstate + crypto + retirement + ira + publicEquity + privateEquity + rsu + car);
  return totalAssets;
}

export const getLiabilityTotal = (creditCards, studentLoans, mortgage, car) => {
  const totalLiabilities = parse(creditCards + studentLoans + mortgage + car);
  return totalLiabilities;
}

export const getNetWorth = (totalAssets, totalLiabilities) => {
  const netWorth = parse(totalAssets - totalLiabilities);
  return netWorth;
}

export const getMonthlyIncome = (income) => {
  const monthlyIncome = parse(income / 12);
  return monthlyIncome;
}

export const getNecessaryMonthlyTotal = (rent, health, food, studentLoan, car) => {
  const totalNecessary = parse(rent + health + food + studentLoan + car);
  return totalNecessary;
}

export const getExtraMonthlyTotal = (travel, shopping, dining, other) => {
  const totalAdditional = parse(travel + shopping + dining + other);
  return totalAdditional;
}

export const getMonthlySavingsTotal = (cash, retirement, ira, brokerage, crypto, rsu) => {
  const totalSavings = parse(cash + retirement + ira + brokerage + crypto + rsu);
  return totalSavings;
}

export const getCombinedMonthlyTotal = (necessary, savings, additional) => {
  const monthlyTotal = parse(necessary + savings + additional);
  return monthlyTotal;
}

export const getMonthlyNet = (monthlyPostTax, totalMonthlyExpenses) => {
  const monthlyNet = parse(monthlyPostTax - totalMonthlyExpenses);
  return monthlyNet;
}

export const getIdealChecking = (monthlyEmergency) => {
  const idealChecking = parse(monthlyEmergency * 1.3);
  return idealChecking;
}

export const getDifference = (current, ideal) => {
  const difference = parse(current - ideal);
  return difference;
}

export const getIdealSavings = (emergencyMonths, monthlyEmergency) => {
   const idealSavings = parse(emergencyMonths * monthlyEmergency);
  return idealSavings;
}

export const getIdealHousing = (monthlyNet, monthlyPostRetirement, idealSave, maxOrMatchInput) => {
  const idealHousing = parse(monthlyNet * .3);
  const overNetHousing = parse(monthlyPostRetirement * .4);
  const net20 = parse(monthlyNet * .2);
  // const maxCheck = maxOrMatchInput === 'Max';

  if (idealSave > net20) {
    return overNetHousing;
  } else {
    return idealHousing;
  }
}

export const getNeedsValue = (monthlyNet, monthlyPostRetirement, idealSave, maxOrMatchInput) => {
  const fiftyPercent = parse(monthlyNet * .5);
  const overNetFifty = parse(monthlyPostRetirement * .6);
  const net20 = parse(monthlyNet * .2);
  // const maxCheck = maxOrMatchInput === 'Max';

  if (idealSave > net20) {
    return overNetFifty;
  } else {
    return fiftyPercent;
  } 
}

export const getWantsValue = (monthlyNet, monthlyPostRetirement, idealSave, maxOrMatchInput) => {
  const thirtyPercent = parse(monthlyNet * .3);
  const overNetThirty = parse(monthlyPostRetirement * .4);
  const net20 = parse(monthlyNet * .2);
  // const maxCheck = maxOrMatchInput === 'Max';

  if (idealSave > net20) {
    return overNetThirty;
  } else {
    return thirtyPercent;
  } 
}

export const getInvestValue = (monthlyNet, monthlyGross, employerPlan, maxOrMatch, currentContribution, cashDif, age) => {
  const retirementMax = 1708.33;
  const fiftyMax = 2250;
  const actualMax = age >= 50 ? fiftyMax : retirementMax;
  const twentyPercentNet = parse(monthlyNet * .2);
  const twentyPercentGross = parse(monthlyGross * .2);
  const maxContribution = currentContribution < twentyPercentGross ? currentContribution : twentyPercentGross;
  const netOrMax = maxContribution < twentyPercentNet ? twentyPercentNet : maxContribution;
  const planCheck = employerPlan !== 'No' && employerPlan !== 'Roth';

  if (planCheck && maxOrMatch === 'Max' && cashDif >= 0) {
    return actualMax >= twentyPercentGross ? twentyPercentGross : actualMax <= twentyPercentNet ? twentyPercentNet : actualMax;
  } else if (planCheck && cashDif >= 0) {
    return netOrMax;
  } else {
    return twentyPercentNet;
  }
}

// Needs to return actual pretax amount, max amount, and employer match amount 
export const getPreTaxRetirement = (grossIncome, employerPlan, employerMatch, maxOrMatch, age, retirementDollars, retirementPercent) => {
  if (employerPlan !== 'Roth' && employerPlan !== 'No' && maxOrMatch !== 'No') {
    const annualRetirementMax = 20500;
    const fiftyMax = 27000;
    const actualMax = age >= 50 ? fiftyMax : annualRetirementMax;
    const percentContribution = parse(grossIncome * (retirementPercent/100));
    const currentContribution = retirementDollars > 0 ? parse(retirementDollars * 12) : percentContribution;
    const annualPreTaxContribution = currentContribution <= actualMax ? currentContribution : actualMax;
    const maxEmployerMatch = parse((employerMatch/100) * grossIncome);
    const actualEmployerMatch = annualPreTaxContribution >= maxEmployerMatch ? maxEmployerMatch : annualPreTaxContribution;
    return [annualPreTaxContribution, actualEmployerMatch, actualMax, maxEmployerMatch];
  } else {
    return [0,0,0,0];
  }
}

export const getPostTaxRetirement = (monthlyNetIncome, employerPlan, employerMatch, maxOrMatch, age, retirementDollars, retirementPercent) => {
  if (employerPlan === 'Roth' && maxOrMatch !== 'No') {
    const retirementMax = 1708.33;
    const fiftyMax = 2250;
    const actualMax = age >= 50 ? fiftyMax : retirementMax;
    const percentContribution = parse(monthlyNetIncome * (retirementPercent/100));
    const currentContribution = retirementDollars > 0 ? parse(retirementDollars) : percentContribution;
    const monthlyPostTaxContribution = currentContribution <= actualMax ? currentContribution : actualMax;
    const maxEmployerMatch = parse((employerMatch/100) * monthlyNetIncome);
    const actualEmployerMatch = monthlyPostTaxContribution >= maxEmployerMatch ? maxEmployerMatch : monthlyPostTaxContribution;
    return [monthlyPostTaxContribution, actualEmployerMatch, maxEmployerMatch];
  } else {
    return [0,0,0];
  }
}
