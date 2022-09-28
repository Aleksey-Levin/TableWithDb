import IncorrectSortOrderException from "../../Exception/IncorrectSortOrderException";

// Файл выбора всех режимов сортировки (по возрастанию, убыванию)

export const getSortOrder = (key) =>{
    if (!SortOrder.hasOwnProperty(key.toUpperCase())) {
        throw new IncorrectSortOrderException(key);
    }

    return SortOrder[key.toUpperCase()];
}

export const getSortDropDownOrders = () =>{
    return SortDropDownOrder;
}

const SortOrder = Object.freeze({
    ASCENDING : "ascending",
    DESCENDING : "descending",
    CONTAINS : "contains",
    EQUAL : "equal",
});

const SortDropDownOrder = Object.freeze({
    ASCENDING : "По возрастанию",
    DESCENDING : "По убыванию",
    CONTAINS : "Содержит",
    EQUAL : "Равно",
})