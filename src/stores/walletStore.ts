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
import { ToastTransaction } from "@/composables/toastNotification";
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
  const withdrawError = ref();
  //
  const isWalletPage = ref(false);
  const address = ref<string | null>();
  const balance = ref<number>(0);
  const inBets = ref<number>(0);
  const withdrawAmount = ref<number>(0);
  const transactions = ref<ITransaction[]>([]);
  const decimals = ref<string>("9");
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
    }, 5000);
  }
  watch(isAuth, () => {
    if (isAuth.value) {
      getWallet();
      // walletDataInterval.value = setInterval(testFunction, 5000);
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
    balance.value = response.balance.toString().slice(0, -response.decimals);
    inBets.value = response.inBets.slice(0, -response.decimals);
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
    if (response.data) {
      address.value = null;
    }
  }

  async function connectWallet() {
    try {
      checkMetamask();
      await window.ethereum.send("eth_requestAccounts");
      const etheriumWallet = window.ethereum.selectedAddress;
      const response = await setUserAddress(etheriumWallet);
      if (response.data) {
        address.value = etheriumWallet;
      }
    } catch (error) {
      modalStore.modalNotificationContent = WalletConnectError;
      modalStore.isModalNotification = true;
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

      await contract.transfer(hotAddress.value, ether + "000000000");
      modalStore.modalNotificationContent = DepositSuccess;
      modalStore.isModalNotification = true;
    } catch (error: any) {
      modalStore.modalNotificationContent = DepositError;
      modalStore.isModalNotification = true;
    }
  }

  async function withdraw() {
    const { data, err } = await withdrawForUser(
      withdrawAmount.value * 1000000000
    );
    if (err) {
      withdrawError.value = err;
      return;
    }
    withdrawError.value = null;
    modalStore.isModalWithdraw = false;
    return data;
  }

  return {
    address,
    inBets,
    balance,
    transactions,
    isWalletPage,
    // function
    createDeposit,
    disconnectWallet,
    connectWallet,
    withdraw,
    withdrawAmount,
    withdrawError,
  };
});
