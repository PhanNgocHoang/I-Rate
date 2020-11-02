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
                <i style="background-color: #99ff66; font-size: 15px">Date visit: ${results[i].date_visited} </i>
                <div class="d-flex align-items-center justify-content-between mt-1">
                    <h6 class="font-weight-bold">${results[i].owner}</h6>
                    <div class="rate-content">
                        <ul class="list-group">
                            <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #66ff66">
                                <b style="background-color: #66ff66">Service</b>
                                <div class="ml-1"><span>${results[i].service_rate}</span><span class="fa fa-star checked"></span></div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #4dd2ff">
                                <b style="background-color: #4dd2ff">Clean</b>
                                <div class="ml-1"><span>${results[i].clean_rate}</span><span class="fa fa-star checked"></span></div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #9966ff">
                                <b style="background-color: #9966ff">Food</b>
                                <div class="ml-1"><span>${results[i].food_rate}</span><span class="fa fa-star checked"></span></div>
                            </li>
                            <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #ffcc66; width:100%;">
                                <b style="background-color: #ffcc66">Average</b>
                                <div class="ml-1"><span>${parseFloat((Number(results[i].food_rate) + Number(results[i].clean_rate) + Number(results[i].service_rate))/3).toFixed(1)}</span><span class="fa fa-star checked"></span></div>
                            </li>
                        </ul>
                        
                    </div>
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
    $('#homepage').on('click', () =>{
        $('#list_rest').empty()
        LoadHome()
    })
    $("form[name='rate']").validate({
                rules: {
                    owner_name: {
                        required: true
                    },
                    owner_phone: {
                        required: true,
                        minlength: 10,
                        maxlength: 11
                    },
                    restaurant_name: {
                        required: true
                    },
                    res_types: {
                        required: true
                    },
                    res_address:{
                        required: true
                    },
                    service_rate:{
                        required: true,
                        number: true,
                    },
                    clean_rate:{
                        required: true,
                        number: true
                    },
                    foods_rate:{
                        required: true,
                        number: true
                    },
                    date:{
                        required: true,
                    },
                    time:{
                        required: true
                    }

                },
                messages: {
                    owner_name: {
                        required: "Please enter your first name."
                    },
                    owner_phone: {
                        required: "Please enter your phone.",
                        minlength: "Phone number is at least 10 characters",
                        maxlength: "Phone number must not exceed 11 characters "
                    },
                    restaurant_name: {
                        required: "Please enter restaurant name."
                    },
                    res_types:{
                        required: "Please enter your restaurant type"
                    },
                    res_address:{
                        required: "Please enter restaurant address"
                    },
                    service_rate :{
                        required: "Please choose service rate"
                    },
                    clean_rate:{
                        required: "Please choose clean rate"
                    },
                    foods_rate:{
                        required: "Please choose food rate"
                    },
                    date:{
                        required: "Please choose the date you visited"
                    },
                    time:{
                        required: "Please choose the time you visited"
                    }
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent().prev());
                },
                submitHandler: function () {
                    const rate = {
                                owner: $('#owner_name').val(),
                                owner_phone: $('#owner_phone').val(),
                                res_name: $('#restaurant_name').val(),
                                res_types: $('#res-types').val(),
                                res_address: $('#res_address').val(),
                                service_rate: $('#service_rate').val(),
                                clean_rate: $('#clean_rate').val(),
                                food_rate: $('#food_rate').val(),
                                date_visited: $('#date').val() + " " + $('#time').val(),
                                notes: $('#notes').val(),
                            }
                            addData("Irate", rate)
                            return false
                }
            });
      
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
           $(location).attr('href', "#detail")
           const restDetails = event.target.result
            const html = `
            <div class="card ml-2 mt-4" style="width: 21.5rem;">
                    <div class="card-body">
                      <h4 class="card-title">${restDetails.res_name}</h4>
                      <p>${restDetails.res_address}</p>
                      <h6 class="card-subtitle mb-2 text-muted">${restDetails.res_type}</h6>
                      <h5>${restDetails.owner}</h5>
                      <p>${restDetails.date_visited}</p>
                      <p>Average meal price per person ${restDetails.price_average} $</p>
                      <ul class="list-group">
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #66ff66">
                          <b style="background-color: #66ff66">Service</b>
                          <div class="ml-1"><span>${restDetails.service_rate}</span><span class="fa fa-star checked"></span></div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #4dd2ff">
                          <b style="background-color: #4dd2ff">Clean</b>
                          <div class="ml-1"><span>${restDetails.clean_rate}</span><span class="fa fa-star checked"></span></div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #9966ff">
                          <b style="background-color: #9966ff">Food</b>
                          <div class="ml-1"><span>${restDetails.food_rate}</span><span class="fa fa-star checked"></span></div>
                      </li>
                      <li class="list-group-item d-flex justify-content-between rate" style="border: 2px solid #ffcc66; width:100%;">
                          <b style="background-color: #ffcc66">Average</b>
                          <div class="ml-1"><span>${parseFloat((Number(restDetails.food_rate) + Number(restDetails.clean_rate) + Number(restDetails.service_rate))/3).toFixed(1)}</span><span class="fa fa-star checked"></span></div>
                      </li>
                  </ul>
                  <div>
                    <span>Note</span>
                        <div class="note">
                            ${restDetails.notes}
                        </div>
                  </div>
                </div>
            </div>  `
           $('#detailContent').empty().append(html)
       }
   })
})