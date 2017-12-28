pragma solidity ^0.4.12;

contract userContract{

    string UserID;
    int BuyerRating;
    int SellerRating;
    string AddTime;
    string Email;
    string Password;
    address UserAddress;

    event setBuyerRatingEvent(int newBuyerRating);
    event setSellerRatingEvent(int newSellerRating);
    event userContractEvent(string newUserID_e,int newBuyerRating_e,int newSellerRating_e,string newAddTime_e,string newEmail_e,string newPassword_e,address UserAddress_e);

    function userContract(string newUserID,string newAddTime,string newEmail,string newPassword) public{
        UserID = newUserID;
        BuyerRating = 0;
        SellerRating = 0;
        AddTime = newAddTime;
        Email = newEmail;
        Password = newPassword;
        UserAddress = this;
        userContractEvent(newUserID,0,0,AddTime,Email,Password,this);
    }

    // function carContract() public{
    //     UserID = 'newUserID';
    //     BuyerRating = 100;
    //     SellerRating = 100;
    //     AddTime = 'newAddTime';
    //     Email = 'newEmail';
    //     Password = 'newPassword';
    //     UserAddress = this;
    // }

    function getUserID() constant returns(string){
        return UserID;
    }

    function getBuyerRating() constant returns(int){
        return BuyerRating;
    }

    function setBuyerRating(int newBuyerRating){
        BuyerRating = newBuyerRating;
        setBuyerRatingEvent(BuyerRating);
    }

    function getSellerRating() constant returns(int){
        return SellerRating;
    }

    function setSellerRating(int newSellerRating){
        SellerRating = newSellerRating;
        setSellerRatingEvent(SellerRating);
    }

    function getAddTime() constant returns(string){
        return AddTime;
    }

    function getEmail() constant returns(string){
        return Email;
    }

    function getPassword() constant returns(string){
        return Password;
    }

    function getUserAddress() constant returns(address){
        return UserAddress;
    }
}
