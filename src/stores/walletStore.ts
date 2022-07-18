import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
// api
import { fetchWallet, setUserAddress, withdrawForUser } from "@/http/walletApi";
// composables
import {
  WalletError,
  WalletConnectError,
  DepositSuccess,
  DepositError,
} from "@/composables/ModalNotifications";
import {
  ToastTransaction,
  ToastAlreadyUseAddress,
} from "@/composables/toastNotification";
// store
import { useAuthStore } from "./authStore";
import { useModalStore } from "./modalStore";
import { useToastStore } from "./toastStore";
// eth
import { ethers } from "ethers";
import contractABI from "@/composables/contract";
declare let window: any;
// models
import type { ITransaction } from "@/models/walletModels";

export const useWalletStore = defineStore("walletStore", () => {
  // var withdraws
  const contractAddress = ref();
  const hotAddress = ref();
  //
  const isWalletPage = ref(false);
  const address = ref<string | null>();
  const balance = ref<number>(0);
  const inBets = ref<number>(0);
  const withdrawAmount = ref<number>(0);
  const transactions = ref<ITransaction[]>([]);
  const decimals = ref<string>("9");
  //
  const deposit = ref();
  // store
  const modalStore = useModalStore();
  const toastStore = useToastStore();
  // check auth
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);
  const userInterval = ref();
  if (isAuth.value) {
    getWallet();
    userInterval.value = setInterval(() => {
      getWallet();
    }, 30000);
  }
  watch(isAuth, () => {
    if (isAuth.value) {
      getWallet();
      userInterval.value = setInterval(() => {
        getWallet();
      }, 30000);
    } else {
      clearInterval(userInterval.value);
      isWalletPage.value = false;
      address.value = null;
      balance.value = 0;
      inBets.value = 0;
      transactions.value = [];
      decimals.value = "9";
    }
  });

  function checkMetamask() {
    if (!window.ethereum) {
      modalStore.modalNotificationContent = WalletError;
      modalStore.isModalNotification = true;
      throw new Error("No crypto wallet found. Please install it.");
    }
  }

  async function getWallet() {
    const response = await fetchWallet();
    address.value = response.address;
    decimals.value = response.decimals;
    if (balance.value) {
      if (
        balance.value !==
        response.balance.toString().slice(0, -response.decimals)
      ) {
        toastStore.push(ToastTransaction);
      }
    }
    balance.value =
      response.balance === 0
        ? response.balance
        : response.balance.toString().slice(0, -response.decimals);
    inBets.value =
      +response.inBets === 0
        ? +response.inBets
        : response.inBets.slice(0, -response.decimals);
    // for deposit
    contractAddress.value = response.contractAddress;
    hotAddress.value = response.hotAddress;
    // transaction
    transactions.value = response.transactions;
    transactions.value.map(
      (x) => (x.amount = x.amount.toString().slice(0, -response.decimals))
    );
    isWalletPage.value = true;
  }

  async function disconnectWallet() {
    const response = await setUserAddress("");
    if (!response.data) {
      address.value = null;
      return response;
    }
  }

  async function connectWallet() {
    try {
      checkMetamask();
      await window.ethereum.send("eth_requestAccounts");
      const etheriumWallet = window.ethereum.selectedAddress;
      const { data } = await setUserAddress(etheriumWallet);
      if (!data) {
        toastStore.push(ToastAlreadyUseAddress);
        return;
      }
      address.value = etheriumWallet;
      return data;
    } catch (error) {
      modalStore.modalNotificationContent = WalletConnectError;
      modalStore.isModalNotification = true;
    }
  }

  async function createDeposit() {
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

      await contract.transfer(hotAddress.value, deposit.value + "000000000");
      deposit.value = null;
      modalStore.modalNotificationContent = DepositSuccess;
      modalStore.isModalNotification = true;
    } catch (error: any) {
      modalStore.modalNotificationContent = DepositError;
      modalStore.isModalNotification = true;
    }
  }

  async function withdraw() {
    if (withdrawAmount.value) {
      const response = await withdrawForUser(withdrawAmount.value * 1000000000);
      return response;
    }
  }

  return {
    address,
    inBets,
    balance,
    transactions,
    isWalletPage,
    deposit,
    // function
    createDeposit,
    disconnectWallet,
    connectWallet,
    withdraw,
    withdrawAmount,
  };
});
