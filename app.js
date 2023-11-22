function reportGeneratorApp() {
    return {
        showElementsPanel: true,
        showReportsModal: false,
        showTemplatesModal: false,
        selectedElement: {},
        showEditPanel: true,
        report: {},
        elements: [],
        reportBlocks: [],
        editingElement: {}, 
        reports: [],
        templates: [], 
        teamId: 1,

        init() {
            this.fetchElements();
        },
        fetchElements() {
            let blocks = fetchBlocks();
            let elementBlocks = fetchElementBlocks();
            let elems = fetchElements();
            this.elements = elems.map(element => {
                let resultElementBlocks = elementBlocks
                    .filter(eb => eb.ElementID === element.ElementID)
                    .sort((a, b) => a.Position - b.Position)
                    .map(eb => {
                        let block = blocks.find(b => b.BlockID === eb.BlockID);
                        return {
                            ...block,
                            Position: eb.Position,
                            HTMLContent: block.HTMLTemplate
                                .replace('{{TextContent}}', block.TextContent)
                                .replace('{{ImageUrl}}', block.ImageUrl)
                                .replace('{{BackgroundColor}}', block.BackgroundColor)
                                .replace('{{TextColor}}', block.TextColor)
                                .replace('{{BorderWeight}}', block.BorderWeight)
                                .replace('{{BorderColor}}', block.BorderColor)
                        };
                    });
                const combinedHTML = 
                    resultElementBlocks[0].BlockType != 'Simple'
                    ? resultElementBlocks[0].HTMLContent  
                    : `<div class="flex">${ resultElementBlocks.map(eb => `<div class="flex-grow" style="padding: 10px; margin-right: 15px;">${eb.HTMLContent}</div>`).join('')}</div>`;
                return { 
                    ...element, 
                    Blocks: resultElementBlocks, 
                    HTMLContent: combinedHTML 
                };
            });
        },
        /*
        async fetchElements() {
            try {
                const response = await fetch('http://api-hostname.azurewebsites.net/elements');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                this.elements = await response.json();
            } catch (error) {
                console.error('There was an error fetching the elements:', error);
            }
        },
*/
        // Function to add an element to the report
        async addToReport(elementId) {
                let element = this.elements.find(el => el.ElementID === elementId);
                if (element) {
                    this.reportBlocks.push(element);
                }
                this.selectElementForEditing(this.reportBlocks[this.reportBlocks.length - 1]);
/*
            const newElement = {...element};
            this.reportBlocks.push(newElement);
            await this.apiCall('POST', `/teams/${this.teamId}/reports/elements`, newElement);
            */
        },
        /*
        async removeFromReport(index) {
            const element = this.reportBlocks[index];
            await this.apiCall('DELETE', `/teams/${this.teamId}/reports/elements/${element.id}`);
            this.reportBlocks.splice(index, 1);
        },
        */

        removeElementFromReport(elementIndex) {
            this.reportBlocks.splice(elementIndex, 1);
            this.selectedElement = null;
            this.showEditPanel = false;
        },

        editElement(element) {
            this.editingElement = {...element};
            this.showEditPanel = true;
        },
        selectElementForEditing(element) {
            this.selectedElement = element;
            this.editingElement = JSON.parse(JSON.stringify(element));
            this.showEditPanel = true;
        },

        updateElement() {
            const index = this.reportBlocks.findIndex(block => block.ElementID === this.selectedElement.ElementID);
            if(index >= 0) {
                this.reportBlocks.splice(index, 1, this.editingElement);
                this.selectedElement = this.editingElement;
                this.showEditPanel = false;
            }
        },

        async saveElementChanges() {
            await this.apiCall('PUT', `/teams/${this.teamId}/reports/elements/${this.editingElement.id}`, this.editingElement);
            this.showEditPanel = false;
        },

        async saveAsTemplate() {
            await this.apiCall('POST', `/teams/${this.teamId}/templates`, { elements: this.reportBlocks });
        },

        async fetchReportsForTeam() {
            this.reports = [
                { id: 1, title: 'Annual Report' },
                { id: 2, title: 'Quarterly Update' },
                { id: 3, title: 'Project Plan' }
            ];
            await new Promise(resolve => setTimeout(resolve, 500));
            this.showReportsModal = true; 
        },

        async selectReport(report) {
            const mockReportElements = {
                elements: [
                    {
                        ElementID: 1,
                        ElementType: 'Header',
                        HTMLTemplate: `
                            <div style="text-align: center; padding: 20px;">
                                <img src="https://blog.hubspot.com/hs-fs/hubfs/apple%20logo.jpg?width=1000&height=564&name=apple%20logo.jpg" alt="logo" style="height: 50px;">
                                <h1 style="margin-top: 20px; color: red">test report</h1>
                            </div>
                        `,
                    },
                    {
                        ElementID: 2,
                        ElementType: '3-Block',
                        HTMLTemplate: `
                            <div class="flex">
                                <div style="flex: 1; padding: 10px; background-color: {{backgroundColor}}; color: {{textColor}};">
                                    <p>{{text1}}</p>
                                </div>
                                <div style="flex: 1; padding: 10px; background-color: {{backgroundColor}}; color: {{textColor}};">
                                    <p>{{text2}}</p>
                                </div>
                                <div style="flex: 1; padding: 10px; background-color: {{backgroundColor}}; color: {{textColor}};">
                                    <p>{{text3}}</p>
                                </div>
                            </div>
                        `,
                    },
                    {
                        ElementID: 3,
                        ElementType: 'Full-Width',
                        HTMLTemplate: `
                            <div style="padding: 20px; background-color: {{backgroundColor}}; color: {{textColor}}; border:2px solid red;">
                                <p>{{textContent}}</p>
                            </div>
                        `,
                    },
                ]
            };
            this.reportBlocks = mockReportElements.elements;
            this.report = report;
            this.showReportsModal = false;
        },

        async fetchTemplates() {
            this.templates = [
                { id: 1, title: 'Basic Layout' },
                { id: 2, title: 'Marketing Proposal' },
                { id: 3, title: 'Event Summary' }
            ];
            await new Promise(resolve => setTimeout(resolve, 500));
            this.showTemplatesModal = true;
        },

        async selectTemplate(template) {
            const mockTemplateElements = {
                elements: [
                    { id: 1, htmlContent: '<h1>Template Header</h1>' },
                    { id: 2, htmlContent: '<p>Template default paragraph content.</p>' },
                    { id: 3, htmlContent: '<img src="https://via.placeholder.com/150" />' }
                ]
            };
            this.reportBlocks = mockTemplateElements.elements;
            this.showTemplatesModal = false;
        },
        
        async apiCall(method, path, data = null) {
            let fullUrl = `http://api-hostname.azurewebsites.net${path}`;
            let options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
                }
            };
            
            if (data && (method === 'POST' || method === 'PUT')) {
                options.body = JSON.stringify(data);
            }
            
            try {
                let response = await fetch(fullUrl, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Could not complete the API call to ${fullUrl}: `, error);
                return null;
            }
        },

        toggleElementsPanel() {
            this.showElementsPanel = !this.showElementsPanel;
        },

        toggleEditPanel() {
            this.showEditPanel = !this.showEditPanel;
        },
    };
}