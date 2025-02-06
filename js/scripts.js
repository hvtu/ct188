
function checkKeySearch(event){
//    alert(event.key + " " + event.keyCode);

    if(event.key == "Enter"){
        if(document.getElementById("search-keywords").value.length > 0){
            document.forms["frmSearch"].submit();
            // doSearch();
        }
        else{
            event.preventDefault();
        }
    }

/*     var key = event.which || event.keyCode;
    if(key == 32){
        doSearch();
    }
*/    
}

function doSearch(){
    var frmSearch = document.forms["frmSearch"];
    // if(frmSearch.searchKeywords.value.length > 0){
    if(document.getElementById("search-keywords").value.length > 0){
        frmSearch.submit();
    }
    // else{
    //     alert("Nhập từ khóa cần tìm!");
    // }

}

/*Hiển thị nội dung keyword trong trang timkiem.html**/
function showSearch(){
    var url = new URL(window.location);
    var params = url.searchParams.get("searchKeywords");
    document.getElementById("search-detail").innerHTML = "<h2>Từ khóa tìm kiếm</h2> <b>" + params + "</b>";
}

//Xác thực dữ liệu sử dụng phương thức mặc định checkValidity() của HTML5
function frmValidate(frm){
    return frm.checkValidity();
}

//Xác thực dữ liệu Form Đăng ký
function registerValidate(frm){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailReg.test(frm.email.value) == false){
        alert("Nhập email hợp lệ!");
        frm.email.focus();
        return false;
    }
    if(frm.psw1.value.length < 8){
        alert("Mật khẩu có tối thiểu 8 ký tự!");
        frm.psw1.focus();
        return false;
    }
    if(frm.psw2.value.length < 8){
        alert("Mật khẩu có tối thiểu 8 ký tự!");
        frm.psw2.focus();
        return false;
    }
    if(frm.psw1.value != document.getElementById("psw2").value){
        alert("Mật khẩu không giống nhau!");
        frm.psw1.focus();
        return false;
    }
    alert("Submit!");
    return true;
}

//Xác thực dữ liệu Form Đăng nhập
function loginValidation(frm){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailReg.test(frm.email.value)){
        alert("Nhập email hợp lệ!");
        frm.email.focus();
        return false;
    }
    if(frm.psw.value.length < 8){
        alert("Mật khẩu có tối thiểu 8 ký tự!");
        frm.psw.focus();
        return false;
    }
    alert("Submit!");
    return true;
}

//Xác thực dữ liệu Form Liên hệ
function contactValidation(frm){
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(frm.hoten.value.length < 4){
        alert("Họ tên có tối thiểu 4 ký tự!");
        frm.hoten.focus();
        return false;
    }
    if(!emailReg.test(frm.email.value)){
        alert("Nhập email hợp lệ!");
        frm.email.focus();
        return false;
    }
    if(frm.message.value.length < 10){
        alert("Nội dung có tối thiểu 10 ký tự!");
        frm.message.focus();
        return false;
    }
    alert("Submit!");
    return true;
}

/*Danh mục sản phẩm**/
var itemList = {
    "sp001":{"name":"Sữa chua vị Kiwi","price":2100,"photo":"../images/sanpham/kiwi.jpg"},
    "sp002":{"name":"Sữa chua vị xoài","price":2200,"photo":"../images/sanpham/mango.jpg"},
    "sp003":{"name":"Sữa chua vị dưa lưới","price":2300,"photo":"../images/sanpham/cantaloupe.jpg"},
    "sp004":{"name":"Sữa chua vị mâm xôi","price":2400,"photo":"../images/sanpham/blackberry.jpg"},
    "sp005":{"name":"Sữa chua vị dâu tây","price":2500,"photo":"../images/sanpham/strawberry.jpg"},
    "sp006":{"name":"Sữa chua vị việt quất","price":2600,"photo":"../images/sanpham/blueberry.jpg"},
    "sp007":{"name":"Sữa chua vị bưởi","price":2700,"photo":"../images/sanpham/grapes.jpg"},
    "sp008":{"name":"Sữa chua vị táo xanh","price":2800,"photo":"../images/sanpham/green-apple.jpg"},
    "sp009":{"name":"Sữa chua vị dứa","price":2900,"photo":"../images/sanpham/pineapple.jpg"},
}

/*Thêm sản phẩm vào Giỏ hàng**/
function addCart(code){
    var number = parseInt(document.getElementById(code).value);
    var name = itemList[code].name;
    if(number == 0){
        return;
    }
    if(typeof localStorage[code] === "undefined"){
        window.localStorage.setItem(code, number);
    }
    else{
        var current = window.localStorage.getItem(code);
        if(current+number > 100){
            window.localStorage.setItem(code, 100);
            alert("Số lượng đặt tối đa là 100. Bạn có thể đặt 100 sản phẩm " + name + ".");
            document.getElementById(code).value = 100;
            return;
        }
        else{
            window.localStorage.setItem(code, current+number);
        }
    }
    alert("Đã cập nhật bạn đặt hàng " + name + " với số lượng: " + number);
}

/*Chọn Giỏ hàng --> Mở trang Đơn hàng**/
function openCartFromIndex(){
    // window.location.href = "donhang.html";
    window.open("html/donhang.html", "_blank");
}

/*Chọn Giỏ hàng --> Mở trang Đơn hàng**/
function openCart(){
    // window.location.href = "donhang.html";
    window.open("donhang.html", "_blank");
}

/* 
 Xác định tỷ lệ giảm giá đơn hàng: đặt hàng thứ 2-4, thời gian: 7g00-11g00 và 13g00-17g00
 Quy ra số phút trong ngày thì ta có các giá trị tương đương như sau:
 7g00 =  7 x 60 = 420 phút
 11g00 = 11 x 60 = 660 phút
 13g00 = 13 x 60 = 7800 phút
 17g00 = 17 x 60 = 1020 phút
*/
function getDiscountRate(){
    var d = new Date();                                 // Lấy ngày hiện tại
    var weekday = d.getDate();                          // Lấy ngày trong tuần
    var minutes = d.getHours()*60 + d.getMinutes();     // Đổi thời gian hiện tại thành số phút trong ngày
    if(weekday >= 1 && weekday<=3 && ((minutes >= 420 && minutes <= 600) || (minutes >= 7800 && minutes <=1020))){
        return 0.1;
    }
    return 0;
}

// Hiển thị chi tiết giỏ hàng
function showCart(){
    var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });
    var container = document.getElementById("cartDetail").getElementsByTagName("tbody")[0];
    container.innerHTML = "";

    var sum = 0;    // Tổng mỗi mặt hàng
    var totalPreTax = 0;    // Tổng trước thuế
    var discountRate = getDiscountRate();      // Tỷ lệ khuyến mãi
    var taxRate = 0.1;      // Tỷ lệ thuế
    var discount = 0;       // Tiền giảm giá
    var tax = 0;        // Tiền thuế

    for(var i = 0; i < window.localStorage.length; i++){
        if(typeof itemList[localStorage.key(i)] === "undefined"){
            continue;
        }
        var tr = document.createElement("tr");
        var photoCell = document.createElement("td");
        var nameCell = document.createElement("td");
        var priceCell = document.createElement("td");
        var numberCell = document.createElement("td");
        var sumCell = document.createElement("td");
        var operateCell = document.createElement("td");
        var removeLink = document.createElement("a");
        var item = itemList[localStorage.key(i)];
        var number = localStorage.getItem(localStorage.key(i));

        photoCell.setAttribute("class", "table-border align-center");    // photoCell.style.textAlign = "center"
        photoCell.innerHTML = "<img src='" + item.photo + "' class='product-photo'/>";

        nameCell.setAttribute("class", "table-border align-left");
        nameCell.innerHTML = item.name;

        priceCell.setAttribute("class", "table-border align-right");
        priceCell.innerHTML = formatter.format(item.price);

        numberCell.setAttribute("class", "table-border align-right");
        numberCell.innerHTML = number;

        sum = number * item.price;
        sumCell.setAttribute("class", "table-border align-right");
        sumCell.innerHTML = formatter.format(sum);

        removeLink.setAttribute("class", "align-center");
        removeLink.setAttribute("href", "#");
        removeLink.setAttribute("data-code", localStorage.key(i));
        removeLink.innerHTML = "<i class='fa-solid fa-trash-can awesome trash'></i>";
        removeLink.onclick = function(){
            removeCart(this.dataset.code);
        };
        operateCell.appendChild(removeLink);
        operateCell.setAttribute("class", "table-border align-center");

        tr.appendChild(photoCell);
        tr.appendChild(nameCell);
        tr.appendChild(numberCell);
        tr.appendChild(priceCell);
        tr.appendChild(sumCell);
        tr.appendChild(operateCell);
        container.appendChild(tr);

        totalPreTax += sum;
    }

    var discount = totalPreTax * discountRate;
    var tax = (totalPreTax - discount)* taxRate;
    document.getElementById("bill_pre_tax_total").innerHTML = formatter.format(totalPreTax);
    document.getElementById("bill_discount").innerHTML = discountRate + " x A = " + formatter.format(discount);
    document.getElementById("bill_tax").innerHTML = formatter.format(tax);
    document.getElementById("bill_total").innerHTML = formatter.format(totalPreTax - discount + tax);
}

/* Xóa sản phẩm khỏi đơn hàng**/
function removeCart(code)
{		
	if(typeof window.localStorage[code] !== "undefined")
		{
		//xóa sản phẩm khỏi localStorage
		window.localStorage.removeItem(code);
		//Xóa nội dung của phần thân của bảng (<tbody>)
		document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
		//Hiển thị lại nội dung của đơn hàng
		showCart();
		}	
}

//Cập nhật trang chi tiết đơn hàng khi cập nhật số lượng sản phẩm

//window.addEventListener("storage", showCart);


window.addEventListener("storage", () => {
    // alert("onstorage showCart");
    // console.log("onstorage showCart");
    showCart();
});


/* window.onstorage = () => {
    alert("onstorage showCart");
    console.log("onstorage showCart");
    showCart();
}; */

/* 
window.onstorage = function() {
    alert("onstorage showCart");
    console.log("onstorage showCart");
    showCart();
}; 
 */

/* 
Arrow functions were introduced in ES6

Before Arrow
hello = function() {
    return "Hello World!";
}

With Arrow Function
hello = () => {
    return "Hello World!";
}
*/

$(document).ready(function(){

    // Cập nhật trạng thái Active của link
    var path = window.location.href;
    // Thuộc tính 'href' trong DOM là đường dẫn tuyệt đối
    $("nav .nav-left a").each(function() {
        if (this.href === path || path.endsWith("/")) {
            $(this).addClass(" active-page");
        }
    });

    // Hiển thị quảng cáo
    var d = new Date();
    var ads = "Khách hàng có ngày sinh trong tháng " + d.getMonth() + " sẽ được tặng 2 phần sữa chua dâu cho đơn hàng đầu tiên trong tháng.";
    $("footer").append("<div id='ads-container'><span id='ads-text'><h2>" + ads + "</h2></span></div>");
    var w = ($(window).width() - $("main").width())/2;
    if(w >= 200){
        adsVerEffect();
    }
    else{
        adsHorEffect();
    }

    // Hiển thị tin nổi bật ở trang chủ
    headlineEffect();
});

/*Quảng cáo cuộn dọc màn hình**/
function adsVerEffect(){
    $("#ads-container").addClass("container ads-ver-container")
    $("#ads-container").css("width", ($(window).width() - $("main").width())/2);
    $("#ads-text").addClass("ads-ver-text ads-text");
    $("#ads-text").css("top", $("#ads-container").height());
    $("#ads-text").animate({
        top: '-=' + ($("#ads-container").height() + $("#ads-text").height())}, 18000, function(){
            adsVerEffect();
        });    
}

/*Quảng cáo cuộn ngang màn hình**/
function adsHorEffect(){    
    $("#ads-container").addClass("container ads-hor-container")
    $("#ads-container").css("left", $("main").position().left);
    $("#ads-container").css("width", $("main").width());
    $("#ads-text").addClass("ads-hor-text ads-text");
    $("#ads-text").css("left", $("#ads-container").width());
    $("#ads-text").animate({
        left: '-=' + ($("#ads-container").width() + $("#ads-text").width())}, 30000, function(){
            adsHorEffect();
        });    
}


/*Danh mục tin nổi bật **/
var headlineContent = [
    {"title":"Bánh flan sữa chua - sự kết hợp hoàn hảo", 
        "photo":"images/trangchu/headline1.jpg"}, 
    {"title":"Sữa chua làm từ sữa dê - đậm đà hương vị khó quên", 
        "photo":"images/trangchu/headline2.jpg"}, 
    {"title":"Thưởng thức sữa chua theo cách của bạn", 
        "photo":"images/trangchu/headline3.jpg"}]

// Khởi tạo
function init(){
    // $("article").prepend("<div id='headline'></div>");
    // $("header").after("<div id='headline'></div>");
    if($("#has-headline").length > 0){
        $("#has-headline").before("<div id='headline'></div>");
        for(var i=0; i<headlineContent.length; i++){
            var item = headlineContent[i];
            var divTemp = $("<div>");
            var path = window.location.href;
            $("<span><h3>" + item.title + "</h3></span>").appendTo(divTemp);
            if (path.endsWith("index.html") || path.endsWith("/")) {
                $("<img src='" + item.photo + "'>").appendTo(divTemp);
            }
            else{
                $("<img src='../" + item.photo + "'>").appendTo(divTemp);
            }
            $("#headline").append(divTemp);
        }
    }
}

function headlineEffect(){ 
    init();
    // Ẩn các thẻ div sau thẻ div đầu tiên
    $("#headline > div:gt(0)").hide();
    setInterval(function() {
        $("#headline > div:first")
            .hide()
            .next()
            .fadeIn(1000)
            .end()
            .appendTo("#headline");
    }, 5000);
}
