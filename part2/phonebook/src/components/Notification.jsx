import {useEffect} from "react";

const Notification = ({notifications, setNotifications}) => {

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                setNotifications(notifications.slice(1));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notifications]);

    return (
        <>
            {
                notifications.length > 0 && notifications.map((notification, index) => {
                    return (
                        <div key={index} className={`notification ${notification.type}`}>
                            {notification.message}
                            <button onClick={() => {
                                setNotifications(notifications.filter((_, i) => i !== index));
                            }} className="close-notification">X</button>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Notification