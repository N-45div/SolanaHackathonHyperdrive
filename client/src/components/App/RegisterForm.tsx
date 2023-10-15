import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { generateVaultKey, hashPassword } from "../../utils/crypto";
import { VaultItem } from "../../types";
import FormWrapper from "../FormWrapper";
import { useSession } from "next-auth/react";
import { fetcher } from "../../utils/use-data-fetcher";
import { RegisterUserData } from "../../pages/api/user/register";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { TxSendData } from "../../pages/api/tx/send";
import { decryptVault } from "../../utils/crypto";
import styles from "../../styles/Popup.module.css";
import React from "react";

function RegisterForm({
  setVaultKey,
  setStep,
  setVault,
}: {
  setVaultKey: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<"login" | "register" | "unlock" | "vault">>;
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
}) {

  const { data: session, status } = useSession();
  const walletState = useWallet();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ wallet: string; password: string; hashedPassword: string }>();

  const handleRegister = useCallback(async () => {
    try {
      const { txs, salt, vault } = await fetcher<RegisterUserData>(
        `/api/user/register`,
        { method: "POST" }
      );
      
      if (!txs) throw new Error(`Error: ${txs}`);

      const registerTxs = txs.map((tx) =>
        Transaction.from(Buffer.from(tx, "base64"))
      );
      const signedTransactions = await walletState.signAllTransactions?.(registerTxs);
      const signedTxsBase64 = signedTransactions?.map((signedTx) =>
        signedTx.serialize().toString("base64")
      );

      let { confirmed, message } = await fetcher<TxSendData>("/api/tx/send", {
        method: "POST",
        body: JSON.stringify({ signedTxs: signedTxsBase64 }),
      });

      if (!confirmed) throw new Error(`Error: ${message}`);

      if (!salt || !vault) throw new Error(`Error: Invalid Salt or Vault`);
      
      const hashedPassword = getValues("hashedPassword");

      const wallet = getValues("wallet");

      const vaultKey = generateVaultKey({
        hashedPassword,
        wallet,
        salt,
      });

      window.sessionStorage.setItem("vk", vaultKey);

      const decryptedVault = decryptVault({ vault, vaultKey });

      setVaultKey(vaultKey);
      setVault(decryptedVault);

      window.sessionStorage.setItem("vault", JSON.stringify(decryptedVault));

      setStep("vault");

    }catch(error){
      console.log(error);
    }
  },[getValues, setStep, setVault, setVaultKey, walletState]);

  useEffect(() => {
    if (!session?.user || !walletState) {
      setStep("login");
    }
  }, [session?.user, setStep, status, walletState]);

  return (
    <div className={styles.RegisterForm}>
    <FormWrapper
      onSubmit={handleSubmit(() => {
        const password = getValues("password");
        const wallet = getValues("wallet");

        const hashedPassword = hashPassword(password);

        setValue("hashedPassword", hashedPassword);

        handleRegister();
      })}
    >
      <header>Register</header>

        <input
          id="wallet"
          value={String(walletState?.publicKey)}
          {...register("wallet")}
          readOnly
        />
        <input
          id="password"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 characters long",
            },
          })}
        />
        <p className={styles.error}>
          {errors.wallet && errors.wallet.message}
        </p>

      <button type="submit">Register</button>
    </FormWrapper>
    </div>
  );
}

export default RegisterForm;
