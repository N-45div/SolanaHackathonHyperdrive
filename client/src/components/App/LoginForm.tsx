import { Dispatch, SetStateAction, useState } from "react";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import { SigninMessage } from "../../utils/SignMessage";
import bs58 from "bs58";
import { useCallback, useEffect } from "react";
import { fetcher } from "../../utils/use-data-fetcher";
import { LoginUserData } from "../../pages/api/user/[wallet]";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
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

function LoginForm({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<"login" | "register" | "unlock" | "vault">>;
}) {
  
  const { data: session, status } = useSession();

  const wallet = useWallet();
  const { publicKey } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // // Set isConnected state when publicKey changes
  useEffect(() => {
    setIsConnected(publicKey !== null);
  }, [publicKey]);

  const choseStep = useCallback(async () => {
    const { userAccount: userAccount } = await fetcher<LoginUserData>(
      `/api/user/${wallet.publicKey}`,
      { method: "GET" }
    );

    if(userAccount)
      setStep("unlock");
    else
      setStep("register");

    // setStep("vault");
  },[setStep, wallet.publicKey])

  const handleSignIn = useCallback(async () => {
    try {

      const csrf = await getCsrfToken();
      if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

      const message = new SigninMessage({
        domain: window.location.host,
        publicKey: wallet.publicKey?.toBase58(),
        statement: `Sign this message to sign in to the app.`,
        nonce: csrf,
      });

      const data = new TextEncoder().encode(message.prepare());
      const signature = await wallet.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature: serializedSignature,
      });

      await choseStep();

    } catch (error) {
      console.log(error);
    }
  },[choseStep, wallet]);

  useEffect(() => {
    if (wallet.connected && status === "authenticated") {
      choseStep();
    }
  }, [choseStep, handleSignIn, status, wallet.connected]);

  return (
    <div>
      <div className={styles.multiWalletDiv}>
      <h1>Trusty Pass</h1>
        <p>
          Revolutionize your online presence with Trusty Pass, a
          state-of-the-art Web3 website manager built on the lightning-fast
          Solana blockchain.
        </p>
        {!isConnected ? (
          
            <div className={styles.WalletMultiButton_btn}>
              <WalletMultiButton/>
            </div>
        ):(
          <button className={styles.WalletMultiButton_btn} onClick={handleSignIn}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
