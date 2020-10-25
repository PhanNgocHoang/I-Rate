function playMedia(url) {
    const media = new Media(url)
    media.play()
    media.setVolume("0.0")
}
function LoadHome(){
    const resType = getAllData("Irate")
    resType.onsuccess = (event) => {
        const results = event.target.result
        for(var i in results) {
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
                                ${results[i].service_rate}
                            <td>
                        </tr>
                        <tr>
                            <th style="background-color:#9933ff">Clean<th>
                            <td>    
                            ${results[i].clean_rate}
                            <th>
                        </tr>
                        <tr>
                            <th style="background-color:#ffcc00">Food<th>
                            <td>
                            ${results[i].food_rate}
                            <th>
                        </tr>
                    </table>
                </div>
                <button class="btn btn-danger" rateId="${results[i].id}" id="delete_rate"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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
        await $('#list_rest').empty()
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
            navigator.vibrate(100)
            addData("Irate", rate)
            return false

        })
      
    $(document).on('click', '#delete_rate', function () {
        const rateid =  $(this).attr("rateId")
        navigator.vibrate(100)
       const result = DeleteData(Number(rateid))
       result.onsuccess = function () {
        $('#list_rest').empty()
        navigator.beep(1)
           LoadHome()
       }
    })
})