import { ethers } from 'hardhat'

async function main() {
  const Contract = await ethers.getContractFactory('TestToken')

  console.log('Deploying token...')
  const contract = await Contract.deploy()

  await contract.waitForDeployment()
  console.log('token deployed to:', await contract.getAddress())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
