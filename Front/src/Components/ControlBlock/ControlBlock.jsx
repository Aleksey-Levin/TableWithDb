import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from './ControlBlock.module.css'
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Context from "../../Context";
import {validate} from "../../Helper/Validate";

const ControlBlock = () => {

    const {getSortDropDownOrders, getSortDropDownKeys, setPage, page, countPage, includeStr, setIncludeStr, sortOrder, getSortOrder} = useContext(Context);

    const [currentPageValue, setCurrentPageValue] = useState(page);
    const [includeStrValue, setIncludeStrValue] = useState(includeStr);
    const [hasErrorInputValue, setHasErrorInputValue] = useState(false);

    const hasNextPage = useMemo(() => {
        return page < countPage;
    }, [page, countPage]);

    const hasInputInclude = useMemo(() => {
        return (sortOrder === getSortOrder("contains").toUpperCase() || sortOrder === getSortOrder("equal").toUpperCase());
    }, [sortOrder]);

    const changeInputPage = (e) => {
        if (validate(e.target.value, countPage)) {
            setHasErrorInputValue(false);
        } else {
            setHasErrorInputValue(true);
        }
        setCurrentPageValue(e.target.value);
    }

    const changePageEnter = (e) => {
        if (e.code === "Enter" && !hasErrorInputValue) {
            setPage(parseInt(currentPageValue));
        }
    }
    const changeIncludeStrEnter = (e) => {
        if (e.code === "Enter") {
            setIncludeStr(includeStrValue);
        }
    }

    useEffect(() => {
        setCurrentPageValue(page);
    }, [page])

    useEffect(() => {
        setIncludeStrValue(includeStr);
    }, [includeStr])
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.dropDownContent}>
                    <div className={styles.dropdown}>
                        <DropDownMenu data={getSortDropDownKeys()} type={"Key"} name={"Фильтр"}/>
                        <DropDownMenu data={getSortDropDownOrders()} type={"Order"} name={"Порядок"}/>
                    </div>
                    <div className={styles.dropDownInput}>
                        {hasInputInclude &&
                        <label className={styles.switch}>
                            <input
                                type="text"
                                value={includeStrValue}
                                onChange={(e) => setIncludeStrValue(e.target.value)}
                                onKeyUp={changeIncludeStrEnter}
                                className={styles['switch-input-text'] + " " + styles["equal-input"]}
                            />
                        </label>
                        }
                    </div>
                </div>

                <div className={styles.pageControl}>
                    <div className={styles.pageControlName}>
                        <span>Номер страницы: </span>
                    </div>
                    <div className={styles.pageControlContent}>
                        {page > 1 &&
                        <button
                            onClick={() => setPage((page) => page - 1)}
                            className={styles.button + " " + styles["button-left"]
                            }>
                            -
                        </button>}
                        <label className={styles.switch + " " + styles.labelPage}>
                            <input
                                type="text"
                                value={currentPageValue}
                                onChange={(e) => changeInputPage(e)}
                                onKeyUp={changePageEnter}
                                className={`${styles['switch-input-text']} ${styles['page-input']} ${hasErrorInputValue ? styles["error-input"] : null}`}
                            />
                        </label>
                        {hasNextPage &&
                        <button
                            onClick={() => setPage((page) => page + 1)}
                            className={`${styles.button} ${styles["button-right"]}`}>
                            +
                        </button>}
                    </div>
                    {hasErrorInputValue && <div className={styles.errorText}>
                        Такой страницы не существует
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default ControlBlock;