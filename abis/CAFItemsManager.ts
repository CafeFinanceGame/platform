export default [
    {
        inputs: [
            {
                internalType: "address",
                name: "_contractRegistry",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "AccessControlBadConfirmation",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "neededRole",
                type: "bytes32",
            },
        ],
        name: "AccessControlUnauthorizedAccount",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "needed",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ERC1155InsufficientBalance",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "approver",
                type: "address",
            },
        ],
        name: "ERC1155InvalidApprover",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "idsLength",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "valuesLength",
                type: "uint256",
            },
        ],
        name: "ERC1155InvalidArrayLength",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "ERC1155InvalidOperator",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
        ],
        name: "ERC1155InvalidReceiver",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "ERC1155InvalidSender",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "ERC1155MissingApprovalForAll",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "companyId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "CompanyItemCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "companyId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "EnergyConsumed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "companyId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "EnergyReplenished",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "companyId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "EnergyUsed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "eventId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "enum ItemLibrary.EventItemType",
                name: "eventType",
                type: "uint8",
            },
        ],
        name: "EventItemCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "eventId",
                type: "uint256",
            },
        ],
        name: "EventItemEnded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "eventId",
                type: "uint256",
            },
        ],
        name: "EventItemStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "lastDecayed",
                type: "uint256",
            },
        ],
        name: "ItemDecayed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "itemId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "companyId",
                type: "uint256",
            },
        ],
        name: "ProductItemCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "itemId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "enum ItemLibrary.ProductItemType",
                name: "productType",
                type: "uint8",
            },
        ],
        name: "ProductItemManufactured",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "enum ItemLibrary.ProductItemType",
                name: "_productType",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_rateProducedPerHour",
                type: "uint256",
            },
        ],
        name: "ProductsProduced",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "TransferBatch",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "URI",
        type: "event",
    },
    {
        inputs: [],
        name: "ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "SYSTEM_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "autoDecayAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "autoProduceProducts",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "balanceOfBatch",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
            {
                internalType: "enum ItemLibrary.CompanyType",
                name: "_role",
                type: "uint8",
            },
        ],
        name: "createCompanyItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum ItemLibrary.EventItemType",
                name: "_eventType",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "_startDate",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_endDate",
                type: "uint256",
            },
        ],
        name: "createEventItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_companyId",
                type: "uint256",
            },
            {
                internalType: "enum ItemLibrary.ProductItemType",
                name: "_productType",
                type: "uint8",
            },
        ],
        name: "createProductItem",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_itemId",
                type: "uint256",
            },
        ],
        name: "decay",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_eventId",
                type: "uint256",
            },
        ],
        name: "endEvent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllActiveEventItemIds",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllCompanyItemIds",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllEventItemIds",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "getAllProductItemByOwner",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllProductItemIds",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_companyId",
                type: "uint256",
            },
        ],
        name: "getCompanyItem",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address",
                    },
                    {
                        internalType: "enum ItemLibrary.CompanyType",
                        name: "role",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "energy",
                        type: "uint8",
                    },
                ],
                internalType: "struct ICAFCompanyItems.CompanyItem",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "getCompanyItemByOwner",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_eventId",
                type: "uint256",
            },
        ],
        name: "getEventItem",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum ItemLibrary.EventItemType",
                        name: "eventType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "startDate",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endDate",
                        type: "uint256",
                    },
                ],
                internalType: "struct ICAFEventItems.EventItem",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNextItemId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_itemId",
                type: "uint256",
            },
        ],
        name: "getProductItem",
        outputs: [
            {
                components: [
                    {
                        internalType: "enum ItemLibrary.ProductItemType",
                        name: "productType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "energy",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "durability",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "decayRatePerQuarterDay",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "mfgTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "expTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "lastDecayTime",
                        type: "uint256",
                    },
                ],
                internalType: "struct ICAFProductItems.ProductItem",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
        ],
        name: "hasCompanyItem",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_itemId",
                type: "uint256",
            },
        ],
        name: "hasProductItem",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum ItemLibrary.ProductItemType",
                name: "_productType",
                type: "uint8",
            },
            {
                internalType: "uint256[]",
                name: "_componentIds",
                type: "uint256[]",
            },
        ],
        name: "manufacture",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "popNotListedItem",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum ItemLibrary.ProductItemType",
                name: "_productType",
                type: "uint8",
            },
            {
                internalType: "uint256",
                name: "_rateProducedPerHour",
                type: "uint256",
            },
        ],
        name: "produceProducts",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "callerConfirmation",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_companyId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_itemId",
                type: "uint256",
            },
        ],
        name: "replenishEnergy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeBatchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "setUp",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_eventId",
                type: "uint256",
            },
        ],
        name: "startEvent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "uri",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_companyId",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "_amount",
                type: "uint8",
            },
        ],
        name: "useEnergy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;