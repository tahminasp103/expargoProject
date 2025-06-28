import React from 'react';
import style from './CargoService.module.scss'
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaManatSign } from "react-icons/fa6";
const CargoService = () => {
    return (
        <div className={style.cargoService}>
            <div className={style.container}>
                <h2>Ölkədaxili Karqo Xidməti</h2>
                <div className={style.cargoContainer}>
                    <div className={style.cargoLocation}>
                        <div className={style.location}>
                            <span>2.50 <FaManatSign /></span>
                            <h3>Bakı və Abşeron ərazisi</h3>
                        </div>
                        <div className={style.line}></div>
                        <div className={style.location}>
                            <span>3.50 <FaManatSign /></span>
                            <h3>Bölgələrə göndəriş</h3>
                        </div>
                        <div className={style.line}></div>
                        <div className={style.location}>
                            <span>5.00 <FaManatSign /></span>
                            <h3>Naxçıvan</h3>
                        </div>
                        <div className={style.line}></div>
                        <p>Bu xidmət, şəxsi və ya kommersiya məqsədli bağlamalarınızı sərfəli və sürətli şəkildə
                             bir məntəqədən digərinə çatdırmaq üçün nəzərdə tutulub. Xidmət həm fərdi istifadəçilər,
                              həm də mağazalar üçün ideal seçimdir. Bağlamalarınız minimal qiymətlə ən sürətli şəkildə 
                              təyinat məntəqəsinə çatdırılır.
                        </p>
                         <div className={style.cards}>
                           <div className={style.image}>
                            <div className={style.imgCard}>
                                <img src="https://expargo.com/assets/icon/asset6.svg" alt="" />
                                <span>1</span>
                            </div>
                            <p>Müştərilərinizin sifarişini filiala təqdim edin</p>
                        </div>
                        <div className={style.lineImage}>
                        </div>
                       <div className={style.image}>
                            <div className={style.imgCard}>
                                <img src="https://expargo.com/assets/icon/asset5.svg" alt="" />
                                <span>2</span>
                            </div>
                            <p>Seçdiyiniz filialdan təhvil alsın</p>
                        </div>
                         </div>
                         <div className={style.information}>
                            <span><IoInformationCircleOutline /> Bağlamaların ümumi çəkisi</span>
                           <span className={style.blackText}>5 kq-dan artıq</span>
                           <span>olduqda əlavə hər kiloqram üçün</span>
                           <span className={style.blackText}>1 AZN</span>
                           <span> hesablanacaqdır. Naxçıvandan Bakı-Abşeron xaric digər bölgələr üçün 5 kg-a qədər 
                            7.50 azn, 5 kg-dan artıq olduqda isə hər kg üçün 1.50 azn hesablanacaqdır.</span>
                         </div>
                      
                    </div>
                    <div className={style.service}>
                        <div className={style.delivery}>
                            <div className={style.deliveryCard}>
                                <img src="https://expargo.com/assets/icon/location.png" alt="" />
                                <div className={style.text}>
                                    <div className={style.textContainer}>
                                        <span>Ölkə ərazisində</span> <span className={style.yellowText}> 100+</span><span> təhvil məntəqəsi</span>
                                    </div>
                                    <p>Geniş xidmət şəbəkəmiz sayəsində ölkəmizin hər yeri sizə əlçatandır!</p>
                                </div>
                            </div>
                                <div className={style.deliveryCard}>
                                <img src="https://expargo.com/assets/icon/asset1.svg" alt="" />
                                <div className={style.text}>
                                    <div className={style.textContainer}>
                                        <span>Onlayn izləmə və</span> <span className={style.yellowText}>  SMS məlumatlandırma</span>
                                    </div>
                                    <p>Həm göndərici, həm də alıcı bağlamanızı anlıq izləyə, çatdırılma barədə SMS vasitəsilə xəbərdar ola bilər.</p>
                                </div>
                            </div>
                                <div className={style.deliveryCard}>
                                <img src="https://expargo.com/assets/icon/asset3.svg" alt="" />
                                <div className={style.text}>
                                    <div className={style.textContainer}>
                                        <span>Bakı və Abşerona</span> <span className={style.yellowText}>24 saat</span> <span>, regionlara</span>
                                        <span className={style.yellowText}>48 saat </span> <span>ərzində çatdırılma zəmanəti</span>
                                    </div>
                                    <p>Bağlamalarınız ən qısa zamanda çatdırılır.</p>
                                </div>

                            </div>
                             <div className={style.deliveryCard}>
                                <img src="https://expargo.com/assets/icon/asset2.svg" alt="" />
                                <div className={style.text}>
                                        <span>Müştəri xidmətləri</span> 
                                    <p>Sosial media, telefon və e-poçt vasitəsilə peşəkar müştəri xidmətləri dəstəyi təqdim edilir.</p>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        </div>
    );
}

export default CargoService;
