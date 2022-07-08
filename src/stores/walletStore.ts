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
import { fetchWallet, setMyAddress } from "@/http/walletApi";

declare var window: any;

const addr = "0xf6cda9031f6aae3d4dc4310364699f06f51b989b";
const TOKEN_CONTRACT_ADDRESS = "0x0101C8291008edd36b42160b6f606eDF2a2A7E41";

export const useWalletStore = defineStore("wallet", () => {
  // modal error
  const isModalWalletError = ref(false);
  // variables
  const isConnected = ref(false);
  const address = ref();
  const balance = ref();
  const decimals = ref();
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
    balance.value = response.balance.toString().slice(0, -response.decimals);
    transactions.value = response.tranasctions;    
    transactions.value.forEach(element => {
      element.amount = +element.amount.toString().slice(0, -response.decimals)
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
        description: "Something wrong. Please try again later.",
      };
      isModalWalletError.value = true;
    }
  }

  async function disconnectWallet () {
    const response = await setMyAddress("");
    if (response.data) {
      address.value = ""
    }
  };

  async function createDeposit(ether: number) {
    try {
      checkMetamask();
      await window.ethereum.send("eth_requestAccounts"); // blockchain provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      const tx = await contract.transfer(addr, ether + "000000000");
      // const tx = await signer.sendTransaction({
      //   to: TOKEN_CONTRACT_ADDRESS,
      //   value: ethers.utils.parseEther(ether.toString()),
      // });
      modalMessageError.value = {
        title: "success",
        description: "Await that transaction will be ....",
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
    //modal
    isModalWalletError,
    modalMessageError,
  };
});
