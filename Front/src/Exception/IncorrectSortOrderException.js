export default function IncorrectSortOrderException(value, message = "") {
    this.message = message;
    this.value = value;
}