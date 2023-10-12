export type PassManager = {
  "version": "0.1.0",
  "name": "pass_manager",
  "instructions": [
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultInput",
          "type": {
            "defined": "CreateVaultInput"
          }
        }
      ]
    },
    {
      "name": "deleteVault",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "resizeVault",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "ResizeVaultInput"
          }
        }
      ]
    },
    {
      "name": "writeToVault",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "WriteToVaultInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "salt",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateVaultInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxDataLength",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "ResizeVaultInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "change",
            "type": {
              "defined": "Change"
            }
          },
          {
            "name": "expectedStartSize",
            "type": "u32"
          },
          {
            "name": "targetSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "WriteToVaultInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "startPos",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "Change",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Reduce",
            "fields": [
              {
                "name": "amount",
                "type": "u32"
              }
            ]
          },
          {
            "name": "Increase",
            "fields": [
              {
                "name": "amount",
                "type": "u32"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "VaultEventType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Create"
          },
          {
            "name": "Update"
          },
          {
            "name": "Resize"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "VaultEventDelete",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "VaultResizeEvent",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "size",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "VaultResizeFinal",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "size",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "VaultWriteEvent",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "VaultEvent",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "eventType",
          "type": {
            "defined": "VaultEventType"
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IncorrectPassword",
      "msg": "The password is incorrect."
    },
    {
      "code": 6001,
      "name": "BadAuthority",
      "msg": "Bad authority"
    },
    {
      "code": 6002,
      "name": "MaxSizeExceeded",
      "msg": "Max size exceeded"
    }
  ]
};

export const IDL: PassManager = {
  "version": "0.1.0",
  "name": "pass_manager",
  "instructions": [
    {
      "name": "createVault",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultInput",
          "type": {
            "defined": "CreateVaultInput"
          }
        }
      ]
    },
    {
      "name": "deleteVault",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "resizeVault",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "ResizeVaultInput"
          }
        }
      ]
    },
    {
      "name": "writeToVault",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "input",
          "type": {
            "defined": "WriteToVaultInput"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "wallet",
            "type": "publicKey"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "salt",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateVaultInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "maxDataLength",
            "type": "u32"
          },
          {
            "name": "authority",
            "type": {
              "option": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "ResizeVaultInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "change",
            "type": {
              "defined": "Change"
            }
          },
          {
            "name": "expectedStartSize",
            "type": "u32"
          },
          {
            "name": "targetSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "WriteToVaultInput",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "startPos",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "Change",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Reduce",
            "fields": [
              {
                "name": "amount",
                "type": "u32"
              }
            ]
          },
          {
            "name": "Increase",
            "fields": [
              {
                "name": "amount",
                "type": "u32"
              }
            ]
          }
        ]
      }
    },
    {
      "name": "VaultEventType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Create"
          },
          {
            "name": "Update"
          },
          {
            "name": "Resize"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "VaultEventDelete",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "VaultResizeEvent",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "size",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "VaultResizeFinal",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "size",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "VaultWriteEvent",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "VaultEvent",
      "fields": [
        {
          "name": "id",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "eventType",
          "type": {
            "defined": "VaultEventType"
          },
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "IncorrectPassword",
      "msg": "The password is incorrect."
    },
    {
      "code": 6001,
      "name": "BadAuthority",
      "msg": "Bad authority"
    },
    {
      "code": 6002,
      "name": "MaxSizeExceeded",
      "msg": "Max size exceeded"
    }
  ]
};
