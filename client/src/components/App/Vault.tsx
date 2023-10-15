import { useFieldArray, useForm } from "react-hook-form";
import { encryptVault } from "../../utils/crypto";
import { VaultItem } from "../../types";
import FormWrapper from "../FormWrapper";
import styles from "../../styles/Popup.module.css";
import React from "react";

function Vault({
  vault = [],
  vaultKey = "",
}: {
  vault: VaultItem[];
  vaultKey: string;
}) {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "vault",
  });

  // const mutation = useMutation(saveVault);

  return (
    <div className={styles.Vault}>
    <FormWrapper
      onSubmit={handleSubmit(({ vault }) => {
        console.log({ vault });

        const encryptedVault = encryptVault({
          vault: JSON.stringify({ vault }),
          vaultKey,
        });

        window.sessionStorage.setItem("vault", JSON.stringify(vault));

        // mutation.mutate({
        //   encryptedVault,
        // });
      })}
    >
      {fields.map((field, index) => {
        return (
          <div key={field.id} className={styles.vaultBox}>
              <input
                type="url"
                id="website"
                placeholder="Website"
                {...register(`vault.${index}.website`, {
                  required: "Website is required",
                })}
              />

              <input
                id="username"
                placeholder="Username"
                {...register(`vault.${index}.username`, {
                  required: "Username is required",
                })}
              />

              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register(`vault.${index}.password`, {
                  required: "Password is required",
                })}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className={styles.RemoveBtn}
              >
                Remove
              </button>
            </div>
        );
      })}

      <div className={styles.vaultBtn}>
        <button
          className={styles.Add_btn}
          onClick={() => append({ website: "", username: "", password: "" })}
        >
          Add
        </button>

        <button type="submit" className={styles.saveVaultBtn}>
          Save vault
        </button>
      </div>
    </FormWrapper>
    </div>
  );
}

export default Vault;
