const template = document.createElement("template");
template.innerHTML = `

<style>
@import "style.css";
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"
/>

<div class="input-row">
<input  placeholder="Type message..."id="inputField"></input>
<div class="action-btns">
<button id="generateRes"><i class="fa-sharp fa-solid fa-paper-plane btn-icon"></i></button>
<button id="clearMsgs"><i class="fa-solid fa-dumpster btn-icon"></i></button>
</div>
</div>
`;

class gptForm extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }


    async promptResponse() {
        let input = this.shadowRoot.querySelector('#inputField').value;

        if (input) {
            let uri = '/prompt/user/' + input
            const response = await fetch(uri, {
                method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' }
            })

        }
    }

    async clearMessages() {
        let uri = '/clear'
        const response = await fetch(uri, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector("#generateRes")
            .addEventListener("click", () => this.promptResponse());

        this.shadowRoot
            .querySelector("#clearMsgs")
            .addEventListener("click", () => this.clearMessages());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector("#generateRes").removeEventListener();
    }
}

window.customElements.define("gpt-form", gptForm);