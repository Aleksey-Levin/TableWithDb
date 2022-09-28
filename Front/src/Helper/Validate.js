// Функция валидации чисел
export function validate (value, maxValue){
    let regular = /^(0|[1-9]\d*)$/;
    let floatValue = parseInt(value)
    if (floatValue > maxValue || floatValue < 1 || !(regular.test(value))) return false;
    return true;
}