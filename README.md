# Swisstronik Tesnet Techinal Task 2

link : [Click!](https://www.swisstronik.com/testnet2/dashboard)

Feel free donate to my EVM address

EVM :

```bash
0x9902C3A98Df4b240ad5496cC26F89bAb8058f4aE
```

## Steps

### 1. Clone Repository

```bash
git clone https://github.com/Mnuralim/swisstronik-erc20-mint-token.git
```

```
cd swisstronik-erc20-mint-token
```

### 2. Install Dependency

```bash
npm install
```

### 3. Set .env File

create .env file in root project

```bash
PRIVATE_KEY="your private key"
```

### 4. Create Smart Contract

- Open contract folder
- Create Token.sol file
- Copy this code and paste there
- Feel free to modify token name and token symbol

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor()ERC20("IzzyToken","IZZY"){}

    function mint1000tokens() public {
        _mint(msg.sender,1000*10**18);
    }

    function burn1000tokens() public{
        _burn(msg.sender,1000*10**18);
    }

}
```

### 5. Compile Smart Contract

```bash
npm run compile
```

### 6. Deploy Smart Contract

```bash
npm run deploy
```

### 7. Mint Token

```bash
npm run mint
```

### 8. Check Supply

```bash
npm run check-supply
```

### 9. Check Balance

```bash
npm run balance-of
```

### 10. Tranfer Token

```bash
npm run transfer
```

### 11. Finsihed

- Open the deployed-adddress.ts (location in utils folder)
- Copy the address and paste the address in testnet dashboard
- push this project to your github and paste your repository link in testnet dashboard

by :
github : [Mnuralim](https://github.com/Mnuralim)
twitter : @Izzycracker04
telegram : @fitriay19
//0x37401D115bC52bBdaa59Df7f7e021523b020F98f
