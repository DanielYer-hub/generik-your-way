export default class TodosManager {
    toggleVisibility(textElement, button) {
        if (textElement.style.display === "none") {
            textElement.style.display = "inline";
            button.innerHTML = "Hide";
        } else {
            textElement.style.display = "none";
            button.innerHTML = "Show";
        }
    }
}

