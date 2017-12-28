'use strict'

module.exports = (newSerialNumber, newLicensePlateNumber,
  newOriginalPrice, newLabel, newAutomotiveType,
  newYears, newDisplacement, newFuelConsumptionH,
  newFuelConsumptionS, newAutomotiveBody, newTransmissionSystem,
  newAccidentRecord, newMileage, newAverageSpeed, newUserID, newStatus) => {

  const path = require('path')
  const fs = require('fs')
  const provider = "http://localhost:8545"

  const Web3 = require('web3')
  const web3 = new Web3(new Web3.providers.HttpProvider(provider))

  const userContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'userContract' + '.json')))
  const userContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'userContract' + '.bin')).toString()


  let userContract = web3.eth.contract(userContract_abi);

  return (new Promise((res, rej) => {
    userContract.new(newSerialNumber, newLicensePlateNumber,
      newOriginalPrice, newLabel, newAutomotiveType,
      newYears, newDisplacement, newFuelConsumptionH,
      newFuelConsumptionS, newAutomotiveBody, newTransmissionSystem,
      newAccidentRecord, newMileage, newAverageSpeed, newUserID, newStatus, {
        from: web3.eth.coinbase,
        gas: 88888888,
        data: userContract_bytecode
      }, (err, userContract) => {
        if (err) {
          return rej(err)
        }

        if (userContract.address !== undefined && userContract.address !== null) {
          console.log('userContract_ADDRESS', userContract.address)
          return res(userContract.address)
        }
      })
  }))
}
