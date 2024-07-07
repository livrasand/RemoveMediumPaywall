# Remove Medium Paywall
![imagen](https://github.com/livrasand/RemoveMediumPaywall/assets/104039397/4f0ab270-6c28-4622-971a-60b67dbdc87e)

The intrusive "The writer made this a members-only story" message is annoying. This open-source project aims to address this issue by providing a solution to bypass all “Members-only story” paywalls for Medium articles. This repository contains a userscript designed to remove the annoying "The writer made this a members-only story". Follow the instructions below to get started.

## Installation
1. **Install Tampermonkey**:
   If you haven't already, you need to install the Tampermonkey browser extension. You can find it for various browsers:
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Tampermonkey for Safari](http://tampermonkey.net/?browser=safari)
   - [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
   - [Tampermonkey for Opera/OperaGX](https://addons.opera.com/en-gb/extensions/details/tampermonkey-beta/)

**For iOS or iPadOS you can use [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)**
After installing the iOS App, you need two main steps to make the extension work:

- **Open the App and set a directory** (For saving and loading userscripts)
  - After Userscripts for ios v1.5.0, a local default directory will be set automatically
  - In earlier versions please click the `Set Userscripts Directory` button and select the directory
- **Enable the extension in Safari** (And grant permissions)

  - Manage extensions from Settings App (Settings > Safari > Extensions) or Safari App (`AA` button on iPhone, `extension-icon` on iPad, also where you open the extension's `popup` interface)
  - For optimal experience it's recommended that you `Always Allow` Userscripts for `All Websites`

There are two main ways to install a user script from the iOS version:

- Visit any `.user.js` URL in Safari, then open the extension `popup` and you will see an installation prompt
- You can also save `.user.js` files directly to the Userscripts directory you set above

2. **Install the Script**: [Click here and press install](Remove-Medium-Paywall.user.js?raw=True). **Install the Script for iOS o iPadOS**: [Click here](Remove-Medium-Paywall-for-iOS.user.js?raw=True).

3. **Enable the Script**: Enable the script by clicking the switch next to the script name in the Tampermonkey Dashboard.

4. **Accept this:**

| Cross Origin Permission for Freedium | Cross Origin Permission for Our Server |
|-------|---------|
| ![Captura de pantalla (450)](https://github.com/livrasand/RemoveMediumPaywall/assets/104039397/60f881ef-cf13-497e-ae54-a1307ae6eef3) | ![Captura de pantalla (451)](https://github.com/livrasand/RemoveMediumPaywall/assets/104039397/5da74fed-33c8-489f-80b6-26f12dd87b5c) |


## Usage

1. Open any article on Medium that has a member content barrier (_"Members-only story"_).
2. If the article has this barrier, right-click its button to display a custom context menu.

![Captura de pantalla (453)](https://github.com/livrasand/RemoveMediumPaywall/assets/104039397/3cadd9b6-32b8-4aa8-9ca7-d87323b42b66)

3. Select "Aplicar RMP a este artículo".
4. Once the page reloads, **Remove Medium Paywall** will automatically detect the content barrier and request its removal. If this does not work, then from the context menu select "Agregar dominio a RMP".
5. Repeat step 3.
6. Wait a few seconds while **Remove Medium Paywall** loads the full article content.
7. After a few seconds, the full article content should appear without the membership paywall.
8. Verify that the script worked correctly by checking if the article content is now fully visible and accessible.
9. If you encounter any bugs or unexpected behavior, please **[create an issue](https://github.com/livrasand/RemoveMediumPaywall/issues)** in the original project repository.
10. Provide details about the problem found so it can be corrected quickly.

### Enjoy reading without barriers on Medium!

![ezgif com-animated-gif-maker](https://github.com/livrasand/RemoveMediumPaywall/assets/104039397/416fe227-be7e-48f3-9b0b-b1c7d8bb2a14)
