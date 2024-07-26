import { ethers, network } from 'hardhat'
import { encryptDataField, decryptNodeResponse } from '@swisstronik/utils'
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider'
import { JsonRpcProvider } from 'ethers'
import { HttpNetworkConfig } from 'hardhat/types'
import deployedAddress from '../utils/deployed-address'

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
  const contractAddress = deployedAddress
  const [signer] = await ethers.getSigners()

  const contractFactory = await ethers.getContractFactory('TestToken')
  const contract = contractFactory.attach(contractAddress)

  const functionName = 'balanceOf'
  const functionArgs = [signer.address]
  const responseMessage = await sendShieldedQuery(
    signer.provider,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs)
  )
  const totalBalance = contract.interface.decodeFunctionResult(functionName, responseMessage)[0]

  console.log('Total Balance is:', ethers.formatUnits(totalBalance, 18))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
