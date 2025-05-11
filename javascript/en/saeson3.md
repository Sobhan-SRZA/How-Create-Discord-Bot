## **Chapter 3: Introduction to Node.js and npm**

---

### **3.1 What Is Node.js?**

Node.js is a **runtime environment** for JavaScript that lets you run JavaScript code **outside the browser** (for example, on a server or your local machine).

#### **Why Is Node.js Ideal for Discord Bots?**

* **Non-Blocking:**
  Node.js executes code asynchronously, meaning time-consuming operations (like reading a file) won’t block the rest of your code.

  ```javascript
  // Example: reading a file without blocking other code
  const fs = require('fs');
  fs.readFile('file.txt', 'utf8', (err, data) => {
    console.log(data); // Runs after the file is read
  });
  console.log('This line runs first!');
  ```

* **Event-Driven:**
  Node.js is built around events. For instance, when someone sends a message in Discord, a `messageCreate` event fires and your code can react to it.

---

### **3.2 Managing Packages with npm**

**npm** (Node Package Manager) is a tool for installing, managing, and sharing JavaScript packages. Each package is a library or utility (such as `discord.js`).

#### **Core npm Commands**

1. **Install a package:**

   ```bash
   npm install discord.js
   ```
2. **Uninstall a package:**

   ```bash
   npm uninstall discord.js
   ```
3. **Update a package:**

   ```bash
   npm update discord.js
   ```

---

### **3.3 The `package.json` File**

The `package.json` file is the heart of any Node.js project. It holds project metadata and a list of **dependencies**.

#### **Creating `package.json`**

* Run this command to generate a `package.json` with default settings:

  ```bash
  npm init -y
  ```
* Sample `package.json` contents:

  ```json
  {
    "name": "my-bot",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "start": "node index.js"
    },
    "dependencies": {
      "discord.js": "^14.13.0"
    }
  }
  ```

#### **Version Ranges (`^` and `~`)**

* `^14.13.0`: Allows updates to **minor** versions (e.g., 14.14.0).
* `~14.13.0`: Allows updates to **patch** versions only (e.g., 14.13.1).

---

### **3.4 Global vs. Local Package Installation**

* **Local (default)** installs the package only in your current project:

  ```bash
  npm install discord.js
  ```
* **Global** installs the package system-wide (useful for CLI tools):

  ```bash
  npm install -g nodemon
  ```

---

### **3.5 Running Your Project with npm Scripts**

You can define shortcut commands inside `package.json`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

* Run these scripts with:

  ```bash
  npm run dev
  ```

---

### **Hands-On Exercise for Chapter 3**

1. Create a new folder and run `npm init -y` to generate a `package.json`.
2. Install the `chalk` package to print colored text in the console:

   ```bash
   npm install chalk
   ```
3. Create an `index.js` file with this code:

   ```javascript
   const chalk = require('chalk');
   console.log(chalk.green('Hello, world!'));
   ```
4. Run your project:

   ```bash
   node index.js
   ```

---

### **Common Issues & Solutions**

* **`npm install` errors:**

  * Check your internet connection.
  * Clear the cache: `npm cache clean --force`.
* **Permission Denied (EACCES) errors:**

  * On macOS/Linux, use `sudo` for global installs.
  * On Windows, run PowerShell as Administrator.

---

### **Key Takeaways**

* Always install project-specific dependencies (like `discord.js`) locally, not globally.
* Add `node_modules` to your `.gitignore` (it can get very large).
* Update Node.js by downloading the latest version from the [official website](https://nodejs.org).

---

In the next chapter, you’ll learn **getting started with discord.js** and build your first full-fledged bot! 🚀