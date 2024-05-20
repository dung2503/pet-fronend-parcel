import React, { useEffect, useState } from "react";
import apiService from "../service/apiService";
import { API_ENDPOINTS } from "../utils/apiRoute";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../components/header";
import "../styles/pages/ProductDetail.css";
function ProductDetail() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const query = useLocation();
    const [product, setProduct] = useState({});
    // const [categorys, setCategory] = useState([]);
    const [productCategory, setProductCategory] = useState({});

    useEffect(() => {
        const searchParams = new URLSearchParams(query.search);
        const id = searchParams.get("id");
        console.log(id);
        const getUserData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                const response = await apiService.get(
                    API_ENDPOINTS.USER.GET_CURRENT_USER
                );
                setUser(response.data);
            }
        };

        const getDetailProduct = async (id) => {
            console.log(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`);
            const response = await apiService.get(`${API_ENDPOINTS.PRODUCT.BASE}/${id}`).then((data) => { setProduct(data.data); }).catch((error) => { alert("Failed"); console.log(error); })
        }
        const getCategory = async () => {
            const response = await apiService.get(`${API_ENDPOINTS.CATEGORY.BASE}/${product.categoryId}`)
            if (response.status >= 200 && response.status <= 299) {
                console.log(`category data: `, response.data);
                setProductCategory(response.data)
            }

        }
        getCategory();

        const unlisten = history.listen(() => {
            getUserData();
            getDetailProduct(id);
        });



        getUserData();
        getDetailProduct(id);

        return () => {
            unlisten();
        };

    }, [history, query.search, product.categoryId]);

    return (
        <div>
            <Header fullName={user.fullName} />
            <div class="details">
                <div class="product-details">
                    <div class="details-title">
                        <Link to="/">Home</Link>
                        <i class="fa-solid fa-chevron-right"></i>
                        <p>{product.name} </p>
                    </div>
                    <div class="details-content">
                        <div class="details-content-right">
                            <img src={product.images} />

                        </div>
                        <div class="details-content-left">
                            <div class="content-left-title">
                                <p>{product.name}  </p>
                            </div>
                            <div class="content-left-content">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <p>  |  212 Đánh giá |  1,1k Đã bán </p>
                            </div>
                            <div class="content-left-price">

                                <div class="price-now">
                                    <p> {product.price}.000VND </p>
                                    {/* <div class="price-voucher">
                                        <p>20% Giảm</p>
                                    </div> */}
                                </div>
                            </div>
                            <div class="content-left-ship">
                                <p>Vận chuyển </p>
                                <div class="content-left-ship-pree">
                                    <i class="fa-solid fa-truck-fast"></i>
                                    <span>Miễn phí vận chuyển </span>
                                </div>
                            </div>
                            <div class="content-left-quality">
                                <p>Số lượng</p>
                                <div class="content-left-quanlity-product">
                                    <button id="plus-btn" onclick="handlePlus()"><i class="fa-solid fa-plus" ></i></button>
                                    <input id="amount" type="text" value="1" />
                                    <button id="minus-btn" onclick="handleMinus()"><i class="fa-solid fa-minus" ></i></button>
                                </div>
                              
                            </div>
                            <div class="content-left-handle-product">
                                <div class="content-left-handle-product-add">
                                    <Link to={`/product-cart?id=${product._id}`}> <i class="fa-solid fa-cart-shopping"></i>
                                        <p>Thêm vào giỏ hàng</p>
                                    </Link>
                                    {/* <Link to={`/cart?id=${productId}`}>Go to Cart</Link> */}
                                </div>
                                <div class="content-left-handle-product-sale">
                                    <a href="">
                                        <p>Mua ngay</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details-content-bottom">
                        <p>Chi tiết sản phẩm</p>
                        <div class="details-content-bottom-product">
                            <div class="content"><label for="">Danh mục</label>
                                <div class="details-content-bottom-category">
                                    <a href="">Shop pet</a>
                                    <i class="fa-solid fa-chevron-right"></i>
                                    <Link to="">{productCategory.type == "DOG" ? "Chóa" : "Mòe"}</Link>
                                    {/* {
                                        categorys.map((category) => (
                                            <Link to="">{category.type}</Link>))
                                    } */}
                                    <i class="fa-solid fa-chevron-right"></i>
                                    <a href="">{product.name}</a>
                                </div>
                            </div>
                            <div class="content"><label for="">Trạng thái</label><span>{product.status == "AVAILABLE" ? "Còn hàng" : "Hết hàng"}</span></div>
                            <div class="content"><label for="">Xuất xứ</label><span>{product.origin}</span></div>
                            <div class="content"><label for="">Tuổi: </label> <span>{product.age}</span></div>
                            <div class="content"><label for="">Màu: </label> <span>{product.color}</span></div>

                            <div class="content"><label for="">Mô tả </label>
                                <div class="details-pet">{product.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;