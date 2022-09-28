export default function IncorrectSortKeyException(value, message = "") {
    this.message = message;
    this.value = value;
}