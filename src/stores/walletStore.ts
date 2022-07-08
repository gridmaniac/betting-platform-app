import { storeToRefs } from "pinia";
import { defineStore } from "pinia";
import { useAuthStore } from "./authStore";
import { ref, onBeforeUnmount, watch } from "vue";
// eth
import { ethers } from "ethers";
import contractABI from "@/composables/contract";
// models
import type { ITransaction, IModalErrorMessage, IBet } from "@/models/wallet";
// http
import { fetchWallet, setMyAddress, withdraw } from "@/http/walletApi";

declare var window: any;

export const useWalletStore = defineStore("wallet", () => {
  // modal error
  const isModalWalletError = ref(false);
  // variables
  const isConnected = ref(false);
  const address = ref();
  const balance = ref();
  const decimals = ref();
  const hotAddress = ref();
  const contractAddress = ref();
  const transactions = ref<ITransaction[]>([]);
  const inBets = ref(0);
  const modalMessageError = ref<IModalErrorMessage>();
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);
  const walletDataInterval = ref();
  // watch to user auth
  if (isAuth.value) {
    console.log("user already connected");
    checkUserWallet();
    // testFunction();
    // walletDataInterval.value = setInterval(testFunction, 5000);
  } else {
    console.log("user not connected");
  }
  watch(isAuth, () => {
    if (isAuth.value) {
      console.log("user connected");
      // testFunction();
      // walletDataInterval.value = setInterval(testFunction, 5000);
    } else {
      console.log("user disconnected");
      // clearInterval(walletDataInterval.value);
    }
  });

  //
  function checkMetamask() {
    if (!window.ethereum) {
      modalMessageError.value = {
        title: "No crypto wallet",
        description: "No crypto wallet found. Please install it.",
      };
      isModalWalletError.value = true;
      throw new Error("No crypto wallet found. Please install it.");
    }
  }

  async function checkUserWallet() {
    const response = await fetchWallet();
    console.log(response);

    address.value = response.address;
    decimals.value = response.decimals;
    hotAddress.value = response.hotAddress;
    contractAddress.value = response.contractAddress;
    balance.value = response.balance.toString().slice(0, -response.decimals);
    transactions.value = response.tranasctions;
    transactions.value.forEach((element) => {
      element.amount = +element.amount.toString().slice(0, -response.decimals);
    });
    isConnected.value = true;
  }

  async function connectWallet() {
    try {
      //check eth wallet in browser
      checkMetamask();
      // check wallet
      const connection = await window.ethereum.send("eth_requestAccounts");
      const connectionWallet = connection.result[0];
      const etheriumWallet = window.ethereum.selectedAddress;
      const response = await setMyAddress(etheriumWallet);
      if (response.data) {
        address.value = etheriumWallet;
      }
    } catch (error: any) {
      modalMessageError.value = {
        title: "Connection error",
        description: "Something went wrong. Please try again.",
      };
      isModalWalletError.value = true;
    }
  }

  async function disconnectWallet() {
    const response = await setMyAddress("");
    if (response.data) {
      address.value = "";
    }
  }

  async function createDeposit(ether: number) {
    try {
      checkMetamask();
      await window.ethereum.send("eth_requestAccounts"); // blockchain provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress.value,
        contractABI,
        signer
      );

      const tx = await contract.transfer(hotAddress.value, ether + "000000000");
      // const tx = await signer.sendTransaction({
      //   to: contractAddress.value,
      //   value: ethers.utils.parseEther(ether.toString()),
      // });
      modalMessageError.value = {
        title: "Success",
        description: "Await for transaction to be processed.",
      };
      isModalWalletError.value = true;
    } catch (error: any) {
      modalMessageError.value = {
        title: "Wallet error",
        description: "Something went wrong. Please try again.",
      };
      isModalWalletError.value = true;
    }
  }

  async function createBet(bet: IBet) {
    try {
      const { data } = await window.ethereum.send("eth_requestAccounts");
      if (balance.value < bet.amount) {
        return { error: "Your balance is insufficient" };
      }
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function withdrawAmount(amount: number) {
    const response = await withdraw(amount * 1000000000);
    console.log(response);
  }

  return {
    address,
    balance,
    transactions,
    inBets,
    isConnected,
    //function
    connectWallet,
    createDeposit,
    createBet,
    disconnectWallet,
    withdrawAmount,
    //modal
    isModalWalletError,
    modalMessageError,
  };
});
