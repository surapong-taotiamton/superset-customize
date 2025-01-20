# บันทึกการทดลอง

## 2025-10-20

### customize หน้า Login 

เราสามารถแก้ Template ที่มาจากหลังบ้านได้ด้วยการเข้าไปแก้ที่ : superset/templates/appbuilder โดยทำตามมาตรฐานของ flask-app-builder ดูได้จาก slack :  https://flask-appbuilder.readthedocs.io/en/latest/customizing.html

ตัวอย่างไฟล์ login_db : https://github.com/dpgaspar/Flask-AppBuilder/blob/9067f5a4aa0a632941f67b4c8664108ff8b3ac20/flask_appbuilder/templates/appbuilder/general/security/login_db.html

อันนี้ต้องแก้ที่ flask app ไม่ใช่ส่วน superset-frontend

ที่อยู่ในการเข้าไปแก้ไฟล์คือ

```
superset/templates/appbuilder/general/security/login_db.html
```
