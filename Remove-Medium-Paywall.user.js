// ==UserScript==
// @name         Remove Medium Paywall
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Automatically fetch full content of member-only stories on Medium
// @author       Livrädo Sandoval
// @match        https://medium.com/*
// @icon         https://miro.medium.com/v2/1*m-R_BkNf1Qjr1YbyOIJY2w.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                const element = document.querySelector(selector);
                if (element) {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);
            setTimeout(() => {
                clearInterval(interval);
                reject(new Error(`Timeout waiting for element: ${selector}`));
            }, timeout);
        });
    }

    async function fetchFullContent(url) {
        const freediumUrl = `https://freedium.cfd/${url}`;
        try {
            const response = await fetch(freediumUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const mainContent = doc.querySelector('.main-content.mt-8') || doc.querySelector('article');
            const targetContainer = document.querySelector('article');

            if (mainContent && targetContainer) {
                const newElement = document.createElement(mainContent.tagName.toLowerCase());
                newElement.innerHTML = mainContent.innerHTML;
                newElement.className = "pw-post-body-paragraph lt lu fy lv b lw lx ly lz ma mb mc md me mf mg mh mi mj mk ml mm mn mo mp mq fr bj";

                // Try different selectors to find the target container
                const topLevelDivSelectors = [
                    'div.fr.fs.ft.fu.fv', // Original selector
                    'section > div.l > div.l > div > div.fr.fs.ft.fu.fv', // Alternative structure
                    'div > div > div > section > div.l > div.l' // Another possible structure
                ];

                let topLevelDiv = null;
                for (const selector of topLevelDivSelectors) {
                    topLevelDiv = await waitForElement(selector).catch(() => null);
                    if (topLevelDiv) break;
                }

                if (topLevelDiv) {
                    const nestedDivSelectors = [
                        'div.ab.ca > div.ch.bg.ev.ew.ex.ey', // Original nested selector
                        'div > div > div.ch.bg.ev.ew.ex.ey', // Alternative structure
                        'div.ch.bg.ev.ew.ex.ey' // Another possible structure
                    ];

                    let targetContainer = null;
                    for (const selector of nestedDivSelectors) {
                        targetContainer = topLevelDiv.querySelector(selector);
                        if (targetContainer) break;
                    }

                    if (targetContainer) {
                        targetContainer.appendChild(newElement);
                    } else {
                        console.error('Target container not found.');
                    }
                } else {
                    console.error('Top level div not found.');
                }
            }
        } catch (error) {
            console.error('Error fetching full content:', error);
        }
    }

    function removeElementAfterDelay(selector, delay = 5000) {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (element) {
                element.remove();
            }
        }, delay);
    }

    const memberOnlyIndicator = document.querySelector('p.be.b.bf.z.dw');
    if (memberOnlyIndicator && memberOnlyIndicator.textContent.includes('Member-only story')) {
        const currentUrl = window.location.href;
        fetchFullContent(currentUrl);

        // Try different selectors to remove the banners
        const bannerSelectors = [
            '.pz.ql.pr.ec', // Original selector
            '.sv.sw.bg.l.ec.sx', // Alternative structure
            '.zp.zq.bg.l.ec.zr', // Another possible structure
            '.ec.qh.qi.qj' // Membership banner
        ];

        for (const selector of bannerSelectors) {
            removeElementAfterDelay(selector, 1000); // Adjust delay if needed
        }
    }
})();
