class TemplateCard {
    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card template-card';
        cardDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.description}</p>
                <a href="${this.link}" class="btn btn-primary template-btn">Go to Template</a>
            </div>
        `;
        return cardDiv;
    }
}

class TemplateRenderer {
    constructor(containerId, searchInputId) {
        this.container = document.getElementById(containerId);
        this.searchInput = document.getElementById(searchInputId);
        this.templateData = [];
        this.filteredData = [];

        // Event listener for search input
        this.searchInput.addEventListener('input', () => this.filterTemplates());
    }

    fetchTemplateData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.templateData = data;
                this.filteredData = data;
                this.renderTemplates(this.filteredData);  // Corrected method name
            })
            .catch(error => console.error('Error loading template data:', error));
    }

    renderTemplates(data) {  // Corrected method name
        this.container.innerHTML = '';  // Clear existing content
        data.forEach(template => {
            const templateCard = new TemplateCard(template.title, template.description, template.link);
            const cardElement = templateCard.createCard();
            this.container.appendChild(cardElement);
        });
    }

    filterTemplates() {
        const query = this.searchInput.value.toLowerCase();
        this.filteredData = this.templateData.filter(template =>
            template.title.toLowerCase().includes(query) ||
            template.description.toLowerCase().includes(query)
        );
        this.renderTemplates(this.filteredData);  // Corrected method name
    }
}

// Instantiate and fetch data
const templateRenderer = new TemplateRenderer('template-container', 'searchTemplate');
templateRenderer.fetchTemplateData('temp.json');
