import { defineStore, storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
// api
import {
  fetchWallet,
  setUserAddress,
  withdrawForUser,
  getAssets,
  lockWallet,
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
  // state
  const isDisconnectLocked = ref(false);
  const router = useRouter();
  const contractAddress = ref();
  const hotAddress = ref();
  const assets = ref<IAsset[]>([]);
  const currentAsset = ref<string>("");
  const isWalletPage = ref(false);
  const address = ref<string | null>();
  const balance = ref<string>("");
  const ethBalance = ref<number>(0);
  const inBets = ref<string>("");
  const withdrawAmount = ref<string>("");
  const transactions = ref<ITransaction[]>([]);
  const decimals = ref<number>(0);
  // store
  const modalStore = useModalStore();
  const toastStore = useToastStore();
  const authStore = useAuthStore();
  // check localstorage
  const assetCandidate = localStorage.getItem("currentAsset");
  if (assetCandidate && assetCandidate !== "eth") {
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
      balance.value = "";
      inBets.value = "";
      transactions.value = [];
      decimals.value = 0;
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
    if (!response.walletLockTime) {
      isDisconnectLocked.value = false;
    } else if (moment.utc().diff(response.walletLockTime, "minutes") < 10) {
      isDisconnectLocked.value = true;
    } else {
      isDisconnectLocked.value = false;
    }

    if (!response.listed) {
      setAsset("koa");
    }
    address.value = response.address;
    decimals.value = response.decimals;
    ethBalance.value = response.ethBalance;
    if (balance.value && poll) {
      if (
        balance.value !==
        ethers.utils.formatUnits(response.balance, response.decimals)
      ) {
        toastStore.push(ToastTransaction);
      }
    }

    balance.value = ethers.utils.formatUnits(
      response.balance,
      response.decimals
    );
    inBets.value = ethers.utils.formatUnits(response.inBets, response.decimals);
    // for deposit
    contractAddress.value = response.contractAddress;
    hotAddress.value = response.hotAddress;
    // transaction
    transactions.value = response.transactions;
    transactions.value.map(
      (x) => (x.amount = ethers.utils.formatUnits(x.amount, response.decimals))
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
        router.push({ name: "mma" });
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

  async function deposit(deposit: string) {
    try {
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
        router.push({ name: "mma" });
        return;
      }
      checkMetamask();
      const [etheriumWallet] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await getWallet(true);
      if (etheriumWallet !== address.value) {
        modalStore.modalNotificationContent = DepositError;
        modalStore.isModalNotification = true;
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      if (currentAsset.value === "eth") {
        await signer.sendTransaction({
          to: hotAddress.value,
          value: ethers.utils.parseUnits(deposit),
        });
      } else {
        const contract = new ethers.Contract(
          contractAddress.value,
          contractABI,
          signer
        );

        const gasLimit = await contract.estimateGas.transfer(
          hotAddress.value,
          ethers.utils.parseUnits(deposit, decimals.value).toString()
        );
        const gasPrice = await provider.getGasPrice();
        await contract.transfer(
          hotAddress.value,
          ethers.utils.parseUnits(deposit, decimals.value).toString(),
          {
            gasLimit: gasLimit,
            gasPrice: gasPrice,
          }
        );
      }

      modalStore.modalNotificationContent = DepositSuccess;
      modalStore.isModalNotification = true;

      await lockWallet();
      await getWallet(false);
    } catch (error: any) {
      modalStore.modalNotificationContent = WalletConnectError;
      modalStore.isModalNotification = true;
    }
  }

  async function withdraw() {
    if (withdrawAmount.value) {
      const response = await withdrawForUser(
        ethers.utils
          .parseUnits(withdrawAmount.value, decimals.value)
          .toString(),
        currentAsset.value
      );
      return response;
    }
  }

  return {
    address,
    inBets,
    balance,
    ethBalance,
    transactions,
    isWalletPage,
    assets,
    currentAsset,
    decimals,
    isDisconnectLocked,
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
