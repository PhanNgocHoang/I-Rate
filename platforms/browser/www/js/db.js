const listRes = [
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
   },
   {
      res_name: 'Restaurant 2',
      res_type: 'Cake',
      res_address: 'Ha Noi',
      price_average: 100,
      imageDefault: "https://www.creativefabrica.com/wp-content/uploads/2018/10/Chef-restaurant-logo-by-DEEMKA-STUDIO-4.jpg",
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 1,
      food_rate: 4,
      date_visited: "10/10/2020 10:30 PM",
      notes: "note Restaurant 2",
   },
   {
      res_name: 'Restaurant 3',
      res_type: 'Seafood',
      res_address: 'Ha Noi',
      price_average: 100,
      imageDefault: "https://www.creativefabrica.com/wp-content/uploads/2018/10/Chef-restaurant-logo-by-DEEMKA-STUDIO-4.jpg",
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 4,
      food_rate: 4,
      date_visited: "10/10/2020 10:30 PM",
      notes: "note Restaurant 3",
   },
   {
      res_name: 'Restaurant 4',
      res_type: 'Fast food',
      res_address: 'Ha Noi',
      price_average: 100,
      imageDefault: "https://www.creativefabrica.com/wp-content/uploads/2018/10/Chef-restaurant-logo-by-DEEMKA-STUDIO-4.jpg",
      owner: "Owner test 1",
      service_rate: 4,
      clean_rate: 4,
      food_rate: 4,
      date_visited: "10/10/2020 10:30 PM",
      notes: "note Restaurant 4",
   }
]
var db;
var request = window.indexedDB.open("I-rate", 2);
request.onupgradeneeded = function (event) {
   var db = event.target.result;
   var objectStore = db.createObjectStore("Irate", { keyPath: "id", autoIncrement: true });
   for (var i in listRes) {
      objectStore.add(listRes[i])
   }
}
request.onsuccess = function (event) {
   db = request.result;
   console.log("Create database success: " + db);
};
request.onerror = function (event) {
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
   const dataDelete = db.transaction([objectStoreName], "readwrite").objectStore(objectStoreName).delete(dataId)
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
