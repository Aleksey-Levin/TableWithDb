import React, {useCallback, useContext, useEffect, useMemo} from "react";
import SortData from "../Helper/SortData";
import Row from "./Row";
import Context from "../Context";

function Table(props) {
    const {HeadersData, sortKey, sortOrder, includeStr, page, countRowInPage} = useContext(Context);

    const sortedData = useCallback(
        () => SortData(props.data, sortKey, sortOrder, includeStr),
        [props.data, sortKey, sortOrder, includeStr]
    );

    // Начальный индекс массива для отрисовки нужных элементов на странице
    const startIndex = useMemo(() => {
        return (page - 1) * countRowInPage;
    }, [page, countRowInPage]);

    // Конечный индекс массива для отрисовки нужных элементов на странице
    const endIndex = useMemo(() => {
        return page * countRowInPage;
    }, [page, countRowInPage]);

    // Пагинация
    const paginatedTable = useMemo(() => {
        return sortedData().slice(startIndex, endIndex);
    }, [startIndex, endIndex, sortedData]);

    return (
        <table>
            <thead>
            <tr>
                {HeadersData["data"].map((row) => {
                    return (
                        <td key={row.key}>
                            {row.label}
                        </td>
                    );
                })}
            </tr>
            </thead>
            <tbody>
            {paginatedTable.map((person) => {
                return (
                    <Row key={person.id} person={person} columns={HeadersData.data}/>
                );
            })}
            </tbody>
        </table>
    );
}

export default Table;