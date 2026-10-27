export function header({ siteName, menu }) {
    console.log(menu);
    
    return `
        <header class="header">
            <a class="header__logo" href="/" >${siteName}</a>
            <nav class="header__nav">
            ${menu.map(({label, link}) => 
                `
                <a class="header__link" href="${link}" >${label}</a>
                `
            ).join('')}
            </nav>
        </header>
    `
}