import { ethers } from 'hardhat'
import fs from 'fs'
import path from 'path'

async function main() {
  const Contract = await ethers.getContractFactory('TestToken')

  console.log('Deploying token...')
  const contract = await Contract.deploy()

  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress()
  console.log('token deployed to:', contractAddress)

  const deployedAddressPath = path.join(__dirname, '..', 'utils', 'deployed-address.ts')

  const fileContent = `const deployedAddress = '${contractAddress}'\n\nexport default deployedAddress\n`

  fs.writeFileSync(deployedAddressPath, fileContent, { encoding: 'utf8' })
  console.log('Address written to deployedAddress.ts')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
