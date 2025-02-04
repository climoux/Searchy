const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: `
            default-src 'self';
            script-src 'self' 'unsafe-inline' *.fontshare.com cdn-uicons.flaticon.com va.vercel-scripts.com api.allorigins.win 'unsafe-eval';
            img-src 'self' https://* http://* data:;
            style-src 'self' 'unsafe-inline' *.fontshare.com cdn-uicons.flaticon.com;
            font-src 'self' *.fontshare.com cdn-uicons.flaticon.com;
            frame-src 'none';
            object-src 'none';
            connect-src 'self' *.wevaw.com https://* http://*;
        `.replace(/\s{2,}/g, " ").trim(),
    },
    {
        key: "Permissions-Policy",
        value: "geolocation=(), microphone=(), camera=()",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "Set-Cookie",
        value: "SameSite=Strict",
    },
];
  
export async function headers() {
    return [
        {
            source: "/(.*)",
            headers: securityHeaders,
        },
    ];
}
  
const nextConfig = {
    async headers() {
        return await headers();
    },
};
  
export default nextConfig;  