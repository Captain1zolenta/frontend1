function validateInput(input, type) {
    let value = input.value.trim();
    let valid = false;

    if (type === 'number') {
        valid = !isNaN(parseFloat(value)) && isFinite(value);
    } else if (type === 'integer') {
        valid = !isNaN(parseInt(value, 10)) && isFinite(value) && value === parseInt(value, 10).toString();
    }

    if (!valid) {
        input.value = '';
        document.getElementById("errorMessage").innerHTML = "Некорректный ввод. Введите " + (type === 'number' ? 'число (целое или дробное)' : 'целое число');
    } else {
        document.getElementById("errorMessage").innerHTML = '';
    }
}

function calculateCost() {
    let errorMessage = '';
    let quantity1 = validateField('itemQuantity1', 'integer', errorMessage);
    let price1 = validateField('itemPrice1', 'number', errorMessage);
    let quantity2 = validateField('itemQuantity2', 'integer', errorMessage);
    let price2 = validateField('itemPrice2', 'number', errorMessage);

    if (errorMessage) {
        document.getElementById("errorMessage").innerHTML = errorMessage;
    } else {
        let totalCost = quantity1 * price1 + quantity2 * price2;
        document.getElementById("totalCostInput").value = "Стоимость всего заказа: " + totalCost + " руб.";
        document.getElementById("totalCost").innerHTML = "Стоимость всего заказа: " + totalCost + " руб.";
    }
}

function validateField(fieldId, type, errorMessage) {
    let field = document.getElementById(fieldId);
    let value = field.value.trim();

    if (!value) {
        errorMessage = "Поле " + field.placeholder + " не должно быть пустым";
    } else if (type === 'number' && (isNaN(parseFloat(value)) || !isFinite(value))) {
        errorMessage = "Поле " + field.placeholder + " должно содержать число (целое или дробное)";
    } else if (type === 'integer' && (isNaN(parseInt(value, 10)) || !isFinite(value) || value !== parseInt(value, 10).toString())) {
        errorMessage = "Поле " + field.placeholder + " должно содержать целое число";
    }

    if (errorMessage) {
        field.value = '';
    }

    return type === 'integer' ? parseInt(value, 10) : parseFloat(value);
}