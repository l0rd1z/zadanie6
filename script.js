document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const productTypeRadios = document.getElementsByName('product_type');
    const productOptionSelect = document.getElementById('product_option');
    const productPropertyCheckbox = document.getElementById('product_property');
    const optionsContainer = document.getElementById('options-container');
    const propertyContainer = document.getElementById('property-container');
    const calculateButton = document.getElementById('calculate');
    const resultDiv = document.getElementById('result');

    // Базовые цены для каждого типа товара
    // Это пример, вы можете задать свои цены
    const basePrices = {
        type1: 800, // Тип 1
        type2: 1500, // Тип 2
        type3: 2200  // Тип 3
    };

    // Дополнительные цены для опций (только для Тип 2)
    const optionPrices = {
        base: 0,
        premium: 350
    };

    // Дополнительная цена для свойства (только для Тип 3)
    const propertyPrice = 2500;

    // Функция для обновления интерфейса при смене типа товара
    function updateFormVisibility() {
        let selectedType = getSelectedProductType();
        if (!selectedType) return;

        // Логика отображения полей:
        // Тип 1: никаких дополнительных опций
        // Тип 2: только селект (нет чекбокса)
        // Тип 3: только чекбокс (нет селекта)
        if (selectedType === 'type1') {
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'none';
        } else if (selectedType === 'type2') {
            optionsContainer.style.display = 'block';
            propertyContainer.style.display = 'none';
        } else if (selectedType === 'type3') {
            optionsContainer.style.display = 'none';
            propertyContainer.style.display = 'block';
        }
    }

    // Функция для получения выбранного типа товара
    function getSelectedProductType() {
        for (let i = 0; i < productTypeRadios.length; i++) {
            if (productTypeRadios[i].checked) {
                return productTypeRadios[i].value;
            }
        }
        return null;
    }

    // Функция для расчёта стоимости
    function calculatePrice() {
        const quantity = parseFloat(quantityInput.value);
        if (isNaN(quantity) || quantity <= 0) {
            resultDiv.textContent = 'Пожалуйста, введите корректное количество.';
            return;
        }

        const selectedType = getSelectedProductType();
        if (!selectedType) {
            resultDiv.textContent = 'Пожалуйста, выберите тип товара.';
            return;
        }

        let price = basePrices[selectedType] || 0;

        // Если выбран тип 2, добавляем стоимость опции
        if (selectedType === 'type2') {
            const selectedOption = productOptionSelect.value;
            price += optionPrices[selectedOption] || 0;
        }

        // Если выбран тип 3, проверяем чекбокс
        if (selectedType === 'type3' && productPropertyCheckbox.checked) {
            price += propertyPrice;
        }

        // Общая стоимость
        const total = price * quantity;

        resultDiv.textContent = `Общая стоимость: ${total.toFixed(2)} руб.`;
    }

    // Слушатели событий:
    // При смене типа товара обновляем форму
    productTypeRadios.forEach(radio => {
        radio.addEventListener('change', updateFormVisibility);
        radio.addEventListener('change', calculatePrice);
    });

    quantityInput.addEventListener('input', calculatePrice);
    productOptionSelect.addEventListener('change', calculatePrice);
    productPropertyCheckbox.addEventListener('change', calculatePrice);

    calculateButton.addEventListener('click', calculatePrice);
});
