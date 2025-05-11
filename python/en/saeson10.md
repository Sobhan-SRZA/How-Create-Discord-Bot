## Chapter 10: Deploying Your Bot

---

### 10.1 Choosing a Deployment Platform

Selecting the right platform depends on your project’s needs:

* **Free Cloud Services:** Replit, Railway, Heroku (great for small projects).
* **Virtual Private Servers (VPS):** DigitalOcean, AWS, Hetzner (for professional bots).
* **Local Hosting:** Run on your own computer with tools like PM2 (suitable for testing).

---

### 10.2 Deploying on Replit (Easiest Method)

#### Steps:

1. Create a new project on [Replit](https://replit.com).
2. Upload your project files (`main.py`, `requirements.txt`, etc.).
3. Add your bot token under **Secrets** (Environment Variables).
4. Include a `keep_alive.py` to prevent the REPL from sleeping:

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
5. In your main file, call `keep_alive()` before running:

   ```python
   keep_alive()
   bot.run(os.environ['TOKEN'])
   ```

---

### 10.3 Deploying on a Linux VPS

#### Ubuntu Basics:

1. **SSH into the Server:**

   ```bash
   ssh root@YOUR_SERVER_IP
   ```
2. **Install Prerequisites:**

   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install python3-pip python3-venv git -y
   ```
3. **Clone Your Project:**

   ```bash
   git clone https://github.com/your-username/your-bot.git
   cd your-bot
   ```
4. **Set Up Virtual Environment & Install Dependencies:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
5. **Use PM2 to Keep It Running:**

   ```bash
   npm install pm2 -g
   pm2 start "python3 main.py" --name "my-bot"
   pm2 save
   pm2 startup   # generates startup script
   ```

---

### 10.4 Deploying on Railway or Heroku

#### Railway:

1. Create a new project and link your GitHub repo.
2. Set environment variables under the **Variables** tab.
3. Specify the default port (e.g., `8000`) and enable **Deploy**.

#### Heroku:

1. Create a new app on [Heroku](https://heroku.com).
2. Set the Python buildpack:

   ```bash
   heroku buildpacks:set heroku/python
   ```
3. Add a `Procfile`:

   ```
   worker: python3 main.py
   ```
4. Deploy via Git:

   ```bash
   git push heroku main
   ```

---

### 10.5 Security Best Practices for Deployment

1. **Keep Your Token Secret:**

   * Use a `.env` file:

     ```env
     TOKEN="your_bot_token"
     ```
   * Load in code:

     ```python
     from dotenv import load_dotenv
     load_dotenv()
     bot.run(os.getenv('TOKEN'))
     ```
2. **Firewall Configuration:**

   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw enable
   ```
3. **Reverse Proxy with Nginx:**

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

### 10.6 Maintenance and Monitoring

1. **Monitoring with PM2:**

   ```bash
   pm2 logs my-bot --lines 100   # View last 100 log lines
   pm2 monit                     # Real-time monitoring
   ```
2. **Automated Updates:**
   Use a cron job to pull changes and restart nightly:

   ```bash
   0 3 * * * cd /path/to/bot && git pull && pm2 restart my-bot
   ```
3. **Backups:**

   ```bash
   # Backup SQLite database
   cp database.db backup/database_$(date +%F).db

   # Upload backups to AWS S3
   aws s3 cp backup s3://my-bot-backups --recursive
   ```

---

### Hands-On Exercises for Chapter 10

1. Deploy your bot on Replit or Railway and verify it stays online 24/7.
2. Run your bot on a Linux server using PM2.
3. Create an automated backup system using cron jobs.

---

### Common Issues

* **Bot Stops After a While:**

  * Ensure you’re using PM2 or a similar process manager.
  * Verify the server has sufficient CPU/RAM.
* **`ImportError` on Startup:**

  * Check that all dependencies are listed in `requirements.txt`.
  * Run `pip install -r requirements.txt`.

---

### Pro Tips

* For complex bots, consider using Docker to isolate the environment.
* Always back up your database before deploying updates.
* Implement CI/CD with GitHub Actions for automated testing and deployment.

---

**Course Complete!** 🎉
You now have the skills to build, extend, and deploy professional Discord bots. Keep learning, explore open-source bot projects on GitHub, and contribute to collaborative communities!