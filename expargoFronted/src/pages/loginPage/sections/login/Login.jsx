import React from 'react';
import style from './Login.module.scss'
import { FaRegMap } from "react-icons/fa";
import { IoPricetagsOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import ExpargoMenu from '../expargoMenu/ExpargoMenu';
const Login = () => {
    const navigate = useNavigate()
    return (
        <div className={style.login}>
            <div className={style.container}>
                 <ExpargoMenu className={style.menu}/>
                <div className={style.expargoLogin}>
                    <div className={style.loginContainer}>
                        <div className={style.img}>
                            <img src="https://dash.expargo.com/assets/img/expargo_logo.svg" alt="" />
                            <p>Sizə Yaxın Kargo</p>
                        </div>

                        <div className={style.login}>
                            <img src="https://dash.expargo.com/assets/img/welcome.svg" alt="" />
                            <div className={style.expargologinContainer}>
                                <button className={style.loginBtn1}onClick={()=>navigate('/loginUser')}>DAXİL OL</button>
                                <button className={style.loginBtn2} onClick={() => navigate('/signup')}>QEYDİYYAT</button>
                                <div className={style.cards}>
                                    <div className={style.card}>
                                        <FaRegMap />
                                        <h4>Xidmət şəbəkəsi</h4>
                                    </div>
                                    <div className={style.card}>
                                        <IoPricetagsOutline />
                                        <h4>Tariflər</h4>
                                    </div>
                                    <div className={style.card}>
                                        <LuPhone />
                                        <h4>Əlaqə</h4>

                                    </div>

                                </div>
                                <h2>Daha çox</h2>
                                <p onClick={() => navigate('/')}>www.expargo.com</p>
                            </div>
                        </div>
                        <span>Version: 2.1.1</span>


                    </div>
                </div>

            </div>

        </div>
    );
}

export default Login;
