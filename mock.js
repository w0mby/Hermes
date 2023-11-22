function fetchBlocks() 
{
    return [
        {
            BlockID: 1,
            BlockType: 'Header',
            HTMLTemplate: `
                <div style="display: flex; justify-content: space-between; align-items: center; border: {{BorderWeight}}px solid {{BorderColor}}; padding: 16px;">
                    <img src="{{ImageUrl}}" alt="Logo" style="height: 60px;">
                    <h1 style="color: {{TextColor}}; font-size: 24px; margin: 0;">{{TextContent}}</h1>
                </div>
            `,
            TextContent: 'Annual Financial Report',
            ImageUrl: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'><circle cx='50' cy='50' r='40' stroke='black' stroke-width='3' fill='white' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' stroke='black' dy='.3em'>LOGO</text></svg>`,
            BackgroundColor: '#FFFFFF',
            TextColor: '#333333',
            BorderWeight: 2,
            BorderColor: '#000000'
        },
        {
            BlockID: 2,
            BlockType: 'Image',
            HTMLTemplate: `
                <div style="flex-grow: 1; padding: 10px; background-color: {{BackgroundColor}}; color: {{TextColor}}; border: {{BorderWeight}}px solid {{BorderColor}};">
                    <img src="{{ImageUrl}}" alt="Image" style="max-width: 100%;">
                </div>
            `,
            TextContent: '',
            ImageUrl: 'path_to_image.jpg',
            BackgroundColor: '#FFFFFF',
            TextColor: '#333333',
            BorderWeight: 1,
            BorderColor: '#888888'
        },
        {
            BlockID: 3,
            BlockType: 'Text',
            HTMLTemplate: '<p style="background-color: {{BackgroundColor}}; color: {{TextColor}};">{{TextContent}}</p>',
            TextContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            ImageUrl: '',
            BackgroundColor: '#F0F0F0',
            TextColor: '#333333',
            BorderWeight: 1,
            BorderColor: '#DDDDDD'
        },
        {
            BlockID: 4,
            BlockType: 'Simple',
            HTMLTemplate: `
                <div class="single-block" style="padding: 10px; background-color: {{BackgroundColor}}; color: {{TextColor}}; border: {{BorderWeight}}px solid {{BorderColor}};">
                    <p>{{TextContent}}</p>
                </div>
            `,
            TextContent: 'Content for one part of a triple block element',
            ImageUrl: '',
            BackgroundColor: '#EEEEEE',
            TextColor: '#333333',
            BorderWeight: 1,
            BorderColor: '#DDDDDD'
        },
        {
            BlockID: 5,
            BlockType: 'Footer',
            HTMLTemplate: `
                <footer style="background-color: {{BackgroundColor}}; color: {{TextColor}}; padding: 20px; text-align: center;">
                    <small>&copy; {{TextContent}}</small>
                </footer>
            `,
            TextContent: '2023 Company Name',
            ImageUrl: '',
            BackgroundColor: '#222222',
            TextColor: '#FFFFFF',
            BorderWeight: 0,
            BorderColor: '#FFFFFF'
        }
    ];
}

function fetchElementBlocks()
{
    return [
        // Association of Blocks with Header Element
        { ElementBlockID: 1, ElementID: 1, BlockID: 1, Position: 1 },
        
        // Association of Blocks with a 3-Block Element
        { ElementBlockID: 2, ElementID: 2, BlockID: 4, Position: 1 },
        { ElementBlockID: 3, ElementID: 2, BlockID: 4, Position: 2 },
        { ElementBlockID: 4, ElementID: 2, BlockID: 4, Position: 3 },
        // Association of Blocks with a 1-Block Element
        { ElementBlockID: 6, ElementID: 4, BlockID: 4, Position: 1 },
        // Associations for a Full-width block Element
        { ElementBlockID: 5, ElementID: 3, BlockID: 5, Position: 1 },
    ];
}

function fetchElements()
{
    return [
        {
            ElementID: 1,
            ElementType: 'Header',
            ElementImage: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='none' viewBox='0 0 24 24' stroke='currentColor' class='icon-header'><rect x='3' y='3' width='18' height='6' rx='2' ry='2' stroke-width='2'></rect><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 15h18M3 21h18'></path></svg>`
        },
        {
            ElementID: 2,
            ElementType: '3-Block',
            ElementImage: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'><rect x='2' y='20' width='18' height='24' fill='%23ddd' stroke='%23ccc' stroke-width='2'/><rect x='23' y='20' width='18' height='24' fill='%23ddd' stroke='%23ccc' stroke-width='2'/><rect x='44' y='20' width='18' height='24' fill='%23ddd' stroke='%23ccc' stroke-width='2'/></svg>`
        },
        {
            ElementID: 4,
            ElementType: '1-block',
            ElementImage: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'><rect x='5' y='20' width='54' height='24' fill='%23ddd' stroke='%23ccc' stroke-width='2'/></svg>`
        },
        {
            ElementID: 3,
            ElementType: 'Full-Width',
            ElementImage: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='64' height='64'><rect x='2' y='20' width='60' height='24' fill='%23ccc' stroke='%23000' stroke-width='2'/></svg>`
        }
    ];
}