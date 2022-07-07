import stateTaxRates from "../constants/stateTaxRates";

export const parse = (number) => {
  const parsed = parseFloat(parseFloat(number).toFixed(2));
  return parsed;
}

export const formatDollars = (money) => {
  if (money >= 0) {
    const positiveFormat = "$" + (money).toLocaleString("en-US");
    return positiveFormat;
  } else {
    const negativeFormat = "-$" + (Math.abs(money)).toLocaleString("en-US");
    return negativeFormat;
  }
}

export const getAssetTotal = (checking, savings, realEstate, crypto, retirement, ira, investments, car) => {
  const totalAssets = parse(checking + savings + realEstate + crypto + retirement + ira + investments + car);
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

export const getMonthlySavingsTotal = (cash, retirement, ira, brokerage) => {
  const totalSavings = parse(cash + retirement + ira + brokerage);
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

export const getIdealHousing = (monthlyNet) => {
  const idealHousing = parse(monthlyNet * .3);
  return idealHousing;
}

export const getNeedsValue = (monthlyNet) => {
  const fiftyPercent = parse(monthlyNet * .5);
  return fiftyPercent; 
}

export const getWantsValue = (monthlyNet) => {
  const thirtyPercent = parse(monthlyNet * .3);
  return thirtyPercent;
}

export const getInvestValue = (monthlyNet) => {
  const twentyPercent = parse(monthlyNet * .2);
  return twentyPercent;
}

export const getEmployerMatch = (monthlyNet, monthlyRetirement, employerMatchPercent) => {
  const employerMax = parse(monthlyNet * (employerMatchPercent / 100));
  const employerMatchAmount = employerMax >= monthlyRetirement ? monthlyRetirement : employerMax; 
  return employerMatchAmount;
}

export const getMaxEmployerMatch = (monthlyNet, employerMatchPercent) => {
  const employerMax = parse(monthlyNet * (employerMatchPercent / 100));
  return employerMax;
}

export const getSavingsContributions = (age, checking, idealChecking, savings, emergencySavings, monthlyNet, needsTotal, idealInvest, employerPlan) => {
  const retirementMaxPerMonth = 1708.33;
  const fiftyMaxPerMonth = 2250;
  const iraMaxPerMonth = 500;
  const fiftyIraMaxPerMonth = 583.33;
  let cash = 0;
  let retirement = 0;
  let ira = 0;
  let brokerage = 0;

  if (monthlyNet > needsTotal) {
    const planBool = employerPlan !== 'No';
    const availableFunds = monthlyNet - needsTotal;
    const checkAccountDif = (checking + savings) - (idealChecking + emergencySavings); 
    const accountDif = checkAccountDif >= 0 ? 0 : Math.abs(checkAccountDif);
    const retirementMax = age >= 50 ? fiftyMaxPerMonth : retirementMaxPerMonth;
    const iraMax = age >= 50 ? fiftyIraMaxPerMonth : iraMaxPerMonth;
    let funds = availableFunds > idealInvest ? idealInvest : availableFunds;
    if (planBool) {
      cash = (funds - accountDif) >= 0 ? accountDif : funds;
      funds -= cash;
      retirement = (funds - retirementMax) >= 0 ? retirementMax : funds;
      funds -= retirement;
      ira = (funds - iraMax) >= 0 ? iraMax : funds;
      funds -= ira;
      brokerage = funds;
      return [cash, retirement, ira, brokerage];
    } else {
      cash = (funds - accountDif) >= 0 ? accountDif : funds;
      funds -= cash;
      ira = (funds - iraMax) >= 0 ? iraMax : funds;
      funds -= ira;
      brokerage = funds;
      return [cash, retirement, ira, brokerage];
    }
  } else {
    return [0, 0, 0, 0];
  }
}

// Income Tax Calculators - assumes W2 employee/single filer/standard deductions
export const getNetIncome = (state, income) => {

  const getMedicare = (income) => {
    const rate = .0145;
    const excessRate = .0235;
    const excessLimit = 200000;
    const maxUnderExcess = 2900;

    if (income > excessLimit) {
      const overage = income - excessLimit;
      const totalMedicare = (overage * excessRate) + maxUnderExcess;
      return parseFloat((totalMedicare).toFixed(2));
    } else if (income > 0) {
      return parseFloat((income * rate).toFixed(2));
    } else {
      return 0;
    }
  }

  const getSocialSecurity = (income) => {
    const rate = .062;
    const taxableLimit = 147000;
    const max = 9114;

    if (income >= taxableLimit) {
      return max;
    } else if (income > 0){
      return parseFloat((income * rate).toFixed(2));
    } else {
      return 0;
    }
  }

  const getFedTax = (income) => {
    // tax rate: income level
    const fedTaxRates = {
      .37: 539900, .35: 215950, .32: 170050, .24: 89075, .22: 41775, .12: 10275, .1: 0
    }

    const getRate = (income) => {
      return Object.keys(fedTaxRates)
        .find(incomeLevel => fedTaxRates[incomeLevel] < income);
    }

    const getBracket = (income) => {
      return Object.values(fedTaxRates)
        .find(bracket => bracket < income);
    }

    const standardDeduction = 12950;
    let AGI = income - standardDeduction;
    let tax = 0;
    
    if (AGI > 0) {
      while (AGI > 0) {
        let rate = getRate(AGI);
        let bracketAmount = getBracket(AGI);
        let taxableIncome = AGI - bracketAmount;
        tax += parseFloat(rate * taxableIncome);
        AGI -= taxableIncome;
      }
      return parseFloat(tax.toFixed(2));
    } else {
      return 0;
    }
  }
  // state argument takes capitalized 2 digit state abbreviation - "DC" for Washington, DC
  const getStateTax = (state, income) => {
    
    const checkState = (state) => {
      return Object.keys(stateTaxRates)
        .includes(state);
    }

    const checkDeduction = (state) => {
      return Object.keys(stateTaxRates[state])
        .includes('deduction');
    }

    const getDeduction = (state) => {
      return Object.keys(stateTaxRates[state]['deduction'])
        .find(incomeLevel => stateTaxRates[state]['deduction'][incomeLevel] < income);
    }

    const getRate = (state, AGI) => {
      return Object.keys(stateTaxRates[state])
        .find(incomeLevel => stateTaxRates[state][incomeLevel] < AGI);
    }

    const getBracket = (state, AGI) => {
      return Object.values(stateTaxRates[state])
        .find(bracket => bracket < AGI);
    }

    const getTaxDC = (AGI) => {
      const milli = 1000000;
      const milliFlat = 91525;
      const milliRate = .1075;
      const fiveHund = 500000;
      const fiveFlat = 42775;
      const fiveRate = .0975;
      const twoFifty = 250000;
      const twoFlat = 19560;
      const twoRate = .0925;

      const getTax = (AGI, incomeLevel, rate, flat) => {
        const totalTax = ((AGI - incomeLevel) * rate) + flat;
        return parseFloat(totalTax.toFixed(2));
      }

      if (AGI > milli) {
        return getTax(AGI, milli, milliRate, milliFlat)
      } else if (AGI > fiveHund) {
        return getTax(AGI, fiveHund, fiveRate, fiveFlat);
      } else {
        return getTax(AGI, twoFifty, twoRate, twoFlat);
      }
    }

    let tax = 0;
    const stateCheck = checkState(state);
    const deductionCheck = stateCheck && checkDeduction(state);
    const standardDeduction = deductionCheck && getDeduction(state);
    let AGI = income - standardDeduction;
    let rate = stateCheck && getRate(state, AGI);
    
    if (state === 'DC' && AGI > 250000) {
      return getTaxDC(AGI);
    } else if (rate) {
      while (rate) {
        let bracketAmount = getBracket(state, AGI);
        let taxableIncome = AGI - bracketAmount;
        tax += parseFloat(rate * taxableIncome);
        AGI -= taxableIncome;
        rate = getRate(state, AGI);
      }
      return parseFloat(tax.toFixed(2));
    } else {
      return 0; 
    }
  }

  if (income > 0 && state.length === 2) {
    const medicare = getMedicare(income);
    const socialSecurity = getSocialSecurity(income);
    const federalTax = getFedTax(income);
    const stateTax = getStateTax(state, income);
    const totalTax = medicare + socialSecurity + federalTax + stateTax;
    const netIncome = Math.round(income - totalTax); 
    return netIncome;
  } else {
    return 0;
  }
}
