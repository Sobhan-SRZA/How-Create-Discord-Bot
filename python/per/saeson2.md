**فصل ۲: آشنایی با مفاهیم پایه پایتون**  

---

### **۲.۱ متغیرها و انواع داده**  
متغیرها مانند جعبههایی هستند که دادهها را ذخیره میکنند. در پایتون نیازی به تعیین نوع متغیر نیست (پویا بودن نوع داده).  

#### **انواع داده اصلی**:  
- **رشته (String)**:  
  ```python
  name = "آلیس"  # متن درون "" یا '' قرار میگیرد
  message = 'سلام!'
  ```

- **عدد (Integer و Float)**:  
  ```python
  age = 20        # عدد صحیح
  price = 12.5    # عدد اعشاری
  ```

- **بولین (Boolean)**:  
  ```python
  is_online = True
  has_permission = False
  ```

- **لیست (List)**:  
  ```python
  users = ["آلیس", "بابک", "چارلی"]
  print(users[0])  # خروجی: آلیس
  ```

- **دیکشنری (Dictionary)**:  
  ```python
  user = {
      "name": "آلیس",
      "age": 25,
      "is_admin": True
  }
  print(user["name"])  # خروجی: آلیس
  ```

---

### **۲.۲ عملگرها**  
#### **عملگرهای ریاضی**:  
```python
a = 10 + 5   # 15
b = 20 - 3   # 17
c = 6 * 2    # 12
d = 10 / 2   # 5.0 (تقسیم اعشاری)
e = 10 // 3  # 3 (تقسیم صحیح)
f = 10 % 3   # 1 (باقیمانده)
```

#### **عملگرهای مقایسهای**:  
```python
print(5 > 3)   # True
print(5 == 5)  # True
print(5 != 3)  # True
```

#### **عملگرهای منطقی**:  
```python
has_account = True
is_logged_in = False
print(has_account and is_logged_in)  # False
print(has_account or is_logged_in)   # True
print(not has_account)               # False
```

---

### **۲.۳ ساختارهای کنترلی**  
#### **شرط `if/elif/else`**:  
```python
hour = 14
if hour < 12:
    print("صبح بخیر!")
elif hour < 18:
    print("عصر بخیر!")
else:
    print("شب بخیر!")
```

#### **حلقه `for`**:  
```python
for i in range(5):  # اعداد ۰ تا ۴
    print(i)

for user in ["آلیس", "بابک", "چارلی"]:
    print(f"سلام {user}!")
```

#### **حلقه `while`**:  
```python
count = 3
while count > 0:
    print(count)
    count -= 1  # کاهش مقدار count در هر دور
```

---

### **۲.۴ توابع (Functions)**  
توابع بلوکهایی از کد هستند که یک کار خاص انجام میدهند.  

#### **تعریف تابع ساده**:  
```python
def greet(name):
    return f"سلام {name}!"

print(greet("آلیس"))  # خروجی: سلام آلیس!
```

#### **پارامترهای پیشفرض**:  
```python
def multiply(a, b=2):
    return a * b

print(multiply(5))    # 10 (b=2 استفاده میشود)
print(multiply(5, 3)) # 15
```

---

### **۲.۵ ماژولها (Modules)**  
ماژولها فایلهای پایتون هستند که توابع و متغیرها را سازماندهی میکنند.  

#### **ساخت ماژول سفارشی**:  
- فایل `math_utils.py`:  
  ```python
  PI = 3.14

  def square(x):
      return x ** 2
  ```

- استفاده در فایل اصلی:  
  ```python
  import math_utils

  print(math_utils.PI)           # 3.14
  print(math_utils.square(4))    # 16
  ```

---

### **تمرین عملی فصل ۲**  
۱. تابعی بنویسید که دو عدد بگیرد و عدد بزرگتر را برگرداند.  
۲. لیستی از نام کاربران بسازید و با حلقه `for` به همه سلام کنید.  
۳. دیکشنری برای ذخیره اطلاعات کاربر (نام، سن، ایمیل) ایجاد کنید.  

**مثال تمرین ۱**:  
```python
def find_max(a, b):
    return a if a > b else b

print(find_max(10, 5))  # 10
```

---

### **نکات مهم**  
- نام متغیرها باید توصیفی و به انگلیسی باشد (مثال: `user_age` به جای `a`).  
- از توابع برای سازماندهی کد و جلوگیری از تکرار استفاده کنید.  
- برای خطایابی از `print()` یا ابزارهای دیباگ در VS Code استفاده کنید.  

---

**فصل بعدی**: شروع کار با کتابخانه `discord.py` و ساخت اولین ربات! 🚀