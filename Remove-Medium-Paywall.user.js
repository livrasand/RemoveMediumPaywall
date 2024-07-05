// ==UserScript==
// @name         Remove Medium Paywall
// @namespace    http://tampermonkey.net/
// @version      1.1.0
// @description  Automatically fetch full content of member-only stories on Medium
// @author       Livrädo Sandoval
// @match        *://*/*
// @icon         https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png
// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to reload the page
    function reloadPage() {
        location.reload();
    }

    // Function to add the current domain to the list
    function addDomainToRMP() {
        let currentDomain = window.location.hostname;
        let apiUrl = 'https://livrasand.pythonanywhere.com/update_domains'; // URL of your server on PythonAnywhere

        GM_xmlhttpRequest({
            method: "POST",
            url: apiUrl,
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({ domain: currentDomain }),
            onload: function(response) {
                if (response.status === 200) {
                    alert('Domain added to RMP successfully!');
                } else {
                    console.error('Failed to add domain to RMP:', response.status, response.statusText);
                }
            }
        });
    }

    // Function to create a custom context menu
    function createContextMenu(event) {
        event.preventDefault();

        // Remove existing custom context menu if present
        let existingMenu = document.getElementById('custom-context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Create the custom context menu
        let menu = document.createElement('div');
        menu.id = 'custom-context-menu';
        menu.style.position = 'absolute';
        menu.style.top = `${event.pageY}px`;
        menu.style.left = `${event.pageX}px`;
        menu.style.backgroundColor = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.zIndex = 10000;
        menu.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';

        // Create the menu item for reloading the page
        let reloadItem = document.createElement('div');
        reloadItem.innerText = 'Aplicar RMP a este artículo';
        reloadItem.style.padding = '8px';
        reloadItem.style.cursor = 'pointer';
        reloadItem.addEventListener('click', function() {
            reloadPage();
            menu.remove();
        });

        // Create the menu item for adding domain to RMP
        let addDomainItem = document.createElement('div');
        addDomainItem.innerText = 'Agregar dominio a RMP';
        addDomainItem.style.padding = '8px';
        addDomainItem.style.cursor = 'pointer';
        addDomainItem.addEventListener('click', function() {
            addDomainToRMP();
            menu.remove();
        });

        menu.appendChild(reloadItem);
        menu.appendChild(addDomainItem);
        document.body.appendChild(menu);

        // Remove the custom context menu when clicking outside
        document.addEventListener('click', function() {
            menu.remove();
        }, { once: true });
    }

    // Function to remove the div after the article
    function removeDivAfterArticle() {
        let article = document.querySelector('article');
        if (article) {
            let nextElement = article.nextElementSibling;
            if (nextElement && nextElement.tagName.toLowerCase() === 'div') {
                nextElement.remove();
                console.log('Removed div after article');
            } else {
                console.log('No div found immediately after article');
            }
        } else {
            console.log('No article found');
        }
    }

    // Function to check if the current domain is in the allowed list
    function checkAndExecute() {
        let currentDomain = window.location.hostname;
        let apiUrl = 'https://livrasand.pythonanywhere.com/domains';

        GM_xmlhttpRequest({
            method: "GET",
            url: apiUrl,
            onload: function(response) {
                if (response.status === 200) {
                    let domains = JSON.parse(response.responseText);
                    if (domains.includes(currentDomain)) {
                        executeMainFunction();
                        document.addEventListener('contextmenu', createContextMenu);
                    }
                } else {
                    console.error('Failed to fetch domains:', response.status, response.statusText);
                }
            }
        });
    }

    // Main function to execute the script
    function executeMainFunction() {
        // Check if the article has the "Member-only story" text
        if ($("body:contains('Member-only story')").length > 0) {
            // Extract the path from the current URL
            let path = window.location.pathname;

            // Prepare the Freedium URL with the extracted path
            let freediumUrl = 'https://freedium.cfd' + path;

            // Fetch the content from Freedium
            GM_xmlhttpRequest({
                method: "GET",
                url: freediumUrl,
                onload: function(response) {
                    if (response.status === 200) {
                        // Parse the response and extract the content
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(response.responseText, 'text/html');
                        let content = doc.querySelector('.main-content.mt-8');

                        if (content) {
                            // Find the last paragraph of the Medium article
                            let lastParagraph = $('article p').last();

                            if (lastParagraph.length > 0) {
                                // Insert the fetched content after the last paragraph
                                lastParagraph.append(content.innerHTML);
                            } else {
                                console.error('No paragraphs found in the article');
                            }
                        } else {
                            console.error('Freedium content not found');
                        }
                    } else {
                        console.error('Failed to fetch content from Freedium:', response.status, response.statusText);
                    }
                }
            });

            // Wait for 10 seconds before removing the div
            setTimeout(removeDivAfterArticle, 5000);
        }
    }

    // Function to check for the Medium logo and add context menu if found
    function checkForMediumLogo() {
        let mediumLogo = document.querySelector('a[data-testid="headerMediumLogo"]');
        if (mediumLogo) {
            document.addEventListener('contextmenu', createContextMenu);
        }
    }

    // Check the domain and execute the script if allowed
    checkAndExecute();

    // Check for Medium logo and add context menu if found
    checkForMediumLogo();
})();
