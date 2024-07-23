import { ethers, network } from 'hardhat'
import { encryptDataField, decryptNodeResponse } from '@swisstronik/utils'
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider'
import { JsonRpcProvider } from 'ethers'
import { HttpNetworkConfig } from 'hardhat/types'

const sendShieldedQuery = async (
  provider: HardhatEthersProvider | JsonRpcProvider,
  destination: string,
  data: string
) => {
  const rpclink = (network.config as HttpNetworkConfig).url

  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data)

  const response = await provider.call({
    to: destination,
    data: encryptedData,
  })

  return await decryptNodeResponse(rpclink, response, usedEncryptedKey)
}

async function main() {
  const contractAddress = '0x37401D115bC52bBdaa59Df7f7e021523b020F98f'
  const [signer] = await ethers.getSigners()

  const contractFactory = await ethers.getContractFactory('TestToken')
  const contract = contractFactory.attach(contractAddress)

  const functionName = 'totalSupply'
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName)
  )

  const totalSupply = contract.interface.decodeFunctionResult(functionName, responseMessage)[0]
  console.log('Total Supply is:', ethers.formatUnits(totalSupply, 18))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
