const listRes = 
   {
      res_name: 'Restaurant 1',
      res_type: 'Grill',
      res_address: 'Ha Noi',
      owner: "Owner test 1",
      price_average: 100,
      imageDefault: "https://www.creativefabrica.com/wp-content/uploads/2018/10/Chef-restaurant-logo-by-DEEMKA-STUDIO-4.jpg",
      service_rate: 4,
      clean_rate: 3,
      food_rate: 3,
      date_visited: "10/10/2020 10:30 PM",
      notes: "note Restaurant 1",
   }
var db;
var request = window.indexedDB.open("I-rate", 2); //Create a new database include the database name and version number
request.onupgradeneeded = function (event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore("Irate", { keyPath: "id", autoIncrement: true }); // Create a new object store to store data, set the primary key is id and it will automatically increase
      objectStore.add(listRes) // add a template data into object store
}
request.onsuccess = function (event) {// handle create database success
   db = request.result;
   console.log("Create database success: " + db);
};
request.onerror = function (event) {// handle create database fail
   console.log("Create database error: " + db);
}
function getAllData(objectStoreName) {
   return db.transaction([objectStoreName], "readonly").objectStore(objectStoreName).getAll();
}
async function addData(objectStoreName, data) {
   const Newdata = db.transaction([objectStoreName], "readwrite").objectStore(objectStoreName).add(data)
   Newdata.onsuccess = () => {
      $('#rate').each(function () {
         this.reset()
      })
      navigator.notification.beep(1);
      navigator.vibrate(100)
      alert("You Rated Successfully")
      $('#list_rest').empty()
      LoadHome()
   }
   Newdata.onerror = () => {
      alert('Error Rate')
   }
}
function deleteData(objectStoreName, dataId) {
   const dataDelete = db.transaction([objectStoreName], "readwrite").objectStore(objectStoreName).delete(Number(dataId))
   dataDelete.onerror = function () {
      alert("Error deleting")
   }
   dataDelete.onsuccess = function () {
      $('#list_rest').empty()
      navigator.notification.beep(1);
      navigator.vibrate(100)
         LoadHome()
     }
}
function getDetail(objectStoreName, dataId) {
   const dataGet = db.transaction([objectStoreName], "readonly").objectStore(objectStoreName).get(Number(dataId))
   dataGet.onerror = function () {
      alert("Error getting")
   }
   return dataGet
}
