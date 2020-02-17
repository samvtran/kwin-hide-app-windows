function init() {
    var minimizedClients = {};
    function hideAppWindows() {
        var activeApp = workspace.activeClient.resourceName.toString();
        var clients = workspace.clientList();    
        var didUpdate = false;
    
        for (var i = 0; i < clients.length; i++) {
            var client = clients[i];
            const windowApp = client.resourceName.toString();

            // Only minimize active windows
            if (windowApp === activeApp && !client.minimized) {
                client.minimized = true;
                client.minimizedByScript = true;
                didUpdate = true;
            }
        }
    
        if (didUpdate && !minimizedClients[activeApp]) {
            minimizedClients[activeApp] = true;
        }
    }
    
    workspace.clientActivated.connect(function(client) {
        if (!client || !minimizedClients[client.resourceName.toString()]) return;
        var resource = client.resourceName.toString();
        delete minimizedClients[resource];

        var clients = workspace.clientList();    
        for (var i = 0; i < clients.length; i++) {
            var client = clients[i];
            const windowApp = client.resourceName.toString();
            // Only restore windows minimized by this script
            if (windowApp === resource && client.minimized && client.minimizedByScript) {
                client.minimized = false;
                delete client.minimizedByScript;
            }
        }
    });

    workspace.clientRemoved.connect(function (client) {
        if (!client || !minimizedClients[client.resourceName.toString()]) return;

        var resource = client.resourceName.toString();

        var noWindowsRemaining = true;
        var clients = workspace.clientList();
        for (var i = 0; i < clients.length; i++) {
            var client = clients[i];
            const windowApp = client.resourceName.toString();
            if (windowApp === resource && client.minimized && client.minimizedByScript) {
                noWindowsRemaining = false;
                break;
            }
        }

        // Only remove an app from the list of restorable apps if all of its
        // minimized windows have disappeared
        if (noWindowsRemaining) {
            delete minimizedClients[resource];
        }
    });

    registerShortcut("HideAppWindows", "HideAppWindows", "Meta+H", hideAppWindows);
}

init();
