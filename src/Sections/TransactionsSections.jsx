import React, { useState, useContext, useEffect } from "react";
import AmountContext from "../AmountContext";
import { Chart } from "react-google-charts";

const TransactionsSections = () => {
  const [categories, setCategories] = useState([]);
  const [Category, setCategory] = useState("");
  const [Amount, setAmount] = useState("");
  const [Description, setDescription] = useState("");
  const { Transactions, setTransactions, totalIncome, totalExpense } = useContext(AmountContext);
  const [transactionType, setTransactionType] = useState("");
  const [incomeData, setIncomeData] = useState([[]]);
  const [expenseData, setExpenseData] = useState([[]]);

  // Income Data
  useEffect(() => {
    const groupedIncomeByCategory = Transactions
      .filter(transaction => transaction.Type === "Income")
      .reduce((acc, transaction) => {
        if (!acc[transaction.Category]) {
          acc[transaction.Category] = 0;
        }
        acc[transaction.Category] += transaction.Amount;
        return acc;
      }, {});

    const IncomeInfo = [
      ["Category", "Percentage"],
      ...Object.entries(groupedIncomeByCategory)
        .map(([category, amount]) => [
          category,
          (amount / totalIncome) * 100
        ])
    ];
    setIncomeData(IncomeInfo);
  }, [Transactions]);

  // Expense Data
  useEffect(() => {
    const groupedIncomeByCategory = Transactions
      .filter(transaction => transaction.Type === "Expense")
      .reduce((acc, transaction) => {
        if (!acc[transaction.Category]) {
          acc[transaction.Category] = 0;
        }
        acc[transaction.Category] += transaction.Amount;
        return acc;
      }, {});

    const ExpenseInfo = [
      ["Category", "Percentage"],
      ...Object.entries(groupedIncomeByCategory)
        .map(([category, amount]) => [
          category,
          (amount / totalExpense) * 100
        ])
    ];
    setExpenseData(ExpenseInfo);
  }, [Transactions]);

  const options = {
    pieHole: 0.6,
    is3D: false,
  };

  const ExpenseType = () => {
    setCategories(["Shopping", "Food", "Entertainment", "Grocery"]);
    setCategory("");
    setTransactionType("Expense");
  };

  const IncomeType = () => {
    setCategories(["Salary", "Rental Income", "Business", "Stocks"]);
    setCategory("");
    setTransactionType("Income");
  };

  const handleAddTransactions = () => {
    const amountValue = parseFloat(Amount);
    if (Category && !isNaN(amountValue) && Description && transactionType) {
      setTransactions([
        ...Transactions,
        { Amount: amountValue, Category, Description, Type: transactionType },
      ]);
      // Reset input fields after adding the transaction
      setAmount("");
      setCategory("");
      setDescription("");
      setTransactionType("");
      setCategories([]);
    } else {
      alert("Please fill out all fields with valid data");
    }
  };

  const deleteTransactions = (index) => {
    const updatedTransactions = Transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  return (
    <>
      {/* Add Transaction Section */}
      <section className="w-full lg:w-[320px] h-[623px] mx-auto mr-[80px] mt-[30px]">
        <h2 className="w-full lg:w-[212px] h-[42px] font-sans font-bold text-[27px] leading-[42px] text-center text-[#030303]">
          Add Transaction
        </h2>
        <p className="mt-[40px] w-[90px] h-[24px] font-sans font-normal text-[16px] leading-[24px] text-[#030303]">
          Select Type
        </p>
        <div className="flex justify-between mt-[5px] gap-4">
          <button
            onClick={IncomeType}
            className={`w-full lg:w-[152px] h-[81px] rounded-[8px] border-[1px] ${
              transactionType === "Income" ? "bg-[#D9E7E5] border-[#42887C]" : "bg-[#EBEBEB]"
            }`}>
            Income
          </button>
          <button
            onClick={ExpenseType}
            className={`w-full lg:w-[152px] h-[81px] rounded-[8px] border-[1px] ${
              transactionType === "Expense" ? "bg-[#D9E7E5] border-[#42887C]" : "bg-[#EBEBEB]"
            }`}>
            Expense
          </button>
        </div>
        <p className="mt-[15px] w-[71px] h-[24px] font-sans font-normal text-[16px] leading-[24px] text-[#030303]">
          Category
        </p>
        <select
          id="Category"
          name="Category"
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
          className="gap-[8px] rounded-[8px] border-[1px] border-[#D0D5DD] mt-[10px] w-full h-[44px]">
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <p className="w-[59px] h-[24px] font-sans font-normal text-[16px] leading-[24px] text-[#030303] mt-[15px]">
          Amount
        </p>
        <input
          id="Amount"
          type="text"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="$$$"
          className="w-full h-[44px] rounded-[8px] border-[1px] border-[#D0D5DD] gap-[8px] mt-[10px] p-[10px]" />
        <p className="mt-[15px] w-[87px] h-[24px] font-sans font-normal text-[16px] leading-[24px] text-[#030303]">
          Description
        </p>
        <textarea
          id="Description"
          name="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description"
          className="p-[10px] rounded-[8px] border-[1px] border-[#D0D5DD] gap-[8px] mt-[10px] w-full h-[128px]">
        </textarea>
        <button
          onClick={handleAddTransactions}
          className="mt-[15px] w-full h-[44px] rounded-[8px] pt-[10px] pb-[10px] pr-[18px] pl-[18px] gap-[8px] bg-[#FFC727] font-sans font-bold leading-[24px] text-[#ffffff]">
          Add Transaction
        </button>
      </section>

      {/* Transaction History */}
      <section className="w-full lg:w-[448px] h-[623px] rounded-[8px] bg-[#F9F9F9] overflow-y-auto overflow-x-hidden mx-auto mt-[30px] ">
        <h2 className="w-full lg:w-[252px] h-[42px] font-sans font-bold leading-[42px] items-center text-[27px] mt-[40px] ml-[40px] text-[#030303]">
          Transaction History
        </h2>
        {Transactions.map((transaction, index) => (
          <div
            key={index}
            className="p-[20px] mb-[40px] lg:mx-[40px] lg:mt-[30px]  ml-[10px] mr-[5px] w-full lg:w-[368px] h-[128px] rounded-[8px] bg-[#FFFFFF]">
            <div className="flex justify-between">
              <p className="w-[150px] h-[24px] font-sans font-medium text-[16px] leading-[24px] text-[#838383]">
                {transaction.Category}
              </p>
              <div className="flex gap-[10px]  ">
                <div
                  className={`w-[66px]  h-[24px] pl-[8px] rounded-[16px] border-[1px] gap-[10px] ${
                    transaction.Type === "Income" ? "bg-[#ECFFEA]" : "bg-[#FFD9D9]"
                  }`}>
                  <p
                    className={`w-[60px]  h-[24px] font-sans font-semibold text-[14px] leading-[24px] ${
                      transaction.Type === "Income" ? "text-[#5AB064]" : "text-[#D14D4D]"
                    }`}>
                    {transaction.Type}
                  </p>
                </div>
                <div className="lg:w-[20px] w-full h-[20px]">
                  <button onClick={() => deleteTransactions(index)} className="text-[#D14D4D]">
                    🗑
                  </button>
                </div>
              </div>
            </div>
            <h3 className="mt-[10px] w-[83px] h-[24px] font-sans font-bold text-[32px] leading-[24px] text-[#030303]">
              ${transaction.Amount.toFixed(2)}
            </h3>
            <p className="mt-[20px] w-[233px] h-[24px] font-sans font-normal text-[14px] leading-[24px] text-[#4F4F4F]">
              {transaction.Description}
            </p>
          </div>
        ))}
      </section>

      {/* Financial Summary */}
      <section className="w-full lg:w-[448px] h-[623px] rounded-[8px] bg-[#F9F9F9] mx-auto  mt-[30px] lg:ml-[40px]">
        <h2 className="w-full lg:w-[252px] h-[42px] font-sans font-bold leading-[42px] items-center text-[27px] mt-[40px] ml-[40px] text-[#030303]">
          Financial Summary
        </h2>
        <h3 className="mt-[30px] ml-[40px] w-[58px] h-[24px] font-sans font-bold text-[16px] leading-[24px] text-[#030303]">
          Income
        </h3>
        <Chart
          chartType="PieChart"
          data={incomeData}
          options={options}
          className="w-full lg:w-auto" />
        <h3 className="mt-[30px] ml-[40px] w-[58px] h-[24px] font-sans font-bold text-[16px] leading-[24px] text-[#030303]">
          Expense
        </h3>
        <Chart
          chartType="PieChart"
          data={expenseData}
          options={options}
          className="w-full lg:w-auto" />
      </section>
    </>
  );
};

export default TransactionsSections;
