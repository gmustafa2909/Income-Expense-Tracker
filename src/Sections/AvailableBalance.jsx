import { useContext } from "react";
import AmountContext from "../AmountContext";

const AvailableBalance = () => {
  const {availableBalance} = useContext(AmountContext);
  return (
    <section className="absolute lg:h-[139px] lg:w-[1280px] w-full h-[120px] bg-[#455A64] rounded-[8px] lg:ml-[80px] lg:mr-[80px] ml-4 mr-4 mt-4">
      <div className="flex flex-col items-start p-0 gap-[11px] absolute w-[125px] lg:h-[65px] h-[40px] lg:left-[40px] lg:right-[37px] left-6 right-5 ">
        <p className="lg:mt-[30%] mt-[20%] w-[125px] h-[20px] font-sans font-normal text-[15px] leading-[20px] text-slate-300 flex-none order-0 flex-grow-0">
          Available Balance
        </p>
        <h3 className={`pl-[5px] pr-[5px] font-sans font-bold text-[29px] leading-[34px] text-[#ffffff] flex-none order-1 flex-grow-0 rounded-[8px]  lg:pb-[5px] lg:pt-[5px] pb-0 pt-0 ${availableBalance == 0 ? "bg-[#455A64]" : availableBalance > 0 ? "bg-green-600": "bg-red-600"}`}>
          ${availableBalance}
        </h3>
      </div>
    </section>
  );
};

export default AvailableBalance;
