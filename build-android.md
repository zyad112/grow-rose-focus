# دليل إنشاء تطبيق zd flower للأندرويد

## الخطوات المطلوبة لإنشاء APK:

### 1. نقل المشروع إلى GitHub
- اضغط على زر "Export to GitHub" في Lovable
- انسخ المشروع إلى حسابك على GitHub

### 2. إعداد البيئة المحلية
```bash
# استنساخ المشروع
git clone [رابط مشروعك على GitHub]
cd grow-rose-focus

# تثبيت المتطلبات
npm install

# إضافة منصة الأندرويد
npx cap add android

# تحديث التبعيات
npx cap update android

# بناء المشروع
npm run build

# مزامنة الملفات مع الأندرويد
npx cap sync android
```

### 3. إنشاء APK
```bash
# فتح المشروع في Android Studio
npx cap open android

# أو تشغيل مباشرة على الجهاز/المحاكي
npx cap run android
```

### 4. بناء APK للإنتاج في Android Studio:
1. اذهب إلى Build → Generate Signed Bundle / APK
2. اختر APK
3. إنشاء Key Store جديد أو استخدام موجود
4. اختر release build
5. سيتم إنشاء APK في مجلد `android/app/build/outputs/apk/release/`

## متطلبات النظام:
- Node.js (أحدث إصدار)
- Android Studio
- Java JDK 11+

## ملاحظات مهمة:
- تأكد من تفعيل "Developer Options" و "USB Debugging" على جهازك
- قد تحتاج إلى تثبيت Android SDK
- للاختبار، يمكنك استخدام محاكي أندرويد

## مميزات التطبيق:
✨ زهور حقيقية في وضع VIP
🎵 أصوات عالية الجودة  
📱 محسن للهواتف المحمولة
🌐 يعمل بدون إنترنت بعد التحميل
👑 نظام VIP متكامل
🏆 نظام إنجازات ومكافآت

للمساعدة التقنية، راجع: https://lovable.dev/blogs/TODO