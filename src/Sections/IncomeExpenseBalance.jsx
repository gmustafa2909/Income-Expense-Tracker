import React,{useContext} from "react";
import img1 from "./Vector.png";
import img2 from "./bxs-wallet-alt 1.png";
import AmountContext from "../AmountContext";

const IncomeExpenseBalance = () => {
  const {totalIncome,totalExpense} = useContext(AmountContext);
  return (
    <>
      <section className="flex flex-col place-items-start pt-[24px] lg:w-[628px] lg:h-[139px] h-[120px] w-full lg:mt-[170px] mt-[150px] left-[50px] rounded-[8px] bg-[#D9E7E5]">
        <div className="w-[40px] h-[40px] ml-[40px] pt-[8px] pl-[10px] rounded-[100px] bg-[#42887C]">
          <img src={img1} alt="Income" className="w-[20px] h-[20px] top-[10px] left-[10px]" />
        </div>
        <div className="w-[86px] h-[41px] ml-[40px]">
          <h3 className=" mt-[5px] h-[24px] font-sans font-bold text-[17px] leading-[24px] text-[#030303]">
            ${totalIncome}
          </h3>
          <p className="w-[49px] h-[17px] font-sans font-normal text-[14px] leading-[16.94px] text-[#686868]">
            Income
          </p>
        </div>
      </section>
      <section className="flex flex-col place-items-start pt-[24px] lg:w-[628px] lg:h-[139px] h-[120px] w-full lg:mt-[170px] left-[50px] rounded-[8px] bg-[#E6E2E6]">
        <div className="w-[40px] h-[40px] ml-[40px] pt-[8px] pl-[10px] rounded-[100px] bg-[#836F81]">
          <img src={img2} alt="Expense" className="w-[20px] h-[20px] top-[10px] left-[10px]" />
        </div>
        <div className="w-[86px] h-[41px] ml-[40px]">
          <h3 className=" mt-[5px] h-[24px] font-sans font-bold text-[17px] leading-[24px] text-[#030303]">
            ${totalExpense}
          </h3>
          <p className="w-[49px] h-[17px] font-sans font-normal text-[14px] leading-[16.94px] text-[#686868]">
            Expense
          </p>
        </div>
      </section>
    </>
  );
};

export default IncomeExpenseBalance;
