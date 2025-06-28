import React, { useEffect, useState } from 'react';
import style from './Notification.module.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { IoIosArrowBack } from "react-icons/io";
const Notification = () => {
    const user = useSelector(state => state.auth.user);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?._id) return;

        const fetchNotifications = async () => {
            try {
                const res = await axios.get(`http://localhost:7777/api/notifications/${user._id}`);
                console.log('API Notifications raw data:', res.data);
                const data = Array.isArray(res.data) ? res.data : (res.data.notifications || []);
                console.log('Parsed notifications:', data);
                setNotifications(data);
            } catch (err) {
                console.error('Bildirişləri gətirmək alınmadı', err);
                setNotifications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    return (
        <div className={style.notification}>
            <ExpargoMenu className={style.menu} />
            <div className={style.container}>
                <h2><IoIosArrowBack /> Bildirişlər</h2>
                <div className={style.notificationContainer}>
                    {loading ? (
                        <div className={style.empty}>Yüklənir...</div>
                    ) : !Array.isArray(notifications) || notifications.length === 0 ? (
                        <div className={style.empty}><p>Heç bir bildiriş tapılmadı.</p></div>
                    ) : (
                        <>
                            <h2>Bildirişlər</h2>
                            <ul>
                                {notifications.map((notif) => (
                                    <li key={notif._id} className={notif.isRead ? style.read : style.unread}>
                                        {notif.message}
                                        <br />
                                        <small>{new Date(notif.createdAt).toLocaleString()}</small>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification;
