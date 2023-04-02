const template = document.createElement("template");
template.innerHTML = `


<style>
@import "style.css";
</style>
<button id="updatemsgs">update</button>
<div class="message-container">


<p class="message request">Hi There!</p>



</div>
`;

class messageContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

    }



    async updateMessages() {

        let uri = '/all/'
        const response = await fetch(uri, {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(await response.text())
    }

    connectedCallback() {
        this.shadowRoot
            .querySelector("#updatemsgs")
            .addEventListener("click", () => this.updateMessages());
    }


}

window.customElements.define("message-container", messageContainer);