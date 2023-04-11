const printButton = document.querySelector("#printButton");
const body = document.querySelector("#bodyData").innerHTML;
const swapBody = document.querySelector("#bodyData");
const printData = document.querySelector("#printData").innerHTML;

printButton.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    swapBody.innerHTML = `<div class="text-center display-1 fw-bold text-dark"> Triveni Dham Gaushala </div>` + printData;
    window.print()
    swapBody.innerHTML = body;
    window.location.reload();
})