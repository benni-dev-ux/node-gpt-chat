import { html, render } from 'https://unpkg.com/lit-html?module';

class messageContainer extends HTMLElement {

    constructor() {
        super();
        this.msgs;
    }

    renderMesssages() {


            return html `
        ${this.msgs.msgs?.map(msg => {
            return html`
            <p 
            class=${msg.role==="system"?"message response":"message request"}
            
            >
            ${msg.content}</p>
            `;
        })}

        
    `;


    }

    async loadMessages() {
        this.msgs = await fetch('/all/', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        })
        this.msgs = await this.msgs.json()

    }



    _handleClick(){
        console.log("dispatching event")
        let click = new Event('click');

        this.dispatchEvent(click);
    }

    
    async renderMessageBox() {
        if (!this.shadowRoot) {
            return;
        }


        const template = html `
        <style>
        @import "./style.css";
        </style>

         

        <div class="message-container">

        ${ this.renderMesssages()}
            
        </div>
        `;

        render(template, this.shadowRoot);



    }





    async connectedCallback() {

        this.attachShadow({ mode: 'open' });
        await this.loadMessages();
        this.renderMessageBox();

    }




}

window.customElements.define("message-container", messageContainer);