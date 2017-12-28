pragma solidity ^0.4.8;

contract carContract {
    /* define variable */
    string SerialNumber;
    string LicensePlateNumber;
    int OriginalPrice;
    string Label;
    string AutomotiveType;
    string Years;
    int Displacement;
    bytes32[] MaintainTime;
    int[] FuelConsumptionAvg;
    int FuelConsumptionH;
    int FuelConsumptionS;
    string TransmissionSystem;
    string AccidentRecord;
    int Mileage;
    int AverageSpeed;
    string UserID;
    bool Status;
    int SalePrice;

    string BubbleWaterCheckField;
    string SteeringWheelBodyCheck;
    string MotorBodyCheck;
    string EngineBodyCheckField;
    string VehicleExterior;
    string TransmissionBodyCheckField;
    string EngineNumberField;
    string MajorAccidentCheckField;
    string RoadStatusCheck;
    string FiveOilWaterLightInspectionField;
    string VehicleEquippedField;

    event finishEvent(bool success ,address maintainAddress_e);
    event carContractEventOne(string newSerialNumber_e,string newLicensePlateNumber_e,int newOriginalPrice_e,string newLabel_e,string newAutomotiveType_e,string newYears_e,int newDisplacement_e,int newFuelConsumptionH_e,int newFuelConsumptionS_e);
    event carContractEventTwo(string newSerialNumber_e,string newTransmissionSystem_e,string newAccidentRecord_e,int newMileage_e,int newAverageSpeed_e,string newUserID_e,address newUserAddress_e,bool newStatus_e);
    //event carContractEventone(string newSerialNumber,string newLicensePlateNumber,int newOriginalPrice,string newLabel,string newAutomotiveType,string newYears,int newDisplacement,int newFuelConsumptionH,int newFuelConsumptionS,string newTransmissionSystem,string newAccidentRecord,int newMileage,int newAverageSpeed);
    event setLicensePlateNumberEvent(string newLicensePlateNumber);
    event setuploadFuelConsumptionDataEvent(bytes3 newMaintainTime,int newFuelConsumptionAvg);
    event setAccidentRecordEvent(string newAccidentRecord);
    event setMileageEvent(int setMileage);
    event setAverageSpeedEvent(int setAverageSpeed);
    event setUserIDEvent(string setUserID);
    event setUserAddressEvent(address setUserAddress);
    event setStatusEvent(bool newStatus);
    event setSalePriceEvent(int newSalePrice);
    event setBubbleWaterCheckFieldEvent(string newBubbleWaterCheckField);
    event setSteeringWheelBodyCheckEvent(string newSteeringWheelBodyCheck);
    event setMotorBodyCheckEvent(string newMotorBodyCheck);
    event setEngineBodyCheckFieldEvent(string newEngineBodyCheckField);
    event setVehicleExteriorEvent(string newVehicleExterior);
    event setTransmissionBodyCheckFieldEvent(string newTransmissionBodyCheckField);
    event setEngineNumberFieldEvent(string newEngineNumberField);
    event setMajorAccidentCheckFieldEvent(string newMajorAccidentCheckField);
    event setRoadStatusCheckEvent(string newRoadStatusCheck);
    event setFiveOilWaterLightInspectionFieldEvent(string newFiveOilWaterLightInspectionField);
    event setVehicleEquippedFieldEvent(string newVehicleEquippedField);

    /* this runs when the contract is executed */
    function carContract(string newSerialNumber,string newLicensePlateNumber,int newOriginalPrice,string newLabel,string newAutomotiveType,string newYears,int newDisplacement,int newFuelConsumptionH
    ,int newFuelConsumptionS,string newTransmissionSystem,string newAccidentRecord
    ,int newMileage,int newAverageSpeed,string newUserID,bool newStatus,int newSalePrice) public {

        SerialNumber = newSerialNumber;
        LicensePlateNumber = newLicensePlateNumber;
        OriginalPrice = newOriginalPrice;
        Label = newLabel;
        AutomotiveType = newAutomotiveType;
        Years = newYears;
        Displacement = newDisplacement;
        FuelConsumptionH = newFuelConsumptionH;
        FuelConsumptionS = newFuelConsumptionS;
        TransmissionSystem = newTransmissionSystem;
        AccidentRecord = newAccidentRecord;
        Mileage = newMileage;
        AverageSpeed = newAverageSpeed;
        UserID = newUserID;
        Status = newStatus;
        SalePrice=newSalePrice;
        finishEvent(true,msg.sender);
        // carContractEventOne(newSerialNumber,newLicensePlateNumber,newOriginalPrice,newLabel,newAutomotiveType,newYears_e,newDisplacement,newFuelConsumptionH,newFuelConsumptionS);        //carContractEventone(SerialNumber,LicensePlateNumber,OriginalPrice,Label,AutomotiveType,Years,Displacement,FuelConsumptionH,FuelConsumptionS,TransmissionSystem,AccidentRecord,Mileage,AverageSpeed);
        // carContractEventTwo(newSerialNumber,newTransmissionSystem,newAccidentRecord,newMileage,newAverageSpeed,newUserID,newUserAddress,newStatus);
    }
    // function carContracttest() public {
    //     SerialNumber = 'newSerialNumber';
    //     LicensePlateNumber = 'newLicensePlateNumber';
    //     OriginalPrice = 100;
    //     Label = 'newLabel';
    //     AutomotiveType = 'newAutomotiveType';
    //     Years = 'newYears';
    //     Displacement = 100;
    //     FuelConsumptionH = 100;
    //     FuelConsumptionS = 100;
    //     TransmissionSystem = 'newTransmissionSystem';
    //     AccidentRecord = 'newAccidentRecord';
    //     Mileage = 100;
    //     AverageSpeed = 100;
    //     UserID = 'newUserID';
    //     UserAddress= this;
    // }

    /*  function */
    function getSerialNumber() constant returns (string){
        return SerialNumber;
    }

    function getLicensePlateNumber() constant returns (string){
        return LicensePlateNumber;
    }

    function setLicensePlateNumber(string newLicensePlateNumber){

        LicensePlateNumber = newLicensePlateNumber;
        setLicensePlateNumberEvent(newLicensePlateNumber);
    }

    function getOriginalPrice() constant returns(int){
        return OriginalPrice;
    }

    function getLabel() constant returns(string){
        return Label;
    }

    function getAutomotiveType() constant returns(string){
        return AutomotiveType;
    }

    function getYears() constant returns(string){
        return Years;
    }

    function getDisplacement() constant returns(int){
        return Displacement;
    }

    function getMaintainTime() constant returns(bytes32[]){
        return MaintainTime;
    }

    function getFuelConsumptionAvg() constant returns(int[]){
        return FuelConsumptionAvg;
    }

    function uploadFuelConsumptionData(bytes3 newMaintainTime,int newFuelConsumptionAvg){
        MaintainTime[MaintainTime.length] = newMaintainTime;
        FuelConsumptionAvg[FuelConsumptionAvg.length] = newFuelConsumptionAvg;
        setuploadFuelConsumptionDataEvent(newMaintainTime,newFuelConsumptionAvg);
    }

    function getFuelConsumptionH() constant returns(int){
        return FuelConsumptionH;
    }

    function getFuelConsumptionS() constant returns(int){
        return FuelConsumptionS;
    }

    function getTransmissionSystem() constant returns(string){
        return TransmissionSystem;
    }

    function getAccidentRecord() constant returns(string){
        return AccidentRecord;
    }

    function setAccidentRecord(string newAccidentRecord){
        AccidentRecord = newAccidentRecord;
    }

    function getMileage() constant returns(int){
        return Mileage;
    }

    function setMileage(int newMileage){
        Mileage = newMileage;
        setMileageEvent(newMileage);
    }

    function getAverageSpeed() constant returns(int){
        return AverageSpeed;
    }

    function setAverageSpeed(int newAverageSpeed){
        AverageSpeed = newAverageSpeed;
        setAverageSpeedEvent(newAverageSpeed);
    }

    function getUserID() constant returns(string){
        return UserID;
    }

    function setUserID(string newUserID){
        UserID = newUserID;
        setUserIDEvent(newUserID);
    }



    function getStatus() constant returns(bool){
        return Status;
    }

    function setStatus(bool newStatus){
        Status = newStatus;
        setStatusEvent(newStatus);
    }

    function getSalePrice() constant returns(int){
        return SalePrice;
    }

    function setSalePrice(int newSalePrice){
        SalePrice = newSalePrice;
        setSalePriceEvent(newSalePrice);
    }
    //
    function getBubbleWaterCheckField() constant returns(string){
        return BubbleWaterCheckField;
    }

    function setBubbleWaterCheckField(string newBubbleWaterCheckField){
        BubbleWaterCheckField = newBubbleWaterCheckField;
        setBubbleWaterCheckFieldEvent(newBubbleWaterCheckField);
    }

    function getSteeringWheelBodyCheck() constant returns(string){
        return SteeringWheelBodyCheck;
    }

    function setSteeringWheelBodyCheck(string newSteeringWheelBodyCheck){
        SteeringWheelBodyCheck = newSteeringWheelBodyCheck;
        setSteeringWheelBodyCheckEvent(newSteeringWheelBodyCheck);
    }

    function getMotorBodyCheck() constant returns(string){
        return MotorBodyCheck;
    }

    function setMotorBodyCheck(string newMotorBodyCheck){
        MotorBodyCheck = newMotorBodyCheck;
        setMotorBodyCheckEvent(newMotorBodyCheck);
    }

    function getEngineBodyCheckField() constant returns(string){
        return EngineBodyCheckField;
    }

    function setEngineBodyCheckField(string newEngineBodyCheckField){
        EngineBodyCheckField = newEngineBodyCheckField;
        setEngineBodyCheckFieldEvent(newEngineBodyCheckField);
    }

    function getVehicleExterior() constant returns(string){
        return  VehicleExterior;
    }

    function setVehicleExterior(string newVehicleExterior){
        VehicleExterior = newVehicleExterior;
        setVehicleExteriorEvent(newVehicleExterior);
    }

    function getTransmissionBodyCheckField() constant returns(string){
        return TransmissionBodyCheckField;
    }

    function setTransmissionBodyCheckField(string newTransmissionBodyCheckField){
        TransmissionBodyCheckField = newTransmissionBodyCheckField;
        setTransmissionBodyCheckFieldEvent(newTransmissionBodyCheckField);
    }

    function getEngineNumberField() constant returns(string){
        return EngineNumberField;
    }

    function setEngineNumberField(string newEngineNumberField){
        EngineNumberField = newEngineNumberField;
        setEngineNumberFieldEvent(newEngineNumberField);
    }

    function getMajorAccidentCheckField() constant returns(string){
        return MajorAccidentCheckField;
    }

    function setMajorAccidentCheckField(string newMajorAccidentCheckField){
        MajorAccidentCheckField = newMajorAccidentCheckField;
        setMajorAccidentCheckFieldEvent(newMajorAccidentCheckField);
    }

    function getRoadStatusCheck() constant returns(string){
        return RoadStatusCheck;
    }

    function setRoadStatusCheck(string newRoadStatusCheck){
        RoadStatusCheck = newRoadStatusCheck;
        setRoadStatusCheckEvent(newRoadStatusCheck);
    }

    function getFiveOilWaterLightInspectionField() constant returns(string){
        return FiveOilWaterLightInspectionField;
    }

    function setFiveOilWaterLightInspectionField(string newFiveOilWaterLightInspectionField){
        FiveOilWaterLightInspectionField = newFiveOilWaterLightInspectionField;
        setFiveOilWaterLightInspectionFieldEvent(newFiveOilWaterLightInspectionField);
    }

    function getVehicleEquippedField() constant returns(string){
        return VehicleEquippedField;
    }

    function setVehicleEquippedField(string newVehicleEquippedField){
        VehicleEquippedField = newVehicleEquippedField;
        setVehicleEquippedFieldEvent(newVehicleEquippedField);
    }
}
