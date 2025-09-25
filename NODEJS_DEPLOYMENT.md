# دليل النشر على Node.js - cPanel

هذا الدليل يوضح كيفة نشر مشروع Story Board Engine كتطبيق Node.js على خدمة الاستضافة المشتركة باستخدام cPanel.

## المتطلبات الأساسية

### 1. متطلبات الاستضافة
- استضافة مشتركة تدعم cPanel مع دعم Node.js
- Node.js الإصدار 18 أو أحدث
- دعم قاعدة بيانات MySQL
- مساحة تخزين كافية (على الأقل 200 ميجابايت)
- دعم SSL (مستحسن)

### 2. أدوات التطوير المطلوبة
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- Git (اختياري)

## هيكل المشروع

```
story-board-engine/
├── server.js              ← خادم Node.js الرئيسي
├── package.json           ← إعدادات المشروع والتبعيات
├── .env                   ← متغيرات البيئة
├── dist/                  ← ملفات React المبنية
│   ├── index.html
│   ├── assets/
│   └── .htaccess
├── src/                   ← كود React المصدري
└── public/               ← الملفات العامة
```

## خطوات النشر

### الخطوة 1: إعداد قاعدة البيانات MySQL

1. **إنشاء قاعدة البيانات:**
   - ادخل إلى cPanel
   - اذهب إلى "MySQL Databases"
   - أنشئ قاعدة بيانات جديدة (مثل: `your_username_storyboard`)
   - أنشئ مستخدم جديد للقاعدة البيانات
   - اربط المستخدم بقاعدة البيانات مع جميع الصلاحيات

2. **الحصول على معلومات الاتصال:**
   ```
   Host: localhost (عادة)
   Database: your_username_storyboard
   Username: your_username_dbuser
   Password: [كلمة المرور التي اخترتها]
   Port: 3306 (افتراضي)
   ```

### الخطوة 2: تحديث متغيرات البيئة

قم بتحديث ملف `.env` بمعلومات قاعدة البيانات:

```env
# إعدادات التطبيق
VITE_APP_TITLE=Story Board Engine
VITE_STORAGE_PREFIX=storyboard_
VITE_ENABLE_PERSISTENCE=true

# إعدادات قاعدة بيانات MySQL
VITE_MYSQL_HOST=localhost
VITE_MYSQL_PORT=3306
VITE_MYSQL_USER=your_username_dbuser
VITE_MYSQL_PASSWORD=your_database_password
VITE_MYSQL_DATABASE=your_username_storyboard

# إعدادات Node.js
NODE_ENV=production
PORT=3000
```

### الخطوة 3: بناء المشروع للإنتاج

1. **تثبيت التبعيات:**
   ```bash
   npm install
   ```

2. **بناء المشروع:**
   ```bash
   npm run build
   ```

3. **اختبار محلياً:**
   ```bash
   npm start
   ```

### الخطوة 4: إعداد Node.js في cPanel

#### تفعيل Node.js في cPanel

1. **الدخول إلى Node.js Selector:**
   - ادخل إلى cPanel
   - ابحث عن "Node.js Selector" أو "Node.js App"
   - اختر الإصدار 18 أو أحدث

2. **إنشاء تطبيق Node.js:**
   - اختر "Create Application"
   - Node.js Version: 18 أو أحدث
   - Application Mode: Production
   - Application Root: `story-board-engine` (أو اسم المجلد)
   - Application URL: اتركه فارغاً للدومين الرئيسي
   - Application Startup File: `server.js`

### الخطوة 5: رفع الملفات إلى cPanel

#### الطريقة الأولى: استخدام File Manager

1. **الدخول إلى File Manager:**
   - ادخل إلى cPanel
   - اختر "File Manager"
   - اذهب إلى مجلد التطبيق (عادة `story-board-engine`)

2. **رفع الملفات:**
   - ارفع جميع ملفات المشروع:
     - `server.js`
     - `package.json`
     - `.env`
     - مجلد `dist/`
     - مجلد `node_modules/` (أو استخدم npm install)

#### الطريقة الثانية: استخدام Git (مستحسن)

1. **استنساخ المستودع:**
   ```bash
   git clone [your-repository-url] story-board-engine
   cd story-board-engine
   ```

2. **تثبيت التبعيات:**
   ```bash
   npm install
   ```

### الخطوة 6: تكوين التطبيق في cPanel

1. **في Node.js Selector:**
   - تأكد من أن التطبيق يظهر في القائمة
   - اضغط على "Restart" لإعادة تشغيل التطبيق
   - تحقق من حالة التطبيق (يجب أن تكون "Running")

2. **تحديث متغيرات البيئة:**
   - في قسم "Environment Variables"
   - أضف المتغيرات من ملف `.env`

### الخطوة 7: إعداد النطاق والـ SSL

1. **ربط النطاق:**
   - في cPanel، اذهب إلى "Subdomains" أو استخدم النطاق الرئيسي
   - وجه النطاق إلى مجلد التطبيق

2. **تفعيل SSL:**
   - في cPanel، اذهب إلى "SSL/TLS"
   - فعّل "Force HTTPS Redirect"

## API Endpoints المتاحة

التطبيق يوفر عدة API endpoints:

```
GET  /api/health           ← فحص حالة الخادم
GET  /api/db-test          ← اختبار اتصال قاعدة البيانات
GET  /api/storyboards      ← جلب قائمة القصص المصورة
POST /api/storyboards      ← إنشاء قصة مصورة جديدة
GET  /*                    ← تقديم تطبيق React
```

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

1. **التطبيق لا يعمل:**
   - تحقق من سجلات Node.js في cPanel
   - تأكد من أن `server.js` موجود
   - تحقق من إصدار Node.js

2. **مشاكل قاعدة البيانات:**
   - تحقق من معلومات الاتصال في `.env`
   - تأكد من صلاحيات المستخدم
   - اختبر الاتصال عبر `/api/db-test`

3. **مشاكل الأصول (Assets):**
   - تأكد من بناء المشروع: `npm run build`
   - تحقق من وجود مجلد `dist`

4. **خطأ ES Modules:**
   - تأكد من أن `package.json` يحتوي على `"type": "module"`
   - استخدم `import` بدلاً من `require`

5. **خطأ TypeScript (tsc: command not found):**
   - **السبب:** بيئة cPanel لا تحتوي على TypeScript مثبت عالمياً
   - **الحل الأول:** تعديل سكريبت البناء في `package.json`:
     ```json
     "build": "vite build"
     ```
     بدلاً من:
     ```json
     "build": "tsc -b && vite build"
     ```
   - **الحل الثاني:** إضافة TypeScript كتبعية محلية:
     ```bash
     npm install --save-dev typescript
     ```
   - **الحل الثالث:** استخدام npx:
     ```json
     "build": "npx tsc -b && vite build"
     ```
   - **ملاحظة:** Vite يتعامل مع TypeScript تلقائياً، لذا الحل الأول هو الأفضل

### سجلات الأخطاء

1. **عرض سجلات Node.js:**
   - في cPanel، اذهب إلى "Node.js Selector"
   - اختر التطبيق واضغط على "Log"

2. **عرض سجلات الخادم:**
   - في cPanel، اذهب إلى "Error Logs"

## الأمان والأداء

### إعدادات الأمان

1. **متغيرات البيئة:**
   - لا ترفع ملف `.env` إلى Git
   - استخدم متغيرات البيئة في cPanel

2. **قاعدة البيانات:**
   - استخدم كلمات مرور قوية
   - قيّد صلاحيات المستخدم

### تحسين الأداء

1. **ضغط الملفات:**
   - Express يدعم الضغط تلقائياً
   - تأكد من تفعيل `gzip` في الخادم

2. **التخزين المؤقت:**
   - استخدم headers للتخزين المؤقت
   - فعّل CDN إذا أمكن

## صيانة المشروع

### التحديثات

1. **تحديث الكود:**
   ```bash
   git pull origin main
   npm install
   npm run build
   ```

2. **إعادة تشغيل التطبيق:**
   - في Node.js Selector، اضغط "Restart"

### النسخ الاحتياطي

1. **نسخ احتياطي من قاعدة البيانات:**
   - استخدم phpMyAdmin في cPanel
   - صدّر قاعدة البيانات بانتظام

2. **نسخ احتياطي من الملفات:**
   - استخدم Git للتحكم في الإصدارات
   - احتفظ بنسخة من ملف `.env`

## مراقبة التطبيق

### فحص الحالة

1. **فحص حالة الخادم:**
   ```
   GET /api/health
   ```

2. **فحص قاعدة البيانات:**
   ```
   GET /api/db-test
   ```

### المراقبة المستمرة

- راقب استخدام الذاكرة والمعالج
- تحقق من سجلات الأخطاء بانتظام
- راقب أداء قاعدة البيانات

## الدعم والمساعدة

إذا واجهت مشاكل:

1. راجع سجلات Node.js في cPanel
2. تحقق من سجلات الأخطاء
3. اختبر API endpoints
4. تأكد من إعدادات قاعدة البيانات
5. راجع متغيرات البيئة

---

**ملاحظة:** هذا الدليل يفترض استخدام استضافة مشتركة تدعم Node.js. قد تختلف بعض الخطوات حسب مزود الاستضافة.