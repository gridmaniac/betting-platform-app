export enum ERoutes {
  // user
  Login = "api/v1/login",
  Signup = "api/v1/signup",
  ForgotPassword = "api/v1/password/reset",
  ChangePassword = "api/v1/password",
  Activate = "api/v1/activate",
  Profile = "api/v1/profile",
  // bet
  Seasons = "/api/v1/seasons/",
  Events = "/api/v1/events/",
  Bets = "/api/v1/bets",
  Assets = "/api/v1/assets",
  // wallet
  Wallet = "/api/v1/wallet",
  WalletWithdraw = "/api/v1/wallet/withdraw",
  WalletAddress = "/api/v1/wallet/address",
  LockWallet = "/api/v1/wallet/lock",
}

export enum EAdminRoutes {
  Setting = "/api/admin/settings",
  Assets = "/api/admin/assets",
  Deposits = "/api/admin/deposits",
  Balances = "/api/admin/balances",
  Transactions = "/api/admin/transactions",
  Bets = "/api/admin/bets",
  Users = "/api/admin/users",
}
