# API Contract: نظام إدارة تذاكر الدعم الفني
> المرجع الملزم الوحيد للتواقيع. أي تعارض بين ملف آخر وهذا الملف — هذا الملف يفوز.

## الأنواع (Types)
Patient { id: UUID, name: string, email: string }
User { id: String, role: String, name: String, email: string }
SupportTicket { id: String, studentId: String, issueDescription: String, status: String, createdAt: Date }

## العقود (Contracts)
### C-1: submitTicket
- **التوقيع:** `submitTicket(userId: String, issueDescription: String) → { success: boolean, message: string }`
- **الطبقة:** Logic
- **القاعدة الصارمة المرتبطة:** HR-1
- **حالات الفشل:** يجعل الرجوع بخطأ إذا كانت التذكرة تحتوي على نص فارغ، مع رسالة "وصف المشكلة مطلوب."
- **مثال استدعاء:** `submitTicket("user123", "مشكلتي هي...") → { success: true, message: "تم تقديم التذكرة بنجاح." }`

### C-2: bookSlot
- **التوقيع:** `bookSlot(doctor: number, slot: number, name: string) → { success: boolean, message: string }`
- **الطبقة:** Logic
- **القاعدة الصارمة المرتبطة:** HR-1
- **حالات الفشل:** يسبب إرجاع خطأ إذا لم يكن الطبيب متاحًا، مع رسالة "الطبيب غير متاح."
- **مثال استدعاء:** `bookSlot(1, 2, "John Doe") → { success: true, message: "تم الحجز بنجاح." }`

## قيود التخزين (Storage Contract)
- المفتاح: id
- الصيغة: JSON
- نمط المفاتيح: String
- قيود التفرد: id
- عمليات القراءة/الكتابة: القراءة عبر id، الكتابة عند الإضافة والتعديل.

## جدول التتبع (Traceability)
| العقد C-N | المكوّن في S2 JSON | الميزة في S1 | القاعدة HR |
|-----------|--------------------|--------------|-------------|
| C-1       | submitTicket       | تقديم التذكرة | HR-1        |
| C-2       | bookSlot           | حجز الموعد   | HR-1        |