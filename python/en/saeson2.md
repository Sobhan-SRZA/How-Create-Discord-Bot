## Chapter 2: Python Fundamentals

---

### 2.1 Variables and Data Types

Variables are like boxes that store data. Each variable has a **name** and a **data type**.

#### Primary Data Types

* **String**: Text enclosed in `' '` or `" "`

  ```python
  name = "Alice"
  message = 'Hello, world!'
  ```

* **Integer**: Whole numbers without a decimal point

  ```python
  age = 20
  score = -50
  ```

* **Float**: Numbers with a decimal point

  ```python
  price = 19.99
  pi = 3.14
  ```

* **Boolean**: Only `True` or `False`

  ```python
  is_online = True
  has_permission = False
  ```

* **List**: Ordered, mutable collection

  ```python
  users = ["Alice", "Bob", "Charlie"]
  numbers = [1, 2, 3]
  ```

* **Dictionary**: Key–value pairs for structured data

  ```python
  user = {
      "name": "Alice",
      "age": 25,
      "is_admin": True
  }
  ```

---

### 2.2 Operators and Control Flow

#### Operators

* **Arithmetic**: `+`, `-`, `*`, `/`, `**` (power)

  ```python
  result = 10 + 5 * 2  # 20
  ```

* **Comparison**: `==`, `!=`, `>`, `<`, `>=`, `<=`

  ```python
  print(5 > 3)  # True
  ```

* **Logical**: `and`, `or`, `not`

  ```python
  if age > 18 and has_ticket:
      print("You may enter!")
  ```

#### Control Structures

* **`if` / `elif` / `else`**

  ```python
  hour = 14
  if hour < 12:
      print("Good morning!")
  elif hour < 18:
      print("Good afternoon!")
  else:
      print("Good evening!")
  ```

* **`for` Loop**

  ```python
  for user in users:
      print(f"Hello, {user}!")
  ```

* **`while` Loop**

  ```python
  count = 3
  while count > 0:
      print(count)
      count -= 1
  ```

---

### 2.3 Functions and Modules

#### Functions

* **Defining a function**

  ```python
  def greet(name):
      return f"Hello, {name}!"

  print(greet("Alice"))  # Output: Hello, Alice!
  ```

* **Default parameters**

  ```python
  def multiply(a, b=2):
      return a * b

  print(multiply(5))  # Output: 10
  ```

#### Modules

* **Creating a module** (`math_utils.py`)

  ```python
  def add(a, b):
      return a + b

  PI = 3.14
  ```

* **Importing your module**

  ```python
  import math_utils

  print(math_utils.add(2, 3))  # 5
  print(math_utils.PI)         # 3.14
  ```

---

### Hands-On Exercises for Chapter 2

1. **Max-Number Function**
   Write a function that takes two numbers and returns the larger one.

   ```python
   def max_number(a, b):
       return a if a > b else b
   ```

2. **Loop Through a List**
   Create a list of numbers and calculate their sum.

   ```python
   numbers = [10, 20, 30]
   total = 0
   for num in numbers:
       total += num
   print(total)  # 60
   ```

3. **User Dictionary**
   Build a dictionary to store a user’s name, email, and age.

   ```python
   user = {
       "name": "Alice",
       "email": "alice@example.com",
       "age": 25
   }
   ```

---

### Common Errors & Solutions

* **`NameError`**:
  Ensure the variable is defined before you use it.
* **`IndentationError`**:
  Python relies on indentation—use 4 spaces per indent level.
* **Type Mismatch**:
  You can’t add a number to a string (e.g., `10 + "20"`). Convert types explicitly: `10 + int("20")`.

---

### Best Practices

* Use **descriptive variable names** (e.g., `user_age` instead of `a`).
* Encapsulate logic in **functions** to keep code organized.
* Comment your code with `#` to explain non-obvious parts.

---

Up next: in Chapter 3, we’ll dive into the `discord.py` library and start building your bot! 🚀