const problemForm = document.getElementById('problemForm');

// Обработчик события при отправке формы
problemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Проверка, была ли отправка сообщения в течение последнего дня
    const lastSentDate = localStorage.getItem('lastSentDate');
    const currentDate = new Date();

    if (lastSentDate) {
        const lastSent = new Date(lastSentDate);
        const diffTime = Math.abs(currentDate - lastSent);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Разница в днях

        if (diffDays < 1) {
            alert('Вы можете отправить сообщение только раз в день. Пожалуйста, подождите.');
            return;
        }
    }

    const formData = new FormData(problemForm);
    const problem = formData.get('problem');
    const fullName = formData.get('fullName');
    const contactInfo = formData.get('contactInfo');

    // Получение текущей даты и времени
    const currentDateTime = new Date().toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const message = `Отправитель: ${fullName}\nПроблема: ${problem}\nКонтактная информация: ${contactInfo}\nДата и время обращения: ${currentDateTime}`;
    sendTelegramMessage(message);
});

function sendTelegramMessage(message) {
    const token = '7856271752:AAEPmWSAPRbXjo9B0cKXkbYXAyc98rwWpUs'; // Ваш токен бота
    const chatId = '5893538942'; // Ваш ID чата
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Сообщение успешно отправлено!');
            // Сохранение текущей даты отправки в localStorage
            localStorage.setItem('lastSentDate', new Date());
        } else {
            alert('Ошибка при отправке сообщения: ' + data.description);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке сообщения.');
    });
}
