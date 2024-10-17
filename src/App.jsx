import React,{useState,useEffect} from 'react';
import {
  AvailableBalance,
  IncomeExpenseBalance,
  TransactionsSections
  } from './Sections/Index';
import AmountContext from './AmountContext';

export default function App() {
  const [Transactions,setTransactions] = useState( () => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  }
  );
  useEffect(() => {
    localStorage.setItem('transactions',JSON.stringify(Transactions));
  },[Transactions]);

  const totalIncome = Transactions
  .filter((transaction) => transaction.Type === "Income")
  .reduce((acc,transaction) => acc + transaction.Amount,0);
  const totalExpense = Transactions
  .filter((transaction) => transaction.Type === "Expense")
  .reduce((acc,transaction) => acc + transaction.Amount,0);

  const availableBalance = totalIncome - totalExpense;
  return (
    <main className="flex flex-col lg:m-[80px] mt-[23px] ml-[16px] mr-[16px] mb-[16px] lg:w-[1280px] w-full">
      <AmountContext.Provider value={{availableBalance,totalIncome,totalExpense,Transactions,setTransactions}} >
        <section>
          <AvailableBalance />
        </section>
        <section className='flex lg:flex-row flex-col lg:justify-between lg:ml-[80px] lg:w-[1280px] ml-4 mr-4 w-full  lg:mr-[80px] gap-[10px]'>
          <IncomeExpenseBalance /> 
        </section>
        <section className='grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 col-end-3 w-full max-w-[1280px] mt-[30px] lg:ml-[80px] ml-4 lg:mr-[80px] mr-4 mb-[80px] px-5 gap-10 overflow-hidden'>
          <TransactionsSections />
        </section>
      </AmountContext.Provider>  
    </main>
  )
}