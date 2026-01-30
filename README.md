# NetAdmin Mobile 📱

**NetAdmin** is a dedicated mobile utility application designed for Network Engineers, System Administrators, and NOC Technicians.

It was built to solve a common field problem: performing quick, accurate network calculations and diagnostics in data center environments without needing a laptop.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)
![Status](https://img.shields.io/badge/status-Stable-green.svg)

## 🚀 Features

### 1. Subnet Calculator 🧮
Real-time, error-free subnetting calculations.
- Supports **IPv4** & **CIDR** notation (e.g., `/24`, `/30`).
- Instantly calculates **Network ID**, **Broadcast Address**, **First/Last Usable IP**, and **Total Hosts**.
- Critical for VLAN planning and allocation in the field.

### 2. Port Reference Database 📖
An offline, searchable database of common TCP/UDP ports.
- Search by **Port Number** (e.g., "22") or **Service Name** (e.g., "SSH").
- Includes detailed descriptions for security protocols and troubleshooting.
- Cyberpunk UI designed for quick readability in low-light environments.

### 3. Local Diagnostics (MyIP) 🔎
Instant device network analysis.
- Displays **Local IP Address**, **Device Name**, and **Network Connection Type** (WiFi/Cellular).
- Essential for verifying DHCP assignments and VLAN connectivity.

## 🎨 Design System
- **Theme:** Cyberpunk / Dark Mode (Optimized for data centers).
- **Colors:** Deep Navy Background with Neon Cyan & Green accents.
- **Typography:** Monospace fonts for technical data accuracy.

## 🛠️ Tech Stack

* **Framework:** [React Native](https://reactnative.dev/)
* **Build Tool:** [Expo SDK](https://expo.dev/)
* **Language:** TypeScript
* **Navigation:** React Navigation (Bottom Tabs)
* **State Management:** React Hooks

## 📦 Installation & Running Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/OmerCalgan/NetAdmin-Mobile.git](https://github.com/OmerCalgan/NetAdmin-Mobile.git)
    cd NetAdmin-Mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the app:**
    ```bash
    npx expo start
    ```

4.  **Run on Device:**
    - Scan the QR code with **Expo Go** app (Android) or Camera app (iOS).

## 📄 License

This project is licensed under the MIT License.

---
*Built with ❤️ by Ömer Faruk, bridging the gap between Network Engineering and Full Stack Development.*