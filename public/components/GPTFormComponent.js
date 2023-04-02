const template = document.createElement("template");
template.innerHTML = `

<style>
@import "style.css";
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer"
/>

<div class="input-row">
<input  placeholder="Type message..."id="inputField"></input>

<button id="generateRes"><i class="fa-sharp fa-solid fa-paper-plane"></i></button>
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

            this.shadowRoot
                .querySelector('.response').innerHTML = await response.text();;
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