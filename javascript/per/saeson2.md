**فصل ۲: آشنایی با مفاهیم پایه جاوا اسکریپت**  
---

### **۲.۱ متغیرها و انواع داده**  
متغیرها مانند جعبه هایی هستند که داده ها را در خود ذخیره میکنند.  
#### **انواع متغیرها**  
- **`let`**:  
  برای تعریف متغیر هایی که مقدارشان **تغییر میکند**.  
  ```javascript
  let age = 20;
  age = 21; // قابل تغییر است
  ```
  
- **`const`**:  
  برای تعریف متغیر هایی که مقدارشان **ثابت** است (تغییر نمیکند).  
  ```javascript
  const PI = 3.14;
  // PI = 5; // خطا! مقدار const قابل تغییر نیست
  ```
  
- **`var`**:  
  قدیمیتر است و امروزه کمتر استفاده میشود (به دلیل مشکلات در **محدودهی دسترسی**).

#### **انواع داده (Data Types)**  
1. **رشته (String)**:  
   متن را در کوتیشن (`""` یا `''` یا ` `` `) نگه میدارد.  
   ```javascript
   let name = "Alice";
   let message = 'سلام!';
   ```
   
2. **عدد (Number)**:  
   شامل اعداد صحیح و اعشاری.  
   ```javascript
   let price = 1000;
   let temperature = 23.5;
   ```
   
3. **بولین (Boolean)**:  
   فقط دو مقدار `true` یا `false`.  
   ```javascript
   let isOnline = true;
   let hasPermission = false;
   ```
   
4. **آرایه (Array)**:  
   لیستی از دادهها با اندیس شماره گذاری شده.  
   ```javascript
   let users = ["Alice", "Bob", "Charlie"];
   console.log(users[0]); // خروجی: Alice
   ```
   
5. **شیء (Object)**:  
   داده های ساختار یافته با جفت های **کلید-مقدار**.  
   ```javascript
   let user = {
     name: "Alice",
     age: 25,
     isAdmin: true
   };
   console.log(user.name); // خروجی: Alice
   ```

---

### **۲.۲ عملگرها و ساختار های کنترلی**  
#### **عملگرها (Operators)**  
1. **عملگرهای ریاضی**:  
   ```javascript
   let a = 10 + 5; // 15
   let b = 20 - 3; // 17
   let c = 6 * 2;  // 12
   let d = 10 / 2; // 5
   ```
   
2. **عملگرهای مقایسهای**:  
   ```javascript
   console.log(5 > 3);   // true
   console.log(5 === 5); // true (بررسی مقدار و نوع داده)
   console.log(5 != "5"); // false (چون == نوع داده را نادیده میگیرد)
   ```
   
3. **عملگرهای منطقی**:  
   ```javascript
   let hasAccount = true;
   let isLoggedIn = false;
   console.log(hasAccount && isLoggedIn); // false (هر دو باید true باشند)
   console.log(hasAccount || isLoggedIn); // true (یکی کافی است)
   ```

#### **ساختارهای کنترلی**  
1. **شرط `if/else`**:  
   ```javascript
   let hour = 14;
   if (hour < 12) {
     console.log("صبح بخیر!");
   } else {
     console.log("عصر بخیر!");
   }
   ```
   
2. **شرط `switch`**:  
   ```javascript
   let day = "شنبه";
   switch (day) {
     case "شنبه":
       console.log("اول هفته!");
       break;
     default:
       console.log("روز دیگری است!");
   }
   ```
   
3. **حلقه `for`**:  
   ```javascript
   for (let i = 0; i < 5; i++) {
     console.log(i); // اعداد ۰ تا ۴ چاپ میشود
   }
   ```
   
4. **حلقه `while`**:  
   ```javascript
   let count = 3;
   while (count > 0) {
     console.log(count);
     count--;
   }
   ```

---

### **۲.۳ توابع (Functions)**  
توابع بلوکهایی از کد هستند که یک وظیفه خاص را انجام میدهند.  

#### **تعریف تابع عادی**  
```javascript
function greet(name) {
  return `سلام ${name}!`;
}
console.log(greet("Alice")); // خروجی: سلام Alice!
```

#### **توابع Arrow (=>)**  
نسخه کوتاهتر توابع (معمولاً برای توابع بی نام):  
```javascript
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

#### **پارامترهای پیشفرض**  
```javascript
function multiply(a, b = 2) {
  return a * b;
}
console.log(multiply(5)); // 10 (b=2 استفاده میشود)
```

---

### **۲.۴ ماژول ها (Modules)**  
ماژول ها کمک میکنند کدها را در فایل های مختلف سازماندهی کنید.  

#### **ارسال داده با `module.exports`**  
- فایل `math.js`:  
  ```javascript
  const PI = 3.14;
  function square(x) { return x * x; }
  module.exports = { PI, square };
  ```

#### **دریافت داده با `require`**  
- فایل `main.js`:  
  ```javascript
  const math = require('./math.js');
  console.log(math.PI); // 3.14
  console.log(math.square(4)); // 16
  ```

---

### **تمرین عملی فصل ۲**  
۱. تابعی بنویسید که دو عدد را دریافت کند و بزرگتر را برگرداند.  
۲. آرایهای از نام کاربران بسازید و با حلقه `for` همه را در کنسول چاپ کنید.  
۳. یک شیء `config` بسازید که شامل توکن ربات و پیشوند دستورات باشد.  

**مثال تمرین ۱**:  
```javascript
function findMax(a, b) {
  return a > b ? a : b;
}
console.log(findMax(10, 5)); // 10
```

---

### **نکات مهم فصل**  
- همیشه از `===` به جای `==` استفاده کنید تا نوع داده بررسی شود.  
- برای تعریف متغیرها اولویت با `const` و `let` است (از `var` استفاده نکنید).  
- توابع Arrow برای حفظ مفهوم `this` در آبجکت ها مفیدند (در فصل های بعدی توضیح داده میشود).  

---

در فصل بعدی، با **Node.js و npm** آشنا خواهید شد و یاد میگیرید چگونه پکیج ها را مدیریت کنید! 🚀