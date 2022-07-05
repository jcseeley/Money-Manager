import React, { useState } from "react";
import { 
  parse,
  formatDollars,
  getAssetTotal,
  getLiabilityTotal,
  getNetWorth,
  getMonthlyPreTaxIncome,
  getMonthlyPostTaxIncome,
  getNecessaryMonthlyTotal,
  getAdditionalMonthlyTotal,
  getCombinedMonthlyTotal,
  getMonthlyNet,
  getNetIncome,
  getNeedsValue,
  getWantsValue,
  getInvestValue 
} from "../functions/NetWorthCalculators";

const NetWorthDash = () => {

  const [emergencyMonths, setEmergencyMonths] = useState(3);
  const [employerRetirement, setEmployerRetirement] = useState("No");
  const [employerMatch, setEmployerMatch] = useState(0);
  const [age, setAge] = useState(0);

  const [checking, setChecking] = useState(0);
  const [idealChecking, setIdealChecking] = useState(0);
  const [checkingDifference, setCheckingDifference] = useState(0);
  const [savings, setSavings] = useState(0);
  const [idealSavings, setIdealSavings] = useState(0);
  const [savingsDifference, setSavingsDifference] = useState(0);
  const [realEstate, setRealEstate] = useState(0);
  const [crypto, setCrypto] = useState(0);
  const [retirement, setRetirement] = useState(0);
  const [ira, setIra] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [carAsset, setCarAsset] = useState(0);

  const [creditCardDebt, setCreditCardDebt] = useState(0);
  const [studentLoanDebt, setStudentLoanDebt] = useState(0);
  const [carLoan, setCarLoan] = useState(0);
  const [mortgage, setMortgage] = useState(0);

  const [netWorth, setNetWorth] = useState(125000);

  const [housing, setHousing] = useState(0);
  const [healthcare, setHealthcare] = useState(0);
  const [food, setFood] = useState(0);
  const [studentPayment, setStudentPayment] = useState(0);
  const [carPayment, setCarPayment] = useState(0);
  const [retirementMonthly, setRetirementMonthly] = useState(0);
  const [iraMonthly, setIraMonthly] = useState(0);
  const [brokerageMonthly, setBrokerageMonthly] = useState(0);

  function clearValues() {
    
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();

    const emergencyMonthsInput = event.target.emergency.value;
    const employerPlanInput = event.target.employerPlan.value;
    const employerMatchInput = event.target.employerMatch.value;
    const ageInput = event.target.age.value;

    const checkingInput = event.target.checking.value;
    const savingsInput = event.target.savings.value;
    const realEstateInput = event.target.realEstate.value;
    const cryptoInput = event.target.crypto.value;
    const retirementInput = event.target.retirement.value;
    const iraInput = event.target.ira.value;
    const investmentInput = event.target.investments.value;
    const carAssetInput = event.target.carAsset.value;

    const creditDebtInput = event.target.creditDebt.value;
    const studentDebtInput = event.target.studentDebt.value;
    const carLoanInput = event.target.carLoan.value;
    const mortgageInput = event.target.mortgage.value;

    const housingInput = event.target.housing.value;
    const healthcareInput = event.target.health.value;
    const foodInput = event.target.food.value;
    const studentPaymentInput = event.target.studentPayment.value;
    const carPaymentInput = event.target.carPayment.value;
    const retirementMonthlyInput = event.target.retirementMonthly.value;
    const iraMonthlyInput = event.target.iraMonthly.value;
    const brokerageMonthlyInput = event.target.brokerageMonthly.value;

    if (emergencyMonthsInput >= 3) {
      setEmergencyMonths(parse(emergencyMonthsInput));
    } if (employerPlanInput !== 'No') {
      setEmployerRetirement(employerPlanInput);
    } if (employerMatchInput > 0) {
      setEmployerMatch(parse(employerMatchInput));
    } if (ageInput > 0) {
      setAge(parse(ageInput));
    } if (checkingInput > 0) {
      setChecking(parse(checkingInput));
    } if (savingsInput > 0) {
      setSavings(parse(savingsInput));
    } if (realEstateInput > 0) {
      setRealEstate(parse(realEstateInput));
    } if (cryptoInput > 0) {
      setCrypto(parse(cryptoInput));
    } if (retirementInput > 0) {
      setRetirement(parse(retirementInput));
    } if (iraInput > 0) {
      setIra(parse(iraInput));
    } if (investmentInput > 0) {
      setInvestments(parse(investmentInput));
    } if (carAssetInput > 0) {
      setCarAsset(parse(carAssetInput));
    } if (creditDebtInput > 0) {
      setCreditCardDebt(parse(creditDebtInput));
    } if (studentDebtInput > 0) {
      setStudentLoanDebt(parse(studentDebtInput));
    } if (carLoanInput > 0) {
      setCarLoan(parse(carLoanInput));
    } if (mortgageInput > 0) {
      setMortgage(parse(mortgageInput));
    } if (housingInput > 0) {
      setHousing(parse(housingInput));
    } if (healthcareInput > 0) {
      setHealthcare(parse(healthcareInput));
    } if (foodInput > 0) {
      setFood(parse(foodInput));
    } if (studentPaymentInput > 0) {
      setStudentPayment(parse(studentPaymentInput));
    } if (carPaymentInput > 0) {
      setCarPayment(carPaymentInput);
    } if (retirementMonthlyInput > 0) {
      setRetirementMonthly(parse(retirementMonthlyInput));
    } if (iraMonthlyInput > 0) {
      setIraMonthly(parse(iraMonthlyInput));
    } if (brokerageMonthlyInput > 0) {
      setBrokerageMonthly(parse(brokerageMonthlyInput));
    }

    document.getElementById("form").reset();
  }

  // const getValues = (income, state) => {
  //   if (income > 0 && state.length === 2) {
  //     
  //     return setValues();
  //   } else {
  //     return;
  //   }
  // }

  // const setValues = () => {
  //   
  // }

  return (
    <React.Fragment>
      <div className="grid">
        <h1 className="text-center text-5xl font-bold italic mt-4 mb-4">Money Manager</h1>
        <p className="text-center mb-4">A breakdown of your spending based on the 50-30-20 Rule.</p>
        <form id="form" className="justify-self-center" onSubmit={handleFormSubmission}>
          
          {/* PRELIMINARY QUESTIONS */}
          <table className="table table-compact mb-2">
            <thead>
              <tr>
                <th>Preliminary Questions</th>
                <th>Options</th>
                <th>Answers</th>
              </tr>
            </thead>
            <tbody>

            <tr className="hover">
                <td>How many months of emergency savings would you like to have?</td>
                <td>
                  <select name="emergency" className="border border-current bg-base-100 w-32 text-center">
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
              
              <tr className="hover">
                <td>Do you have an Employer Sponsored Retirement Plan?</td>
                <td>
                  <select name="employerPlan" className="border border-current bg-base-100 w-32 text-center">
                    <option>No</option>
                    <option>401k</option>
                    <option>403b</option>
                    <option>TSP</option>
                    <option>SEP IRA</option>
                  </select>
                </td>
                <td className="text-center">{employerRetirement}</td>
              </tr>

              <tr className="hover">
                <td>If so, how much does your employer match?</td>
                <td>
                  <input className="w-32 input input-bordered input-xs text-center" 
                    type='number'
                    step='.01'
                    min='0'
                    name="employerMatch"
                    placeholder="Percentage" />
                </td>
                <td className="text-center">{employerMatch}%</td>
              </tr>

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
          
          {/* ASSET TABLE */}
          <table className="table table-compact mb-2">
            <thead>
              <tr>
                <th>Assets</th>
                <th className="text-center">Enter Amount</th>
                <th>Current</th>
                <th>Ideal</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <td className="w-60">Checking Account</td>
                <td>
                  <input id="checking" className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='checking'
                    placeholder='Balance' />
                </td>
                <td>{formatDollars(checking)}</td>
                <td>{formatDollars(idealChecking)}</td>
                <td>{formatDollars(checkingDifference)}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">Savings Account</td>
                <td>
                  <input id="savings" className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='savings'
                    placeholder='Balance' />
                </td>
                <td>{formatDollars(savings)}</td>
                <td>{formatDollars(idealSavings)}</td>
                <td>{formatDollars(savingsDifference)}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">Real Estate</td>
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

              <tr className="hover">
                <td className="w-fit">Cryptocurrency</td>
                <td>
                  <input id='crypto' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='crypto'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(crypto)}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">Employer Sponsored Retirement</td>
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

              <tr className="hover">
                <td className="w-fit">Investments (Outside Retirement)</td>
                <td>
                  <input id='investmenst' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='investments'
                    placeholder='Value' />
                </td>
                <td>{formatDollars(investments)}</td>
              </tr>

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
            </tbody>
          </table>

          {/* LIABILITIES TABLE */}
          <table className="table table-compact mb-6">
            <thead>
              <tr>
                <th>Liabilities</th>
                <th>Enter Amount</th>
                <th>Current</th>
              </tr>
            </thead>
            <tbody>

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

              <br />
              <tr className="active">
                <td className="w-fit font-bold text-lg text-green-400 italic">NET WORTH</td>
                <td className="italic text-center text-lg font-bold text-green-400">ASSETS - LIABILITIES</td>
                <td className="text-lg italic font-bold text-green-400">{formatDollars(netWorth)}</td>
              </tr>

            </tbody>
          </table>

          {/* MONTHLY EXPENSE TABLE */}
          <table className="table table-compact">
            <thead>
              <tr>
                <th>Monthly Expenses</th>
                <th className="text-center">Enter Amount</th>
                <th>Current</th>
                <th>Ideal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <td className="w-60">Housing (Rent/Mortgage)</td>
                <td>
                  <input id='housing' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='housing'
                    placeholder='Per Month' />
                </td>
                <td>{formatDollars(housing)}</td>
                <td>{formatDollars()}</td>
              </tr>

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
                <td>{formatDollars()}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">Food</td>
                <td>
                  <input id='food' className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='food'
                    placeholder='Monthly Average' />
                </td>
                <td>{formatDollars(food)}</td>
                <td>{formatDollars()}</td>
              </tr>

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
                <td>{formatDollars()}</td>
              </tr>

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
                <td>{formatDollars()}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">Employer Sponsored Retirement</td>
                <td>
                    <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='retirementMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(retirementMonthly)}</td>
                <td>{formatDollars()}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">IRA</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='iraMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(iraMonthly)}</td>
                <td>{formatDollars()}</td>
              </tr>

              <tr className="hover">
                <td className="w-fit">Brokerage</td>
                <td>
                  <input className="w-fit input input-bordered input-xs text-center"
                    type='number'
                    step='.01'
                    min='0'
                    name='brokerageMonthly'
                    placeholder='Monthly Contribution' />
                </td>
                <td>{formatDollars(brokerageMonthly)}</td>
                <td>{formatDollars()}</td>
              </tr>

            </tbody>
          </table>

          <div className="grid">
            <button className="btn btn-outline btn-sm justify-self-center mt-4 mb-4" type='submit' onClick={() => clearValues()}>submit</button>
          </div>

        </form>
      </div>
    </React.Fragment>
  );
}

export default NetWorthDash;