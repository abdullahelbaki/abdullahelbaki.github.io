/* =========================================================================
1. FULL PERSISTENT DATABASE (IndexedDB)
   ========================================================================= */
const DB_NAME = 'AbdullahelBakiCMS_DB_v4';
const DB_VERSION = 4;
let db;
let isOwner = sessionStorage.getItem('baki_owner_logged_in') === 'true';

// Auto-generated SVG thumbnail for Hostel Management System (hms.png fallback)
const hmsGeneratedThumbnail = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="420" viewBox="0 0 700 420">
  <rect width="700" height="420" fill="#0f172a"/>
  <rect x="28" y="28" width="644" height="364" rx="10" fill="#1e293b" stroke="#334155" stroke-width="2"/>
  <circle cx="54" cy="52" r="7" fill="#ef4444"/>
  <circle cx="76" cy="52" r="7" fill="#f59e0b"/>
  <circle cx="98" cy="52" r="7" fill="#10b981"/>
  <text x="130" y="57" fill="#94a3b8" font-family="monospace" font-size="14">bash — hostel_management_system.exe (C / Data Structures)</text>
  <line x1="28" y1="74" x2="672" y2="74" stroke="#334155" stroke-width="1.5"/>
  <text x="52" y="112" fill="#38bdf8" font-family="monospace" font-size="16" font-weight="bold">==========================================================</text>
  <text x="52" y="138" fill="#f8fafc" font-family="monospace" font-size="18" font-weight="bold">   HOSTEL MANAGEMENT SYSTEM — TERMINAL CLI APPLICATION</text>
  <text x="52" y="164" fill="#38bdf8" font-family="monospace" font-size="16" font-weight="bold">==========================================================</text>
  <text x="52" y="204" fill="#34d399" font-family="monospace" font-size="15">[1] Register New Student Record (Linked List / File I/O)</text>
  <text x="52" y="232" fill="#34d399" font-family="monospace" font-size="15">[2] Allocate &amp; Search Dormitory Room Capacity</text>
  <text x="52" y="260" fill="#34d399" font-family="monospace" font-size="15">[3] Update Seat Status &amp; Student Fee Ledger</text>
  <text x="52" y="288" fill="#34d399" font-family="monospace" font-size="15">[4] Generate Hall Occupancy Report</text>
  <text x="52" y="334" fill="#fbbf24" font-family="monospace" font-size="15">root@abdullahel-baki:~$ ./hms_cli --mode=production _</text>
</svg>
`);

const defaultProjects = [
    {
        id: 4,
        title: "DOCDESK | DOCTOR SERIAL & BOOKING PLATFORM",
        date: "April 2026",
        tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "MySQL"],
        desc: "A comprehensive doctor serial booking platform where doctors and hospitals publish schedules, and patients search via multiple filters, purchase appointments, and track complete booking history.",
        link: "#",
        alertMsg: "সাইটটি লোকাল হোস্টে চলছে । খুব শীঘ্রই পাবলিক হবে ।",
        image: "projects/docdesk.png"
    },
    {
        id: 3,
        title: "FIREY PAWA | AI-BASED LOST & FOUND PLATFORM",
        date: "April 2026",
        tech: ["Computer Vision", "NLP", "Node.js", "Firebase", "Tailwind CSS"],
        desc: "An AI-powered lost and found matching system featuring automated image tagging, smart text matchmaking, geo-fencing alerts, PII privacy masking, and user trust scores.",
        link: "#",
        alertMsg: "সাইটটি লোকাল হোস্টে চলছে । খুব শীগ্রই পাবলিক হবে ।",
        image: "projects/fireepawa.png"
    },
    {
        id: 2,
        title: "THE MEDIERA | DOCTOR DISCOVERY & APPOINTMENT PLATFORM",
        date: "October 2026",
        tech: ["HTML", "Tailwind CSS", "JavaScript", "Express.js", "MySQL", "SSLCommerz"],
        desc: "A modern healthtech platform enabling geo-location based doctor discovery, instant appointment serial booking, QR-verified digital prescriptions, and automated payment settlements.",
        link: "#",
        alertMsg: "সাইটটি লোকাল হোস্টে চলছে । খুব শীঘ্রই পাবলিক হবে ।",
        image: "projects/themediera.png"
    },
    {
        id: 1,
        title: "HOSTEL MANAGEMENT SYSTEM | C & DATA STRUCTURES",
        date: "September 2025",
        tech: ["C Programming", "Data Structures", "File Handling", "CLI"],
        desc: "A modular terminal-based student record and dormitory room allocation system built in C using linked lists, structures, and persistent binary/text file storage.",
        link: "#",
        alertMsg: "এটি একটি টার্মিনাল বেইজড প্রোজেক্ট ।",
        image: hmsGeneratedThumbnail
    }
];

const defaultSkillsAndActivities = [
    {
        id: 101,
        type: "skill",
        title: "Programming Languages",
        subtitle: "Core Foundations & Problem Solving",
        desc: "C, Java, JavaScript (ES6+), SQL, HTML5, CSS3"
    },
    {
        id: 102,
        type: "skill",
        title: "Full-Stack Web Development",
        subtitle: "End-to-End Frontend & Backend Engineering",
        desc: "Node.js, Express.js, Spring Boot (Learning), REST APIs, EJS, Tailwind CSS"
    },
    {
        id: 103,
        type: "skill",
        title: "Databases & Cloud Services",
        subtitle: "Storage & Authentication",
        desc: "MySQL, SQLite, Firebase Firestore, Firebase Auth, Netlify"
    },
    {
        id: 104,
        type: "skill",
        title: "Tools, Platforms & Design",
        subtitle: "Development Workflow & UI Prototyping",
        desc: "Git & GitHub, VS Code, IntelliJ IDEA, Android Studio, Linux VPS, draw.io, Canva"
    },
    {
        id: 201,
        type: "leadership",
        title: "Class Representative (CR) — Batch 44, Section H",
        subtitle: "Department of Software Engineering, Daffodil International University | 2024 – Present",
        desc: "Coordinating academic schedules, managing presentation and exam logistics for the cohort, and acting as the primary communication bridge between faculty members and students."
    },
    {
        id: 202,
        type: "leadership",
        title: "Senior Executive — Program Organization Wing",
        subtitle: "Software Engineering Club, Daffodil International University | 2025 – Present",
        desc: "Planning, organizing, and managing stage design, logistics, and execution for university-wide tech events, workshops, and programming contests."
    },
    {
        id: 203,
        type: "leadership",
        title: "Competitive Programming & Algorithmic Problem Solving",
        subtitle: "Data Structures & Algorithms | Continuous",
        desc: "Actively solving algorithmic challenges in C and Java focusing on dynamic programming, graph theory, greedy algorithms, and time-complexity optimization."
    }
];

const defaultLifeMoments = [
    {
        id: 301,
        title: "Chess & University Tournament (4th Place)",
        desc: "Passionate chess player and opening theorist; secured 4th place in the university chess competition.",
        fullStory: "Chess has always been my favorite mental sport outside of vibe coding and full-stack development. I actively study classical and tactical lines—including the King's Pawn (1. e4), Sicilian Defence, Queen's Pawn (1. d4), and the Englund Gambit. Competing in the Daffodil International University chess tournament was an unforgettable experience where focus, patience, and endgame calculation helped me finish 4th overall among strong university contenders.",
        image: "Travel/jinnurchess.jpeg",
        images: ["Travel/jinnurchess.jpeg"]
    },
    {
        id: 302,
        title: "21K Half Marathon Finisher (2025)",
        desc: "Completed a grueling 21-kilometer half marathon in 2025, testing endurance, grit, and mental discipline.",
        fullStory: "Running a 21-kilometer half marathon in 2025 was one of the toughest and most rewarding physical milestones of my life. Crossing the 21K finish line taught me that endurance—much like debugging a complex full-stack application—comes down to pacing yourself, staying mentally resilient through fatigue, and never stopping until the goal is reached.",
        image: "Travel/jinnurmerathon.jpeg",
        images: ["Travel/jinnurmerathon.jpeg"]
    },
    {
        id: 303,
        title: "Vlogging, Book Reviews & Badhyabhumi 71 Documentary",
        desc: "Created book review videos and led the script & production of a 10-minute documentary on Badhyabhumi 71 in Sreemangal.",
        fullStory: "Beyond writing code, I love visual storytelling. I regularly review insightful books and share my takeaways with viewers. One of my proudest creative projects was leading the scripting, direction, and production of a 10-minute documentary on Badhyabhumi 71 (the Martyr's Memorial in Sreemangal), preserving historical stories through researched narration and on-location cinematography.",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=80",
        images: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=80"]
    },
    {
        id: 304,
        title: "Exploring Nature & Travel — Tanguar Haor",
        desc: "Unwinding across the vast wetland waters of Tanguar Haor, Sunamganj—boat journeys, misty hills, and golden sunsets.",
        fullStory: "Traveling helps me recharge and find fresh perspective away from screens. Exploring Tanguar Haor in Sunamganj was pure magic—drifting across crystal-clear haor waters on a traditional wooden boat, watching the Meghalaya hills rise across the horizon, and experiencing tranquil starlit nights on the water with friends.",
        image: "Travel/t1.jpeg",
        images: [
            "Travel/t1.jpeg",
            "Travel/t2.jpeg",
            "Travel/t3.jpeg",
            "Travel/t4.jpeg"
        ]
    }
];

const defaultSkills = [
    "C Programming", "Java", "JavaScript (ES6+)", "SQL & MySQL",
    "Node.js & Express", "HTML5 & Tailwind CSS", "Firebase Firestore",
    "Data Structures & Algorithms", "Full-Stack Architecture", "Git & GitHub"
];

const defaultLinks = {
    email: "abdullahelbaki000@gmail.com",
    github: "https://github.com/rjinnur",
    linkedin: "https://www.linkedin.com/in/abdullahel-baki-5ab5a625a/",
    facebook: "https://www.facebook.com/jinnur.rohman.7",
    instagram: "https://www.instagram.com/jinnur.rohman/",
    threads: "https://www.threads.com/@jinnur.rohman",
    twitter: "https://x.com/Abdullahel13294"
};

const defaultPhrases = [
    "a Vibe Coder with a knack for building Software.",
    "a Full-Stack Developer crafting end-to-end web solutions.",
    "turning complex ideas into impactful digital products."
];

function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            if (!database.objectStoreNames.contains('settings')) {
                database.createObjectStore('settings', { keyPath: 'key' });
            }
            if (!database.objectStoreNames.contains('texts')) {
                database.createObjectStore('texts', { keyPath: 'key' });
            }
            if (!database.objectStoreNames.contains('projects')) {
                database.createObjectStore('projects', { keyPath: 'id' });
            }
            if (!database.objectStoreNames.contains('skillsActivities')) {
                database.createObjectStore('skillsActivities', { keyPath: 'id' });
            }
            if (!database.objectStoreNames.contains('life')) {
                database.createObjectStore('life', { keyPath: 'id' });
            }
        };

        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };
        request.onerror = (e) => reject(e);
    });
}

function getAllFromStore(storeName) {
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).getAll();
        req.onsuccess = () => resolve(req.result);
    });
}

function getFromStore(storeName, key) {
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, 'readonly');
        const req = tx.objectStore(storeName).get(key);
        req.onsuccess = () => resolve(req.result || null);
    });
}

function putInStore(storeName, item) {
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(item);
        tx.oncomplete = () => resolve();
    });
}

function deleteFromStore(storeName, key) {
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
        tx.oncomplete = () => resolve();
    });
}

async function getSetting(key, fallback = null) {
    const res = await getFromStore('settings', key);
    return res ? res.value : fallback;
}

async function saveSetting(key, value) {
    return putInStore('settings', { key, value });
}

/* =========================================================================
2. OWNER AUTHENTICATION & INLINE CMS ENGINE
   ========================================================================= */
function applyOwnerModeUI() {
    if (isOwner) {
        document.body.classList.add('is-owner');
        document.querySelectorAll('[data-editable]').forEach(el => {
            el.setAttribute('contenteditable', 'true');
        });
    } else {
        document.body.classList.remove('is-owner');
        document.querySelectorAll('[data-editable]').forEach(el => {
            el.removeAttribute('contenteditable');
        });
    }
    loadAndRenderProjects();
    loadAndRenderSkillsActivities();
    loadAndRenderLife();
    loadAndRenderSkills();
}

function bindInlineTextEditors() {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.getAttribute('data-editable');
        el.addEventListener('blur', async () => {
            if (!isOwner) return;
            await putInStore('texts', { key, html: el.innerHTML });
        });
    });
}

async function loadSavedTexts() {
    const allTexts = await getAllFromStore('texts');
    allTexts.forEach(item => {
        const el = document.querySelector(`[data-editable="${item.key}"]`);
        if (el) el.innerHTML = item.html;
    });
}

document.getElementById('secretOwnerTrigger').addEventListener('click', (e) => {
    e.preventDefault();
    if (isOwner) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    document.getElementById('authErrorMsg').classList.add('hidden');
    document.getElementById('ownerAuthForm').reset();
    document.getElementById('authModal').classList.remove('hidden');
});

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

document.getElementById('ownerAuthForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const c1 = document.getElementById('authCode1').value.trim();
    const c2 = document.getElementById('authCode2').value.trim();

    const savedCodes = await getSetting('ownerPasscodes', { code1: 'baki2026', code2: 'admin77' });

    if (c1 === savedCodes.code1 && c2 === savedCodes.code2) {
        isOwner = true;
        sessionStorage.setItem('baki_owner_logged_in', 'true');
        closeAuthModal();
        applyOwnerModeUI();
    } else {
        document.getElementById('authErrorMsg').classList.remove('hidden');
    }
});

function logoutOwner() {
    isOwner = false;
    sessionStorage.removeItem('baki_owner_logged_in');
    applyOwnerModeUI();
}

async function openPasscodeModal() {
    const savedCodes = await getSetting('ownerPasscodes', { code1: 'baki2026', code2: 'admin77' });
    document.getElementById('newPass1').value = savedCodes.code1;
    document.getElementById('newPass2').value = savedCodes.code2;
    document.getElementById('passcodeModal').classList.remove('hidden');
}

function closePasscodeModal() {
    document.getElementById('passcodeModal').classList.add('hidden');
}

document.getElementById('passcodeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code1 = document.getElementById('newPass1').value.trim();
    const code2 = document.getElementById('newPass2').value.trim();
    await saveSetting('ownerPasscodes', { code1, code2 });
    closePasscodeModal();
    alert('Owner security codes updated in Database!');
});

/* =========================================================================
3. MULTI-PAGE TAB ROUTING
   ========================================================================= */
function switchTab(targetId) {
    document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active-tab'));
    document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));

    const targetSec = document.getElementById(targetId) || document.getElementById('home');
    targetSec.classList.add('active-tab');

    const activeLink = document.querySelector(`.nav-item[data-target="${targetSec.id}"]`);
    if (activeLink) activeLink.classList.add('active');

    if (history.pushState) {
        history.pushState(null, null, `#${targetSec.id}`);
    } else {
        location.hash = `#${targetSec.id}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(link.getAttribute('data-target'));
    });
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) switchTab(hash);
});

/* =========================================================================
4. LINKS & SOCIAL MEDIA CRUD
   ========================================================================= */
async function loadAndRenderLinks() {
    let links = await getSetting('socialLinks', null);
    if (!links) {
        await saveSetting('socialLinks', defaultLinks);
        links = defaultLinks;
    }

    const quickHTML = `
        <a href="mailto:${links.email}" title="Email"><i class="fa-regular fa-envelope"></i></a>
        <a href="${links.github}" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i></a>
        <a href="${links.linkedin}" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
    `;
    document.getElementById('quickSocialContainer').innerHTML = quickHTML;
    document.getElementById('footerSocialContainer').innerHTML = quickHTML;

    document.getElementById('aboutSocialGrid').innerHTML = `
        <a href="${links.facebook}" target="_blank" class="social-card fb"><i class="fa-brands fa-facebook-f"></i> <span>Facebook</span></a>
        <a href="${links.instagram}" target="_blank" class="social-card ig"><i class="fa-brands fa-instagram"></i> <span>Instagram</span></a>
        <a href="${links.github}" target="_blank" class="social-card gh"><i class="fa-brands fa-github"></i> <span>GitHub</span></a>
        <a href="${links.threads}" target="_blank" class="social-card th"><i class="fa-brands fa-threads"></i> <span>Threads</span></a>
        <a href="${links.twitter}" target="_blank" class="social-card tw"><i class="fa-brands fa-x-twitter"></i> <span>X (Twitter)</span></a>
        <a href="${links.linkedin}" target="_blank" class="social-card in"><i class="fa-brands fa-linkedin-in"></i> <span>LinkedIn</span></a>
        <a href="mailto:${links.email}" class="social-card em"><i class="fa-regular fa-envelope"></i> <span>Email</span></a>
    `;
}

async function openLinksModal() {
    const links = await getSetting('socialLinks', defaultLinks);
    document.getElementById('linkEmail').value = links.email;
    document.getElementById('linkGithub').value = links.github;
    document.getElementById('linkLinkedin').value = links.linkedin;
    document.getElementById('linkFacebook').value = links.facebook;
    document.getElementById('linkInstagram').value = links.instagram;
    document.getElementById('linkThreads').value = links.threads;
    document.getElementById('linkTwitter').value = links.twitter;
    document.getElementById('linksModal').classList.remove('hidden');
}

function closeLinksModal() {
    document.getElementById('linksModal').classList.add('hidden');
}

document.getElementById('linksManagerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const updated = {
        email: document.getElementById('linkEmail').value.trim(),
        github: document.getElementById('linkGithub').value.trim(),
        linkedin: document.getElementById('linkLinkedin').value.trim(),
        facebook: document.getElementById('linkFacebook').value.trim(),
        instagram: document.getElementById('linkInstagram').value.trim(),
        threads: document.getElementById('linkThreads').value.trim(),
        twitter: document.getElementById('linkTwitter').value.trim()
    };
    await saveSetting('socialLinks', updated);
    await loadAndRenderLinks();
    closeLinksModal();
});

/* =========================================================================
5. PROJECTS CRUD & CLICKABLE IMAGE ALERTS
   ========================================================================= */
function handleProjectClick(e, link, alertMsg) {
    if (alertMsg && alertMsg.trim() !== '') {
        e.preventDefault();
        alert(alertMsg);
        return false;
    }
    if (!link || link === '#') {
        e.preventDefault();
        return false;
    }
    return true;
}

async function loadAndRenderProjects() {
    let projects = await getAllFromStore('projects');
    const initialized = await getSetting('projects_initialized', false);
    if (projects.length === 0 && !initialized) {
        for (const p of defaultProjects) await putInStore('projects', p);
        await saveSetting('projects_initialized', true);
        projects = defaultProjects;
    }
    projects.sort((a, b) => b.id - a.id);

    const createCardHTML = (proj) => {
        const tags = proj.tech.map(t => `<span>${t.trim()}</span>`).join('');
        const safeAlert = (proj.alertMsg || '').replace(/'/g, "\\'");
        const safeLink = (proj.link || '#').replace(/'/g, "\\'");
        const targetAttr = (!proj.alertMsg && proj.link && proj.link !== '#') ? 'target="_blank"' : '';

        const ownerControls = isOwner ? `
            <div class="owner-card-actions">
                <button class="edit-item-btn" onclick="editProject(${proj.id})"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="delete-item-btn" onclick="removeProject(${proj.id})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
        ` : '';

        return `
            <div class="project-card">
                <a href="${proj.link || '#'}" ${targetAttr} onclick="return handleProjectClick(event, '${safeLink}', '${safeAlert}')" class="project-thumb-wrap" title="Click to open ${proj.title}">
                    <img src="${proj.image}" alt="${proj.title}" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80'">
                </a>
                <a href="${proj.link || '#'}" ${targetAttr} onclick="return handleProjectClick(event, '${safeLink}', '${safeAlert}')" class="project-title-link">${proj.title}</a>
                <div class="project-date">${proj.date}</div>
                <p class="project-desc">${proj.desc}</p>
                <div class="project-tech">${tags}</div>
                ${ownerControls}
            </div>
        `;
    };

    const homeFeatured = document.getElementById('homeFeaturedProjects');
    if (homeFeatured) homeFeatured.innerHTML = projects.slice(0, 3).map(createCardHTML).join('');

    const allGrid = document.getElementById('projectsGrid');
    if (allGrid) allGrid.innerHTML = projects.map(createCardHTML).join('');
}

function openProjectForm() {
    document.getElementById('projectForm').reset();
    document.getElementById('projEditId').value = '';
    document.getElementById('projFormModalTitle').textContent = 'Add a New Project';
    document.getElementById('addProjectFormContainer').classList.remove('hidden');
}

function closeProjectForm() {
    document.getElementById('addProjectFormContainer').classList.add('hidden');
}

async function editProject(id) {
    const proj = await getFromStore('projects', id);
    if (!proj) return;
    switchTab('projects');
    document.getElementById('projEditId').value = proj.id;
    document.getElementById('projTitle').value = proj.title;
    document.getElementById('projDate').value = proj.date;
    document.getElementById('projTech').value = proj.tech.join(', ');
    document.getElementById('projDesc').value = proj.desc;
    document.getElementById('projLink').value = proj.link;
    document.getElementById('projAlertMsg').value = proj.alertMsg || '';
    document.getElementById('projFormModalTitle').textContent = 'Edit Project';
    document.getElementById('addProjectFormContainer').classList.remove('hidden');
}

async function removeProject(id) {
    if (!confirm('Delete this project permanently from Database?')) return;
    await deleteFromStore('projects', id);
    loadAndRenderProjects();
}

document.getElementById('projectForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('projEditId').value;
    const fileInput = document.getElementById('projImageFile');

    let imgData = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80";
    if (editId) {
        const existing = await getFromStore('projects', Number(editId));
        if (existing) imgData = existing.image;
    }
    if (fileInput.files && fileInput.files[0]) {
        imgData = await fileToDataURL(fileInput.files[0]);
    }

    const projObj = {
        id: editId ? Number(editId) : Date.now(),
        title: document.getElementById('projTitle').value.trim(),
        date: document.getElementById('projDate').value.trim(),
        tech: document.getElementById('projTech').value.split(','),
        desc: document.getElementById('projDesc').value.trim(),
        link: document.getElementById('projLink').value.trim() || '#',
        alertMsg: document.getElementById('projAlertMsg').value.trim(),
        image: imgData
    };

    await putInStore('projects', projObj);
    await loadAndRenderProjects();
    closeProjectForm();
});

/* =========================================================================
6. SKILLS & ACTIVITIES CRUD
   ========================================================================= */
async function loadAndRenderSkillsActivities() {
    let list = await getAllFromStore('skillsActivities');
    const initialized = await getSetting('sa_initialized', false);
    if (list.length === 0 && !initialized) {
        for (const item of defaultSkillsAndActivities) await putInStore('skillsActivities', item);
        await saveSetting('sa_initialized', true);
        list = defaultSkillsAndActivities;
    }

    const skillsList = list.filter(i => i.type === 'skill').sort((a, b) => a.id - b.id);
    const leadershipList = list.filter(i => i.type === 'leadership').sort((a, b) => a.id - b.id);

    const renderSkillCard = (item) => {
        const pills = item.desc.split(',').map(s => `<span class="sa-pill">${s.trim()}</span>`).join('');
        const ownerControls = isOwner ? `
            <div class="owner-card-actions">
                <button class="edit-item-btn" onclick="editSaItem(${item.id})"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="delete-item-btn" onclick="removeSaItem(${item.id})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
        ` : '';
        return `
            <div class="sa-card">
                <span class="sa-card-badge">TECHNICAL SKILL</span>
                <h3>${item.title}</h3>
                <div class="sa-card-sub">${item.subtitle}</div>
                <div class="sa-pill-list">${pills}</div>
                ${ownerControls}
            </div>
        `;
    };

    const renderLeadershipItem = (item) => {
        const ownerControls = isOwner ? `
            <div class="owner-card-actions">
                <button class="edit-item-btn" onclick="editSaItem(${item.id})"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="delete-item-btn" onclick="removeSaItem(${item.id})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
        ` : '';
        return `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-date">LEADERSHIP & ACTIVITY</div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <h4>${item.subtitle}</h4>
                    <p>${item.desc}</p>
                    ${ownerControls}
                </div>
            </div>
        `;
    };

    const techGrid = document.getElementById('technicalSkillsGrid');
    if (techGrid) techGrid.innerHTML = skillsList.map(renderSkillCard).join('');

    const leadTimeline = document.getElementById('leadershipTimeline');
    if (leadTimeline) leadTimeline.innerHTML = leadershipList.map(renderLeadershipItem).join('');

    // Home Preview (2 Skill Cards + 2 Leadership Cards)
    const homePreview = document.getElementById('homeSkillsActivitiesPreview');
    if (homePreview) {
        const topSkillsHTML = skillsList.slice(0, 2).map(renderSkillCard).join('');
        const topLeadHTML = leadershipList.slice(0, 2).map(item => `
            <div class="sa-card">
                <span class="sa-card-badge">LEADERSHIP & ROLE</span>
                <h3>${item.title}</h3>
                <div class="sa-card-sub">${item.subtitle}</div>
                <p style="font-size:0.88rem; color:#4b5563;">${item.desc}</p>
            </div>
        `).join('');
        homePreview.innerHTML = topSkillsHTML + topLeadHTML;
    }
}

function openSaForm() {
    document.getElementById('saForm').reset();
    document.getElementById('saEditId').value = '';
    document.getElementById('saFormModalTitle').textContent = 'Add Skill Category or Leadership Role';
    document.getElementById('addSaFormContainer').classList.remove('hidden');
}

function closeSaForm() {
    document.getElementById('addSaFormContainer').classList.add('hidden');
}

async function editSaItem(id) {
    const item = await getFromStore('skillsActivities', id);
    if (!item) return;
    switchTab('skills-activities');
    document.getElementById('saEditId').value = item.id;
    document.getElementById('saCategoryType').value = item.type;
    document.getElementById('saTitle').value = item.title;
    document.getElementById('saSubtitle').value = item.subtitle;
    document.getElementById('saDesc').value = item.desc;
    document.getElementById('saFormModalTitle').textContent = 'Edit Item';
    document.getElementById('addSaFormContainer').classList.remove('hidden');
}

async function removeSaItem(id) {
    if (!confirm('Remove this item from Database?')) return;
    await deleteFromStore('skillsActivities', id);
    loadAndRenderSkillsActivities();
}

document.getElementById('saForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('saEditId').value;
    const saObj = {
        id: editId ? Number(editId) : Date.now(),
        type: document.getElementById('saCategoryType').value,
        title: document.getElementById('saTitle').value.trim(),
        subtitle: document.getElementById('saSubtitle').value.trim(),
        desc: document.getElementById('saDesc').value.trim()
    };
    await putInStore('skillsActivities', saObj);
    await loadAndRenderSkillsActivities();
    closeSaForm();
});

/* =========================================================================
7. LIFE BEYOND CODING (INTERACTIVE STORY & MULTI-PHOTO GALLERY)
   ========================================================================= */
let activeLifeModalImages = [];
let activeLifeModalIndex = 0;

async function openLifeStoryModal(id) {
    const moment = await getFromStore('life', id);
    if (!moment) return;

    document.getElementById('lifeModalTitle').innerHTML = `<i class="fa-solid fa-compass"></i> ${moment.title}`;
    document.getElementById('lifeModalBody').textContent = moment.fullStory || moment.desc;

    activeLifeModalImages = (moment.images && moment.images.length > 0) ? moment.images : [moment.image];
    activeLifeModalIndex = 0;

    renderLifeModalGallery();
    document.getElementById('lifeStoryModal').classList.remove('hidden');
}

function renderLifeModalGallery() {
    const mainImg = document.getElementById('lifeModalMainImg');
    const prevBtn = document.getElementById('lifePrevImgBtn');
    const nextBtn = document.getElementById('lifeNextImgBtn');
    const thumbsWrap = document.getElementById('lifeModalThumbs');

    mainImg.src = activeLifeModalImages[activeLifeModalIndex];

    if (activeLifeModalImages.length > 1) {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        thumbsWrap.innerHTML = activeLifeModalImages.map((src, idx) => `
            <img src="${src}" class="${idx === activeLifeModalIndex ? 'active-thumb' : ''}" onclick="setLifeModalImage(${idx})" alt="Photo ${idx + 1}">
        `).join('');
    } else {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
        thumbsWrap.innerHTML = '';
    }
}

function changeLifeModalImage(step) {
    activeLifeModalIndex = (activeLifeModalIndex + step + activeLifeModalImages.length) % activeLifeModalImages.length;
    renderLifeModalGallery();
}

function setLifeModalImage(idx) {
    activeLifeModalIndex = idx;
    renderLifeModalGallery();
}

function closeLifeStoryModal() {
    document.getElementById('lifeStoryModal').classList.add('hidden');
}

async function loadAndRenderLife() {
    let moments = await getAllFromStore('life');
    const initialized = await getSetting('life_initialized', false);
    if (moments.length === 0 && !initialized) {
        for (const m of defaultLifeMoments) await putInStore('life', m);
        await saveSetting('life_initialized', true);
        moments = defaultLifeMoments;
    }
    moments.sort((a, b) => a.id - b.id);

    const buildCards = (allowEdit) => moments.map(m => {
        const photoCount = (m.images && m.images.length > 1) ? `<span class="life-photo-count-badge"><i class="fa-regular fa-images"></i> ${m.images.length} Photos</span>` : '';
        const ownerControls = (isOwner && allowEdit) ? `
            <div class="owner-card-actions" onclick="event.stopPropagation()">
                <button class="edit-item-btn" onclick="editLifeMoment(${m.id})"><i class="fa-solid fa-pen"></i> Edit</button>
                <button class="delete-item-btn" onclick="removeLifeMoment(${m.id})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </div>
        ` : '';
        return `
            <div class="life-card" onclick="openLifeStoryModal(${m.id})">
                <div class="life-card-img-box">
                    <img src="${m.image}" alt="${m.title}" onerror="this.src='https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80'">
                    ${photoCount}
                </div>
                <div class="life-card-body">
                    <h4>${m.title}</h4>
                    <p>${m.desc}</p>
                    <span class="life-read-more">Explore Story <i class="fa-solid fa-arrow-right"></i></span>
                    ${ownerControls}
                </div>
            </div>
        `;
    }).join('');

    const aboutGrid = document.getElementById('lifeGalleryGrid');
    if (aboutGrid) aboutGrid.innerHTML = buildCards(true);

    const homeGrid = document.getElementById('homeLifeGalleryGrid');
    if (homeGrid) homeGrid.innerHTML = buildCards(false);
}

function openLifeForm() {
    document.getElementById('lifeForm').reset();
    document.getElementById('lifeEditId').value = '';
    document.getElementById('lifeFormModalTitle').textContent = 'Add Personal Activity / Photo';
    document.getElementById('addLifeFormContainer').classList.remove('hidden');
}

function closeLifeForm() {
    document.getElementById('addLifeFormContainer').classList.add('hidden');
}

async function editLifeMoment(id) {
    const m = await getFromStore('life', id);
    if (!m) return;
    document.getElementById('lifeEditId').value = m.id;
    document.getElementById('lifeTitle').value = m.title;
    document.getElementById('lifeDesc').value = m.desc;
    document.getElementById('lifeFullStory').value = m.fullStory || m.desc;
    document.getElementById('lifeFormModalTitle').textContent = 'Edit Personal Activity';
    document.getElementById('addLifeFormContainer').classList.remove('hidden');
}

async function removeLifeMoment(id) {
    if (!confirm('Remove this photo/moment from Database?')) return;
    await deleteFromStore('life', id);
    loadAndRenderLife();
}

document.getElementById('lifeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const editId = document.getElementById('lifeEditId').value;
    const file = document.getElementById('lifeImageFile').files[0];

    let imgData = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80";
    let existingImages = [];
    if (editId) {
        const existing = await getFromStore('life', Number(editId));
        if (existing) {
            imgData = existing.image;
            existingImages = existing.images || [existing.image];
        }
    }
    if (file) {
        imgData = await fileToDataURL(file);
        existingImages = [imgData, ...existingImages];
    } else if (existingImages.length === 0) {
        existingImages = [imgData];
    }

    const moment = {
        id: editId ? Number(editId) : Date.now(),
        title: document.getElementById('lifeTitle').value.trim(),
        desc: document.getElementById('lifeDesc').value.trim(),
        fullStory: document.getElementById('lifeFullStory').value.trim(),
        image: imgData,
        images: existingImages
    };
    await putInStore('life', moment);
    await loadAndRenderLife();
    closeLifeForm();
});

/* =========================================================================
8. RESUME SKILLS TAGS CRUD
   ========================================================================= */
async function loadAndRenderSkills() {
    let skills = await getSetting('skillsList', null);
    if (!skills) {
        await saveSetting('skillsList', defaultSkills);
        skills = defaultSkills;
    }
    const container = document.getElementById('skillsTagContainer');
    container.innerHTML = skills.map((s, idx) => `
        <span>
            ${s}
            ${isOwner ? `<button class="skill-del-btn" onclick="removeSkill(${idx})" title="Remove">×</button>` : ''}
        </span>
    `).join('');
}

async function addNewSkill() {
    const input = document.getElementById('newSkillInput');
    const val = input.value.trim();
    if (!val) return;
    const skills = await getSetting('skillsList', defaultSkills);
    skills.push(val);
    await saveSetting('skillsList', skills);
    input.value = '';
    loadAndRenderSkills();
}

async function removeSkill(index) {
    const skills = await getSetting('skillsList', defaultSkills);
    skills.splice(index, 1);
    await saveSetting('skillsList', skills);
    loadAndRenderSkills();
}

/* =========================================================================
9. PROFILE PHOTO, CV UPLOAD, TYPEWRITER & VLOGGING
   ========================================================================= */
function fileToDataURL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

document.getElementById('profileUploadInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const dataUrl = await fileToDataURL(file);
    await saveSetting('profileAvatar', dataUrl);
    document.querySelectorAll('.sync-profile-img').forEach(img => img.src = dataUrl);
});

const cvUploadInput = document.getElementById('cvUploadInput');
const downloadCvBtn = document.getElementById('downloadCvBtn');
const cvPdfEmbed = document.getElementById('cvPdfEmbed');

cvUploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const pdfData = await fileToDataURL(file);
    await saveSetting('userCV', pdfData);
    downloadCvBtn.href = pdfData;
    downloadCvBtn.download = file.name || 'abdullahelbaki_cv.pdf';
    if (cvPdfEmbed) cvPdfEmbed.src = pdfData;
    alert('PDF CV document saved to database!');
});

// Vlogging Dropdown
const vlogDropdownBtn = document.getElementById('vlogDropdownBtn');
const vlogDropdownContent = document.getElementById('vlogDropdownContent');
const dropdownArrow = document.getElementById('dropdownArrow');
const vlogUrlInput = document.getElementById('vlogUrlInput');
const loadVlogBtn = document.getElementById('loadVlogBtn');
const vlogIframe = document.getElementById('vlogIframe');
const openExternalVlog = document.getElementById('openExternalVlog');

vlogDropdownBtn.addEventListener('click', () => {
    vlogDropdownContent.classList.toggle('open');
    dropdownArrow.classList.toggle('fa-chevron-up');
    dropdownArrow.classList.toggle('fa-chevron-down');
});

loadVlogBtn.addEventListener('click', async () => {
    let url = vlogUrlInput.value.trim();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    if (url) {
        vlogIframe.src = url;
        openExternalVlog.href = url;
        await saveSetting('vlogUrl', url);
        alert('Vlogging URL updated in Database!');
    }
});

// Typewriter Animation (Runs on both Home Intro and About Me Intro)
let phrases = [...defaultPhrases];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const homeTypewriterEl = document.getElementById('homeTypewriter');
const aboutTypewriterEl = document.getElementById('typewriter');

async function editTypewriterLines() {
    const currentList = await getSetting('typewriterPhrases', defaultPhrases);
    const updated = prompt('Enter typewriter sentences separated by a pipe ( | ):', currentList.join(' | '));
    if (updated !== null) {
        const arr = updated.split('|').map(s => s.trim()).filter(Boolean);
        if (arr.length > 0) {
            phrases = arr;
            await saveSetting('typewriterPhrases', arr);
        }
    }
}

function runTypewriter() {
    if (phrases.length === 0) return;
    const current = phrases[phraseIdx % phrases.length];
    const currentText = current.substring(0, charIdx);

    if (homeTypewriterEl) homeTypewriterEl.textContent = currentText;
    if (aboutTypewriterEl) aboutTypewriterEl.textContent = currentText;

    if (!isDeleting && charIdx < current.length) {
        charIdx++;
        setTimeout(runTypewriter, 60);
    } else if (isDeleting && charIdx > 0) {
        charIdx--;
        setTimeout(runTypewriter, 32);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(runTypewriter, isDeleting ? 2200 : 400);
    }
}

/* =========================================================================
10. DATABASE BACKUP & RESTORE
   ========================================================================= */
async function exportDatabase() {
    const data = {
        settings: await getAllFromStore('settings'),
        texts: await getAllFromStore('texts'),
        projects: await getAllFromStore('projects'),
        skillsActivities: await getAllFromStore('skillsActivities'),
        life: await getAllFromStore('life')
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Abdullahel_Baki_Portfolio_Backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

document.getElementById('importDbInput').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
        const data = JSON.parse(text);
        const stores = ['settings', 'texts', 'projects', 'skillsActivities', 'life'];
        for (const s of stores) {
            if (Array.isArray(data[s])) {
                for (const item of data[s]) await putInStore(s, item);
            }
        }
        alert('Database restored successfully! Reloading...');
        location.reload();
    } catch (err) {
        alert('Invalid backup JSON file.');
    }
});

/* =========================================================================
11. INITIALIZE APPLICATION ON STARTUP
   ========================================================================= */
document.getElementById('currentYear').textContent = new Date().getFullYear();

window.addEventListener('DOMContentLoaded', async () => {
    await initDatabase();
    await loadSavedTexts();
    bindInlineTextEditors();

    const savedAvatar = await getSetting('profileAvatar');
    if (savedAvatar) {
        document.querySelectorAll('.sync-profile-img').forEach(img => img.src = savedAvatar);
    }

    const savedCV = await getSetting('userCV');
    if (savedCV) {
        downloadCvBtn.href = savedCV;
        downloadCvBtn.download = 'abdullahelbaki_cv.pdf';
        if (cvPdfEmbed) cvPdfEmbed.src = savedCV;
    }

    const savedVlog = await getSetting('vlogUrl');
    if (savedVlog) {
        vlogUrlInput.value = savedVlog;
        vlogIframe.src = savedVlog;
        openExternalVlog.href = savedVlog;
    }

    const savedPhrases = await getSetting('typewriterPhrases');
    if (savedPhrases && savedPhrases.length > 0) phrases = savedPhrases;

    await loadAndRenderLinks();
    applyOwnerModeUI();

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) switchTab(initialHash);

    runTypewriter();
});