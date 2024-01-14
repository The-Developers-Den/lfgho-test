"use client";

import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";
import { parseEther } from "viem";
import GhoToken from "@/app/_constant/GhoTokenABI.json";
import { useState } from "react";

type TransferProps = {
  to: string;
  from: `0x${string}` | undefined;
  amount: string;
  setState: React.Dispatch<
    React.SetStateAction<"connect" | "transfer" | "success" | "error">
  >;
};

const Transfer = ({ amount, to, from, setState }: TransferProps) => {
  const [transfer, setTransfer] = useState(false);

  const handleClick = async () => {
    if (to === "" || amount === "0") {
      alert("Please enter a valid address and amount");
      return;
    }
    setTransfer(true);

    const { request } = await prepareWriteContract({
      address: GhoToken.address as `0x${string}`,
      abi: GhoToken.abi,
      functionName: "transfer",
      args: [to, parseEther(amount)],
    });
    const { hash: uploadyERC } = await writeContract(request);
    await waitForTransaction({ hash: uploadyERC })
      .then(() => {
        console.log("transaction confirmed");
        setState("success");
      })
      .catch((error) => {
        setState("error");
        console.log("error", error);
      });

    setTransfer(false);
  };
  return (
    <div className="flex flex-col space-y-4 justify-center items-center p-3 ">
      You are transferring Pratham.xyz
      <h2>{amount} GHO</h2>
      <h2>
        From: {from?.substring(0, 5)}...
        {from?.substring(from?.length - 5, from?.length)}{" "}
      </h2>
      <button
        type="submit"
        className="border px-5 py-3 rounded-xl mt-5 shadow-xl"
        onClick={handleClick}
      >
        {transfer ? "Transfering..." : "Pay"}
      </button>
    </div>
  );
};

export default Transfer;
