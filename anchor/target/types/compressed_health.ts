/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/compressed_health.json`.
 */
export type CompressedHealth = {
  "address": "73bxU5B3qZV1UwnMPj4EZQJehSa2ka8vz7DE8WDwA8Lp",
  "metadata": {
    "name": "compressedHealth",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Simplified compressed health records using batch operations"
  },
  "instructions": [
    {
      "name": "anchorRecord",
      "discriminator": [
        49,
        213,
        61,
        89,
        178,
        123,
        20,
        110
      ],
      "accounts": [
        {
          "name": "recordAnchor",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "recordCid",
          "type": "string"
        }
      ]
    },
    {
      "name": "batchCreateRecords",
      "discriminator": [
        13,
        147,
        191,
        19,
        62,
        218,
        46,
        136
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "batch",
          "type": {
            "vec": {
              "defined": {
                "name": "recordData"
              }
            }
          }
        }
      ]
    },
    {
      "name": "deleteRecord",
      "discriminator": [
        177,
        191,
        85,
        153,
        140,
        226,
        175,
        112
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "recordIndex",
          "type": "u64"
        }
      ]
    },
    {
      "name": "getRecordCount",
      "discriminator": [
        133,
        22,
        216,
        179,
        28,
        56,
        144,
        26
      ],
      "accounts": [
        {
          "name": "config",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "initializeConfig",
      "discriminator": [
        208,
        127,
        21,
        1,
        194,
        190,
        196,
        70
      ],
      "accounts": [
        {
          "name": "config",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "logConsentGranted",
      "discriminator": [
        171,
        160,
        225,
        180,
        119,
        204,
        183,
        174
      ],
      "accounts": [
        {
          "name": "issuer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "consentCidHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "recordCidHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "recipient",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "logConsentRevoked",
      "discriminator": [
        35,
        69,
        64,
        92,
        132,
        193,
        117,
        254
      ],
      "accounts": [
        {
          "name": "issuer",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "consentCidHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "reasonHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "config",
      "discriminator": [
        155,
        12,
        170,
        224,
        30,
        250,
        204,
        130
      ]
    },
    {
      "name": "recordAnchor",
      "discriminator": [
        124,
        103,
        34,
        26,
        130,
        139,
        81,
        172
      ]
    }
  ],
  "events": [
    {
      "name": "consentGranted",
      "discriminator": [
        151,
        98,
        229,
        56,
        36,
        111,
        88,
        46
      ]
    },
    {
      "name": "consentRevoked",
      "discriminator": [
        56,
        245,
        136,
        57,
        212,
        252,
        122,
        43
      ]
    },
    {
      "name": "recordAnchored",
      "discriminator": [
        184,
        128,
        232,
        252,
        105,
        85,
        4,
        125
      ]
    },
    {
      "name": "recordCreated",
      "discriminator": [
        7,
        2,
        32,
        66,
        135,
        168,
        104,
        225
      ]
    },
    {
      "name": "recordDeleted",
      "discriminator": [
        126,
        72,
        56,
        173,
        183,
        249,
        7,
        164
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "cidTooLong",
      "msg": "CID too long"
    },
    {
      "code": 6001,
      "name": "titleTooLong",
      "msg": "Title too long"
    },
    {
      "code": 6002,
      "name": "batchTooLarge",
      "msg": "Batch size exceeds maximum"
    },
    {
      "code": 6003,
      "name": "overflow",
      "msg": "Numeric overflow"
    },
    {
      "code": 6004,
      "name": "unauthorizedRecordOwner",
      "msg": "Unauthorized: record owner must match signer"
    },
    {
      "code": 6005,
      "name": "dailyLimitExceeded",
      "msg": "Daily record limit exceeded"
    }
  ],
  "types": [
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "recordCount",
            "type": "u64"
          },
          {
            "name": "deletedCount",
            "type": "u64"
          },
          {
            "name": "dailyRecordCount",
            "type": "u64"
          },
          {
            "name": "lastUpdateTimestamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "consentGranted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "consentCid",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "recordCid",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "issuer",
            "type": "pubkey"
          },
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "consentRevoked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "consentCid",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "issuer",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "reasonHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "recordAnchor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "recordCid",
            "type": "string"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "recordAnchored",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "recordCid",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "recordCreated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "recordHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "recordIndex",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "recordData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "cid",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "recordDeleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "recordIndex",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ]
};
