const ethereumButton = document.querySelector(".enableEthereumButton");
const sendEthButton = document.querySelector(".sendEthButton");
const sumLabel = document.getElementById("sumLabel");
var tronWeb;
const showAccount = document.querySelector(".showAccount");
const AccountBalance = document.querySelector(".AccountBalance");

if (sendEthButton) {
  sendEthButton.addEventListener("click", async function(){

      // if(tronWeb)
      // {
      //   var amount =parseFloat(sumLabel.innerText);
      // var t = await tronWeb.trx.sendTransaction("TNYLzBcvfMC8bAcByGaynHKCwxPbji6tJy", amount*1000000,"c5787d15cf600df43a449de6850d5af65f0a5f841f3bc44bc8d9df5a946146e1");
      // console.log(t);
      // }
      const options = {

        method: 'POST',
      
        headers: {Accept: 'application/json', 'Content-Type': 'application/json','TRON-PRO-API-KEY':'853950d6-099f-4775-b5f7-8117f626cfdd'},
      
        body: JSON.stringify({
      
          privateKey: 'c5787d15cf600df43a449de6850d5af65f0a5f841f3bc44bc8d9df5a946146e1',
      
          toAddress: 'TNYLzBcvfMC8bAcByGaynHKCwxPbji6tJy',
      
          amount: 1000000
      
        })
      
      };
      
      
      fetch('https://nile.trongrid.io/wallet/easytransferbyprivate', options)
      
        .then(response => response.json())
      
        .then(response => console.log(response))
      
        .catch(err => console.error(err));
   
  });
}

function checkMetaMask() {
  //const t = new TronWeb();
  const metamaskIcon = document.querySelector(".mmi");
  const messageLabel = document.getElementById("messageLabel");
  if ((window.tronWeb && window.tronWeb.defaultAddress.base58)) {
    metamaskIcon.setAttribute("src", "img/tronlink.png");
    if (messageLabel)
      messageLabel.innerHTML =
        "TronLink is installed.";
    return false;
  } else {
    metamaskIcon.setAttribute("src", "img/tronlinkd.png");
    if (messageLabel) messageLabel.innerHTML = "TronLink is not installed pleas install it and reload this page.";
  }
 
}

function createAlert(type, message) {
  var str =
    '<div class="alert alert-' + type + '" role="alert">' + message + "</div>";
  $("#messageHolder").html(str);
}

ethereumButton.addEventListener("click", () => {
  console.log(tronWeb.isConnected())
  getAccount();
});

async function getAccount() {
  try {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {

                setTimeout(async function () {

                    tronWeb = window.tronWeb;
                    //tronWeb.fullNode.host='https://api.trongrid.io'
                    tronWeb.setHeader({'TRON-PRO-API-KEY':'853950d6-099f-4775-b5f7-8117f626cfdd'});
                    console.log(tronWeb.fullNode.host);
                    console.log("tronWeb : ", tronWeb);
                    console.log("tronweb is successfully fetched from window");

                    try {
                        var currentaddress = await tronWeb.address.fromHex((await tronWeb.trx.getAccount()).address.toString());
                        showAccount.innerHTML = currentaddress;
                     //   istronWeb = true;

                        var balance = await tronWeb.trx.getBalance(currentaddress);
                        balance = balance / (10 ** 6);
                        console.log(balance);
                        AccountBalance.innerHTML =balance;


                    } catch {
                        console.log("Tronweb not defined");
                       
                    }
                }, 3000);
      }

     
    else 
    {
      //location.href = "./login.html";
    }
  } catch (error) {
    console.log(error);
   // location.href = "./login.html";
  }
}
