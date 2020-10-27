function validateData(condition, errorTag, messageError){
    if (condition) {
        $(`${errorTag}`).append('')
        return true
    }
    let errorHtml =`<div class="alert alert-danger" role="alert" id="error-clean-rate">
        ${messageError}
    </div>`
    $(`${errorTag}`).append(errorHtml)
    return false
}

function checkValidData(array){
    return array.every((item) => {
        return item
    })
}