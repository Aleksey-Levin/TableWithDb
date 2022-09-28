import React, {useContext, useRef} from "react";
import {useDetectOutsideClick} from "../../hooks/useDetectOutsideClick";
import styles from './DropDownMenu.module.css'
import Context from "../../Context";

const DropDownMenu = ({data, type, name}) => {
    const {setSortKey, setSortOrder} = useContext(Context);

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    const SortKeyType = Object.keys(data);
    const SortKeyValue = Object.values(data);

    const handlerClick = (value) =>{
        switch (type) {
            case "Key":
                setSortKey(value);
                break;
            case "Order":
                setSortOrder(value);
                break;
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.menuCont}>
                <button onClick={onClick} className={styles.trigger}>
                    <span>{name}</span>
                </button>
                <nav
                    ref={dropdownRef}
                    className={`${styles.menu} ${isActive ? styles.active : styles.inactive}`}
                >
                    <ul>
                        {SortKeyValue.map((li, index)=>{
                            return (
                                <li key={index} onClick={()=>handlerClick(SortKeyType[index])}>
                                    <a href="#">{li}</a>
                                </li>
                            )
                        })}

                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default DropDownMenu;