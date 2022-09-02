import { parse } from "./NetWorthCalculators";

export const getSavingsContributions = (age, checking, idealChecking, savings, emergencySavings, monthlyNet, needsTotal, idealInvest, employerPlan, monthlyGross, maxOrMatch, employerMatch, currentContribution) => {
  const retirementMaxPerMonth = 1708.33;
  const fiftyMaxPerMonth = 2250;
  const iraMaxPerMonth = 500;
  const fiftyIraMaxPerMonth = 583.33;
  let cash = 0;
  let retirement = 0;
  let ira = 0;
  let brokerage = 0;

  if (monthlyNet > needsTotal) {
    const checkAccountDif = (checking + savings) - (idealChecking + emergencySavings);
    const accountDif = checkAccountDif >= 0 ? 0 : Math.abs(checkAccountDif);
    // returns true if there is a plan and they want to contribute
    const planBool = employerPlan !== 'No' && maxOrMatch !== 'No';
    // returns true if their plan is not a roth
    const preTaxBool = planBool && employerPlan !== 'Roth';
    // gross if plan is not roth, otherwise net
    const grossOrNet = preTaxBool ? monthlyGross : monthlyNet;
    // sets employerMatchAmount in case accountDif > 0
    const employerMatchAmount = parse(grossOrNet * (employerMatch/100));
    // 20% of grossOrNet if max, employerMatch if not
    const maxOrMatchMax = maxOrMatch === 'Max' ? parse(grossOrNet * .2) : employerMatchAmount;
    // sets max amount => currentContribution if 'Other', maxOrMatchMax if not
    const actualAmount = maxOrMatch === 'Other' ? currentContribution : maxOrMatchMax;
    const availableFunds = grossOrNet - needsTotal;
    const retirementMax = age >= 50 ? fiftyMaxPerMonth : retirementMaxPerMonth;
    const actualMax = retirementMax > actualAmount ? actualAmount : retirementMax;
    const iraMax = age >= 50 ? fiftyIraMaxPerMonth : iraMaxPerMonth;
    let funds = availableFunds > idealInvest ? idealInvest : availableFunds;
    // Added cash savings check to idealInvest function. Now if accountDif > 0, need to set retirement at least employerMatch
    //retirement = (funds - accountDif) < employerMatch ? employerMatch : 0;
    if (planBool && accountDif > 0) {
      retirement = (funds - accountDif) < employerMatchAmount ? employerMatchAmount : 0;
      funds -= retirement;
      cash = (funds - accountDif) >= 0 ? accountDif : funds;
      funds -= cash;
      retirement = retirement > 0 ? retirement : (funds - actualMax) >= 0 ? actualMax : funds;
      funds = funds > retirement ? (funds - retirement) : 0;
      ira = (funds - iraMax) >= 0 ? iraMax : funds;
      funds -= ira;
      brokerage = funds;
      return [cash, retirement, ira, brokerage];
    } else if (planBool) {
      retirement = (funds - actualMax) >= 0 ? actualMax : funds;
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