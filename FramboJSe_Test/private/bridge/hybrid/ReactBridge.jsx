define([
    'react',
    'reactDOM',
    'retargetEvents',
    './App.jsx',
], (React, ReactDOM, retargetEvents, App, babel) => {
    // WEB COMPONENT
    class ReactBridge extends HTMLElement {
        static get observedAttributes() {
            return ['name', 'value'];
        }

        get value() {
            return this.getAttribute('value');
        }
        set value(value) {
            this.setAttribute('value', value);
        }

        get name() {
            return this.getAttribute('name');
        }
        set name(value) {
            this.setAttribute('name', value);
        }

        constructor() {
            super();

            this.attachShadow({ mode: 'open' });
        }

        connectedCallback() {
            this.shadowRoot.innerHTML = '<div id="root"></div>';
            this.container = this.shadowRoot.getElementById('root');

            this.render({ name: this.name, value: this.value });
        }

        disconnectedCallback() {
            ReactDOM.unmountComponentAtNode(this.container);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'name': {
                    this.render({ name: newValue, value: this.value });
                    break;
                }
                case 'value': {
                    this.render({ name: this.name, value: newValue });
                    break;
                }
            }
        }

        render(data) {
            if (this.container) {
                ReactDOM.render(
                    React.createElement(App, { name: data.name, value: data.value }),
                    //<App name={data.name} value={data.value} />,
                    this.container,
                    () => retargetEvents(this.shadowRoot)
                );
            }
        }
    }

    customElements.define("react-bridge", ReactBridge);
});

