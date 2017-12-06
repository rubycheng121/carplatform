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

    function carContract(string newUserID,int newBuyerRating,int newSellerRating,string newAddTime,string newEmail,string newPassword) public{
        UserID = newUserID;
        BuyerRating = newBuyerRating;
        SellerRating = newSellerRating;
        AddTime = newAddTime;
        Email = newEmail;
        Password = newPassword;
        UserAddress = this;
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
