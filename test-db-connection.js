#!/usr/bin/env node

/**
 * اختبار الاتصال بقاعدة البيانات
 * Database Connection Test
 * 
 * هذا الملف يختبر الاتصال بقاعدة البيانات MySQL
 * ويعرض معلومات مفصلة عن حالة الاتصال
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// تحميل متغيرات البيئة
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

// إعدادات قاعدة البيانات
const dbConfig = {
  host: process.env.VITE_MYSQL_HOST || 'localhost',
  port: parseInt(process.env.VITE_MYSQL_PORT) || 3306,
  user: process.env.VITE_MYSQL_USER || 'root',
  password: process.env.VITE_MYSQL_PASSWORD || '',
  database: process.env.VITE_MYSQL_DATABASE || 'storyboard_engine',
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 10000
};

console.log('🔍 اختبار الاتصال بقاعدة البيانات');
console.log('=====================================');
console.log('');

// عرض إعدادات الاتصال (بدون كلمة المرور)
console.log('📋 إعدادات الاتصال:');
console.log(`   المضيف (Host): ${dbConfig.host}`);
console.log(`   المنفذ (Port): ${dbConfig.port}`);
console.log(`   المستخدم (User): ${dbConfig.user}`);
console.log(`   كلمة المرور: ${dbConfig.password ? '***مخفية***' : 'فارغة'}`);
console.log(`   قاعدة البيانات: ${dbConfig.database}`);
console.log('');

/**
 * اختبار الاتصال الأساسي
 */
async function testBasicConnection() {
  console.log('🔄 اختبار الاتصال الأساسي...');
  
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      connectTimeout: dbConfig.connectTimeout
    });
    
    console.log('✅ نجح الاتصال بخادم MySQL');
    
    // اختبار استعلام بسيط
    const [rows] = await connection.execute('SELECT VERSION() as version, NOW() as current_time');
    console.log(`   إصدار MySQL: ${rows[0].version}`);
    console.log(`   الوقت الحالي: ${rows[0].current_time}`);
    
    await connection.end();
    return true;
    
  } catch (error) {
    console.log('❌ فشل الاتصال بخادم MySQL');
    console.log(`   الخطأ: ${error.message}`);
    console.log(`   الكود: ${error.code || 'غير محدد'}`);
    return false;
  }
}

/**
 * اختبار وجود قاعدة البيانات
 */
async function testDatabaseExists() {
  console.log('🔄 اختبار وجود قاعدة البيانات...');
  
  try {
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      connectTimeout: dbConfig.connectTimeout
    });
    
    // البحث عن قاعدة البيانات
    const [databases] = await connection.execute(
      'SHOW DATABASES LIKE ?', 
      [dbConfig.database]
    );
    
    if (databases.length > 0) {
      console.log('✅ قاعدة البيانات موجودة');
      
      // الاتصال بقاعدة البيانات
      await connection.changeUser({ database: dbConfig.database });
      
      // عرض الجداول الموجودة
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`   عدد الجداول: ${tables.length}`);
      
      if (tables.length > 0) {
        console.log('   الجداول الموجودة:');
        tables.forEach((table, index) => {
          const tableName = Object.values(table)[0];
          console.log(`     ${index + 1}. ${tableName}`);
        });
      }
      
    } else {
      console.log('⚠️  قاعدة البيانات غير موجودة');
      console.log(`   يمكن إنشاؤها باستخدام: npm run db:setup`);
    }
    
    await connection.end();
    return databases.length > 0;
    
  } catch (error) {
    console.log('❌ فشل في اختبار قاعدة البيانات');
    console.log(`   الخطأ: ${error.message}`);
    return false;
  }
}

/**
 * اختبار الاتصال الكامل
 */
async function testFullConnection() {
  console.log('🔄 اختبار الاتصال الكامل...');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ نجح الاتصال الكامل بقاعدة البيانات');
    
    // اختبار استعلام على قاعدة البيانات
    const [result] = await connection.execute('SELECT DATABASE() as current_db');
    console.log(`   قاعدة البيانات الحالية: ${result[0].current_db}`);
    
    await connection.end();
    return true;
    
  } catch (error) {
    console.log('❌ فشل الاتصال الكامل');
    console.log(`   الخطأ: ${error.message}`);
    console.log(`   الكود: ${error.code || 'غير محدد'}`);
    return false;
  }
}

/**
 * اختبار تجمع الاتصالات (Connection Pool)
 */
async function testConnectionPool() {
  console.log('🔄 اختبار تجمع الاتصالات...');
  
  try {
    const pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
    });
    
    // اختبار عدة اتصالات متزامنة
    const promises = [];
    for (let i = 0; i < 3; i++) {
      promises.push(
        pool.execute('SELECT ? as test_number', [i + 1])
      );
    }
    
    const results = await Promise.all(promises);
    console.log('✅ نجح اختبار تجمع الاتصالات');
    console.log(`   تم اختبار ${results.length} اتصالات متزامنة`);
    
    await pool.end();
    return true;
    
  } catch (error) {
    console.log('❌ فشل اختبار تجمع الاتصالات');
    console.log(`   الخطأ: ${error.message}`);
    return false;
  }
}

/**
 * عرض التوصيات والحلول
 */
function showRecommendations(results) {
  console.log('');
  console.log('💡 التوصيات والحلول:');
  console.log('====================');
  
  if (!results.basic) {
    console.log('');
    console.log('🔧 لحل مشاكل الاتصال الأساسي:');
    console.log('   1. تأكد من تشغيل خادم MySQL');
    console.log('   2. تحقق من إعدادات الشبكة والمنفذ');
    console.log('   3. تأكد من صحة اسم المستخدم وكلمة المرور');
    console.log('   4. تحقق من صلاحيات المستخدم');
  }
  
  if (results.basic && !results.database) {
    console.log('');
    console.log('🔧 لإنشاء قاعدة البيانات:');
    console.log('   npm run db:setup');
  }
  
  if (results.basic && results.database && !results.full) {
    console.log('');
    console.log('🔧 لحل مشاكل الاتصال بقاعدة البيانات:');
    console.log('   1. تحقق من صلاحيات المستخدم على قاعدة البيانات');
    console.log('   2. تأكد من صحة اسم قاعدة البيانات في ملف .env');
  }
  
  if (results.basic && results.database && results.full) {
    console.log('');
    console.log('🎉 ممتاز! قاعدة البيانات تعمل بشكل مثالي');
    console.log('   يمكنك الآن استخدام التطبيق مع قاعدة البيانات');
  }
}

/**
 * الدالة الرئيسية
 */
async function main() {
  const results = {
    basic: false,
    database: false,
    full: false,
    pool: false
  };
  
  try {
    // اختبار الاتصال الأساسي
    results.basic = await testBasicConnection();
    console.log('');
    
    if (results.basic) {
      // اختبار وجود قاعدة البيانات
      results.database = await testDatabaseExists();
      console.log('');
      
      if (results.database) {
        // اختبار الاتصال الكامل
        results.full = await testFullConnection();
        console.log('');
        
        if (results.full) {
          // اختبار تجمع الاتصالات
          results.pool = await testConnectionPool();
          console.log('');
        }
      }
    }
    
    // عرض النتائج النهائية
    console.log('📊 ملخص النتائج:');
    console.log('================');
    console.log(`   الاتصال الأساسي: ${results.basic ? '✅ نجح' : '❌ فشل'}`);
    console.log(`   وجود قاعدة البيانات: ${results.database ? '✅ موجودة' : '❌ غير موجودة'}`);
    console.log(`   الاتصال الكامل: ${results.full ? '✅ نجح' : '❌ فشل'}`);
    console.log(`   تجمع الاتصالات: ${results.pool ? '✅ نجح' : '❌ فشل'}`);
    
    // عرض التوصيات
    showRecommendations(results);
    
    // تحديد حالة الخروج
    const success = results.basic && results.database && results.full;
    process.exit(success ? 0 : 1);
    
  } catch (error) {
    console.error('❌ خطأ غير متوقع:', error.message);
    process.exit(1);
  }
}

// تشغيل الاختبار
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default {
  testBasicConnection,
  testDatabaseExists,
  testFullConnection,
  testConnectionPool
};