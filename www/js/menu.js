function LoadHome(){
    const resType = getAllData("Irate")
    resType.onsuccess = (event) => {
        const results = event.target.result
        for(var i in results.reverse()) {
            let html =`<li class="list-group-item m-2 rounded">
        <!-- Custom content-->
        <div class="media align-items-lg-center flex-column flex-lg-row p-3" >
            <div class="media-body order-2 order-lg-1">
                <h5 class="mt-0 font-weight-bold mb-2">${results[i].res_name}</h5>
                <p class="font-italic text-muted mb-0 small">${results[i].res_type}</p>
                <div class="d-flex align-items-center justify-content-between mt-1">
                    <h6 class="font-weight-bold my-2">${results[i].owner}</h6>
                    <div></div>
                    <table class="ml-6">
                        <tr>
                            <th style="background-color:#33cc33">Service<th>
                            <td>
                                ${results[i].service_rate}<span class="fa fa-star checked"></span>
                            <td>
                        </tr>
                        <tr>
                            <th style="background-color:#9933ff">Clean<th>
                            <td>    
                            ${results[i].clean_rate}<span class="fa fa-star checked"></span>
                            <th>
                        </tr>
                        <tr>
                            <th style="background-color:#ffcc00">Food<th>
                            <td>
                            ${results[i].food_rate}<span class="fa fa-star checked"></span>
                            <th>
                        </tr>
                        <tr>
                            <th style="background-color:#ffcc00">TB<th>
                            <td>
                            ${parseFloat((results[i].food_rate + results[i].clean_rate + results[i].service_rate)/3).toFixed(1)}<span class="fa fa-star checked"></span>
                            <th>
                        </tr>
                    </table>
                </div>
                <div class="d-flex mt-5">
                    <button class="btn btn-danger d-flex justify-content-start" style="background-color: #c72333; color: #ffffff" rateId="${results[i].id}" id="delete_rate"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    <button class="btn btn-info-flex justify-content-start ml-5" style="background-color: #148496; color: #ffffff" rateId="${results[i].id}" id="detail"><i class="fa fa-eye" aria-hidden="true"></i></button>
                </div>
            </div>
        </div> <!-- End -->
            </li> <!-- End -->`
            $('#list_rest').append(html);
            $('#filter-search').append(html);
        }
    }
 }
$( window ).on( "load", function () {
    LoadHome()
});

$(document).ready(function (){
    $('#homepage').on('click',async () =>{
        $('#list_rest').empty()
        LoadHome()
    })
        $('#rate').on('submit', ()=>{
            const rate = {
                owner: $('#owner_name').val().trim(),
                owner_phone: $('#owner_phone').val().trim(),
                res_name: $('#restaurant_name').val().trim(),
                res_type: $('#res-types').val().trim(),
                res_address: $('#res_address').val().trim(),
                service_rate: $('#service_rate').val().trim(),
                clean_rate: $('#clean_rate').val().trim(),
                food_rate: $('#food_rate').val().trim(),
                date_visited: $('#date').val() + " " + $('#time').val(),
                notes: $('#notes').val(),
            }
            const validateResults = [
                validateData(rate.owner, "#owner", "Missing Your Name"),
                validateData(rate.owner_phone, "#phone", "Missing Your phone"),
                validateData(rate.res_name, "#rest-name", "Missing Restaurant Name"),
                validateData(rate.res_type, "#resType", "Missing Restaurant Type"),
                validateData(rate.res_address, "#address", "Missing Restaurant Address"),
                validateData(rate.service_rate, "#rate-services", "Missing Service Rate"),
                validateData(rate.clean_rate, "#rate-cleans", "Missing Clean Rate"),
                validateData(rate.food_rate, "#foods-rate", "Missing Food Rate"),
                validateData($('#date').val(), "#date-visit", "Missing Date"),
                validateData($('#time').val(), "#time-visit", "Missing Time")
            ]
            if(checkValidData(validateResults)){
                navigator.vibrate(100)
                addData("Irate", rate)
                return false
            }
            return true

        })
      
    $(document).on('click', '#delete_rate', function () {
        const rateid =  $(this).attr("rateId")
       const result = DeleteData(Number(rateid))
       result.onsuccess = function () {
        $('#list_rest').empty()
        navigator.notification.beep(1);
        navigator.vibrate(100)
           LoadHome()
       }
    })
   $(document).on('click', '#detail', function(){
       const rateId = $(this).attr("rateId")
       const result = GetDetails(rateId)
       result.onsuccess = function (event) {
           const restDetails = event.target.result
           console.log(restDetails)
           
       }
   })
})