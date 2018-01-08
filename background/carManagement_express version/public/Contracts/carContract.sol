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
    string AutomotiveBody;



    struct maintainInfo{
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
    }
    uint[] maintainTime;
    mapping (uint=>maintainInfo) maintainInfos;

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

    /* this runs when the contract is executed */
    function carContract(string newSerialNumber,string newLicensePlateNumber,int newOriginalPrice,string newLabel,string newAutomotiveType,string newYears,int newDisplacement,int newFuelConsumptionH
    ,int newFuelConsumptionS,string newAutomotiveBody,string newAccidentRecord
    ,int newMileage,int newAverageSpeed,string newUserID,bool newStatus,int newSalePrice ) public {

        SerialNumber = newSerialNumber;
        LicensePlateNumber = newLicensePlateNumber;
        OriginalPrice = newOriginalPrice;
        Label = newLabel;
        AutomotiveType = newAutomotiveType;
        Years = newYears;
        Displacement = newDisplacement;
        FuelConsumptionH = newFuelConsumptionH;
        FuelConsumptionS = newFuelConsumptionS;
        AutomotiveBody = newAutomotiveBody;
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

     function maintainCarInfo (string BubbleWaterCheckField,
        string SteeringWheelBodyCheck,
        string MotorBodyCheck,
        string EngineBodyCheckField,
        string VehicleExterior,
        string TransmissionBodyCheckField,
        string EngineNumberField,
        string MajorAccidentCheckField,
        string RoadStatusCheck,
        string FiveOilWaterLightInspectionField,
        string VehicleEquippedField) {
            uint time=now;
            maintainTime.push(time);
            maintainInfos[time].BubbleWaterCheckField=BubbleWaterCheckField;
            maintainInfos[time].SteeringWheelBodyCheck=SteeringWheelBodyCheck;
            maintainInfos[time].MotorBodyCheck=MotorBodyCheck;
            maintainInfos[time].EngineBodyCheckField=EngineBodyCheckField;
            maintainInfos[time].VehicleExterior=VehicleExterior;
            maintainInfos[time].TransmissionBodyCheckField=TransmissionBodyCheckField;
            maintainInfos[time].EngineNumberField=EngineNumberField;
            maintainInfos[time].RoadStatusCheck=RoadStatusCheck;
            maintainInfos[time].FiveOilWaterLightInspectionField=FiveOilWaterLightInspectionField;
            maintainInfos[time].VehicleEquippedField=VehicleEquippedField;
            finishEvent(true ,msg.sender);
     }
    function MaintainCarOwnerInfo (string newUserID,string newLicensePlateNumber,int newSalePrice,bool newStatus){

        UserID = newUserID;
        LicensePlateNumber = newLicensePlateNumber;
        SalePrice=newSalePrice;
        Status = newStatus;
        finishEvent(true,msg.sender);

        }
    function setAutomotiveBody(string newAutomotiveBody){
        AutomotiveBody =newAutomotiveBody;
    }

    function getAutomotiveBody() constant returns(string){
        return AutomotiveBody;
    }
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
     function getmaintainTime() constant returns(uint[] maintainTime){
         return maintainTime;
     }
     function getBubbleWaterCheckField(uint time) constant returns(string BubbleWaterCheckField){
         return maintainInfos[time].BubbleWaterCheckField;
     }
     function getSteeringWheelBodyCheck(uint time) constant returns(string SteeringWheelBodyCheck ){
         return maintainInfos[time].SteeringWheelBodyCheck;
     }
     function getMotorBodyCheck(uint time) constant returns(string MotorBodyCheck){
         return maintainInfos[time].MotorBodyCheck;
     }
     function getEngineBodyCheckField(uint time) constant returns(string EngineBodyCheckField){
         return maintainInfos[time].EngineBodyCheckField;
     }
     function getVehicleExterior(uint time) constant returns(string VehicleExterior){
         return maintainInfos[time].VehicleExterior;
     }
     function getTransmissionBodyCheckField(uint time) constant returns(string TransmissionBodyCheckField){
         return maintainInfos[time].TransmissionBodyCheckField;
     }
     function getEngineNumberField(uint time) constant returns(string EngineNumberField){
         return maintainInfos[time].EngineNumberField;
     }
     function getRoadStatusCheck(uint time) constant returns(string RoadStatusCheck){
         return maintainInfos[time].RoadStatusCheck;
     }
     function getFiveOilWaterLightInspectionField(uint time) constant returns(string FiveOilWaterLightInspectionField){
         return maintainInfos[time].FiveOilWaterLightInspectionField;
     }
     function getVehicleEquippedField(uint time) constant returns(string VehicleEquippedField){
         return maintainInfos[time].VehicleEquippedField;
     }
}
