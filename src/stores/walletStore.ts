import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
// api
import {
  fetchWallet,
  setUserAddress,
  withdrawForUser,
  getAssets,
} from "@/http/walletApi";
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
import type { IAsset } from "@/models/admin/IAsset";

export const useWalletStore = defineStore("walletStore", () => {
  // var withdraws
  const contractAddress = ref();
  const hotAddress = ref();
  const assets = ref<IAsset[]>();
  const currentAsset = ref<string>("");
  const isWalletPage = ref(false);
  const address = ref<string | null>();
  const balance = ref<number>(0);
  const inBets = ref<number>(0);
  const withdrawAmount = ref<number | null>();
  const transactions = ref<ITransaction[]>([]);
  const decimals = ref<number>(9);
  // store
  const modalStore = useModalStore();
  const toastStore = useToastStore();
  const authStore = useAuthStore();
  // check localstorage
  const assetCandidate = localStorage.getItem("currentAsset");
  if (assetCandidate) {
    currentAsset.value = assetCandidate;
  } else {
    currentAsset.value = "koa";
  }

  // check auth
  const { isAuth } = storeToRefs(authStore);
  const userInterval = ref();
  if (isAuth.value) {
    getWallet(true);
    getAllAssets();
    userInterval.value = setInterval(() => {
      getWallet(true);
    }, 30000);
  }
  watch(isAuth, () => {
    if (isAuth.value) {
      getWallet(true);
      getAllAssets();
      userInterval.value = setInterval(() => {
        getWallet(true);
      }, 30000);
    } else {
      clearInterval(userInterval.value);
      isWalletPage.value = false;
      address.value = null;
      balance.value = 0;
      inBets.value = 0;
      transactions.value = [];
      decimals.value = 9;
    }
  });

  async function getAllAssets() {
    const { data } = await getAssets();
    assets.value = data;
  }

  function checkMetamask() {
    if (!window.ethereum) {
      modalStore.modalNotificationContent = WalletError;
      modalStore.isModalNotification = true;
      throw new Error("No crypto wallet found. Please install it.");
    }
  }

  async function setAsset(asset: string) {
    clearInterval(userInterval.value);
    isWalletPage.value = false;
    const candidate = assets.value?.find((x) => x.code === asset);
    if (candidate) {
      currentAsset.value = candidate.code;
      localStorage.setItem("currentAsset", currentAsset.value);
    } else {
      currentAsset.value = "koa";
      localStorage.setItem("currentAsset", currentAsset.value);
    }
    await getWallet(false);
    userInterval.value = setInterval(() => {
      getWallet(true);
    }, 30000);
  }

  async function getWallet(poll: boolean) {
    const response = await fetchWallet(currentAsset.value);

    address.value = response.address;
    decimals.value = response.decimals;
    if (balance.value && poll) {
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
    return true;
  }

  function isMobileDevice() {
    return "ontouchstart" in window || "onmsgesturechange" in window;
  }

  async function disconnectWallet() {
    const response = await setUserAddress("");
    address.value = null;
    return response;
  }

  async function connectWallet() {
    try {
      if (isMobileDevice() && !window.ethereum) {
        const hash = btoa(
          JSON.stringify({
            token: authStore.token,
            code: currentAsset.value,
          })
        );
        const dappUrl = import.meta.env.VITE_DOMAIN + `/connect/${hash}`;
        const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
        window.open(metamaskAppDeepLink);
        return;
      }
      checkMetamask();
      const [etheriumWallet] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      address.value = etheriumWallet;
      const { data } = await setUserAddress(etheriumWallet);
      if (!data) {
        toastStore.push(ToastAlreadyUseAddress);
        return;
      }
      return data;
    } catch (error) {
      modalStore.modalNotificationContent = WalletConnectError;
      modalStore.isModalNotification = true;
    }
  }

  async function deposit(deposit: number) {
    try {
      await getWallet(true);
      if (isMobileDevice() && !window.ethereum) {
        const hash = btoa(
          JSON.stringify({
            token: authStore.token,
            code: currentAsset.value,
            deposit,
          })
        );
        const dappUrl = import.meta.env.VITE_DOMAIN + `/connect/${hash}`;
        const metamaskAppDeepLink = "https://metamask.app.link/dapp/" + dappUrl;
        window.open(metamaskAppDeepLink);
        return;
      }
      checkMetamask();
      const [etheriumWallet] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (etheriumWallet !== address.value) {
        modalStore.modalNotificationContent = DepositError;
        modalStore.isModalNotification = true;
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress.value,
        contractABI,
        signer
      );

      await contract.transfer(hotAddress.value, deposit + "000000000");

      modalStore.modalNotificationContent = DepositSuccess;
      modalStore.isModalNotification = true;
    } catch (error: any) {
      modalStore.modalNotificationContent = WalletConnectError;
      modalStore.isModalNotification = true;
    }
  }

  async function withdraw() {
    if (withdrawAmount.value) {
      const response = await withdrawForUser(
        withdrawAmount.value * 1000000000,
        currentAsset.value
      );
      return response;
    }
  }

  return {
    address,
    inBets,
    balance,
    transactions,
    isWalletPage,
    assets,
    currentAsset,
    // function
    deposit,
    disconnectWallet,
    connectWallet,
    withdraw,
    withdrawAmount,
    setAsset,
    getWallet,
  };
});
