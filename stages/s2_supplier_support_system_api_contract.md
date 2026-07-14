# s2_supplier_support_system_api_contract.md

## وصف الملف: s2_supplier_support_system_api_contract.md

تتناول هذه الوثيقة عقد واجهة برمجة التطبيقات (API) الخاص بنظام إدارة تذاكر الدعم الفني. تعتبر هذه الوثيقة المرجع الملزم الوحيد للتواقيع، حيث تُعتبر أي تعارض مع ملفات أخرى غير صحيحة.

### الأنواع (Types):
- **Patient:** يمثل معلومات المريض.
  - `id: UUID`
  - `name: string`
  - `email: string`
  
- **User:** يمثل معلومات المستخدم.
  - `id: String`
  - `role: String`
  - `name: String`
  - `email: string`
  
- **SupportTicket:** يمثل تفاصيل تذكرة الدعم.
  - `id: String`
  - `studentId: String`
  - `issueDescription: String`
  - `status: String`
  - `createdAt: Date`

### العقود (Contracts):
- **C-1: submitTicket**
  - **التوقيع:** `submitTicket(userId: String, issueDescription: String) → { success: boolean, message: string }`
  - **الطبقة:** Logic
  - **حالات الفشل:** ترد بخطأ إذا كانت التذكرة تحتوي على نص فارغ مع رسالة "وصف المشكلة مطلوب."
  - **مثال استدعاء:** 
    ```plaintext
    submitTicket("user123", "مشكلتي هي...") → { success: true, message: "تم تقديم التذكرة بنجاح." }
    ```
  
- **C-2: bookSlot**
  - **التوقيع:** `bookSlot(doctor: number, slot: number, name: string) → { success: boolean, message: string }`
  - **الطبقة:** Logic
  - **حالات الفشل:** تُسبب إرجاع خطأ إذا لم يكن الطبيب متاحًا، مع الرسالة "الطبيب غير متاح."
  - **مثال استدعاء:**
    ```plaintext
    bookSlot(1, 2, "John Doe") → { success: true, message: "تم الحجز بنجاح." }
    ```

### قيود التخزين (Storage Contract):
- **المفتاح:** `id`
- **الصيغة:** JSON
- **نمط المفاتيح:** String
- **قيود التفرد:** `id`
- **عمليات القراءة/الكتابة:** القراءة عبر `id`، والكتابة عند الإضافة والتعديل.

### جدول التتبع (Traceability):
| العقد C-N | المكوّن في S2 JSON | الميزة في S1 | القاعدة HR |
|-----------|--------------------|--------------|-------------|
| C-1       | submitTicket       | تقديم التذكرة | HR-1        |
| C-2       | bookSlot           | حجز الموعد   | HR-1        |