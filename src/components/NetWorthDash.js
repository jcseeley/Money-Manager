import React, { useState } from "react";
import {
  parse,
  formatDollars,
  getAssetTotal,
  getLiabilityTotal,
  getNetWorth,
  getMonthlyIncome,
  getNecessaryMonthlyTotal,
  getExtraMonthlyTotal,
  getMonthlySavingsTotal,
  getCombinedMonthlyTotal,
  getMonthlyNet,
  getNetIncome,
  getNeedsValue,
  getWantsValue,
  getInvestValue, 
  getIdealChecking,
  getIdealSavings,
  getDifference,
  getIdealHousing,
  getSavingsContributions,
  getEmployerMatch,
  getMaxEmployerMatch
} from "../functions/NetWorthCalculators";

const NetWorthDash = () => {
  // PRELIMINARY QUESTIONS
  const [emergencyMonths, setEmergencyMonths] = useState(3);
  const [employerRetirement, setEmployerRetirement] = useState("No");
  const [employerMatch, setEmployerMatch] = useState(0);
  const [maxOrMatch, setMaxOrMatch] = useState("No");
  const [age, setAge] = useState(0);
  // ASSETS
  const [checking, setChecking] = useState(0);
  const [idealChecking, setIdealChecking] = useState(0);
  const [checkingDifference, setCheckingDifference] = useState(0);
  const [savings, setSavings] = useState(0);
  const [idealSavings, setIdealSavings] = useState(0);
  const [savingsDifference, setSavingsDifference] = useState(0);
  const [realEstate, setRealEstate] = useState(0);
  const [cryptoAsset, setCryptoAsset] = useState(0);
  const [retirement, setRetirement] = useState(0);
  const [ira, setIra] = useState(0);
  const [publicEquity, setPublicEquity] = useState(0);
  const [privateEquity, setPrivateEquity] = useState(0);
  const [rsuAsset, setRsuAsset] = useState(0);
  const [rsuAssetIdeal, setRsuAssetIdeal] = useState(0);
  const [carAsset, setCarAsset] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  // LIABILITIES
  const [creditCardDebt, setCreditCardDebt] = useState(0);
  const [studentLoanDebt, setStudentLoanDebt] = useState(0);
  const [carLoan, setCarLoan] = useState(0);
  const [mortgage, setMortgage] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  // NET WORTH
  const [netWorth, setNetWorth] = useState(0);
  // INCOME
  const [state, setState] = useState('--');
  const [annualIncome, setAnnualIncome] = useState(0);
  const [postTaxAnnualIncome, setPostTaxAnnualIncome] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [postTaxMonthlyIncome, setPostTaxMonthlyIncome] = useState(0);
  // MONTHLY NECESSARY
  const [housing, setHousing] = useState(0);
  const [idealHousing, setIdealHousing] = useState(0);
  const [housingDif, setHousingDif] = useState(0);
  const [healthcare, setHealthcare] = useState(0);
  const [food, setFood] = useState(0);
  const [studentPayment, setStudentPayment] = useState(0);
  const [carPayment, setCarPayment] = useState(0);
  const [necessaryMonthly, setNecessary] = useState(0);
  const [idealNecessaryMonthly, setIdealNecessaryMonthly] = useState(0);
  const [needsDif, setNeedsDif] = useState(0);
  // MONTHLY SAVINGS
  const [cashSavings, setCashSavings] = useState(0);
  const [idealCashMonthly, setIdealCashMonthly] = useState(0);
  const [retirementMonthly, setRetirementMonthly] = useState(0);
  const [idealRetirementMonthly, setIdealRetirementMonthly] = useState(0);
  const [retirementEmployerMatch, setRetirementEmployerMatch] = useState(0);
  const [maxEmployerMatch, setMaxEmployerMatch] = useState(0);
  const [iraMonthly, setIraMonthly] = useState(0);
  const [idealIraMonthly, setIdealIraMonthly] = useState(0);
  const [brokerageMonthly, setBrokerageMonthly] = useState(0);
  const [idealBrokerageMonthly, setIdealBrokerageMonthly] = useState(0);
  const [crytpoSavings, setCryptoSavings] = useState(0);
  const [rsuSavings, setRsuSavings] = useState(0);
  const [totalSavingsMonthly, setTotalSavingsMonthly] = useState(0);
  const [idealSavingsMonthly, setIdealSavingsMonthly] = useState(0);
  const [investDif, setInvestDif] = useState(0);
  // MONTHLY EXTRAS
  const [travel, setTravel] = useState(0);
  const [dining, setDining] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [other, setOther] = useState(0);
  const [totalExtras, setTotalExtras] = useState(0);
  const [idealTotalExtras, setIdealTotalExtras] = useState(0);
  const [wantsDif, setWantsDif] = useState(0);
  // MONTHLY NET & TOTAL EXPENSES
  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);
  const [netMonthlyIncome, setNetMonthlyIncome] = useState(0);

  // FORM HANDLER FUNCTION
  const handleFormSubmission = (event) => {
    event.preventDefault();
    // PRELIMINARY INPUTS
    const emergencyMonthsInput = parse(event.target.emergency.value) || 3;
    const employerPlanInput = event.target.employerPlan.value || 'No';
    const employerMatchInput = parse(event.target.employerMatch.value) || 0;
    const maxOrMatchInput = event.target.maxOrMatch.value || 'No';
    const ageInput = parse(event.target.age.value) || 0;
    // ASSET INPUTS
    const checkingInput = parse(event.target.checking.value) || 0;
    const savingsInput = parse(event.target.savings.value) || 0;
    const realEstateInput = parse(event.target.realEstate.value) || 0;
    const cryptoAssetInput = parse(event.target.crypto.value) || 0;
    const retirementInput = parse(event.target.retirement.value) || 0;
    const iraInput = parse(event.target.ira.value) || 0;
    const publicInput = parse(event.target.publicEquity.value) || 0;
    const privateInput = parse(event.target.privateEquity.value) || 0;
    const rsuAssetInput = parse(event.target.rsu.value) || 0;
    const carAssetInput = parse(event.target.carAsset.value) || 0;
    // LIABILITY INPUTS
    const creditDebtInput = parse(event.target.creditDebt.value) || 0;
    const studentDebtInput = parse(event.target.studentDebt.value) || 0;
    const carLoanInput = parse(event.target.carLoan.value) || 0;
    const mortgageInput = parse(event.target.mortgage.value) || 0;
    // INCOME INPUTS
    const stateInput = event.target.state.value.toUpperCase() || '--';
    const annualIncomeInput = parse(event.target.income.value)  || 0;
    // MONTHLY INPUTS
    const housingInput = parse(event.target.housing.value) || 0;
    const healthcareInput = parse(event.target.health.value) || 0;
    const foodInput = parse(event.target.food.value) || 0;
    const studentPaymentInput = parse(event.target.studentPayment.value) || 0;
    const carPaymentInput = parse(event.target.carPayment.value) || 0;
    const cashMonthlyInput = parse(event.target.cashMonthly.value) || 0;
    const retirementMonthlyInput = parse(event.target.retirementMonthly.value) || 0;
    const iraMonthlyInput = parse(event.target.iraMonthly.value) || 0;
    const brokerageMonthlyInput = parse(event.target.brokerageMonthly.value) || 0;
    const cryptoSavingsInput = parse(event.target.cryptoMonthly.value) || 0;
    const rsuSavingsInput = parse(event.target.rsuMonthly.value) || 0;
    const travelInput = parse(event.target.travelMonthly.value) || 0;
    const diningInput = parse(event.target.diningMonthly.value) || 0;
    const shoppingInput = parse(event.target.shoppingMonthly.value) || 0;
    const otherInput = parse(event.target.otherMonthly.value) || 0;

    return getValues(emergencyMonthsInput, employerPlanInput, employerMatchInput, maxOrMatchInput, ageInput, checkingInput, savingsInput, realEstateInput, cryptoAssetInput, retirementInput, iraInput, publicInput, privateInput, rsuAssetInput, carAssetInput, creditDebtInput, studentDebtInput, carLoanInput, mortgageInput, stateInput, annualIncomeInput, housingInput, healthcareInput, foodInput, studentPaymentInput, carPaymentInput, cashMonthlyInput, retirementMonthlyInput, iraMonthlyInput, brokerageMonthlyInput, cryptoSavingsInput, rsuSavingsInput, travelInput, diningInput, shoppingInput, otherInput);
  }

  const getValues = (emergencyMonthsInput, employerPlanInput, employerMatchInput, maxOrMatchInput, ageInput, checkingInput, savingsInput, realEstateInput, cryptoAssetInput, retirementInput, iraInput, publicInput, privateInput, rsuAssetInput, carAssetInput, creditDebtInput, studentDebtInput, carLoanInput, mortgageInput, stateInput, annualIncomeInput, housingInput, healthcareInput, foodInput, studentPaymentInput, carPaymentInput, cashMonthlyInput, retirementMonthlyInput, iraMonthlyInput, brokerageMonthlyInput, cryptoSavingsInput, rsuSavingsInput, travelInput, diningInput, shoppingInput, otherInput) => {
    // NET WORTH CALCULATIONS
    const totalLiabilitiesVal = getLiabilityTotal(creditDebtInput, studentDebtInput, carLoanInput, mortgageInput);
    const totalAssetVal = getAssetTotal(checkingInput, savingsInput, realEstateInput, cryptoAssetInput, retirementInput, iraInput, publicInput, privateInput, rsuAssetInput, carAssetInput);
    const netWorthVal = getNetWorth(totalAssetVal, totalLiabilitiesVal);
    // PRE-TAX CALCULATIONS
    // const preTaxRetirementVal = getPreTaxRetirement(annualIncomeInput, employerPlanInput, employerMatchInput, maxOrMatchInput, ageInput);
    // INCOME CALCULATIONS
    const annualPostTaxVal = getNetIncome(stateInput, annualIncomeInput);
    const monthlyIncomeVal = getMonthlyIncome(annualIncomeInput);
    const monthlyPostTaxVal = getMonthlyIncome(annualPostTaxVal);
    // MONTHLY CALCULATIONS
    const monthlyNecessaryVal = getNecessaryMonthlyTotal(housingInput, healthcareInput, foodInput, studentPaymentInput, carPaymentInput);
    const totalSavingsVal = getMonthlySavingsTotal(cashMonthlyInput, retirementMonthlyInput, iraMonthlyInput, brokerageMonthlyInput, cryptoSavingsInput, rsuSavingsInput);
    const monthlyExtraVal = getExtraMonthlyTotal(travelInput, shoppingInput, diningInput, otherInput);
    const totalMonthlyVal = getCombinedMonthlyTotal(monthlyNecessaryVal, totalSavingsVal, monthlyExtraVal);
    const monthlyEmergency = (monthlyNecessaryVal + monthlyExtraVal);
    const monthlyNetVal = getMonthlyNet(monthlyPostTaxVal, totalMonthlyVal);
    // IDEAL/DIFFERENCE CALCULATIONS
    const idealCheckingVal = getIdealChecking(monthlyEmergency);
    const checkingDifVal = getDifference(checkingInput, idealCheckingVal);
    const idealSavingsVal = getIdealSavings(emergencyMonthsInput, monthlyEmergency);
    const savingsDifVal = getDifference(savingsInput, idealSavingsVal);
    const rsuIdealVal = parse(totalAssetVal * .1);
    const idealHousingVal = getIdealHousing(monthlyPostTaxVal);
    const idealNeedsVal = getNeedsValue(monthlyPostTaxVal);
    const idealSaveVal = getInvestValue(monthlyPostTaxVal);
    const idealWantsVal = getWantsValue(monthlyPostTaxVal);
    const housingDifVal = getDifference(housingInput, idealHousingVal);
    const needsDifVal = getDifference(monthlyNecessaryVal, idealNeedsVal);
    const investDifVal = getDifference(totalSavingsVal, idealSaveVal);
    const wantsDifVal = getDifference(monthlyExtraVal, idealWantsVal);
    // SAVINGS CALCULATIONS
    const savingsArr = getSavingsContributions(ageInput, checkingInput, idealCheckingVal, savingsInput, idealSavingsVal, monthlyPostTaxVal, monthlyNecessaryVal, idealSaveVal - (cryptoSavingsInput + rsuSavingsInput), employerPlanInput);
    const idealCashVal = savingsArr[0];
    const idealRetirementVal = savingsArr[1];
    const idealIraVal = savingsArr[2];
    const idealBrokerageVal = savingsArr[3];
    const employerMatchVal = getEmployerMatch(monthlyPostTaxVal, retirementMonthlyInput, employerMatchInput);
    const employerMatchMax = getMaxEmployerMatch(monthlyPostTaxVal, employerMatchInput);

    return setValues(emergencyMonthsInput, employerPlanInput, employerMatchInput, maxOrMatchInput, ageInput, checkingInput, savingsInput, realEstateInput, cryptoAssetInput, retirementInput, iraInput, publicInput, privateInput, rsuAssetInput, carAssetInput, creditDebtInput, studentDebtInput, carLoanInput, mortgageInput, totalLiabilitiesVal, totalAssetVal, netWorthVal, stateInput, annualIncomeInput, annualPostTaxVal, monthlyIncomeVal, monthlyPostTaxVal, housingInput, healthcareInput, foodInput, studentPaymentInput, carPaymentInput, monthlyNecessaryVal, cashMonthlyInput, retirementMonthlyInput, iraMonthlyInput, brokerageMonthlyInput, cryptoSavingsInput, rsuSavingsInput, totalSavingsVal, travelInput, diningInput, shoppingInput, otherInput, monthlyExtraVal, totalMonthlyVal, monthlyNetVal, idealCheckingVal, checkingDifVal, idealSavingsVal, savingsDifVal, rsuIdealVal, idealHousingVal, idealNeedsVal, idealSaveVal, idealWantsVal, housingDifVal, idealCashVal, idealRetirementVal, idealIraVal, idealBrokerageVal, employerMatchVal, employerMatchMax, needsDifVal, investDifVal, wantsDifVal);
  }

  const setValues = (emergencyMonthsInput, employerPlanInput, employerMatchInput, maxOrMatchInput, ageInput, checkingInput, savingsInput, realEstateInput, cryptoAssetInput, retirementInput, iraInput, publicInput, privateInput, rsuAssetInput, carAssetInput, creditDebtInput, studentDebtInput, carLoanInput, mortgageInput,  totalLiabilitiesVal, totalAssetVal, netWorthVal, stateInput, annualIncomeInput, annualPostTaxVal, monthlyIncomeVal, monthlyPostTaxVal, housingInput, healthcareInput, foodInput, studentPaymentInput, carPaymentInput, monthlyNecessaryVal, cashMonthlyInput, retirementMonthlyInput, iraMonthlyInput, brokerageMonthlyInput, cryptoSavingsInput, rsuSavingsInput, totalSavingsVal, travelInput, diningInput, shoppingInput, otherInput, monthlyExtraVal, totalMonthlyVal, monthlyNetVal, idealCheckingVal, checkingDifVal, idealSavingsVal, savingsDifVal, rsuIdealVal, idealHousingVal, idealNeedsVal, idealSaveVal, idealWantsVal, housingDifVal, idealCashVal, idealRetirementVal, idealIraVal, idealBrokerageVal, employerMatchVal, employerMatchMax, needsDifVal, investDifVal, wantsDifVal) => {
    // SET QUESTION VALUES
    setEmergencyMonths(emergencyMonthsInput);
    setEmployerRetirement(employerPlanInput);
    setEmployerMatch(employerMatchInput);
    setMaxOrMatch(maxOrMatchInput);
    setAge(ageInput);
    // SET ASSET VALUES
    setChecking(checkingInput);
    setSavings(savingsInput);
    setRealEstate(realEstateInput);
    setCryptoAsset(cryptoAssetInput);
    setRetirement(retirementInput);
    setIra(iraInput);
    setPublicEquity(publicInput);
    setPrivateEquity(privateInput);
    setRsuAsset(rsuAssetInput);
    setCarAsset(carAssetInput);
    // SET LIABILITY VALUES
    setCreditCardDebt(creditDebtInput);
    setStudentLoanDebt(studentDebtInput);
    setCarLoan(carLoanInput);
    setMortgage(mortgageInput);
    // SET NET WORTH VALUES
    setTotalAssets(totalAssetVal);
    setTotalLiabilities(totalLiabilitiesVal);
    setNetWorth(netWorthVal);
    // SET INCOME VALUES
    setState(stateInput)
    setAnnualIncome(annualIncomeInput);
    setPostTaxAnnualIncome(annualPostTaxVal);
    setMonthlyIncome(monthlyIncomeVal);
    setPostTaxMonthlyIncome(monthlyPostTaxVal);
    // SET MONTHLY VALUES
    setHousing(housingInput);
    setHealthcare(healthcareInput);
    setFood(foodInput);
    setStudentPayment(studentPaymentInput);
    setCarPayment(carPaymentInput);
    setNecessary(monthlyNecessaryVal);
    setCashSavings(cashMonthlyInput);
    setRetirementMonthly(retirementMonthlyInput);
    setIraMonthly(iraMonthlyInput);
    setBrokerageMonthly(brokerageMonthlyInput);
    setCryptoSavings(cryptoSavingsInput);
    setRsuSavings(rsuSavingsInput);
    setTotalSavingsMonthly(totalSavingsVal);
    setTravel(travelInput);
    setDining(diningInput);
    setShopping(shoppingInput);
    setOther(otherInput);
    setTotalExtras(monthlyExtraVal);
    setTotalMonthlyExpenses(totalMonthlyVal);
    setNetMonthlyIncome(monthlyNetVal);
    // SET IDEAL/DIFFERENCE VALUES
    setIdealChecking(idealCheckingVal);
    setCheckingDifference(checkingDifVal);
    setIdealSavings(idealSavingsVal);
    setSavingsDifference(savingsDifVal);
    setRsuAssetIdeal(rsuIdealVal);
    setIdealHousing(idealHousingVal);
    setIdealNecessaryMonthly(idealNeedsVal);
    setIdealSavingsMonthly(idealSaveVal);
    setIdealTotalExtras(idealWantsVal);
    setIdealCashMonthly(idealCashVal);
    setIdealRetirementMonthly(idealRetirementVal);
    setIdealIraMonthly(idealIraVal);
    setIdealBrokerageMonthly(idealBrokerageVal);
    setRetirementEmployerMatch(employerMatchVal);
    setMaxEmployerMatch(employerMatchMax);
    setHousingDif(housingDifVal);
    setNeedsDif(needsDifVal);
    setInvestDif(investDifVal);
    setWantsDif(wantsDifVal);
  }

  return (
    <React.Fragment>
      <div className="grid font-bold ml-4 mr-4">
        <h1 className="text-center text-5xl font-bold italic mt-4 mb-4">Money Manager</h1>
        <p className="text-center mb-4">A breakdown of your spending based on the 50-30-20 Rule.</p>
        <p className="text-center text-sm italic mb-4">* income after tax assumes single file, W2 employee with standard deductions *</p>
        {/* FORM START */}
        <form id="form" className="justify-self-center" onSubmit={handleFormSubmission}>
          {/* PRELIMINARY QUESTIONS */}
          <table className="table table-compact mb-1">
            <thead>
              <tr>
                <th>Preliminary Questions</th>
                <th>Options</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
              {/* EMERGENCY SAVINGS QUESTION */}
              <tr className="hover">
                <td>How many months of emergency savings would you like to have?</td>
                <td>
                  <select name="emergency" className="w-32 border border-current bg-base-100 text-center">
                    <option>---</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </td>
                <td className="text-center">{emergencyMonths}</td>
              </tr>
              {/* EMPLOYER PLAN QUESTION */}
              <tr className="hover">
                <td>Do you have an Employer Sponsored Retirement Plan?</td>
                <td>
                  <select name="employerPlan" className="border border-current bg-base-100 w-32 text-center">
                    <option>No</option>
                    <option value="Traditional">Traditional 401k (Pre-Tax)</option>
                    <option value="Roth">Roth 401k (Post-Tax)</option>
                    <option>403b</option>
                    <option>TSP</option>
                    <option>SEP IRA</option>
                  </select>
                </td>
                <td className="text-center">{employerRetirement}</td>
              </tr>
              {/* EMPLOYER MATCH QUESTION */}
              <tr className="hover">
                <td>If so, does your employer match?</td>
                <td>
                  <input className="w-32 input input-bordered input-xs text-center" 
                    type='number'
                    step='1'
                    min='0'
                    name="employerMatch"
                    placeholder="Percentage" />
                </td>
                <td className="text-center">{employerMatch}%</td>
              </tr>
              {/* RETIREMENT MAX OR MATCH */}
              <tr className="hover">
                <td>Would you like to maximize your contribution or match your employer?</td>
                <td>
                  <select name="maxOrMatch" className="w-32 border border-current bg-base-100 text-center">
                    <option value="No">No Contribution</option>
                    <option value="Max">Maximize</option>
                    <option value="Match">Match Employer</option>
                  </select>
                </td>
                <td className="text-center">{maxOrMatch}</td>
              </tr>
              {/* AGE QUESTION */}
              <tr className="hover">
                <td>What is your age?</td>
                <td>
                  <input className="w-32 input input-bordered input-xs text-center" 
                    type='number'
                    step='1'
                    min='0'
                    name="age"
                    placeholder="Years" />
                </td>
                <td className="text-center">{age}</td>
              </tr>
            </tbody>
          </table>
          {/* RETIREMENT INFO */}
          <div className="grid grid-flow-col auto-cols w-full mb-3">
            <div className="grid tooltip" data-tip="If your contributions are pre-tax, you have a Traditional. If they are post-tax, you have a Roth. Still not sure? Check the line items on your paystub to see if your contribution was deducted before or after taxes were taken.">
              <button className="justify-self-center btn btn-xs w-fit">Hover for 401k: Traditional vs Roth</button>
            </div>
            <div className="grid tooltip" data-tip="We always recommend contributing the annual maximum to your retirement accounts if possible. For an Employer Sponsored Plan, if you are unable to max, you should at least contribute whatever percentage your employer will match.">
              <button className="justify-self-start btn btn-xs w-fit">Hover for Retirement Information</button>
            </div>
          </div>
          {/* ASSET TABLE */}
          <table className="table table-compact mb-4">
            <thead>
              <tr>
                <th className="w-60">Assets</th>
                <th className="text-center w-44">Enter Amount</th>
                <th>Current</th>
                <th className="text-green-500">50-30-20</th>
                <th className="text-blue-500">Difference</th>
              </tr>
            </thead>
            <tbody>
              {/* CHECKING ASSET INPUT */}
              <tr className="hover">
                <td>
                  <p>Checking Account</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">1 months expenses + 30%</p>
                </td>
                <td className="align-top">
                  <input id="checking" className="input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='checking'
                    placeholder='Balance' />
                </td>
                <td className="align-top">{formatDollars(checking)}</td>
                <td className="text-green-500 font-bold align-top">{formatDollars(idealChecking)}</td>
                <td className="text-blue-500 font-bold align-top">{formatDollars(checkingDifference)}</td>
              </tr>
              {/* SAVINGS ASSET INPUT */}
              <tr className="hover">
                <td className="w-60">
                  <p>Savings Account</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">#emergency months x expenses</p>
                </td>
                <td className="w-44 align-top">
                  <input id="savings" className="input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='savings'
                    placeholder='Balance' />
                </td>
                <td className="align-top">{formatDollars(savings)}</td>
                <td className="text-green-500 font-bold align-top">{formatDollars(idealSavings)}</td>
                <td className="text-blue-500 font-bold align-top">{formatDollars(savingsDifference)}</td>
              </tr>
              {/* REAL ESTATE ASSET INPUT */}
              <tr className="hover">
                <td className="w-60">Real Estate</td>
                <td>
                  <input id='realEstate'className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='realEstate'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(realEstate)}</td>
              </tr>
              {/* CRYPTO ASSET INPUT */}
              <tr className="hover">
                <td className="w-60">Cryptocurrency</td>
                <td>
                  <input id='crypto' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='crypto'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(cryptoAsset)}</td>
              </tr>
              {/* EMPLOYER RETIREMENT ASSET INPUT */}
              <tr className="hover">
                <td className="w-60">Employer Sponsored Retirement</td>
                <td>
                  <input id='retirement' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='retirement'
                    placeholder='Balance' />
                </td>
                <td>{formatDollars(retirement)}</td>
              </tr>
              {/* IRA ASSET INPUT */}
              <tr className="hover">
                <td className="w-fit">IRA</td>
                <td>
                    <input id='ira' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='ira'
                    placeholder='Balance' />
                </td>
                <td>{formatDollars(ira)}</td>
              </tr>
              {/* PUBLIC EQUITIES INPUT */}
              <tr className="hover">
                <td className="w-fit">Public Equities</td>
                <td>
                  <input id='public' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='publicEquity'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(publicEquity)}</td>
              </tr>
              {/* PRIVATE EQUITIES INPUT */}
              <tr className="hover">
                <td className="w-fit">Private Equities</td>
                <td>
                  <input id='private' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='privateEquity'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(privateEquity)}</td>
              </tr>
              {/* RSU INPUT */}
              <tr className="hover">
                <td className="w-fit">
                  <p>RSUs</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">10% of Total Assets</p>
                </td>
                <td className="align-top">
                  <input id='rsu' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='rsu'
                    placeholder='Value' />
                </td>
                <td className="align-top">{formatDollars(rsuAsset)}</td>
                <td className="text-green-500 font-bold align-top">{formatDollars(rsuAssetIdeal)}</td>
                <td className="text-blue-500 font-bold align-top">{formatDollars(rsuAsset - rsuAssetIdeal)}</td>
              </tr>
              {/* CAR ASSET INPUT */}
              <tr className="hover">
                <td id='carAsset' className="w-fit">Car (If Owned)</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    name='carAsset'
                    step='.01'
                    min='0'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(carAsset)}</td>
              </tr>
              {/* TOTAL ASSETS ROW */}
              <tr className="hover">
                <td className="font-bold italic text-lime-400">Total Assets</td>
                <td></td>
                <td className="font-bold text-lime-400">{formatDollars(totalAssets)}</td>
              </tr>
            </tbody>
          </table>
          {/* LIABILITIES TABLE */}
          <table className="table table-compact mb-6">
            <thead>
              <tr>
                <th className="w-60">Liabilities</th>
                <th className="w-44">Enter Amount</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
              {/* CREDIT CARD LIABILITY INPUT */}
              <tr className="hover">
                <td id='creditDebt' className="w-60">Credit Card Debt</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    name='creditDebt'
                    step='.01'
                    min='0'
                    placeholder='Owed' />
                </td>
                <td>{formatDollars(creditCardDebt)}</td>
              </tr>
              {/* STUDENT LOAN LIABILITY INPUT */}
              <tr className="hover">
                <td id='studentDebt' className="w-fit">Student Loan Debt</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    name='studentDebt'
                    step='.01'
                    min='0'
                    placeholder='Owed' />
                </td>
                <td>{formatDollars(studentLoanDebt)}</td>
              </tr>
              {/* CAR LOAN LIABILITY INPUT */}
              <tr className="hover">
                <td id='carLoan' className="w-fit">Car (Loan/Lease)</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    name='carLoan'
                    step='.01'
                    min='0'
                    placeholder='Owed' />
                </td>
                <td>{formatDollars(carLoan)}</td>
              </tr>
              {/* MORTGAGE LIABILITY INPUT */}
              <tr className="hover">
                <td id='mortgage' className="w-fit">Mortgage</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    name='mortgage'
                    step='.01'
                    min='0'
                    placeholder='Owed' />
                </td>
                <td>{formatDollars(mortgage)}</td>
              </tr>
              {/* TOTAL LIABILITIES ROW */}
              <tr className="hover">
                <td className="font-bold italic text-red-500">Total Liabilities</td>
                <td></td>
                <td className="font-bold text-red-500">{formatDollars(totalLiabilities)}</td>
              </tr>
              {/* NET WORTH ROW */}
              <tr className="hover">
                <td className="w-fit font-bold text-yellow-500">Net Worth</td>
                <td className="text-center italic font-bold text-yellow-500">Assets - Liabilities</td>
                <td className="font-bold text-yellow-500">{formatDollars(netWorth)}</td>
              </tr>
            </tbody>
          </table>
          {/* INCOME TABLE */}
          <table className="table table-compact mb-4">
            <thead>
              <tr>
                <th className="w-60">Income</th>
                <th className="w-44">Enter Amount</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>
              {/* STATE INPUT */}
              <tr className="hover">
                <td className="w-60">
                  <p>State of Residence</p>
                  <p className="text-xs italic mt-1">Enter "DC" for Washington, DC</p>
                </td>
                <td>
                  <input id='state' className="w-fit input input-bordered input-xs text-center"
                    type='text'
                    name='state'
                    placeholder='State Abbreviation' />
                </td>
                <td>{state}</td>
              </tr>
              {/* ANNUAL INCOME INPUT / PRE TAX */}
              <tr className="hover">
                <td>Annual Income</td>
                <td>
                  <input id='income' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='income'
                    placeholder='Annual Income' />
                </td>
                <td>{formatDollars(annualIncome)}</td>
              </tr>
              {/* ANNUAL POST TAX INCOME */}
              <tr className="hover">
                <td>Annual Net Income</td>
                <td></td>
                <td>{formatDollars(postTaxAnnualIncome)}</td>
              </tr>
              {/* MONTHLY PRE TAX INCOME */}
              <tr className="hover">
                <td>Monthly Income</td>
                <td></td>
                <td>{formatDollars(monthlyIncome)}</td>
              </tr>
              {/* MONTHLY POST TAX INCOME */}
              <tr className="hover">
                <td className="font-bold italic text-lime-400">Monthly Net Income</td>
                <td></td>
                <td className="font-bold text-lime-400">{formatDollars(postTaxMonthlyIncome)}</td>
              </tr>
            </tbody>
          </table>
          {/* MONTHLY NEEDS TABLE */}
          <table className="table table-compact">
            <thead>
              <tr>
                <th className="w-60">Monthly Needs</th>
                <th className="w-44 text-center">Enter Amount</th>
                <th>Current</th>
                <th className="text-green-500">50-30-20</th>
                <th className="text-blue-500">Difference</th>
              </tr>
            </thead>
            <tbody>
              {/* MONTHLY HOUSING INPUT */}
              <tr className="hover">
                <td className="w-60">
                  <p>Housing (Rent/Mortgage)</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">30% of Monthly Net</p>
                </td>
                <td className="align-top">
                  <input id='housing' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='housing'
                    placeholder='Per Month' />
                </td>
                <td className="align-top">{formatDollars(housing)}</td>
                <td className="text-green-500 font-bold align-top">{formatDollars(idealHousing)}</td>
                <td className="text-blue-500 font-bold align-top">{formatDollars(housingDif)}</td>
              </tr>
              {/* MONTHLY HEALTHCARE INPUT */}
              <tr className="hover">
                <td className="w-fit">Healthcare</td>
                <td>
                  <input id='health' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='health'
                    placeholder='Monthly Total' />
                </td>
                <td>{formatDollars(healthcare)}</td>
              </tr>
              {/* MONTHLY GROCERY INPUT */}
              <tr className="hover">
                <td className="w-fit">Groceries</td>
                <td>
                  <input id='food' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='food'
                    placeholder='Monthly Average' />
                </td>
                <td>{formatDollars(food)}</td>
              </tr>
              {/* MONTHLY STUDENT LOAN PAYMENT INPUT */}
              <tr className="hover">
                <td className="w-fit">Student Loans</td>
                <td>
                  <input id='studentPayment' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='studentPayment'
                    placeholder='Monthly Payment' />
                </td>
                <td>{formatDollars(studentPayment)}</td>
              </tr>
              {/* MONTHLY CAR PAYMENT INPUT */}
              <tr className="hover">
                <td className="w-fit">Car</td>
                <td>
                  <input id='carPayment' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='carPayment'
                    placeholder='Monthly Payment' />
                </td>
                <td>{formatDollars(carPayment)}</td>
              </tr>
              {/* MONTHLY NECESSARY TOTAL ROW */}
              <tr className="hover">
                <td className="font-bold italic">
                  <p className=" text-red-500">Needs Total</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">50% of Monthly Net</p>
                </td>
                <td></td>
                <td className="font-bold text-red-500 align-top">{formatDollars(necessaryMonthly)}</td>
                <td className="font-bold text-green-500 align-top">{formatDollars(idealNecessaryMonthly)}</td>
                <td className="font-bold text-blue-500 align-top">{formatDollars(needsDif)}</td>
              </tr>
            </tbody>
          </table>
          {/* SAVINGS INFO */}
          <div className="grid tooltip mt-2 mb-2" data-tip="If possible, 20% of your net income should be saved. Industry experts recommend filling your emergency savings before contributing to any retirement or investment accounts. If your emergency savings is full, you should then focus on your employer sponsored retirement plan. If the annual max isn't feasible, try to at least meet the percentage your employer will match per pay period. Next fill your IRA, then contribute any remaining funds to your brokerage account. The '50-30-20' values below reflect these suggestions based on your age and available income.">
            <button className="justify-self-center btn btn-sm w-fit">Hover For Savings Info</button>
          </div>
          {/* MONTHLY SAVINGS TABLE */}
          <table className="table table-compact">
            <thead>
              <tr>
                <th className="w-60">Monthly Savings</th>
                <th className="w-44 text-center">Enter Amount</th>
                <th>Current</th>
                <th className="text-green-500">50-30-20</th>
                <th className="text-blue-500">Difference</th>
              </tr>
            </thead>
            <tbody>
              {/* MONTHLY CASH SAVINGS INPUT */}
              <tr className="hover">
                <td className="w-fit">
                  <p>Cash Savings</p>
                  {/* <p className="text-xs italic font-bold mt-1">* Ideal = +/- Ideal account balances *</p> */}
                </td>
                <td>
                    <input className="w-40 input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='cashMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(cashSavings)}</td>
                <td className="text-green-500 font-bold">{formatDollars(idealCashMonthly)}</td>
              </tr>
              {/* MONTHLY RETIREMENT INPUT */}
              <tr className="hover">
                <td className="w-fit">
                  <p>Employer Sponsored Retirement</p>
                </td>
                <td>
                    <input className="w-40 input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='retirementMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(retirementMonthly)}</td>
                <td className="text-green-500 font-bold">{formatDollars(idealRetirementMonthly)}</td>
              </tr>
              {/* EMPLOYER RETIREMENT MATCH */}
              <tr className="hover">
                <td className="w-fit">
                  <p>Employer Retirement Match</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">Max Match Per Month</p>
                </td>
                <td className="text-center align-top">{employerMatch}%</td>
                <td className="align-top">{formatDollars(retirementEmployerMatch)}</td>
                <td className="text-green-500 font-bold align-top">{formatDollars(maxEmployerMatch)}</td>
              </tr>
              {/* MONTHLY IRA INPUT */}
              <tr className="hover">
                <td className="w-fit">
                  <p>IRA</p>
                </td>
                <td>
                  <input className="w-40 input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='iraMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(iraMonthly)}</td>
                <td className="text-green-500 font-bold">{formatDollars(idealIraMonthly)}</td>
              </tr>
              {/* MONTHLY BROKERAGE INPUT */}
              <tr className="hover">
                <td className="w-fit">Brokerage</td>
                <td>
                  <input className="w-40 input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='brokerageMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(brokerageMonthly)}</td>
                <td className="text-green-500 font-bold">{formatDollars(idealBrokerageMonthly)}</td>
              </tr>
              {/* MONTHLY CRYPTO INPUT */}
              <tr className="hover">
                <td className="w-fit">Cryptocurrency</td>
                <td>
                  <input className="w-40 input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='cryptoMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(crytpoSavings)}</td>
              </tr>
              {/* MONTHLY RSU INPUT */}
              <tr className="hover">
                <td className="w-fit">RSUs</td>
                <td>
                  <input className="w-40 input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='rsuMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(rsuSavings)}</td>
              </tr>
              {/* MONTHLY SAVINGS TOTAL */}
              <tr className="hover">
                <td className="font-bold italic text-yellow-500">
                  <p>Savings Total</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">20% of Monthly Net</p>
                </td>
                <td></td>
                <td className="font-bold text-yellow-500 align-top">{formatDollars(totalSavingsMonthly)}</td>
                <td className="font-bold text-green-500 align-top">{formatDollars(idealSavingsMonthly)}</td>
                <td className="font-bold text-blue-500 align-top">{formatDollars(investDif)}</td>
              </tr>
            </tbody>
          </table>
          {/* MONTHLY WANTS TABLE */}
          <table className="table table-compact">
            <thead>
              <tr>
                <th className="w-60">Monthly Wants</th>
                <th className="w-44 text-center">Enter Amount</th>
                <th>Current</th>
                <th className="text-green-500">50-30-20</th>
                <th className="text-blue-500">Difference</th>
              </tr>
            </thead>
            <tbody>
              {/* MONTHLY TRAVEL INPUT */}
              <tr className="hover">
                <td className="w-fit">Travel</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='travelMonthly'
                    placeholder='Monthly Average' />
                </td>
                <td>{formatDollars(travel)}</td>
              </tr>
              {/* MONTHLY DINING INPUT */}
              <tr className="hover">
                <td className="w-fit">Dining</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='diningMonthly'
                    placeholder='Monthly Average' />
                </td>
                <td>{formatDollars(dining)}</td>
              </tr>
              {/* MONTHLY SHOPPING INPUT */}
              <tr className="hover">
                <td className="w-fit">Shopping</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='shoppingMonthly'
                    placeholder='Monthly Average' />
                </td>
                <td>{formatDollars(shopping)}</td>
              </tr>
              {/* MONTHLY OTHER INPUT */}
              <tr className="hover">
                <td className="w-fit">Other</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='otherMonthly'
                    placeholder='Monthly Average' />
                </td>
                <td>{formatDollars(other)}</td>
              </tr>
              {/* MONTHLY WANTS TOTAL ROW */}
              <tr className="hover">
                <td className="font-bold italic text-orange-500">
                  <p>Wants Total</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">30% of Monthly Net</p>
                </td>
                <td></td>
                <td className="font-bold text-orange-500 align-top">{formatDollars(totalExtras)}</td>
                <td className="font-bold text-green-500 align-top">{formatDollars(idealTotalExtras)}</td>
                <td className="font-bold text-blue-500 align-top">{formatDollars(wantsDif)}</td>
              </tr>
              {/* MONTHLY EXPENSES TOTAL */}
              <tr className="hover">
                <td className="font-bold italic text-red-500">
                  <p>Total Monthly Expenses</p>
                  <p className="text-xs italic underline mt-1 text-green-500">50-30-20</p>
                  <p className="text-xs italic text-green-500">Monthly Net Income</p>
                </td>
                <td></td>
                <td className="font-bold text-red-500 align-top">{formatDollars(totalMonthlyExpenses)}</td>
                <td className="font-bold text-green-500 align-top">{formatDollars(postTaxMonthlyIncome)}</td>
                <td className="font-bold text-blue-500 align-top">{formatDollars(netMonthlyIncome)}</td>
              </tr>
            </tbody>
          </table>
          {/* SUBMIT FORM BUTTON */}
          <div className="grid">
            <button className="btn btn-outline btn-sm justify-self-center mt-4 mb-4" type='submit'>submit</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default NetWorthDash;
