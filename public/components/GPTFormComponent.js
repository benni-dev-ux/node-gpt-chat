const template = document.createElement("template");
template.innerHTML = `
 
        <h1>GPT Chat</h1>
        <textarea id="input"></textarea>
        <button id="generateRes">Generate Response!</button>
        <p id="response">response</p>
`;

class gptForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }


    async promptResponse() {
        let input = this.shadowRoot.querySelector('#input').value;

        if (input) {
            let uri = '/prompt/' + input
            const response = await fetch(uri, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
            })

            this.shadowRoot
                .querySelector('#response').innerHTML = await response.text();;
        }
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector("#generateRes")
            .addEventListener("click", () => this.promptResponse());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#generateRes").removeEventListener();
    }
}

window.customElements.define("gpt-form", gptForm);