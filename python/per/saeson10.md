**فصل ۱۰: استقرار ربات (Deploy)**  

---

### **۱۰.۱ انتخاب پلتفرم استقرار**  
انتخاب پلتفرم مناسب بستگی به نیازهای پروژه دارد:  
- **سرورهای ابری رایگان**: Replit, Railway, Heroku (مناسب برای پروژههای کوچک).  
- **سرورهای اختصاصی**: VPS مانند DigitalOcean, AWS, Hetzner (برای رباتهای حرفهای).  
- **هاستینگ خصوصی**: اجرا روی رایانه شخصی با نرمافزارهایی مثل PM2 (فقط برای تست).  

---

### **۱۰.۲ استقرار روی Replit (سادهترین روش)**  
#### **مراحل**:  
۱. ساخت پروژه جدید در [Replit](https://replit.com).  
۲. آپلود فایلهای پروژه (`main.py`, `requirements.txt` و ...).  
۳. تنظیم **Secrets** (توکن ربات) در بخش **Environment Variables**.  
۴. افزودن فایل `keep_alive.py` برای جلوگیری از خوابیدن ربات:  
   ```python
   from flask import Flask
   from threading import Thread

   app = Flask('')

   @app.route('/')
   def home():
       return "Bot is alive!"

   def run():
       app.run(host='0.0.0.0', port=8080)

   def keep_alive():
       t = Thread(target=run)
       t.start()
   ```

۵. اجرای ربات:  
   ```python
   keep_alive()
   bot.run(os.environ['TOKEN'])
   ```

---

### **۱۰.۳ استقرار روی سرور لینوکس (VPS)**  
#### **مراحل پایه برای اوبونتو**:  
۱. **اتصال به سرور**:  
   ```bash
   ssh root@IP_سرور
   ```

۲. **نصب پیشنیازها**:  
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install python3-pip python3-venv git -y
   ```

۳. **کپی کردن پروژه**:  
   ```bash
   git clone https://github.com/نام-کاربری/ربات-شما.git
   cd ربات-شما
   ```

۴. **نصب وابستگیها**:  
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

۵. **اجرای ربات با PM2**:  
   ```bash
   npm install pm2 -g
   pm2 start "python3 main.py" --name "my-bot"
   pm2 save
   pm2 startup  # ایجاد سرویس خودکار
   ```

---

### **۱۰.۴ استقرار روی Railway یا Heroku**  
#### **Railway**:  
۱. ساخت پروژه جدید و اتصال به ریپازیتوری GitHub.  
۲. تنظیم متغیرهای محیطی (Environment Variables) در تب **Variables**.  
۳. انتخاب پورت پیشفرض (`8000`) و فعالسازی **Deploy**.  

#### **Heroku**:  
۱. ساخت اپلیکیشن جدید در [Heroku](https://heroku.com).  
۲. تنظیم Buildpack:  
   ```bash
   heroku buildpacks:set heroku/python
   ```  
۳. افزودن فایل `Procfile`:  
   ```bash
   worker: python3 main.py
   ```  
۴. دپلوی کد از طریق Git:  
   ```bash
   git push heroku main
   ```

---

### **۱۰.۵ امنیت در استقرار**  
#### **۱. مخفیسازی توکن**:  
- استفاده از فایل `.env`:  
  ```env
  TOKEN = "مقدار_توکن"
  ```  
- خواندن در کد:  
  ```python
  from dotenv import load_dotenv
  load_dotenv()
  bot.run(os.getenv('TOKEN'))
  ```

#### **۲. فایروال و محدودیت IP**:  
```bash
sudo ufw allow 22  # SSH
sudo ufw allow 80  # HTTP
sudo ufw enable
```

#### **۳. استفاده از Reverse Proxy (Nginx)**:  
```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
    }
}
```

---

### **۱۰.۶ نگهداری ربات**  
#### **۱. مانیتورینگ**:  
```bash
pm2 logs my-bot --lines 100  # نمایش ۱۰۰ خط آخر لاگ
pm2 monit  # مانیتورینگ لحظهای
```

#### **۲. بروزرسانی خودکار**:  
با استفاده از **Cron Jobs**:  
```bash
0 3 * * * cd /path/to/bot && git pull && pm2 restart my-bot
```

#### **۳. بکاپگیری**:  
```bash
# بکاپ از دیتابیس SQLite
cp database.db backup/database_$(date +%F).db

# آپلود به فضای ابری (مثلاً AWS S3)
aws s3 cp backup s3://my-bot-backups --recursive
```

---

### **تمرین عملی فصل ۱۰**  
۱. ربات خود را روی Replit یا Railway مستقر کنید و مطمئن شوید ۲۴/۷ فعال است.  
۲. با استفاده از PM2 ربات را روی یک سرور لینوکس اجرا کنید.  
۳. یک سیستم بکاپ خودکار با Cron Jobs طراحی کنید.  

---

### **مشکلات رایج**  
- **ربات بعد از مدتی قطع میشود**:  
  - از PM2 یا سیستمهای مشابه برای اجرای دائمی استفاده کنید.  
  - بررسی کنید سرور منابع کافی (CPU/RAM) دارد.  
- **خطای `ImportError`**:  
  - مطمئن شوید همه پکیجها در `requirements.txt` لیست شدهاند.  
  - دستور `pip install -r requirements.txt` را اجرا کنید.  

---

### **نکات طلایی**  
- برای رباتهای بزرگ، از **Docker** برای مدیریت محیط ایزوله استفاده کنید.  
- همیشه قبل از آپدیت کد، از دیتابیس **بکاپ** بگیرید.  
- از **GitHub Actions** برای CI/CD (استقرار خودکار) استفاده کنید.  

--- 

**پایان دوره!** 🎉  
حالا شما میتوانید رباتهای دیسکورد حرفهای بسازید، آنها را توسعه دهید و در سرورهای مختلف اجرا کنید. یادگیری را ادامه دهید و پروژههای خلاقانه خود را خلق کنید!  

**[پیشنهاد]** برای بهبود مهارتها، سورسکد رباتهای متنباز را در GitHub مطالعه کنید و در پروژههای مشارکتی شرکت نمایید!