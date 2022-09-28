import IncorrectConfigurateKeyException from "../../Exception/IncorrectConfigurateKeyException";

// Файл конфигурации начального состояния таблицы

export const getConfigurate = (key) =>{
    if(!initConfigurate.hasOwnProperty(key.toUpperCase())){
        throw new IncorrectConfigurateKeyException(key);
    }

    return initConfigurate[key.toUpperCase()];
}

const initConfigurate = Object.freeze({
    START_SORT_KEY : "name",
    START_SORT_ORDER: "ascending",
    COUNT_ROW_IN_PAGE: 15,
})