import {getSortOrder} from "./State/SortOrder";
import {getSortKey} from "./State/SortKey";

// Функция сортирови данных
export default function SortData(tableData, sortKey, sortOrder, str)
{
    sortKey = getSortKey(sortKey);
    sortOrder = getSortOrder(sortOrder);
    let sortedData;
    switch (sortOrder) {
        case getSortOrder("ascending"):
            sortedData = tableData.sort((a, b) => {
                return a[sortKey] > b[sortKey] ? 1 : -1;
            });
            break;
        case getSortOrder("descending"):
            sortedData = tableData.sort((a, b) => {
                return a[sortKey] > b[sortKey] ? -1 : 1;
            });
            break;
        case getSortOrder("contains"):
            sortedData = tableData.filter(data => data[sortKey].toString().includes(str));
            break;
        case getSortOrder("equal"):
            sortedData = tableData.filter(data => (data[sortKey].toString() === str || str === ""));
            break;
    }
    return sortedData;
}