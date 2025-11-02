/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/health_anchor.json`.
 */
export type HealthAnchor = {
  "address": "JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H",
  "metadata": {
    "name": "healthAnchor",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createRecord",
      "discriminator": [
        116,
        124,
        63,
        58,
        126,
        204,
        178,
        10
      ],
      "accounts": [
        {
          "name": "record",
          "writable": true,
          "signer": true
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
      "args": [
        {
          "name": "cid",
          "type": "string"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "recipients",
          "type": {
            "vec": "pubkey"
          }
        },
        {
          "name": "encryptedKeys",
          "type": {
            "vec": "bytes"
          }
        }
      ]
    },
    {
      "name": "grantAccess",
      "discriminator": [
        66,
        88,
        87,
        113,
        39,
        22,
        27,
        165
      ],
      "accounts": [
        {
          "name": "record",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "pubkey"
        },
        {
          "name": "encryptedKey",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
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
          "name": "admin",
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
      "name": "revokeAccess",
      "discriminator": [
        106,
        128,
        38,
        169,
        103,
        238,
        102,
        147
      ],
      "accounts": [
        {
          "name": "record",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "recipient",
          "type": "pubkey"
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
      "name": "record",
      "discriminator": [
        254,
        233,
        117,
        252,
        76,
        166,
        146,
        139
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "recipientsKeysMismatch",
      "msg": "Recipients and encrypted keys arrays length mismatch"
    },
    {
      "code": 6001,
      "name": "tooManyRecipients",
      "msg": "Too many recipients"
    },
    {
      "code": 6002,
      "name": "cidTooLong",
      "msg": "CID too long"
    },
    {
      "code": 6003,
      "name": "titleTooLong",
      "msg": "Title too long"
    },
    {
      "code": 6004,
      "name": "encryptedKeyTooLarge",
      "msg": "Encrypted symmetric key too large"
    },
    {
      "code": 6005,
      "name": "unauthorized",
      "msg": "unauthorized"
    },
    {
      "code": 6006,
      "name": "recipientNotFound",
      "msg": "Recipient not found"
    }
  ],
  "types": [
    {
      "name": "accessEntry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "recipient",
            "type": "pubkey"
          },
          {
            "name": "encryptedKey",
            "type": "bytes"
          },
          {
            "name": "revoked",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "config",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "record",
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
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "accessEntries",
            "type": {
              "vec": {
                "defined": {
                  "name": "accessEntry"
                }
              }
            }
          }
        ]
      }
    }
  ]
};
