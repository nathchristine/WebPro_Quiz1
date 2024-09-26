const routes = {
    '/quiz1': 'home.html',
    '/quiz1/profile': 'profile.html',
    '/quiz1/hometown': 'hometown.html',
    '/quiz1/food': 'localfood.html',
    '/quiz1/tourist': 'touristplace.html',
};

async function router() {
    const path = window.location.hash.slice(1) || '/quiz1';
    const route = routes[path];
    console.log(`Navigating to path: ${path}, loading route: ${route}`);
    if (route) {
        if (route.startsWith('<div')) {
            document.getElementById('content').innerHTML = route;
        } else {
            try {
                const response = await fetch(route);
                if (response.ok) {
                    const content = await response.text();
                    document.getElementById('content').innerHTML = content;
                } else {
                    console.error(`Failed to load ${route}: ${response.statusText}`);
                    document.getElementById('content').innerHTML = '<h1>404 Not Found</h1>';
                }
            } catch (error) {
                console.error(`Error fetching ${route}:`, error);
                document.getElementById('content').innerHTML = '<h1>Error Loading Page</h1>';
            }
        }
    } else {
        console.error(`Route not found for path: ${path}`);
        document.getElementById('content').innerHTML = '<h1>404 Not Found</h1>';
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);