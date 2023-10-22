import { Normalized } from "./Normalized.1.js";

export class Label {
    constructor(name, type) {
        this.Name = name;
        this.TYPE = type;

        // Normalize the name to get a unique identifier
        this.RAWNAME = this.Name.charAt(0).toUpperCase() + this.Name.slice(1);
        this.NORMALIZED = Normalized(this.RAWNAME); // Make sure Normalized is correctly defined

        // Create a unique ID for the label and a corresponding ID for the associated filter
        this.ID = `label-${this.NORMALIZED}`;
        this.FILTERID = `filter-${this.NORMALIZED}`;

        // Create a div element to represent the label
        this.ELEMENT = document.createElement('div');

        // Select the container where the labels will be displayed
        this.CONTAINER = document.getElementById('labelsContainer');
        if (!this.CONTAINER) {
            console.error('The #labelsContainer element does not exist in the DOM.');
            return;
        }

        // Configure the attributes and content of the label
        this.setLabel();

        // Add the label to the container
        this.toggleMount(true);
    }

    /**
     * Configure the attributes and content of the label.
     */
    setLabel() {
        // Configure the attributes of the label element
        this.ELEMENT.setAttribute('id', this.ID);
        this.ELEMENT.setAttribute('data-normalized', this.NORMALIZED);
        this.ELEMENT.setAttribute('data-name', this.RAWNAME);
        this.ELEMENT.setAttribute('data-type', this.TYPE);

        // Configure the content of the label with the name and a delete icon
        this.ELEMENT.innerHTML = `<span class="labelName">${this.RAWNAME}</span><i class="fa-solid fa-xmark label-Icon"></i>`;

        // Add CSS classes to the label
        this.ELEMENT.classList.add('labels');

        // Select the delete icon for future manipulations
        this.ICON = this.ELEMENT.querySelector('.label-Icon');
    }

    toggleMount() {
        this.CONTAINER.appendChild(this.ELEMENT);
}}