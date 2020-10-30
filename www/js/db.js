const listRes = [
   {
      res_name: 'Restaurant 1',
      res_type: 'fast food',
      res_address: 'Ha Noi',
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 3,
      food_rate: 3,
      date_visited:"10/10/2020 10:30 PM",
      notes: "note Restaurant 1",
   }, 
   {
      res_name: 'Restaurant 2',
      res_type: 'fast food',
      res_address: 'Ha Noi',
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 1,
      food_rate: 4,
      date_visited:"10/10/2020 10:30 PM",
      notes: "note Restaurant 2",
   },
   {
      res_name: 'Restaurant 3',
      res_type: 'fast food',
      res_address: 'Ha Noi',
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 4,
      food_rate: 4,
      date_visited:"10/10/2020 10:30 PM",
      notes: "note Restaurant 3",
   },
   {
      res_name: 'Restaurant 4',
      res_type: 'fast food',
      res_address: 'Ha Noi',
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 4,
      food_rate: 4,
      date_visited:"10/10/2020 10:30 PM",
      notes: "note Restaurant 4",
   }
]
var db;
 var request = window.indexedDB.open("I-rate", 2);
 request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("Irate", {keyPath: "id", autoIncrement: true});
      for(var i in listRes){
         objectStore.add(listRes[i])
      }
   }
request.onsuccess = function(event) {
    db = request.result;
    console.log("success: "+ db);
 };
 function getAllData(collectionName) {
    const transaction = db.transaction([collectionName], "readonly")
    const objectStore =transaction.objectStore(collectionName)
    request = objectStore.getAll();
    return request
 }
 async function addData(collectionName, data) {
    const Newdata = await db.transaction([collectionName], "readwrite").objectStore(collectionName).add(data)
    Newdata.onsuccess = () => {
    window.localStorage = "#add"
    $('#rate').each(function () {
      this.reset()
   })
   navigator.notification.beep(1);
   navigator.vibrate(100)
   alert("You Rated Successfully")
   $('#list_rest').empty()
   LoadHome()
  }
  Newdata.onerror = () =>{
     alert('Error Rate')
  }
 }
 function DeleteData(data) {
   const dataDelete = db.transaction(["Irate"], "readwrite").objectStore("Irate").delete(data)
   dataDelete.onerror = function(){
      alert("Error deleting")
   }
   return dataDelete
 }
 function GetDetails(data) {
    const dataGet = db.transaction(["Irate"], "readonly").objectStore("Irate").get(Number(data))
    dataGet.onerror = function(){
       alert("Error getting")
    }
    return dataGet
 }
