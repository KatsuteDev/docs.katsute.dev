---
title: Desktop Flick
description: |
    Desktop Flick is a desktop application used to turn a mobile device into a localized keyboard for desktop.
---

# Setup

## Desktop Setup

 1. Download the latest [release](https://github.com/Katsute/Desktop-Flick/releases), either as a zip or installer.
 2. Run the installer or extract the zip into the desired directory. Installer will install to `AppData/Local/Desktop-Flick`
 3. Run `Desktop-Flick.exe` from inside the directory.
 4. Login with a mobile device (you must be on the same internet network)

## Mobile Setup

This application doesn't add a new keyboard, you need to add them to your mobile device first.

- Adding a keyboard for [iOS devices](https://support.apple.com/guide/iphone/add-or-change-keyboards-iph73b71eb/ios).
- Adding a keyboard for [Android devices](https://www.samsung.com/au/support/mobile-devices/customise-keyboard-layout/).

# Configuration

Upon the first run a `config.json` file will be created in the directory where Desktop Flick is installed.

Currently only the port can be changed.

```json
{
    "port": 7272
}
```