// ===== CONFIGURACIÓN Y DATOS INICIALES =====
const coursesData = [
    { id: 1, name: "Matemática I", price: 350, career: "Ingeniería de Sistemas" },
    { id: 2, name: "Programación I", price: 380, career: "Ingeniería de Sistemas" },
    { id: 3, name: "Física I", price: 320, career: "Ingeniería de Sistemas" },
    { id: 4, name: "Álgebra Lineal", price: 340, career: "Ingeniería de Sistemas" },
    { id: 5, name: "Contabilidad General", price: 300, career: "Administración" },
    { id: 6, name: "Microeconomía", price: 310, career: "Administración" },
    { id: 7, name: "Macroeconomía", price: 315, career: "Administración" },
    { id: 8, name: "Derecho Civil", price: 340, career: "Derecho" },
    { id: 9, name: "Derecho Penal", price: 345, career: "Derecho" },
    { id: 10, name: "Anatomía Humana", price: 400, career: "Medicina" },
    { id: 11, name: "Fisiología", price: 390, career: "Medicina" },
    { id: 12, name: "Psicología General", price: 330, career: "Psicología" },
    { id: 13, name: "Psicología Educativa", price: 335, career: "Psicología" },
    { id: 14, name: "Contabilidad I", price: 305, career: "Contabilidad" },
    { id: 15, name: "Dibujo Arquitectónico", price: 360, career: "Arquitectura" }
];

// Datos iniciales de estudiantes
let studentsData = JSON.parse(localStorage.getItem('studentsData')) || [
    {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez García",
        documentType: "DNI",
        documentNumber: "76543210",
        email: "juan.perez@email.com",
        phone: "987654321",
        career: "Ingeniería de Sistemas",
        cycle: "III",
        courses: [1, 2, 3],
        total: 1050,
        status: "active",
        registrationDate: "2024-01-15",
        matriculationFee: 50
    },
    {
        id: 2,
        firstName: "María",
        lastName: "López Soto",
        documentType: "DNI",
        documentNumber: "87654321",
        email: "maria.lopez@email.com",
        phone: "912345678",
        career: "Administración",
        cycle: "II",
        courses: [5, 6],
        total: 660,
        status: "active",
        registrationDate: "2024-01-18",
        matriculationFee: 50
    },
    {
        id: 3,
        firstName: "Carlos",
        lastName: "Ramírez Díaz",
        documentType: "Carnet Extranjería",
        documentNumber: "CE123456",
        email: "carlos.ramirez@email.com",
        phone: "934567890",
        career: "Derecho",
        cycle: "V",
        courses: [8],
        total: 390,
        status: "pending",
        registrationDate: "2024-01-10",
        matriculationFee: 50
    },
    {
        id: 4,
        firstName: "Ana",
        lastName: "Torres Mendoza",
        documentType: "DNI",
        documentNumber: "12345678",
        email: "ana.torres@email.com",
        phone: "998877665",
        career: "Medicina",
        cycle: "IV",
        courses: [10, 11],
        total: 840,
        status: "active",
        registrationDate: "2024-01-20",
        matriculationFee: 50
    },
    {
        id: 5,
        firstName: "Luis",
        lastName: "Gómez Castro",
        documentType: "DNI",
        documentNumber: "23456789",
        email: "luis.gomez@email.com",
        phone: "987123456",
        career: "Psicología",
        cycle: "I",
        courses: [12],
        total: 380,
        status: "graduated",
        registrationDate: "2023-12-15",
        matriculationFee: 50
    }
];

// Variables globales
let selectedCourses = [];
let totalAmount = 0;
let matriculationFee = 50;
let currentEditId = null;

// ===== FUNCIONES DE UTILIDAD =====
function showMessage(text, type) {
    const messageDiv = document.getElementById('register-message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function showToast(message, type = 'info') {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Crear toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        background: ${type === 'success' ? '#27ae60' : 
                     type === 'error' ? '#e74c3c' : 
                     type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        animation-fill-mode: forwards;
    `;
    
    // Icono según tipo
    const icon = type === 'success' ? '✓' :
                 type === 'error' ? '✗' :
                 type === 'warning' ? '⚠' : 'ℹ';
    
    toast.innerHTML = `
        <span style="font-weight: bold;">${icon}</span>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remover toast después de 3 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }
    }, 3000);
    
    // Agregar estilos de animación si no existen
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeNavigation();
    initializeHomePage();
    initializeRegistrationPage();
    initializeListingPage();
    updatePreviewStats();
    loadFilterOptions();
    
    // Agregar CSS adicional para elementos dinámicos
    addDynamicStyles();
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para la tabla */
        .text-bold { font-weight: bold; }
        
        .student-info {
            display: flex;
            flex-direction: column;
        }
        
        .student-name {
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .student-email {
            font-size: 0.85rem;
            color: var(--gray-color);
        }
        
        .document-info {
            display: flex;
            flex-direction: column;
        }
        
        .document-type {
            font-size: 0.85rem;
            color: var(--gray-color);
        }
        
        .document-number {
            font-weight: 600;
        }
        
        .cycle-badge {
            background: var(--light-color);
            color: var(--primary-color);
            padding: 4px 12px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .courses-info {
            position: relative;
            cursor: help;
        }
        
        .courses-count {
            color: var(--secondary-color);
            font-weight: 600;
        }
        
        .courses-tooltip {
            display: none;
            position: absolute;
            bottom: 100%;
            left: 0;
            background: var(--dark-color);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            white-space: nowrap;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .courses-info:hover .courses-tooltip {
            display: block;
        }
        
        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-block;
        }
        
        .action-buttons {
            display: flex;
            gap: 5px;
        }
        
        .btn-action {
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        
        .btn-view {
            background: var(--info-color);
            color: white;
        }
        
        .btn-edit {
            background: var(--warning-color);
            color: white;
        }
        
        .btn-delete {
            background: var(--accent-color);
            color: white;
        }
        
        .btn-action:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        /* Estilos para el modal */
        .student-details {
            max-height: 60vh;
            overflow-y: auto;
            padding-right: 10px;
        }
        
        .detail-section {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .detail-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .detail-section h4 {
            color: var(--primary-color);
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .detail-item {
            display: flex;
            flex-direction: column;
        }
        
        .detail-label {
            font-size: 0.9rem;
            color: var(--gray-color);
            margin-bottom: 4px;
        }
        
        .detail-value {
            font-weight: 500;
        }
        
        .courses-details {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .course-detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            background: var(--light-color);
            border-radius: 6px;
        }
        
        .course-name {
            font-weight: 500;
        }
        
        .course-price {
            font-weight: 600;
            color: var(--success-color);
        }
        
        .financial-summary {
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .summary-item.total {
            border-top: 2px solid #ddd;
            padding-top: 10px;
            margin-top: 5px;
            font-weight: bold;
            font-size: 1.1rem;
            color: var(--primary-color);
        }
        
        /* Estilos para el modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 700px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--primary-color);
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--gray-color);
            transition: color 0.2s;
        }
        
        .close-modal:hover {
            color: var(--accent-color);
        }
        
        .modal-body {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
        }
        
        .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
            text-align: right;
        }
    `;
    document.head.appendChild(style);
}

// ===== NAVEGACIÓN =====
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Actualizar navegación activa
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Ocultar todas las páginas
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Mostrar página seleccionada
            const pageId = this.getAttribute('data-page');
            const page = document.getElementById(`${pageId}-page`);
            if (page) {
                page.classList.add('active');
                
                // Ejecutar funciones específicas de cada página
                switch(pageId) {
                    case 'listing':
                        updateStudentsTable();
                        updateStatistics();
                        break;
                    case 'register':
                        initializeCoursesList();
                        break;
                    case 'home':
                        updatePreviewStats();
                        break;
                }
            }
        });
    });
    
    // Botones con clase nav-link
    document.querySelectorAll('button.nav-link').forEach(button => {
        button.addEventListener('click', function(e) {
            const pageId = this.getAttribute('data-page');
            document.querySelector(`.nav-link[data-page="${pageId}"]`).click();
        });
    });
}

// ===== PÁGINA DE INICIO =====
function initializeHomePage() {
    // Botón de estadísticas rápidas
    const quickStatsBtn = document.getElementById('quick-stats');
    if (quickStatsBtn) {
        quickStatsBtn.addEventListener('click', function() {
            document.querySelector('.nav-link[data-page="listing"]').click();
        });
    }
    
    // Actualizar estadísticas de vista previa
    updatePreviewStats();
}

function updatePreviewStats() {
    const totalStudents = studentsData.length;
    const activeStudents = studentsData.filter(s => s.status === 'active').length;
    const totalRevenue = studentsData.reduce((sum, student) => sum + student.total, 0);
    const totalCourses = studentsData.reduce((sum, student) => sum + student.courses.length, 0);
    
    // Actualizar elementos si existen
    const previewTotal = document.getElementById('preview-total');
    const previewActive = document.getElementById('preview-active');
    const previewRevenue = document.getElementById('preview-revenue');
    const previewCourses = document.getElementById('preview-courses');
    
    if (previewTotal) previewTotal.textContent = totalStudents;
    if (previewActive) previewActive.textContent = activeStudents;
    if (previewRevenue) previewRevenue.textContent = `S/ ${totalRevenue}`;
    if (previewCourses) previewCourses.textContent = totalCourses;
}

// ===== PÁGINA DE REGISTRO =====
function initializeRegistrationPage() {
    // Inicializar lista de cursos
    initializeCoursesList();
    
    // Filtrar cursos por carrera
    const careerSelect = document.getElementById('career');
    const filterCourses = document.getElementById('filter-courses');
    
    if (careerSelect) {
        careerSelect.addEventListener('change', function() {
            const selectedCareer = this.value;
            filterCoursesByCareer(selectedCareer);
            
            // También actualizar filtro de cursos
            if (filterCourses) {
                filterCourses.value = selectedCareer;
                filterCourses.dispatchEvent(new Event('change'));
            }
        });
    }
    
    // Filtro de cursos
    if (filterCourses) {
        filterCourses.addEventListener('change', function() {
            filterCoursesByCareer(this.value);
        });
    }
    
    // Botón cancelar
    const cancelBtn = document.getElementById('cancel-form');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que deseas cancelar? Los datos no guardados se perderán.')) {
                resetForm();
                document.querySelector('.nav-link[data-page="home"]').click();
            }
        });
    }
    
    // Enviar formulario
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitRegistrationForm();
        });
    }
    
    // Limpiar formulario
    const clearBtn = document.getElementById('clear-form');
    if (clearBtn) {
        clearBtn.addEventListener('click', resetForm);
    }
}

function initializeCoursesList() {
    const coursesList = document.getElementById('courses-list');
    if (!coursesList) return;
    
    // Limpiar lista
    coursesList.innerHTML = '';
    
    // Agregar opciones al filtro de cursos
    const filterSelect = document.getElementById('filter-courses');
    if (filterSelect) {
        const careers = [...new Set(coursesData.map(course => course.career))];
        filterSelect.innerHTML = '<option value="">Todas las carreras</option>';
        careers.forEach(career => {
            const option = document.createElement('option');
            option.value = career;
            option.textContent = career;
            filterSelect.appendChild(option);
        });
    }
    
    // Crear elementos de curso
    coursesData.forEach(course => {
        const courseElement = createCourseElement(course);
        coursesList.appendChild(courseElement);
    });
    
    // Reiniciar selección
    selectedCourses = [];
    totalAmount = 0;
    updateCourseSummary();
}

function createCourseElement(course) {
    const div = document.createElement('div');
    div.className = 'course-item';
    div.dataset.career = course.career;
    
    div.innerHTML = `
        <div class="course-info">
            <div class="course-header">
                <h4>${course.name}</h4>
                <span class="course-career">${course.career}</span>
            </div>
            <p class="course-description">Curso fundamental para el desarrollo académico en ${course.career}</p>
        </div>
        <div class="course-actions">
            <div class="course-price">S/ ${course.price.toFixed(2)}</div>
            <label class="checkbox-container">
                <input type="checkbox" value="${course.id}" data-price="${course.price}">
                <span class="checkmark"></span>
                <span class="checkbox-label">Seleccionar</span>
            </label>
        </div>
    `;
    
    // Agregar evento al checkbox
    const checkbox = div.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        const courseId = parseInt(this.value);
        const coursePrice = parseFloat(this.getAttribute('data-price'));
        
        if (this.checked) {
            selectedCourses.push(courseId);
            totalAmount += coursePrice;
        } else {
            selectedCourses = selectedCourses.filter(id => id !== courseId);
            totalAmount -= coursePrice;
        }
        
        updateCourseSummary();
    });
    
    return div;
}

function filterCoursesByCareer(career) {
    const courseItems = document.querySelectorAll('.course-item');
    
    courseItems.forEach(item => {
        const courseCareer = item.dataset.career;
        
        if (!career || career === "" || courseCareer === career) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
            // Desmarcar si está oculto
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                checkbox.checked = false;
                const courseId = parseInt(checkbox.value);
                const coursePrice = parseFloat(checkbox.dataset.price);
                
                selectedCourses = selectedCourses.filter(id => id !== courseId);
                totalAmount -= coursePrice;
                updateCourseSummary();
            }
        }
    });
}

function updateCourseSummary() {
    const subtotalEl = document.getElementById('subtotal-amount');
    const totalEl = document.getElementById('total-amount');
    const countEl = document.getElementById('selected-courses-count');
    
    if (subtotalEl) {
        subtotalEl.textContent = `S/ ${totalAmount.toFixed(2)}`;
    }
    
    if (totalEl) {
        const total = totalAmount + matriculationFee;
        totalEl.textContent = `S/ ${total.toFixed(2)}`;
    }
    
    if (countEl) {
        countEl.textContent = `${selectedCourses.length} curso${selectedCourses.length !== 1 ? 's' : ''}`;
    }
}

function submitRegistrationForm() {
    // Validaciones
    if (!validateRegistrationForm()) {
        return;
    }
    
    // Obtener datos del formulario
    const studentData = {
        id: currentEditId || (studentsData.length > 0 ? Math.max(...studentsData.map(s => s.id)) + 1 : 1),
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        documentType: document.getElementById('documentType').value,
        documentNumber: document.getElementById('documentNumber').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        career: document.getElementById('career').value,
        cycle: document.getElementById('cycle').value,
        courses: [...selectedCourses],
        total: totalAmount + matriculationFee,
        matriculationFee: matriculationFee,
        status: 'active',
        registrationDate: new Date().toISOString().split('T')[0]
    };
    
    // Verificar si es edición
    if (currentEditId) {
        // Actualizar estudiante existente
        const index = studentsData.findIndex(s => s.id === currentEditId);
        if (index !== -1) {
            studentsData[index] = studentData;
            showToast('Matrícula actualizada exitosamente', 'success');
        }
        currentEditId = null;
    } else {
        // Agregar nuevo estudiante
        studentsData.push(studentData);
        showToast('Matrícula registrada exitosamente', 'success');
    }
    
    // Guardar en localStorage
    localStorage.setItem('studentsData', JSON.stringify(studentsData));
    
    // Resetear formulario y redirigir
    setTimeout(() => {
        resetForm();
        document.querySelector('.nav-link[data-page="listing"]').click();
    }, 1500);
}

function validateRegistrationForm() {
    const requiredFields = [
        'firstName', 'lastName', 'documentType', 'documentNumber',
        'email', 'phone', 'career', 'cycle'
    ];
    
    let isValid = true;
    let errorMessage = '';
    
    // Validar campos requeridos
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            isValid = false;
            field.style.borderColor = 'var(--accent-color)';
            errorMessage = 'Por favor completa todos los campos obligatorios.';
        } else {
            field.style.borderColor = '';
        }
    });
    
    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        isValid = false;
        document.getElementById('email').style.borderColor = 'var(--accent-color)';
        errorMessage = 'Por favor ingresa un email válido.';
    }
    
    // Validar selección de cursos
    if (selectedCourses.length === 0) {
        isValid = false;
        errorMessage = 'Debes seleccionar al menos un curso.';
    }
    
    // Mostrar mensaje de error si existe
    if (!isValid) {
        showMessage(errorMessage, 'error');
    }
    
    return isValid;
}

function resetForm() {
    const form = document.getElementById('registration-form');
    if (form) {
        form.reset();
    }
    
    // Resetear variables
    selectedCourses = [];
    totalAmount = 0;
    currentEditId = null;
    
    // Resetear UI
    document.querySelectorAll('#courses-list input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Mostrar todos los cursos
    document.querySelectorAll('.course-item').forEach(item => {
        item.style.display = 'flex';
    });
    
    // Actualizar resumen
    updateCourseSummary();
    
    // Cambiar texto del botón si estaba en modo edición
    const submitBtn = document.querySelector('#registration-form button[type="submit"]');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirmar Matrícula';
    }
}

// ===== PÁGINA DE LISTADO =====
function initializeListingPage() {
    // Botón de actualizar
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            updateStudentsTable();
            updateStatistics();
            showToast('Listado actualizado', 'success');
        });
    }
    
    // Botón de imprimir
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Botón exportar
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToCSV);
    }
    
    // Buscador
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            updateStudentsTable();
        });
    }
    
    // Limpiar búsqueda
    const clearSearch = document.getElementById('clear-search');
    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            document.getElementById('search-input').value = '';
            updateStudentsTable();
        });
    }
    
    // Filtros
    const filterCareer = document.getElementById('filter-career');
    const filterStatus = document.getElementById('filter-status');
    const filterCycle = document.getElementById('filter-cycle');
    
    if (filterCareer) filterCareer.addEventListener('change', updateStudentsTable);
    if (filterStatus) filterStatus.addEventListener('change', updateStudentsTable);
    if (filterCycle) filterCycle.addEventListener('change', updateStudentsTable);
}

function loadFilterOptions() {
    // Cargar opciones de carrera
    const filterCareer = document.getElementById('filter-career');
    const careers = [...new Set(studentsData.map(student => student.career))];
    
    if (filterCareer) {
        filterCareer.innerHTML = '<option value="">Todas las carreras</option>';
        careers.forEach(career => {
            const option = document.createElement('option');
            option.value = career;
            option.textContent = career;
            filterCareer.appendChild(option);
        });
    }
    
    // Cargar opciones de ciclo
    const filterCycle = document.getElementById('filter-cycle');
    const cycles = [...new Set(studentsData.map(student => student.cycle))].sort();
    
    if (filterCycle) {
        filterCycle.innerHTML = '<option value="">Todos los ciclos</option>';
        cycles.forEach(cycle => {
            const option = document.createElement('option');
            option.value = cycle;
            option.textContent = `${cycle} Ciclo`;
            filterCycle.appendChild(option);
        });
    }
}

function updateStudentsTable() {
    const tableBody = document.getElementById('students-table-body');
    const studentCount = document.getElementById('student-count');
    const tableMessage = document.getElementById('table-message');
    
    if (!tableBody) return;
    
    // Obtener filtros
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const filterCareer = document.getElementById('filter-career')?.value || '';
    const filterStatus = document.getElementById('filter-status')?.value || '';
    const filterCycle = document.getElementById('filter-cycle')?.value || '';
    
    // Filtrar estudiantes
    let filteredStudents = studentsData.filter(student => {
        // Búsqueda general
        const searchMatch = !searchTerm || 
            student.firstName.toLowerCase().includes(searchTerm) ||
            student.lastName.toLowerCase().includes(searchTerm) ||
            student.documentNumber.includes(searchTerm) ||
            student.career.toLowerCase().includes(searchTerm);
        
        // Filtros específicos
        const careerMatch = !filterCareer || student.career === filterCareer;
        const statusMatch = !filterStatus || student.status === filterStatus;
        const cycleMatch = !filterCycle || student.cycle === filterCycle;
        
        return searchMatch && careerMatch && statusMatch && cycleMatch;
    });
    
    // Actualizar contador
    if (studentCount) {
        studentCount.textContent = filteredStudents.length;
    }
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Mostrar mensaje si no hay resultados
    if (filteredStudents.length === 0) {
        if (tableMessage) {
            tableMessage.style.display = 'block';
        }
        return;
    } else {
        if (tableMessage) {
            tableMessage.style.display = 'none';
        }
    }
    
    // Llenar tabla
    filteredStudents.forEach((student, index) => {
        const row = createStudentTableRow(student, index);
        tableBody.appendChild(row);
    });
}

function createStudentTableRow(student, index) {
    const row = document.createElement('tr');
    
    // Obtener nombres de cursos
    const courseNames = student.courses.map(courseId => {
        const course = coursesData.find(c => c.id === courseId);
        return course ? course.name : 'Curso no encontrado';
    }).join(', ');
    
    // Determinar color de estado
    let statusColor, statusText;
    switch(student.status) {
        case 'active':
            statusColor = 'var(--success-color)';
            statusText = 'Activo';
            break;
        case 'pending':
            statusColor = 'var(--warning-color)';
            statusText = 'Pendiente';
            break;
        case 'graduated':
            statusColor = 'var(--info-color)';
            statusText = 'Egresado';
            break;
        default:
            statusColor = 'var(--gray-color)';
            statusText = 'Inactivo';
    }
    
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>
            <div class="student-info">
                <div class="student-name">${student.firstName} ${student.lastName}</div>
                <div class="student-email">${student.email}</div>
            </div>
        </td>
        <td>
            <div class="document-info">
                <div class="document-type">${student.documentType}</div>
                <div class="document-number">${student.documentNumber}</div>
            </div>
        </td>
        <td>${student.career}</td>
        <td>
            <span class="cycle-badge">${student.cycle}</span>
        </td>
        <td>
            <div class="courses-info">
                <span class="courses-count">${student.courses.length} cursos</span>
                <div class="courses-tooltip">${courseNames}</div>
            </div>
        </td>
        <td class="text-bold">S/ ${student.total.toFixed(2)}</td>
        <td>
            <span class="status-badge" style="background-color: ${statusColor}20; color: ${statusColor};">
                ${statusText}
            </span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="btn-action btn-view" onclick="viewStudentDetails(${student.id})" title="Ver detalles">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action btn-edit" onclick="editStudent(${student.id})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" onclick="deleteStudent(${student.id})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

function updateStatistics() {
    const totalStudents = studentsData.length;
    const activeStudents = studentsData.filter(s => s.status === 'active').length;
    const totalAmountStats = studentsData.reduce((sum, student) => sum + student.total, 0);
    const totalCourses = studentsData.reduce((sum, student) => sum + student.courses.length, 0);
    const averageCourses = totalStudents > 0 ? (totalCourses / totalStudents).toFixed(1) : '0.0';
    
    // Carreras únicas
    const uniqueCareers = [...new Set(studentsData.map(s => s.career))].length;
    
    // Matrículas del mes actual
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthlyEnrollments = studentsData.filter(s => {
        const date = new Date(s.registrationDate);
        return date.getMonth() + 1 === currentMonth && date.getFullYear() === currentYear;
    }).length;
    
    // Actualizar elementos
    const elements = {
        'total-students': totalStudents,
        'active-students': activeStudents,
        'total-amount-stats': `S/ ${totalAmountStats}`,}}