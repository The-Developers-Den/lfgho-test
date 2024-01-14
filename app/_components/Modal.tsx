import { ConnectKitButton } from "connectkit";
import Transfer from "./Transfer";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const Modal = ({
  open,
  setOpen,
  amount,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
}) => {
  const { isConnected, address } = useAccount();

  const [state, setState] = useState<
    "connect" | "transfer" | "success" | "error"
  >("connect");

  const getModalContent = (modalType: string) => {
    switch (modalType) {
      case "connect":
        return {
          title: "Connect to a wallet",
          body: <ConnectKitButton showAvatar showBalance />,
        };

      case "transfer":
        return {
          title: "Payment",
          body: (
            <Transfer
              to={"0x9d8c061125e2c416F472feC3A18C3fD48E88bA18"}
              from={address}
              amount={amount}
              setState={setState}
            />
          ),
        };

      case "loading":
        return {
          title: "Transfering GHO",
          body: <div>Loading....</div>,
        };
      case "success":
        return {
          title: "Success!",
          body: <div>Succesfully transfered GHO</div>,
        };
      case "error":
        return {
          title: "Failed",
          body: <div>Something went wrong, Try Again!</div>,
        };
    }
  };

  useEffect(() => {
    if (isConnected) {
      setState("transfer");
    }
  }, [isConnected]);

  return (
    <div
      className={`z-50 absolute top-0 left-0 w-screen h-screen bg-black/30 ${open ? "" : "hidden"} backdrop-blur-sm flex justify-center items-center`}
    >
      <div className="z-[70] w-1/4 min-h-[20%] bg-[#8B63F0] relative rounded-xl p-5 ">
        <button
          className="absolute top-2 right-4"
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </button>
        <div className="flex flex-col justify-center items-center mt-4">
          <h1 className="text-2xl font-semibold">
            {getModalContent(state)!.title}
          </h1>
          <div className="mt-5">{getModalContent(state)!.body}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
