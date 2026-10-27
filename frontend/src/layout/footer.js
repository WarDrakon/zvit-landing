export function footer ({siteName, footer: {text}}) {
    const year = new Date().getFullYear();

    return `
         <footer class="footer">© ${year} ${siteName}. ${text}</footer>
    `
}