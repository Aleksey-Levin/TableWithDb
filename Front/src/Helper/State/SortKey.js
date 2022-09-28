import IncorrectSortKeyException from "../../Exception/IncorrectSortKeyException";

// Файл возможных ключей для сортировок

export const getSortKey = (key) =>{
    if (!SortKey.hasOwnProperty(key.toUpperCase())) {
        throw new IncorrectSortKeyException(key);
    }

    return SortKey[key.toUpperCase()];
}

export const getSortDropDownKeys = () =>{
    return SortDropDownKey;
}
const SortKey = Object.freeze({
    ID : "id",
    NAME : "name",
    COUNT : "count",
    DISTANCE: "distance",
});

const SortDropDownKey = Object.freeze({
    ID : "id",
    NAME : "По имени",
    COUNT : "По количеству",
    DISTANCE: "По дистанции",
})