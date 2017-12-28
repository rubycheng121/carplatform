'use strict'

module.exports = (newSerialNumber, newLicensePlateNumber, newOriginalPrice, newLabel,
  newAutomotiveType, newYears, newDisplacement, newFuelConsumptionH, newFuelConsumptionS,
  newAutomotiveBody, newTransmissionSystem, newAccidentRecord, newMileage, newAverageSpeed,
  newUserID, newStatus) => {
  const path = require('path')
  const fs = require('fs')
  const provider = "http://localhost:8545"

  const Web3 = require('web3')
  const web3 = new Web3(new Web3.providers.HttpProvider(provider))

  const carContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'carContract' + '.json')))
  const carContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'carContract' + '.bin')).toString()

  let carContract = web3.eth.contract(carContract_abi);

  return (new Promise((res, rej) => {
    carContract.new(newSerialNumber, newLicensePlateNumber, newOriginalPrice, newLabel,
      newAutomotiveType, newYears, newDisplacement, newFuelConsumptionH, newFuelConsumptionS,
      newAutomotiveBody, newTransmissionSystem, newAccidentRecord, newMileage, newAverageSpeed,
      newUserID, newStatus, {
        from: web3.eth.coinbase,
        gas: 88888888,
        data: carContract_bytecode
      }, (err, carContract) => {
        if (err) {
          return rej(err)
        }

        if (carContract.address !== undefined && carContract.address !== null) {
          console.log('carContract_ADDRESS', carContract.address)
          return res(carContract.address)
        }
      })
  }))
}
