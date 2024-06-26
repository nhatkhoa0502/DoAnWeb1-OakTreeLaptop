// ---------------------------------------------------------------------------- //
var productList = JSON.parse(localStorage.getItem('product'));
var userList = JSON.parse(localStorage.getItem('user'));
var tempArray = []; // mảng chứa thông tin đơn hàng của user

function formPayment() {
    document.querySelector('.cartPayment').innerHTML = `
    <div class="container__cart-title">Đơn Hàng hiện tại</div>
    <div class="container__Mycart-wrap">
        <ul class="container__Mycart-listItem">
            <div class="container_Mycart-Temp">
                Hiện tại bạn chưa đặt đơn hàng nào cả :(
            </div>
        </ul>
    </div>
    `;
}

// ---------------------------------------------------------------------------- //
// function xử lí công việc thêm sản phẩm vào giỏ hàng
function addCart(nameProduct) {
    // kiểm tra người dùng có đăng nhập hay chưa
    var check = document.querySelector(".js-HandlerLR").classList.contains("js-isLogin");
    if (!check) alert("Hãy đăng nhập để có thể mua sắm.");
    else {
        // nếu đã đăng nhập rồi thì
        for (var i = 0; i < productList.length; i++) {
            if (productList[i].name == nameProduct) {
                // đẩy danh sách sản phẩm của người dùng đã mua vào một Obj riêng
                var tempCart = {
                    id: productList[i].id,
                    type: productList[i].type,
                    name: productList[i].name,
                    img: productList[i].img,
                    price: productList[i].price,
                }
                tempArray.push(tempCart);

                var temp = '';
                for (var j = 0; j < tempArray.length; j++) {
                    temp += `
                    <li class="container__cart-Item">
                        <img img src="./core/${tempArray[j].img}" class="container__cart-img">
                        <div class="container__cart-Item-Info">
                            <div class="container__cart-Item-head">
                                <h5 class="container__cart-Item-name">${tempArray[j].name}</h5>
                                <span class="container__cart-Item-price">${tempArray[j].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                            </div>
                            <div class="container__cart-Item-body">
                                <div class="container__cart-Item-desciption">Phân Loại: ${tempArray[j].type}</div>
                                <span class="container__cart-Item-remove" onclick="deleteCart(\'${tempArray[j].name}\')">Xóa</span>
                            </div>
                        </div>
                    </li>`;
                }

                document.querySelector(".cart").innerHTML = `
                            <div class="container__cart-title">Giỏ hàng</div>
                            <div class="container__cart-wrap">
                                <ul class="container__cart-listItem">${temp}</ul>
                            </div>
                            <div class="btn-cart">
                                <div class="btn-Product">Thanh toán</div>
                            </div>`;

                // hàm này ở đây vì lí do trang Giỏ hàng phải có nút đặt hàng thì mới chạy lệnh được
                // bthg nếu ko làm gì thì nút đặt hàng k tồn tại do chưa inner ra
                pushCarttoLocalStorage();
            }
        }
    }
}

function deleteCart(nameProduct) {
    for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].name == nameProduct) {
            if (confirm('Bạn có muốn xóa sản phẩm này ?')) {
                tempArray.splice(i, 1);
            }
            break;
        }
    }
    // in lại tempArray
    var temp = '';
    for (var j = 0; j < tempArray.length; j++) {
        temp += `
        <li class="container__cart-Item">
            <img img src="./core/${tempArray[j].img}" class="container__cart-img">
            <div class="container__cart-Item-Info">
                <div class="container__cart-Item-head">
                    <h5 class="container__cart-Item-name">${tempArray[j].name}</h5>
                    <span class="container__cart-Item-price">${tempArray[j].price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</span>
                </div>
                <div class="container__cart-Item-body">
                    <div class="container__cart-Item-desciption">Phân Loại: ${tempArray[j].type}</div>
                    <span class="container__cart-Item-remove" onclick="deleteCart(\'${tempArray[j].name}\')">Xóa</span>
                </div>
            </div>
        </li>`;
    }

    document.querySelector(".cart").innerHTML = `
                <div class="container__cart-title">Giỏ hàng của tôi</div>
                <div class="container__cart-wrap">
                    <ul class="container__cart-listItem">${temp}</ul>
                </div>
                <div class="btn-cart">
                    <div class="btn-Product">Thanh toán</div>
                </div>
                `;

    // hàm này ở đây vì lí do trang Giỏ hàng phải có nút đặt hàng thì mới chạy lệnh được
    // bthg nếu ko làm gì thì nút đặt hàng k tồn tại do chưa inner ra
    pushCarttoLocalStorage();
}

// ---------------------------------------------------------------------------- //
// function xử lí công việc xử lí và gửi đơn hàng mà user đã đặt lên Local Storage
function pushCarttoLocalStorage() {
    document.querySelector(".btn-Product").addEventListener('click', () => {
        if (confirm('Xác nhận đặt hàng ?')) {
            if (tempArray.length == 0) {
                alert('Giỏ hàng đang trống !\nVui lòng thêm sản phẩm vào giỏ hàng trước khi ấn nút Thanh toán');
            } else {
                // lấy tên người dùng mua sản phẩm
                // lấy từ cái ô đăng nhập
                var nameUser = document.getElementById("js-Username").innerText;

                // trả về danh sách những tên sản phẩm đã mua
                var ListNameProducts = tempArray.map(item => {
                    return item.name;
                })

                // trả về tổng tiền của sản phẩm
                var totalMoney = tempArray.reduce((total, item) => {
                    return total + item.price;
                }, 0)

                // lọc dữ liệu
                var tempTemp = {
                    username: nameUser,
                    totalProducts: tempArray,
                    ListNameProducts: ListNameProducts,
                    totalMoney: totalMoney,
                    status: 'pending', // mặc định sau khi đặt hàng xong thì trạng thái đơn hàng sẽ là đang chờ cho admin duyệt
                }

                // đẩy đơn hàng lên localStorage
                var totalPayment = JSON.parse(localStorage.getItem('cartList'));
                totalPayment.push(tempTemp);
                localStorage.setItem('cartList', JSON.stringify(totalPayment));

                // xử lí in ra màn hình 
                var temp = '';
                var showPayment = JSON.parse(localStorage.getItem('cartList')); // lấy dữ liệu từ local để show lên màn hình
                for (var i = 0; i < showPayment.length; i++) {
                    if (showPayment[i].username == nameUser) {
                        if (showPayment[i].status == 'pending') {
                            value = "Đang xử lí";
                            color = "yellow";
                        }
                        
                        if (showPayment[i].status == 'confirmed') {
                            value = "Đã xác nhận";
                            color = "#81fb3a";
                        }

                        if (showPayment[i].status == 'unconfirmed') {
                            value = "Đã huỷ";
                            color = "red";
                        }

                        temp += `
                        <tr>
                            <td style="width: 5%">${i+1}</td>
                            <td style="width: 55%">${showPayment[i].ListNameProducts.join('</br>')}</td>
                            <td style="width: 20%">${showPayment[i].totalMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                            <td id="js-cart-status" style="width: 20%; color: ${color}">${value}</td>
                        </tr>
                        `;
                    }
                }

                document.querySelector('.container__Mycart-listItem').innerHTML = `
                <table id="listProduct">
                    <tr>
                        <th>STT</th>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                    ${temp}
                </table>`;

                // xử lí hậu sự kiện gửi data lên Local Storage
                sendRequire(tempArray);  // gửi Toast Message thông báo rằng yêu cầu đặt hàng đã được gửi cho admin
                tempArray = []; // reset lại tempArray 

                // gửi thông điệp cảm ơn
                document.querySelector('.container__cart-listItem').innerHTML = `
                    <div class="container_Mycart-Temp">
                        <p>Cảm ơn quý khách đã mua sắm</p>
                        <p>Chúc quý khách một ngày tốt lành</p>
                    </div>
                `;
            }
        }
    })
}


// ----------------------------------------------------------------------------------------------------------
// Toast Notify Form 
function addCartSuccess() {
    var check = document.querySelector(".js-HandlerLR").classList.contains("js-isLogin");
    if (!check) return false;
    else {
        toast({
            type: 'success',
            title: 'Giỏ hàng',
            message: 'Đã thêm sản phẩm vào giỏ hàng !',
            duration: 1300
        });
    }
}

function sendRequire(arr) {
    if (arr.length == 0) return false;
    else {
        toast({
            type: 'success',
            title: 'Đơn hàng',
            message: 'Đã gửi yêu cầu đơn hàng cho người bán\nVui lòng đợi phản hồi từ người bán !',
            duration: 3000
        });
    }
}