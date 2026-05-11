document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const appContent = document.getElementById('app-content');

    // Routing System
    function navigateTo(hash) {
        if (!hash || hash === '#') hash = '#home';
        const viewId = hash.replace('#', '');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        const template = document.getElementById(`view-${viewId}`);
        if (template) {
            appContent.innerHTML = '';
            const clone = template.content.cloneNode(true);
            appContent.appendChild(clone);
            
            if (viewId === 'hiree') initHireeView();
            if (viewId === 'hirer') initHirerView();
            if (viewId === 'logout') initLogoutView();
        } else {
            appContent.innerHTML = '<div style="text-align:center; padding: 100px;"><h2>Page Not Found</h2></div>';
        }
    }

    window.addEventListener('hashchange', () => navigateTo(window.location.hash));
    navigateTo(window.location.hash);

    // Mock Database
    let workersDB = [
        { id: '100001', name: 'Raju P.', phone: '9876543210', skill: 'Carpentry', location: 'Hyderabad (within 10km)', exp: 5 },
        { id: '100002', name: 'Ram Singh', phone: '8765432109', skill: 'Construction Worker', location: 'Hyderabad (within 60km)', exp: 8 },
        { id: '100003', name: 'Lakshmi Devi', phone: '7654321098', skill: 'Maid', location: 'Hyderabad (within 30km)', exp: 12 },
        { id: '100004', name: 'Ali Khan', phone: '6543210987', skill: 'Tailor', location: 'Hyderabad (within 10km)', exp: 4 },
        { id: '100005', name: 'Subba Rao', phone: '9988776655', skill: 'Gardener', location: 'Hyderabad (within 60km)', exp: 3 },
        { id: '100006', name: 'Suresh K.', phone: '8877665544', skill: 'Welder', location: 'Hyderabad (within 30km)', exp: 6 },
        { id: '100007', name: 'Ravi Teja', phone: '7766554433', skill: 'Helper', location: 'Hyderabad (within 60km)', exp: 2 },
    ];
    let isHirerLoggedIn = false;

    // Controllers
    function initHireeView() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.add('hidden'));
                btn.classList.add('active');
                const target = document.getElementById(`form-${btn.dataset.tab}`);
                if (target) target.classList.remove('hidden');
                document.getElementById('hiree-success').classList.add('hidden');
            });
        });

        // Skill Card Selection Logic
        const skillCards = document.querySelectorAll('.skill-card');
        const hiddenSkillInput = document.getElementById('reg-skill');
        skillCards.forEach(card => {
            card.addEventListener('click', () => {
                skillCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                hiddenSkillInput.value = card.dataset.skill;
            });
        });

        const registerForm = document.getElementById('form-register');
        if(registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('reg-name').value;
                const phone = document.getElementById('reg-phone').value;
                const skill = document.getElementById('reg-skill').value;
                const location = document.getElementById('reg-location').value;
                
                const workId = Math.floor(100000 + Math.random() * 900000).toString();
                workersDB.push({ id: workId, name, phone, skill, location, exp: 0 });
                
                document.getElementById('generated-id').innerText = workId;
                document.getElementById('hiree-success').classList.remove('hidden');
                registerForm.reset();
            });
        }
    }

    function initHirerView() {
        const authSection = document.getElementById('hirer-auth');
        const filtersSection = document.getElementById('hirer-filters');
        
        const updateHirerUI = () => {
            if(isHirerLoggedIn) {
                authSection.classList.add('hidden');
                filtersSection.classList.remove('hidden');
                renderWorkers(workersDB);
            } else {
                authSection.classList.remove('hidden');
                filtersSection.classList.add('hidden');
                renderWorkers([]);
            }
        };

        updateHirerUI();

        const loginForm = document.getElementById('form-hirer-login');
        if(loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                isHirerLoggedIn = true;
                updateHirerUI();
            });
        }

        const btnSearch = document.getElementById('btn-search');
        if(btnSearch) {
            btnSearch.addEventListener('click', () => {
                const skill = document.getElementById('filter-skill').value;
                
                const filtered = workersDB.filter(w => {
                    return skill === 'All' || w.skill === skill;
                });
                renderWorkers(filtered);
            });
        }
    }

    function initLogoutView() {
        isHirerLoggedIn = false;
        // Auto redirect to home after 2.5 seconds
        setTimeout(() => {
            if (window.location.hash === '#logout') {
                window.location.hash = '#home';
            }
        }, 2500);
    }
    
    const skillIcons = {
        'Carpentry': 'fa-hammer',
        'Construction Worker': 'fa-person-digging',
        'Driving': 'fa-car',
        'Gardener': 'fa-leaf',
        'Helper': 'fa-hands-holding-circle',
        'Maid': 'fa-broom',
        'Plumbing': 'fa-wrench',
        'Tailor': 'fa-scissors',
        'Welder': 'fa-fire-burner',
        'Electrician': 'fa-bolt',
        'Cooking': 'fa-kitchen-set'
    };

    function renderWorkers(workers) {
        const workersList = document.getElementById('workers-list');
        const workerCount = document.getElementById('worker-count');
        
        workerCount.innerText = workers.length;
        workersList.innerHTML = '';
        
        if(!isHirerLoggedIn) {
            workersList.innerHTML = '<div class="empty-state" id="workers-empty">Please login and search to view workers.</div>';
            return;
        }
        
        if (workers.length === 0) {
            workersList.innerHTML = '<div class="empty-state">No workers matched your search criteria.</div>';
            return;
        }
        
        workers.forEach(worker => {
            const imageName = worker.skill.toLowerCase().replace(' worker', '').replace(' ', '_') + '.svg';
            const card = document.createElement('div');
            card.className = 'worker-card animate-fade-in';
            card.innerHTML = `
                <div style="margin-bottom: 15px; display: flex; align-items: center; gap: 15px;">
                    <img src="assets/images/${imageName}" alt="${worker.skill}" style="width: 60px; height: 60px; border-radius: 12px; flex-shrink: 0; background: var(--glass-bg);">
                    <div>
                        <h4 style="margin:0">${worker.name}</h4>
                        <span style="font-size:0.8rem; color:var(--primary); font-weight:600">${worker.skill}</span>
                    </div>
                </div>
                <div style="margin-bottom: 15px; color: #ccc;">
                    <p style="margin: 5px 0;"><i class="fa-solid fa-location-dot" style="width: 20px;"></i> ${worker.location}</p>
                    <p style="margin: 5px 0;"><i class="fa-solid fa-clock" style="width: 20px;"></i> ${worker.exp} Years Exp.</p>
                </div>
                <a href="tel:${worker.phone}" class="btn btn-secondary btn-block" style="padding: 10px; font-size: 1.1rem; letter-spacing: 1px;"><i class="fa-solid fa-phone"></i> ${worker.phone}</a>
            `;
            workersList.appendChild(card);
        });
    }
});
