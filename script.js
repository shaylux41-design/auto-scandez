// ========== بيانات الفحص ==========
const checklistItems = [
    { id: 'battery', label: 'البطارية سليمة (12.6V)', icon: '🔋', weight: 10 },
    { id: 'alternator', label: 'المولد يشحن بشكل صحيح', icon: '⚡', weight: 10 },
    { id: 'starter', label: 'المبدئ يدور بقوة', icon: '🔑', weight: 9 },
    { id: 'fuses', label: 'جميع الفيوزات سليمة', icon: '🔌', weight: 7 },
    { id: 'lights', label: 'الإضاءة الأمامية والخلفية', icon: '💡', weight: 6 },
    { id: 'signals', label: 'إشارات الانعطاف تعمل', icon: '🔶', weight: 5 },
    { id: 'brakelights', label: 'مصابيح الفرامل تعمل', icon: '🛑', weight: 8 },
    { id: 'windows', label: 'النوافذ الكهربائية', icon: '🪟', weight: 5 },
    { id: 'centralLock', label: 'القفل المركزي', icon: '🔐', weight: 5 },
    { id: 'wipers', label: 'المساحات والرشاش', icon: '🌧️', weight: 4 },
    { id: 'horn', label: 'المنبه يعمل', icon: '📢', weight: 3 },
    { id: 'dashboard', label: 'لوحة العدادات (بدون أضواء تحذير)', icon: '📊', weight: 7 },
    { id: 'ac', label: 'نظام التكييف والتدفئة', icon: '❄️', weight: 5 },
    { id: 'radio', label: 'المسجل والشاشة', icon: '📻', weight: 3 },
    { id: 'sensors', label: 'حساسات الرجوع للخلف', icon: '📡', weight: 4 },
    { id: 'wiring', label: 'الكابلات والتوصيلات سليمة', icon: '🔗', weight: 9 }
];

const symptoms = [
    { id: 'noStart', title: '🚫 السيارة لا تعمل نهائياً (بدون صوت)', causes: ['البطارية فارغة تماماً - افحص الجهد (يجب أن يكون 12.6V)', 'تآكل أطراف البطارية - نظفها بالفرشاة السلكية', 'عطل في المبدئ - اطرق عليه قليلاً أو استبدله', 'عطل في مفتاح التشغيل أو المرحل', 'انقطاع في كابل التأريض'], tools: 'مقياس متعدد، مصباح اختبار' },
    { id: 'clickOnly', title: '🔊 صوت "طقطقة" فقط عند التشغيل', causes: ['البطارية ضعيفة - اشحنها أو استبدلها', 'تآكل أطراف البطارية أو الكابلات', 'تلف في مرحل المبدئ (Starter Solenoid)', 'تلف فرش المبدئ', 'انخفاض الجهد في الكابل الموجب'], tools: 'مقياس متعدد لقياس انخفاض الجهد' },
    { id: 'weakStart', title: '🐢 السيارة تعمل بصعوبة (بطيئة)', causes: ['البطارية على وشك النفاد', 'المولد لا يشحن بشكل كافٍ', 'تسرب كهربائي (Parasitic Draw)', 'تآكل في كابلات التأريض', 'مشكلة في نظام الوقود (ليس كهربائي)'], tools: 'مقياس متعدد، قارئ OBD-II' },
    { id: 'batteryDrain', title: '🔋 البطارية تنفد بسرعة (بعد ليلة واحدة)', causes: ['تسرب كهربائي (Parasitic Draw) - أكثر من 50mA', 'مصباح داخلي يبقى مضاءً', 'عطل في المولد (ديود تالف)', 'مرحل ملتصق يستهلك كهرباء', 'بطارية قديمة تحتاج استبدال (أكثر من 3-5 سنوات)'], tools: 'مقياس متعدد لقياس التسرب' },
    { id: 'lightsDim', title: '💡 الأنوار خافتة أو تضعف', causes: ['المولد لا يشحن - افحص جهد الشحن (13.5-14.7V)', 'البطارية ضعيفة', 'تأريض سيء للمصابيح', 'تآكل في أسلاك الإضاءة', 'مقاومة عالية في المفتاح'], tools: 'مقياس متعدد' },
    { id: 'windowsNotWork', title: '🪟 النوافذ الكهربائية لا تعمل', causes: ['الفيوز محترق - افحص صندوق الفيوزات', 'سلك الباب مقطوع (شائع جداً في مفصل الباب)', 'محرك النافذة تالف', 'مفتاح النافذة معطل', 'مرحل النافذة تالف'], tools: 'مقياس متعدد، مصباح اختبار' },
    { id: 'blinkingLights', title: '✨ الأضواء تومض بشكل غريب', causes: ['تأريض سيء في تلك الدائرة', 'مرحل الإشارة تالف', 'مقاومة عالية في الأسلاك', 'مشكلة في الوحدة الإلكترونية (BCM)', 'مصابيح LED غير متوافقة'], tools: 'مقياس متعدد، قارئ OBD-II' },
    { id: 'warningLights', title: '⚠️ أضواء تحذير على لوحة العدادات', causes: ['اقرأ الأكواد بقارئ OBD-II أولاً', 'قد تكون مشكلة في حساس أو مستشعر', 'قد تكون مشكلة في نظام الشحن', 'قد تكون مشكلة في وحدة التحكم (ECU)', 'قد تكون مشكلة في نظام ABS أو الوسائد الهوائية'], tools: 'قارئ OBD-II ضروري' },
    { id: 'burningSmell', title: '🔥 رائحة احتراق كهربائي', causes: ['🚨 توقف فوراً - خطر حريق!', 'افحص الفيوزات المحترقة', 'افحص الأسلاك المكشوفة', 'افحص المرحلات الملتصقة', 'افحص المولد - قد يكون هناك احتراق داخلي'], tools: 'افحص بصرياً، مقياس متعدد' },
    { id: 'fusesBurn', title: '🔌 الفيوزات تحترق باستمرار', causes: ['دائرة قصر (Short Circuit) في تلك الدائرة', 'جهاز يسحب تياراً أكثر من المسموح', 'سلك مكشوف يلامس الهيكل', 'توصيل قطبية معكوسة', 'مشكلة في الوحدة الإلكترونية'], tools: 'مقياس متعدد لقياس المقاومة' }
];

// ========== بناء قائمة الفحص ==========
function buildChecklist() {
    const container = document.getElementById('checklist');
    if (!container) return;
    container.innerHTML = checklistItems.map(item => `
        <label class="check-item" for="${item.id}">
            <span>${item.icon} ${item.label}</span>
            <input type="checkbox" id="${item.id}">
        </label>
    `).join('');
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', (e) => {
            e.target.closest('.check-item').classList.toggle('checked', e.target.checked);
        });
    });
}

// ========== بناء قائمة الأعراض ==========
function buildSymptoms() {
    const container = document.getElementById('symptomsList');
    if (!container) return;
    container.innerHTML = symptoms.map(s => `
        <button class="symptom-btn" data-id="${s.id}">${s.title}</button>
    `).join('');
    container.querySelectorAll('.symptom-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.symptom-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showSymptom(btn.dataset.id);
        });
    });
}

function showSymptom(id) {
    const s = symptoms.find(x => x.id === id);
    if (!s) return;
    const div = document.getElementById('symptomResult');
    div.innerHTML = `
        <h3 style="color:#0f2027; margin-bottom: 15px;">${s.title}</h3>
        <div class="advice-box">
            <strong>🔍 الأسباب المحتملة:</strong>
            <ul>${s.causes.map(c => `<li>${c}</li>`).join('')}</ul>
        </div>
        <div class="advice-box good">
            <strong>🛠️ الأدوات المطلوبة:</strong> ${s.tools}
        </div>
    `;
    div.classList.add('show');
}

// ========== تحليل النتيجة ==========
function analyze() {
    const carModel = document.getElementById('carModel').value.trim() || 'غير محدد';
    const carPlate = document.getElementById('carPlate').value.trim() || 'غير محدد';
    const notes = document.getElementById('notes').value.trim();
    const batteryV = parseFloat(document.getElementById('batteryResting').value);
    const chargingV = parseFloat(document.getElementById('chargingVoltage').value);
    const parasitic = parseFloat(document.getElementById('parasiticDraw').value);

    let totalWeight = 0, earnedWeight = 0;
    const passed = [], failed = [];

    checklistItems.forEach(item => {
        totalWeight += item.weight;
        if (document.getElementById(item.id).checked) {
            earnedWeight += item.weight;
            passed.push(item);
        } else {
            failed.push(item);
        }
    });

    const score = Math.round((earnedWeight / totalWeight) * 100);

    const readings = [];
    if (!isNaN(batteryV)) {
        if (batteryV >= 12.6) readings.push(`✅ جهد البطارية (${batteryV}V) - ممتاز`);
        else if (batteryV >= 12.4) readings.push(`⚠️ جهد البطارية (${batteryV}V) - يحتاج شحن`);
        else readings.push(`❌ جهد البطارية (${batteryV}V) - ضعيفة جداً!`);
    }
    if (!isNaN(chargingV)) {
        if (chargingV >= 13.5 && chargingV <= 14.7) readings.push(`✅ جهد الشحن (${chargingV}V) - المولد يعمل بشكل ممتاز`);
        else if (chargingV < 13.5) readings.push(`❌ جهد الشحن (${chargingV}V) - المولد لا يشحن!`);
        else readings.push(`⚠️ جهد الشحن (${chargingV}V) - مرتفع، افحص المنظم`);
    }
    if (!isNaN(parasitic)) {
        if (parasitic < 50) readings.push(`✅ تيار التسرب (${parasitic}mA) - طبيعي`);
        else if (parasitic < 100) readings.push(`⚠️ تيار التسرب (${parasitic}mA) - مرتفع قليلاً`);
        else readings.push(`❌ تيار التسرب (${parasitic}mA) - هناك تسرب خطير!`);
    }

    let scoreClass, scoreText, adviceClass;
    if (score >= 80) { scoreClass = 'score-excellent'; scoreText = 'ممتازة ✅'; adviceClass = 'good'; }
    else if (score >= 50) { scoreClass = 'score-good'; scoreText = 'تحتاج صيانة ⚠️'; adviceClass = ''; }
    else { scoreClass = 'score-poor'; scoreText = 'خطيرة جداً 🚨'; adviceClass = 'danger'; }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3 style="text-align:center; color: #0f2027; margin-bottom: 15px;">📊 تقرير الفحص الكهربائي</h3>
        <div class="score-circle ${scoreClass}">${score}%</div>
        <p style="text-align:center; font-size: 1.3em; font-weight: bold; margin-bottom: 20px;">${scoreText}</p>
        <div class="stats">
            <div class="stat-box"><div class="number">✅ ${passed.length}</div><div class="label">مكونات سليمة</div></div>
            <div class="stat-box"><div class="number">❌ ${failed.length}</div><div class="label">تحتاج فحص</div></div>
            <div class="stat-box"><div class="number">${score}%</div><div class="label">التقييم العام</div></div>
        </div>
        ${readings.length > 0 ? `<div class="advice-box" style="margin-top: 20px;"><strong>📊 تحليل القراءات:</strong><ul>${readings.map(r => `<li>${r}</li>`).join('')}</ul></div>` : ''}
        ${failed.length > 0 ? `<div class="advice-box ${adviceClass}"><strong>⚠️ الأجزاء التي تحتاج اهتمام:</strong><ul>${failed.map(f => `<li>${f.icon} ${f.label}</li>`).join('')}</ul></div>` : `<div class="advice-box good"><strong>🎉 ممتاز! النظام الكهربائي بحالة جيدة جداً.</strong></div>`}
        <p style="margin-top: 15px; color: #666; text-align: center; font-style: italic;">
            ${score >= 80 ? '💡 استمر في الصيانة الدورية' : score >= 50 ? '💡 يُنصح بزيارة ورشة كهرباء السيارات قريباً' : '💡 🚨 يُنصح بعدم قيادة السيارة!'}
        </p>
    `;
    resultDiv.classList.add('show');

    const record = { id: Date.now(), date: new Date().toLocaleString('ar-EG'), carModel, carPlate, notes, score, passed: passed.length, failed: failed.length };
    const history = JSON.parse(localStorage.getItem('carHistory') || '[]');
    history.unshift(record);
    localStorage.setItem('carHistory', JSON.stringify(history.slice(0, 50)));
    renderHistory();
    updateHomeStats();
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== السجل ==========
function renderHistory() {
    const history = JSON.parse(localStorage.getItem('carHistory') || '[]');
    const container = document.getElementById('historyList');
    if (!container) return;
    if (history.length === 0) {
        container.innerHTML = `<div class="empty-state"><div class="icon">📭</div><p>لا توجد فحوصات سابقة</p></div>`;
        return;
    }
    container.innerHTML = history.map(item => {
        const color = item.score >= 80 ? '#28a745' : item.score >= 50 ? '#ffc107' : '#dc3545';
        return `<div class="history-item" style="border-right-color: ${color};">
            <div>
                <strong>🚗 ${item.carModel}</strong>
                <div class="date">🔢 ${item.carPlate} | 📅 ${item.date}</div>
                ${item.notes ? `<div class="date">📝 ${item.notes}</div>` : ''}
            </div>
            <div style="text-align: center;">
                <div style="font-size: 1.5em; font-weight: bold; color: ${color};">${item.score}%</div>
                <div class="date">${item.passed}✅ / ${item.failed}❌</div>
            </div>
        </div>`;
    }).join('');
}

function clearHistory() {
    if (confirm('هل أنت متأكد من حذف جميع السجلات؟')) {
        localStorage.removeItem('carHistory');
        renderHistory();
        updateHomeStats();
    }
}

function updateHomeStats() {
    const history = JSON.parse(localStorage.getItem('carHistory') || '[]');
    const container = document.getElementById('homeStats');
    if (!container) return;
    if (history.length === 0) {
        container.innerHTML = `
            <div class="stat-box"><div class="number">0</div><div class="label">عدد الفحوصات</div></div>
            <div class="stat-box"><div class="number">-</div><div class="label">متوسط الحالة</div></div>`;
        return;
    }
    const avg = Math.round(history.reduce((s, h) => s + h.score, 0) / history.length);
    const best = Math.max(...history.map(h => h.score));
    container.innerHTML = `
        <div class="stat-box"><div class="number">${history.length}</div><div class="label">عدد الفحوصات</div></div>
        <div class="stat-box"><div class="number">${avg}%</div><div class="label">متوسط الحالة</div></div>
        <div class="stat-box"><div class="number">${best}%</div><div class="label">أفضل نتيجة</div></div>`;
}

// ========== التنقل ==========
function showTab(tabName, btn) {
    document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const tab = document.getElementById(tabName);
    if (tab) tab.classList.add('active');
    if (btn) btn.classList.add('active');
    if (tabName === 'history') renderHistory();
    if (tabName === 'home') updateHomeStats();
}

// ========== التهيئة ==========
document.addEventListener('DOMContentLoaded', () => {
    buildChecklist();
    buildSymptoms();
    renderHistory();
    updateHomeStats();
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => showTab(btn.dataset.tab, btn));
    });
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) analyzeBtn.addEventListener('click', analyze);
    const clearBtn = document.getElementById('clearHistoryBtn');
    if (clearBtn) clearBtn.addEventListener('click', clearHistory);
});
