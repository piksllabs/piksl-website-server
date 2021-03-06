const apiurl = "https://api.piksl.io"
const contract = "0x7bC0C408a3C7A242d4278A31b368852109B9974C"
console.log(apiurl);
const contract_abi = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }],
    "name": "ApprovalForAll",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
}, {
    "inputs": [],
    "name": "MaxPurchase",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "MaxTokens",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "PikslMarketAddress",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "Price",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "baseURI",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "getApproved",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "numberOfTokens",
        "type": "uint256"
    }],
    "name": "mintPublicTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "name",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "ownerOf",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }, {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
    }],
    "name": "supportsInterface",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "tokenByIndex",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "tokenURI",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "string",
        "name": "baseURI",
        "type": "string"
    }],
    "name": "updateBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "marketaddress",
        "type": "address"
    }],
    "name": "updatePikslMarketAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "_pricePerTokenInWei",
        "type": "uint256"
    }],
    "name": "updatePrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
const marketplaceaddress = "0xC0E453a24a3E7BC84716489Bb2D54249459739Eb"
const marketplace_abi = [{
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
    }],
    "name": "invalidsign",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "listprice",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "expirationtimestamp",
        "type": "uint256"
    }, {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
    }],
    "name": "piksltransfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes32",
        "name": "_ethSignedMessageHash",
        "type": "bytes32"
    }, {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
    }],
    "name": "recoverSigner",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "pure",
    "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "contractaddress",
        "type": "address"
    }],
    "name": "updatedripclubcontract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
    }],
    "name": "updateinvalidsign",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "signeraddress",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenid",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "listprice",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "expirationtimestamp",
        "type": "uint256"
    }, {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
    }],
    "name": "verifysignature",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "pure",
    "type": "function"
}]

let WETH_ADDRESS;
let WETH_ABI;
let etherscanurl;
const network = "mainnet";
if (network == "rinkeby") {
    etherscanurl = "https://rinkeby.etherscan.io"
    WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab"
    WETH_ABI = [{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "guy",
            "type": "address"
        }, {
            "name": "wad",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "src",
            "type": "address"
        }, {
            "name": "dst",
            "type": "address"
        }, {
            "name": "wad",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "wad",
            "type": "uint256"
        }],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "dst",
            "type": "address"
        }, {
            "name": "wad",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }, {
            "name": "",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "src",
            "type": "address"
        }, {
            "indexed": true,
            "name": "guy",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "src",
            "type": "address"
        }, {
            "indexed": true,
            "name": "dst",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "dst",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Deposit",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "src",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Withdrawal",
        "type": "event"
    }]
} else if (network == "mainnet") {
    etherscanurl = "https://etherscan.io"
    WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    WETH_ABI = [{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "guy",
            "type": "address"
        }, {
            "name": "wad",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "src",
            "type": "address"
        }, {
            "name": "dst",
            "type": "address"
        }, {
            "name": "wad",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "wad",
            "type": "uint256"
        }],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "name": "",
            "type": "uint8"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "name": "",
            "type": "string"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{
            "name": "dst",
            "type": "address"
        }, {
            "name": "wad",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{
            "name": "",
            "type": "bool"
        }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{
            "name": "",
            "type": "address"
        }, {
            "name": "",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{
            "name": "",
            "type": "uint256"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "src",
            "type": "address"
        }, {
            "indexed": true,
            "name": "guy",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "src",
            "type": "address"
        }, {
            "indexed": true,
            "name": "dst",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "dst",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Deposit",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "name": "src",
            "type": "address"
        }, {
            "indexed": false,
            "name": "wad",
            "type": "uint256"
        }],
        "name": "Withdrawal",
        "type": "event"
    }]
}