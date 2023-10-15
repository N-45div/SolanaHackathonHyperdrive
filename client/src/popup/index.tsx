// Import necessary modules and components
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
import { useWallet } from "@solana/wallet-adapter-react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  // GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  SolflareWalletAdapter,
  // SolletExtensionWalletAdapter,
  // SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import styles from "../styles/Popup.module.css";
import UnlockForm from "../components/UnlockForm";
require("@solana/wallet-adapter-react-ui/styles.css");

const queryClient = new QueryClient();

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

function Home() {
  const { publicKey } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // // Set isConnected state when publicKey changes
  useEffect(() => {
    setIsConnected(publicKey !== null);
  }, [publicKey]);
  // State variables to manage the current step and vault data
  const [step, setStep] = useState<"login" | "register" | "unlock" | "vault">("register");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault) {
      setVault(JSON.parse(vault));
    }

    if (vaultKey) {
      setVaultKey(vaultKey);
      setStep("vault");
    }
  }, []);
  // Function to handle the Register button click
  const handleRegisterClick = () => {
    setStep("register"); // Set the step to "register" when the user clicks Register
  };

  // Function to handle the Login button click
  const handleLoginClick = () => {
    setStep("login"); // Set the step to "login" when the user clicks Login
  };

  const handleOpenNewTab = () => {
    // Open a new tab with specified URL
    window.open("popup.html", "_blank");
  };



  // you can use Mainnet, Devnet or Testnet here
  const solNetwork = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      // new GlowWalletAdapter(),
      // new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      // new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      // new SolletExtensionWalletAdapter(),
      // new SolletWalletAdapter(),
    ],
    []
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets}>
            <WalletModalProvider>
              <div className={styles.popup_container}>
              <main className={styles.main}>
                  {isConnected ? (
                    <div>
                      {/* Render components based on the current step */}
                      {step === "register" && (
                        <div className={styles.mainDiv}>
                          <RegisterForm setStep={setStep} setVault={setVault} setVaultKey={setVaultKey} />
                          <p className={styles.account}> Already have another account? </p>
                          <button
                            onClick={handleLoginClick}
                            className={styles.handleLoginClick}
                          >
                            Login
                          </button>
                        </div>
                      )}
                      {step === "unlock" && <UnlockForm setStep={setStep} setVaultKey={setVaultKey} setVault={setVault}/>}
                      {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
                    </div>
                  ) : (
                    <LoginForm
                      setStep={setStep}
                    />
                  )}
                </main>
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default Home;
