import React from 'react';
import style from './ShopSection.module.scss'
import ExpargoMenu from '../../../loginPage/sections/expargoMenu/ExpargoMenu';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
const ShopSection = () => {
    const navigate = useNavigate()
    return (
        <div className={style.shop}>
            <ExpargoMenu />
            <div className={style.container}>
                <h2 onClick={() => navigate(-1)}><IoIosArrowBack />Mağazalar</h2>
                <div className={style.info}>
                    <div className={style.inp}>
                        <IoIosSearch /> <input type="text" placeholder='Mağaza ad və ya linki' />
                    </div>
                    <div className={style.svg}>
                        <IoMdInformationCircle />
                        <p>Təlimat</p>
                    </div>
                </div>
                <div className={style.btn}>
                    <button><img src="https://expargo.com/assets/img/flags/tr.png" alt="" /> Türkiyə</button>
                    <button><img src="https://expargo.com/assets/img/flags/uk.png" alt="" /> ABŞ</button>
                </div>
                <div className={style.shopCards}>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/456.jpg" alt="" />
                        <a href="https://www.lacoste.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/546.jpg" alt="" />
                        <a href="https://www.lcwaikiki.de/tr-TR/DE" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/582.jpg" alt="" />
                        <a href="https://www.lcwaikiki.de/tr-TR/DE" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/582.jpg" alt="" />
                        <a href="https://www.penti.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/632.jpg" alt="" />
                        <a href="https://www.dilvin.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/644.jpg" alt="" />
                        <a href="https://www.fenerium.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/443.jpg" alt="" />
                        <a href="https://www.beymen.com/tr" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/559.jpg" alt="" />
                        <a href="https://www.toyzzshop.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/460.jpg" alt="" />
                        <a href="https://www.kartalyuvasi.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/548.jpg" alt="" />
                        <a href="https://www.bershka.com/tr/h-woman.html" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/560.jpg" alt="" />
                        <a href="https://tr.puma.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/431.jpg" alt="" />
                        <a href="https://www.elleshoes.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/432.jpg" alt="" />
                        <a href="https://www.kemaltanca.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/433.jpg" alt="" />
                        <a href="https://www.boyner.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/564.jpg" alt="" />
                        <a href="https://www.collezione.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/436.jpg" alt="" />
                        <a href="http://shop.mango.com/tr/tr" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/437.jpg" alt="" />
                        <a href="https://www.oysho.com/tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/454.jpg" alt="" />
                        <a href="https://www.kinetix.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/482.jpg" alt="" />
                        <a href="https://www.reebok.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/579.jpg" alt="" />
                        <a href="https://www.jimmykey.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/392.jpg" alt="" />
                        <a href="https://www.boyner.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/396.jpg" alt="" />
                        <a href="https://www.defacto.com.tr/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/398.jpg" alt="" />
                        <a href="https://www.trendyol.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/403.jpg" alt="" />
                        <a href="https://www.adidas.com.tr/tr" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/418.jpg" alt="" />
                        <a href="https://www.hepsiburada.com/" target='_blank'></a>
                    </div>
                    <div className={style.card}>
                        <img src="https://api.expargo.com/static/images/shop_images/419.jpg" alt="" />
                        <a href="https://www.massimodutti.com/tr" target='_blank'></a>
                    </div>
                </div>
                <div className={style.shops}>
                    <div className={style.shopCard}>
                        <img src="https://api.expargo.com/static/images/shop_cat_images/36.jpg" alt="" />
                        <p>Populyar Mağazalar</p>
                    </div>
                    <div className="shopCard">
                        <img src="https://api.expargo.com/static/images/shop_cat_images/39.jpg" alt="" />
                        <p>Ayaqqabı</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ShopSection;
