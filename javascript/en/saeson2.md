## **Chapter 2: Getting to Know JavaScript Fundamentals**

---

### **2.1 Variables and Data Types**

Variables are like boxes that store data.

#### **Variable Declarations**

* **`let`**:
  Use for variables whose values **change**.

  ```javascript
  let age = 20;
  age = 21; // This is allowed
  ```

* **`const`**:
  Use for variables whose values are **fixed** (cannot be changed).

  ```javascript
  const PI = 3.14;
  // PI = 5; // Error! You cannot reassign a const
  ```

* **`var`**:
  An older form of declaration that is less commonly used today (because of scoping issues).

#### **Data Types**

1. **String**:
   Holds text inside quotes (`""`, `''`, or \`\`\`\`).

   ```javascript
   let name = "Alice";
   let message = 'Hello!';
   ```

2. **Number**:
   Includes integers and decimals.

   ```javascript
   let price = 1000;
   let temperature = 23.5;
   ```

3. **Boolean**:
   Only two possible values: `true` or `false`.

   ```javascript
   let isOnline = true;
   let hasPermission = false;
   ```

4. **Array**:
   A numbered list of values.

   ```javascript
   let users = ["Alice", "Bob", "Charlie"];
   console.log(users[0]); // Output: Alice
   ```

5. **Object**:
   Structured data stored as key–value pairs.

   ```javascript
   let user = {
     name: "Alice",
     age: 25,
     isAdmin: true
   };
   console.log(user.name); // Output: Alice
   ```

---

### **2.2 Operators and Control Structures**

#### **Operators**

1. **Arithmetic Operators**:

   ```javascript
   let a = 10 + 5; // 15
   let b = 20 - 3; // 17
   let c = 6 * 2;  // 12
   let d = 10 / 2; // 5
   ```

2. **Comparison Operators**:

   ```javascript
   console.log(5 > 3);    // true
   console.log(5 === 5);  // true (checks both value and type)
   console.log(5 != "5"); // false (== would ignore type)
   ```

3. **Logical Operators**:

   ```javascript
   let hasAccount = true;
   let isLoggedIn = false;
   console.log(hasAccount && isLoggedIn); // false (both must be true)
   console.log(hasAccount || isLoggedIn); // true (one is enough)
   ```

#### **Control Structures**

1. **`if/else` Statement**:

   ```javascript
   let hour = 14;
   if (hour < 12) {
     console.log("Good morning!");
   } else {
     console.log("Good afternoon!");
   }
   ```

2. **`switch` Statement**:

   ```javascript
   let day = "Saturday";
   switch (day) {
     case "Saturday":
       console.log("Start of the week!");
       break;
     default:
       console.log("Another day!");
   }
   ```

3. **`for` Loop**:

   ```javascript
   for (let i = 0; i < 5; i++) {
     console.log(i); // Prints numbers 0 to 4
   }
   ```

4. **`while` Loop**:

   ```javascript
   let count = 3;
   while (count > 0) {
     console.log(count);
     count--;
   }
   ```

---

### **2.3 Functions**

Functions are blocks of code that perform a specific task.

#### **Regular Function Definition**

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: Hello, Alice!
```

#### **Arrow Functions (`=>`)**

A shorter syntax, often for anonymous functions:

```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

#### **Default Parameters**

```javascript
function multiply(a, b = 2) {
  return a * b;
}
console.log(multiply(5)); // 10 (uses b = 2)
```

---

### **2.4 Modules**

Modules help you organize code into separate files.

#### **Exporting with `module.exports`**

* **math.js**:

  ```javascript
  const PI = 3.14;
  function square(x) {
    return x * x;
  }
  module.exports = { PI, square };
  ```

#### **Importing with `require`**

* **main.js**:

  ```javascript
  const math = require('./math.js');
  console.log(math.PI);        // 3.14
  console.log(math.square(4)); // 16
  ```

---

### **Hands-On Exercise for Chapter 2**

1. Write a function that takes two numbers and returns the larger one.
2. Create an array of user names and print each one to the console using a `for` loop.
3. Build a `config` object containing your bot’s token and command prefix.

**Example for Exercise 1**:

```javascript
function findMax(a, b) {
  return a > b ? a : b;
}
console.log(findMax(10, 5)); // 10
```

---

### **Key Takeaways for Chapter 2**

* Always use `===` instead of `==` to check value **and** type.
* Prefer `const` and `let` over `var`.
* Arrow functions help preserve the meaning of `this` in objects (we’ll explore this in later chapters).

---

In the next chapter, you’ll learn about **Node.js and npm** and how to manage packages! 🚀