const listRes = [
   {
      res_name: 'Restaurant 1',
      res_type: 'fast food',
      owner: "Owner test 1",
      service_rate: "Good",
      clean_rate: "Good",
      food_rate: "Good",
      notes: "",
      image: ['https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg']
   }, 
   {
      res_name: 'Restaurant 1',
      res_type: 'fast food',
      owner: "Owner test 1",
      service_rate: "Good",
      clean_rate: "Good",
      food_rate: "Good",
      notes: "",
      image: ['https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg']
   },
   {
      res_name: 'Restaurant 1',
      res_type: 'fast food',
      owner: "Owner test 1",
      service_rate: "Good",
      clean_rate: "Good",
      food_rate: "Good",
      notes: "",
      image: ['https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg']
   },
   {
      res_name: 'Restaurant 1',
      res_type: 'fast food',
      owner: "Owner test 1",
      service_rate: "Good",
      clean_rate: "Good",
      food_rate: "Good",
      notes: "",
      image: ['https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Teremok_fast_food_restaurant_Saint_Petersburg.jpg']
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
 function addData(collectionName, data) {
    const Newdata = db.transaction([collectionName], "readwrite").objectStore(collectionName).add(data)
    Newdata.onsuccess = () => {
      let html = `<div class="alert alert-primary" role="alert">
      Your feedback has been posted
    </div>`
      LoadAdd()
    $('#content').append(html)
  }
  Newdata.onerror = () =>{
     alert('Error Rate')
  }
 }
 function DeleteData(data) {
   const dataDelete = db.transaction(["Irate"], "readwrite").
   objectStore("Irate").delete(Number(data))
   dataDelete.onsuccess = function (){
      LoadHome()
   }
   dataDelete.onerror = function(){
      alert("Error deleting")
   }
 }
 function Search (data) {
    return db.transaction(["Irate"], "readonly")
    .objectStore("Irate").openCursor(IDBKeyRange.bound(data, data + '\uffff'), 'prev')

 }
