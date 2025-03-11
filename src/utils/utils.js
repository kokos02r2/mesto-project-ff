import { closeModal } from '../components/modal.js';

export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
    button.textContent = isLoading ? loadingText : buttonText;
    button.disabled = isLoading;
}

export function handleSubmit(request, evt, loadingText = "Сохранение...") {
    evt.preventDefault();

    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;

    renderLoading(true, submitButton, initialText, loadingText);

    request()
        .then(() => {
            evt.target.reset();
            closeModal(evt.target.closest(".popup"));
        })
        .catch(err => console.error(`Ошибка: ${err}`))
        .finally(() => {
            renderLoading(false, submitButton, initialText);
        });
}
