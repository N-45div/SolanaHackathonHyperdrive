import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Vault from "../components/Vault";
import styles from "../styles/Home.module.css";
import { VaultItem } from "../types";
import UnlockForm from "../components/UnlockForm";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {

  const { data: session, status } = useSession();

  const [step, setStep] = useState<"login" | "register" | "unlock" | "vault">("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");
  const wallet = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // // Set isConnected state when publicKey changes
  useEffect(() => {
    setIsConnected(wallet.publicKey !== null);
  }, [wallet.publicKey]);

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

  // Function to handle the Login button click
  const handleLoginClick = () => {
    wallet.disconnect();
    signOut();
    setStep("login"); // Set the step to "login" when the user clicks Login
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Veil</title>
        <meta name="description" content="Solana Password Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isConnected && session ? (
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
  );
};

export default Home;
