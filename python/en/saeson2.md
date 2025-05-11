## Chapter 2: Getting to Know Python Fundamentals

---

### 2.1 Variables and Data Types

Variables are like boxes that store data. In Python, you don’t need to declare a type in advance (dynamic typing).

#### Common Data Types

* **String**

  ```python
  name = "Alice"   # Text is enclosed in "" or ''
  message = 'Hello!'
  ```
* **Integer and Float**

  ```python
  age = 20         # Integer
  price = 12.5     # Floating-point number
  ```
* **Boolean**

  ```python
  is_online = True
  has_permission = False
  ```
* **List**

  ```python
  users = ["Alice", "Bob", "Charlie"]
  print(users[0])  # Output: Alice
  ```
* **Dictionary**

  ```python
  user = {
      "name": "Alice",
      "age": 25,
      "is_admin": True
  }
  print(user["name"])  # Output: Alice
  ```

---

### 2.2 Operators

#### Arithmetic Operators

```python
a = 10 + 5    # 15
b = 20 - 3    # 17
c = 6 * 2     # 12
d = 10 / 2    # 5.0   (floating-point division)
e = 10 // 3   # 3     (integer division)
f = 10 % 3    # 1     (modulo)
```

#### Comparison Operators

```python
print(5 > 3)   # True
print(5 == 5)  # True
print(5 != 3)  # True
```

#### Logical Operators

```python
has_account = True
is_logged_in = False
print(has_account and is_logged_in)  # False
print(has_account or is_logged_in)   # True
print(not has_account)               # False
```

---

### 2.3 Control Flow

#### `if` / `elif` / `else`

```python
hour = 14
if hour < 12:
    print("Good morning!")
elif hour < 18:
    print("Good afternoon!")
else:
    print("Good evening!")
```

#### `for` Loop

```python
for i in range(5):  # 0 through 4
    print(i)

for user in ["Alice", "Bob", "Charlie"]:
    print(f"Hello, {user}!")
```

#### `while` Loop

```python
count = 3
while count > 0:
    print(count)
    count -= 1  # Decrement count each iteration
```

---

### 2.4 Functions

Functions are reusable blocks of code that perform a specific task.

#### Defining a Simple Function

```python
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Output: Hello, Alice!
```

#### Default Parameters

```python
def multiply(a, b=2):
    return a * b

print(multiply(5))    # 10  (uses b=2)
print(multiply(5, 3)) # 15
```

---

### 2.5 Modules

Modules are Python files that organize related functions and variables.

#### Creating a Custom Module

* **math\_utils.py**

  ```python
  PI = 3.14

  def square(x):
      return x ** 2
  ```
* **main.py**

  ```python
  import math_utils

  print(math_utils.PI)         # 3.14
  print(math_utils.square(4))  # 16
  ```

---

### Hands-On Exercises for Chapter 2

1. Write a function that takes two numbers and returns the larger one.
2. Create a list of user names and use a `for` loop to greet each one.
3. Build a dictionary to store user info (name, age, email).

**Example for Exercise 1**:

```python
def find_max(a, b):
    return a if a > b else b

print(find_max(10, 5))  # 10
```

---

### Key Tips

* Use descriptive English variable names (e.g., `user_age` instead of `a`).
* Factor repeated code into functions to avoid duplication.
* Use `print()` or VS Code’s debugger for troubleshooting.

---

**Next Chapter:** Getting started with `discord.py` and building your first bot! 🚀