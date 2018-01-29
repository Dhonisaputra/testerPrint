// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
// for form inputs)
cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

// Don't remove this line unless you know what you are doing. It stops the viewport
// from snapping when text inputs are focused. Ionic handles this internally for
// a much nicer keyboard experience.
cordova.plugins.Keyboard.disableScroll(true);

document.addEventListener('deviceready', function () {
// cordova.plugins.printer is now available
cordova.plugins.printer.check(function (available, count) {
    console.log(available, count)
});
}, false);
}
if(window.StatusBar) {
    StatusBar.styleDefault();
}


});
})
.controller('printer',[ '$scope', '$cordovaPrinter', function($scope,  $cordovaPrinter) {
   /* var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("scream");
    ctx.drawImage(img, 10, 10);
*/
    $scope.printers = [];
    $scope.paired = [];
    function printSomeTestText() {
          printMyImage();

    /*window.DatecsPrinter.printText("Print Test!\n", 'ISO-8859-1', 
        function() {
          printMyImage();
        }
      );*/
    }

function printMyImage() {
    html2canvas(document.querySelector("#capture")).then(canv => {
        imagedata = canv.toDataURL('image/png');
        var myImage = new Image();
              myImage.src = imagedata;
              myImage.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.height = canv.height;
                canvas.width = 380;
                var context = canvas.getContext('2d');
                context.drawImage(myImage, 0, 0);
                var imageBase = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/,"");
                window.DatecsPrinter.printImage(
                  imageBase, //base64
                  canvas.width, 
                  canvas.height, 
                  1, 
                  function(res) {
                    console.log(res)
                  },
                  function(error) {
                      alert(JSON.stringify(error));
                  }
              )
            }
    });
  /*var image = new Image();
  image.src = '../img/ionic.png';
  image.onload = function() {

      var canvas = document.createElement('canvas');
      canvas.height = 100;
      canvas.width = 100;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype
      window.DatecsPrinter.printImage(
          imageData, //base64
          canvas.width, 
          canvas.height, 
          1, 
          function() {
          },
          function(error) {
              alert(JSON.stringify(error));
          }
      )
  };*/
}

function printMyBarcode() {
  window.DatecsPrinter.printBarcode(
    75, //here goes the barcode type code
    '13132498746313210584982011487', //your barcode data
    function() {
      alert('success!');
    },
    function() {
      alert(JSON.stringify(error));
    }
  );
}
    $scope.get_image = function(fn)
    {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", "../img/ionic.pdf", true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (oEvent) {
          var arrayBuffer = oReq.response; // Note: not oReq.responseText
            fn(arrayBuffer)     
        };

        oReq.send(null);
    }
    $scope.search = function()
    {
    console.log(BTPrinter)
        console.log(bluetoothSerial)
        /*bluetoothSerial.discoverUnpaired((res)=>{
            console.log(res)
            $scope.printers = res;
            $scope.$apply();
        })*/
        /*bluetoothSerial.list(function(device) {
            $scope.paired = device;
            $scope.$apply();
        });*/
        window.DatecsPrinter.listBluetoothDevices( function (devices) {
            $scope.paired = devices;
            $scope.$apply();
          },
          function (error) {
            alert(JSON.stringify(error));
          }
        );
        /*bluetoothSerial.read(function(res){
            console.log(res)
        });*/
    }

    $scope.reload = function()
    {
/*var printerAvail = $cordovaPrinter.isAvailable()
console.log($cordovaPrinter, cordova.plugins.printer, printerAvail, cordova.plugins)
cordova.plugins.printer.check(function (available, count) {
console.log(available, count)
});
var doc = "<html> ... </html>"
$cordovaPrinter.print(doc)*/
console.log(cordova.plugins, bluetoothSerial)
}
$scope.testPrint = function(item)
{
    window.DatecsPrinter.connect(item.address, 
      function(res) {
        printSomeTestText();
      },
      function(error) {
        alert(JSON.stringify(error));
      }
    );
   /* let printData="<strong>Test hello this is a test</strong> \n\n\n\n Hello Test 123 123 123\n\n\n"
    var data = new Uint8Array(4);
    data[0] = 0x41;
    data[1] = 0x42;
    data[2] = 0x43;
    data[3] = 0x44;

    BTPrinter.disconnect(function(data){
        console.log("Success");
        console.log(data)
        
        BTPrinter.connect(function(data){
            console.log("Success");
            console.log(data)
            BTPrinter.printText(function(data){
                console.log("Success");
                console.log(data)
            },function(err){
                console.log("Error");
                console.log(err)
            }, printData)
        },function(err){
            console.log("Error");
            console.log(err)
        }, item.name)

    },function(err){
        console.log("Error");
        console.log(err)
    }, item.name)*/


    /*var a = bluetoothSerial.connect(item.address, function(con){
            console.log(con)
            bluetoothSerial.write(data, dataz=>{
                console.log("WRITE SUCCESS",dataz);

            },errx=>{
                console.log("WRITE FAILED",errx);
            });
        
    })*/

    $scope.get_image(function(arrayBuffer){
        // arrayBuffer = new Uint8Array(arrayBuffer);
        
    
    })
}


$scope.disconnect = function(item)
{
    bluetoothSerial.disconnect(function(res){
        console.log(res)
    }, function(err){
        console.error(err)
    });
}

}])
