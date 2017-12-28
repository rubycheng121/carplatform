'use strict'

module.exports = (newSerialNumber, newLicensePlateNumber, newOriginalPrice, newLabel,
  newAutomotiveType, newYears, newDisplacement, newFuelConsumptionH, newFuelConsumptionS,
  newTransmissionSystem, newAccidentRecord, newMileage, newAverageSpeed,
  newUserID, newStatus,newSalePrice) => {
  const path = require('path')
  const fs = require('fs')
  const provider = "http://localhost:8545"

  const Web3 = require('web3')
  const web3 = new Web3(new Web3.providers.HttpProvider(provider))

  const carContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'carContract' + '.json')))
  const carContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'carContract' + '.bin')).toString()

  let carContract = web3.eth.contract(carContract_abi);

  return (new Promise((res, rej) => {
    // console.log(newSerialNumber);
    // console.log('=========');
    // console.log("s");
    // console.log(newLicensePlateNumber);
    // console.log('=========');
    // console.log("newLicensePlateNumber");
    // console.log(newOriginalPrice);
    // console.log('=========');
    // console.log(9);
    // console.log(newLabel);
    // console.log('=========');
    // console.log("newLabel");
    // console.log(newAutomotiveType);
    // console.log('=========');
    // console.log("newAutomotiveType");
    // console.log(newYears);
    // console.log('=========');
    // console.log("newYears");
    // console.log(newDisplacement);
    // console.log('=========');
    // console.log(8);
    // console.log(newFuelConsumptionH);
    // console.log('=========');
    // console.log(3);
    // console.log(newFuelConsumptionS);
    // console.log('=========');
    // console.log(2);
    // console.log(newTransmissionSystem);
    // console.log('=========');
    // console.log("newTransmissionSystem");
    // console.log(newAccidentRecord);
    // console.log('=========');
    // console.log("newAccidentRecord");
    // console.log(newMileage);
    // console.log('=========');
    // console.log(3);
    // console.log(newAverageSpeed);
    // console.log('=========');
    // console.log(5);
    // console.log(newUserID);
    // console.log('=========');
    // console.log("ewUserID");
    // console.log(newStatus);
    // console.log('=========');
    // console.log(true);
    // console.log(newSalePrice);
    // console.log('=========');
    // console.log(3);
    carContract.new(
      newSerialNumber, newLicensePlateNumber, newOriginalPrice, newLabel,
        newAutomotiveType, newYears, newDisplacement, newFuelConsumptionH, newFuelConsumptionS,
         newAccidentRecord, newMileage, newAverageSpeed,
        newUserID, newStatus,newSalePrice,
    //   "s","newLicensePlateNumber",9,"newLabel","newAutomotiveType","newYears",8,3
    // ,2,"newAccidentRecord",3,5,"ewUserID",true,3,
    {
        from: web3.eth.coinbase,
        gas: 88888888,
        data: carContract_bytecode
      }, (err, carContract) => {
        if (err) {
          return rej(err)
        }

        if (carContract.address !== undefined && carContract.address !== null) {
          console.log('=======================');
          console.log('newSerialNumber: ');
          console.log(newSerialNumber);

          console.log('carContract_ADDRESS', carContract.address)
          return res(carContract.address)
        }
      })
  }))
}
