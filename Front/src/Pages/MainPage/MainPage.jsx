import React, {useEffect, useMemo, useState} from 'react';
import Table from "../../Components/Table";
import ControlBlock from "../../Components/ControlBlock/ControlBlock";
import Context from "../../Context";
import {HeadersData} from "../../Helper/State/HeadersData";
import {getSortDropDownOrders, getSortOrder} from "../../Helper/State/SortOrder";
import {getSortDropDownKeys, getSortKey} from "../../Helper/State/SortKey";
import {getConfigurate} from "../../Helper/State/InitConfigurate";
import {getData} from "../../Helper/Api";


const MainPage = () => {
    const [data, setData] = useState([]); // Данные таблицы
    const [page, setPage] = useState(0); // Номер текущей страницы
    const [includeStr, setIncludeStr] = useState(""); // Подстрока для проверки на её наличие в таблице (параметр CONTAINS и EQUAL)

    const [sortKey, setSortKey] = useState(getConfigurate("start_sort_key")); // Ключ сортировки
    const [sortOrder, setSortOrder] = useState(getConfigurate("start_sort_order")); // Порядок сортировки + парметры CONTAINS и EQUAL для проверки на наличие и совпадение

    const countRowInPage = getConfigurate("COUNT_ROW_IN_PAGE"); // Количество строк на одной странице

    // Вычисление количества страниц на основе количества поступающих данных
    const countPage = useMemo(() => {
        return Math.ceil([...data].length / countRowInPage);
    }, [data, countRowInPage]);

    // Создание контекста
    const value = {
        getSortOrder,
        getConfigurate,
        getSortKey,
        getSortDropDownKeys,
        getSortDropDownOrders,
        HeadersData,
        sortKey,
        setSortKey,
        sortOrder,
        setSortOrder,
        page,
        setPage,
        countRowInPage,
        countPage,
        includeStr,
        setIncludeStr,
        data
    }

    useEffect(() => {

        // Запрос к серверу с целью получения данных
        getData().then(res=>setData(res));

        // Получение данных с URL страницы
        const windowData = Object.fromEntries(
            new URL(window.location).searchParams.entries()
        );

        // Парсинг полученных данных
        const VALID_KEYS = ["sortBy", "option", "page", "include"];
        VALID_KEYS.forEach(key => {
            switch (key) {
                case "page":
                    setPage(!windowData["page"] ? 1 : parseInt(windowData["page"]));
                    break;
                case "sortBy":
                    setSortKey(!Boolean(windowData["sortBy"]) ? getConfigurate("start_sort_key") : windowData["sortBy"]);
                    break;
                case "option":
                    setSortOrder(!windowData["option"] ? getConfigurate("start_sort_order") : windowData["option"]);
                    break;
                case "include":
                    setIncludeStr(!windowData["include"] ? "" : windowData["include"]);
                    break;
            }
        });
    }, [])

    // Динамическое изменеие URL страницы для запоминания параметров
    useEffect(() => {
        window.history.pushState(
            null,
            document.title,
            `${window.location.pathname}?sortBy=${sortKey}&option=${sortOrder}&include=${includeStr}&page=${page}`);
    }, [sortKey, sortOrder, page, includeStr]);

    return (
        <Context.Provider value={value}>
            <div className={"Main"}>
                <ControlBlock/>
                <Table data={data}/>
            </div>
        </Context.Provider>
    );
};

export default MainPage;