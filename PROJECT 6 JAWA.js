
   // =========================================
// SCRIPT UNTUK MEMUNCULKAN POP-UP BIODATA
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('biodataModal');
    const closeModal = document.getElementById('closeModal');
    const cards = document.querySelectorAll('.card, .siswa-card');

    // Elemen teks di dalam modal
    const mFullName = document.getElementById('m-fullname');
    const mNickname = document.getElementById('m-nickname');
    const mBirthday = document.getElementById('m-birthday');
    const mHobby = document.getElementById('m-hobby');
    const mEskul = document.getElementById('m-eskul');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Mengambil data dari atribut HTML
            mFullName.innerText = card.getAttribute('data-fullname') || 'Belum diisi';
            mNickname.innerText = card.getAttribute('data-nickname') || 'Belum diisi';
            mBirthday.innerText = card.getAttribute('data-birthday') || 'Belum diisi';
            mHobby.innerText = card.getAttribute('data-hobby') || 'Belum diisi';
            mEskul.innerText = card.getAttribute('data-eskul') || 'Belum diisi';

            // Memunculkan modal
            modal.classList.add('active');
        });
    });

    // Menutup modal jika tombol silang (x) diklik
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Menutup modal jika area gelap di luar kotak diklik
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
// --- SCRIPT TRANSISI MENU HALAMAN (VERSI REVISI) ---
const navLinks = document.querySelectorAll('nav a');

// Daftar ID semua halaman yang kita punya
const pageIds = ['beranda', 'tentang', 'pengurus', 'anggota', 'jadwal'];

function switchPage(targetId) {
    // 1. Sembunyikan SEMUA halaman secara paksa
    pageIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.remove('active-page');
        }
    });
    
    // 2. Munculkan HANYA halaman yang diklik
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active-page');
    }
    
    // 3. (Opsional) Scroll halus ke atas saat ganti halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Jalankan Beranda pertama kali
switchPage('beranda');

// Pasang fitur klik pada semua tombol menu
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Ambil tujuan link, misalnya #anggota
        const href = link.getAttribute('href');
        
        // Pastikan itu adalah link halaman (dimulai dengan #)
        if (href && href.startsWith('#')) {
            e.preventDefault(); // Cegah layar loncat
            const targetId = href.substring(1); // Hapus tanda #
            switchPage(targetId);
        }
    });
});
// =========================================
// SCRIPT POP-UP FOTO GALERI (LIGHTBOX)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    // Berikan jeda sejenak untuk memastikan elemen galeri sudah dimuat
    setTimeout(() => {
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxClose = document.getElementById('lightboxClose');
        const galeriImages = document.querySelectorAll('.galeri-item img');

        if (lightboxModal && galeriImages.length > 0) {
            galeriImages.forEach(img => {
                img.addEventListener('click', () => {
                    lightboxModal.classList.add('active');
                    lightboxImg.src = img.src;
                    
                    // Mengambil teks keterangan di bawah foto (jika ada)
                    const captionText = img.nextElementSibling ? img.nextElementSibling.innerText : '';
                    lightboxCaption.innerText = captionText;
                });
            });

            // Menutup lightbox saat tombol silang (X) diklik
            if (lightboxClose) {
                lightboxClose.addEventListener('click', () => {
                    lightboxModal.classList.remove('active');
                });
            }

            // Menutup lightbox saat area gelap di luar foto diklik
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) {
                    lightboxModal.classList.remove('active');
                }
            });
        }
    }, 500);
});
// =========================================
// SCRIPT TAMBAHAN: DARK MODE, COUNTDOWN & BUKU TAMU
// =========================================
// =========================================
// SCRIPT TAMBAHAN: TOMBOL DARK/LIGHT MODE
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeBtn.innerText = '☀️ Mode Terang';
            } else {
                themeBtn.innerText = '🌙 Mode Gelap';
            }
        });
    }
});
    // B. Fitur Hitung Mundur (Countdown Timer menuju Tanggal Kelulusan Misal: 1 Juni 2026)
    const targetDate = new Date('June 1, 2026 00:00:00').getTime();
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) {
        setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                daysEl.innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
                hoursEl.innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutesEl.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                secondsEl.innerText = Math.floor((distance % (1000 * 60)) / 1000);
            }
        }, 1000);
    }

    // =========================================
// SCRIPT BUKU TAMU PERMANEN (DENGAN LOCALSTORAGE)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const guestbookForm = document.getElementById('guestbookForm');
    const messagesList = document.getElementById('messagesList');

    if (guestbookForm && messagesList) {
        
        // 1. Fungsi untuk memuat pesan yang sudah pernah tersimpan sebelumnya
        function loadMessages() {
            const savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
            messagesList.innerHTML = ''; // Bersihkan list dulu
            
            savedMessages.forEach(item => {
                const messageItem = document.createElement('div');
                messageItem.classList.add('message-item');
                messageItem.innerHTML = `<h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.message)}</p>`;
                messagesList.appendChild(messageItem);
            });
        }

        // Jalankan saat pertama kali web dibuka
        loadMessages();

        // 2. Saat tombol kirim ditekan
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('senderName').value;
            const message = document.getElementById('senderMessage').value;

            // Ambil data lama, lalu masukkan pesan baru ke urutan paling atas
            const savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
            const newMessage = { name: name, message: message };
            
            savedMessages.unshift(newMessage); // Taruh di urutan paling atas
            
            // Simpan kembali ke memori permanen browser (localStorage)
            localStorage.setItem('class_messages', JSON.stringify(savedMessages));

            // Muat ulang daftar pesan di layar
            loadMessages();
            
            // Kosongkan form input
            guestbookForm.reset();
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
})
// =========================================
// SCRIPT TAMBAHAN: DARK MODE & HAPUS PESAN BUKU TAMU
// =========================================

    // 2. Fitur Hapus Pesan Buku Tamu (Admin & Pengirim)
    const messagesList = document.getElementById('messagesList');
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    
    let isAdmin = false; // Status apakah sedang jadi admin atau bukan

    if (adminToggleBtn) {
        adminToggleBtn.addEventListener('click', () => {
            if (!isAdmin) {
                
                if (password === "admin123") { // Ganti password admin sesuai keinginanmu di sini
                    isAdmin = true;
                    alert("Mode Admin Aktif! Sekarang kamu bisa menghapus pesan apa saja.");
                    adminToggleBtn.innerText = "🔓 Keluar Mode Admin";
                } else if (password !== null) {
                    alert("Password salah!");
                }
            } else {
                isAdmin = false;
                alert("Mode Admin dimatikan.");
                adminToggleBtn.innerText = "🔐 Mode Admin";
            }
        });
    }

    // Fungsi memperbarui tampilan pesan yang dilengkapi tombol hapus
    const originalLoadMessages = window.loadMessages; // Menyimpan fungsi lama jika ada
    
    function updateMessagesDisplay() {
        const savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
        if (!messagesList) return;
        
        messagesList.innerHTML = ''; 
        
        savedMessages.forEach((item, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            
            // Tombol Hapus (Bisa dihapus jika dia admin, atau kita beri PIN/Fitur verifikasi sederhana)
            // Di sini kita berikan akses hapus langsung jika mode admin aktif, 
            // atau siapa saja bisa hapus pesannya sendiri jika mencocokkan nama
            let deleteButtonHTML = `<button class="delete-btn" title="Hapus Pesan" onclick="window.deleteMessage(${index})">&times;</button>`;

            messageItem.innerHTML = `<h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.message)}</p>${deleteButtonHTML}`;
            messagesList.appendChild(messageItem);
        });
    }

    // Fungsi global untuk menghapus pesan berdasarkan nomor urut (index)
    window.deleteMessage = function(index) {
        let savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
        
        if (isAdmin) {
            // Jika admin, bebas hapus pesan apa saja
            if (confirm("Admin: Yakin ingin menghapus pesan ini?")) {
                savedMessages.splice(index, 1);
                localStorage.setItem('class_messages', JSON.stringify(savedMessages));
                updateMessagesDisplay();
            }
        } else {
            // Jika bukan admin, tanyakan nama pengirim untuk verifikasi keamanan
            if (confirmName && confirmName.trim().toLowerCase() === savedMessages[index].name.trim().toLowerCase()) {
                savedMessages.splice(index, 1);
                localStorage.setItem('class_messages', JSON.stringify(savedMessages));
                updateMessagesDisplay();
            } else if (confirmName !== null) {
                alert("Nama tidak cocok! Kamu hanya bisa menghapus pesan yang kamu kirim sendiri, atau minta bantuan Admin.");
            }
        }
    };

    // Jalankan pembaruan tampilan pesan saat halaman dimuat
    updateMessagesDisplay();

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
// =========================================
// SCRIPT TAMBAHAN: FITUR HAPUS PESAN & MODE ADMIN
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const messagesList = document.getElementById('messagesList');
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    
    let isAdmin = false; // Status mode admin (awalnya mati)

    // 1. Logika Tombol Mode Admin di Footer
    if (adminToggleBtn) {
        adminToggleBtn.addEventListener('click', () => {
            if (!isAdmin) {
                const password = prompt("Masukkan Password Admin:");
                if (password === "9cbeserta") { // (Password bisa kamu ganti di sini jika mau)
                    isAdmin = true;
                    alert("Mode Admin Aktif! Sekarang kamu bisa menghapus pesan apa saja.");
                    adminToggleBtn.innerText = "🔓 Keluar Mode Admin";
                } else if (password !== null) {
                    alert("Password salah!");
                }
            } else {
                isAdmin = false;
                alert("Mode Admin dimatikan.");
                adminToggleBtn.innerText = "🔐 Mode Admin";
            }
        });
    }

    // 2. Fungsi Memuat & Menampilkan Pesan Beserta Tombol Hapus (×)
    function updateMessagesDisplay() {
        const savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
        if (!messagesList) return;
        
        messagesList.innerHTML = ''; 
        
        savedMessages.forEach((item, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            
            // Membuat tombol hapus (×) di setiap kotak pesan
            let deleteButtonHTML = `<button class="delete-btn" title="Hapus Pesan" onclick="window.deleteMessage(${index})">&times;</button>`;

            messageItem.innerHTML = `<h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.message)}</p>${deleteButtonHTML}`;
            messagesList.appendChild(messageItem);
        });
    }

    // 3. Fungsi Global untuk Menghapus Pesan Berdasarkan Urutannya (Index)
    window.deleteMessage = function(index) {
        let savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
        
        if (isAdmin) {
            // Jika Mode Admin aktif, langsung hapus tanpa tanya nama
            if (confirm("Admin: Yakin ingin menghapus pesan ini?")) {
                savedMessages.splice(index, 1);
                localStorage.setItem('class_messages', JSON.stringify(savedMessages));
                updateMessagesDisplay();
            }
        } else {
            // Jika bukan admin, verifikasi dengan meminta nama pengirim aslinya
            const confirmName = prompt("Masukkan nama kamu (sesuai saat mengirim pesan) untuk menghapus pesan ini:");
            if (confirmName && confirmName.trim().toLowerCase() === savedMessages[index].name.trim().toLowerCase()) {
                savedMessages.splice(index, 1);
                localStorage.setItem('class_messages', JSON.stringify(savedMessages));
                updateMessagesDisplay();
            } else if (confirmName !== null) {
                alert("Nama tidak cocok! Kamu hanya bisa menghapus pesan yang kamu kirim sendiri, atau gunakan Mode Admin.");
            }
        }
    };

    // Jalankan fungsi tampil pesan saat halaman dimuat
    updateMessagesDisplay();

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
// =========================================
// SCRIPT TAMBAHAN: DARK MODE & HAPUS PESAN BUKU TAMU
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. Perbaikan Tombol Dark/Light Mode
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeBtn.innerText = '☀️ Mode Terang';
            } else {
                themeBtn.innerText = '🌙 Mode Gelap';
            }
        });
    }
});
// =========================================
// TAMBAHAN FUNGSI POP-UP ADMIN & HAPUS PESAN
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    let isAdmin = false;
    let messageIndexToDelete = null;

    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminModalOverlay = document.getElementById('adminModalOverlay');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminSubmitBtn = document.getElementById('adminSubmitBtn');
    const adminCancelBtn = document.getElementById('adminCancelBtn');

    const deleteUserModal = document.getElementById('deleteUserModal');
    const deleteUserNameInput = document.getElementById('deleteUserNameInput');
    const deleteUserSubmitBtn = document.getElementById('deleteUserSubmitBtn');
    const deleteUserCancelBtn = document.getElementById('deleteUserCancelBtn');

    const deleteAdminModal = document.getElementById('deleteAdminModal');
    const deleteAdminSubmitBtn = document.getElementById('deleteAdminSubmitBtn');
    const deleteAdminCancelBtn = document.getElementById('deleteAdminCancelBtn');

    // Buka Pop-up Admin
    if (adminToggleBtn && adminModalOverlay) {
        adminToggleBtn.addEventListener('click', () => {
            if (!isAdmin) {
                adminModalOverlay.classList.add('active');
                if (adminPasswordInput) {
                    adminPasswordInput.value = '';
                    adminPasswordInput.focus();
                }
            } else {
                isAdmin = false;
                alert("Mode Admin dimatikan.");
                adminToggleBtn.innerText = "🔐 Mode Admin";
            }
        });
    }

    // Submit Password Admin
    if (adminSubmitBtn) {
        adminSubmitBtn.addEventListener('click', () => {
            if (adminPasswordInput && adminPasswordInput.value === "streak") {
                window.isAdmin = true;
                if (adminModalOverlay) adminModalOverlay.classList.remove('active');
                alert("Mode Admin Aktif!");
                if (adminToggleBtn) adminToggleBtn.innerText = "🔓 Keluar Mode Admin";
            } else {
                alert("Password salah!");
                if (adminPasswordInput) adminPasswordInput.value = '';
            }
        });
    }

    if (adminCancelBtn && adminModalOverlay) {
        adminCancelBtn.addEventListener('click', () => adminModalOverlay.classList.remove('active'));
    }

    // Override Fungsi Hapus Pesan untuk Buka Pop-up
    window.deleteMessage = function(index) {
        messageIndexToDelete = index;
        if (isAdmin) {
            if (deleteAdminModal) deleteAdminModal.classList.add('active');
        } else {
            if (deleteUserModal) {
                deleteUserModal.classList.add('active');
                if (deleteUserNameInput) {
                    deleteUserNameInput.value = '';
                    deleteUserNameInput.focus();
                }
            }
        }
    };

    // Tombol Hapus Pengirim
    if (deleteUserSubmitBtn) {
        deleteUserSubmitBtn.addEventListener('click', () => {
            let savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
            const confirmName = deleteUserNameInput ? deleteUserNameInput.value : '';

            if (savedMessages[messageIndexToDelete] && confirmName && confirmName.trim().toLowerCase() === savedMessages[messageIndexToDelete].name.trim().toLowerCase()) {
                savedMessages.splice(messageIndexToDelete, 1);
                localStorage.setItem('class_messages', JSON.stringify(savedMessages));
                if (typeof updateMessagesDisplay === 'function') updateMessagesDisplay();
                else location.reload();
                if (deleteUserModal) deleteUserModal.classList.remove('active');
            } else {
                alert("Nama tidak cocok!");
            }
        });
    }

    if (deleteUserCancelBtn && deleteUserModal) {
        deleteUserCancelBtn.addEventListener('click', () => deleteUserModal.classList.remove('active'));
    }

    // Tombol Hapus Admin
    if (deleteAdminSubmitBtn) {
        deleteAdminSubmitBtn.addEventListener('click', () => {
            let savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
            savedMessages.splice(messageIndexToDelete, 1);
            localStorage.setItem('class_messages', JSON.stringify(savedMessages));
            if (typeof updateMessagesDisplay === 'function') updateMessagesDisplay();
            else location.reload();
            if (deleteAdminModal) deleteAdminModal.classList.remove('active');
        });
    }

    if (deleteAdminCancelBtn && deleteAdminModal) {
        deleteAdminCancelBtn.addEventListener('click', () => deleteAdminModal.classList.remove('active'));
    }
});
// =========================================
// TAMBAHAN LOGIKA BUKU TAMU: KELAS & SENSOR NAMA
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // Fungsi Otomatis Sensor Nama
    function censorName(str) {
        if (!str) return '***';
        return str.split(' ').map(word => {
            if (word.length <= 1) return '*';
            return word[0] + '*'.repeat(word.length - 1);
        }).join(' ');
    }

    // Fungsi Update Tampilan Pesan (Dengan Sensor & Kelas)
    window.updateMessagesDisplay = function() {
        const messagesList = document.getElementById('messagesList');
        const savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
        if (!messagesList) return;

        messagesList.innerHTML = '';

        savedMessages.forEach((item, index) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');

            // Jika Admin aktif -> Tampilkan Nama Asli. Jika Pengunjung biasa -> Sensor Nama.
            const rawName = item.name || 'Anonim';
            const displayName = (typeof isAdmin !== 'undefined' && isAdmin) ? escapeHtml(rawName) + ' 🔓' : censorName(escapeHtml(rawName));
            const displayClass = escapeHtml(item.userClass || 'IX C');
            const displayMessage = escapeHtml(item.message || '');

            let deleteButtonHTML = `<button class="delete-btn" title="Hapus Pesan" onclick="window.deleteMessage(${index})">&times;</button>`;
            
            messageItem.innerHTML = `
                <h4>${displayName} <span class="user-class">Kelas ${displayClass}</span></h4>
                <p>${displayMessage}</p>
                ${deleteButtonHTML}
            `;
            messagesList.appendChild(messageItem);
        });
    };

    // Override Form Kirim Pesan
    const guestbookForm = document.getElementById('guestbookForm');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameEl = document.getElementById('senderName');
            const classEl = document.getElementById('senderClass');
            const msgEl = document.getElementById('senderMessage');

            if (nameEl && msgEl) {
                const name = nameEl.value;
                const userClass = classEl ? classEl.value : 'IX C';
                const message = msgEl.value;

                const savedMessages = JSON.parse(localStorage.getItem('class_messages')) || [];
                savedMessages.unshift({ name: name, userClass: userClass, message: message });
                localStorage.setItem('class_messages', JSON.stringify(savedMessages));

                window.updateMessagesDisplay();
                guestbookForm.reset();
            }
        });
    }

    // Panggil saat awal dimuat
    window.updateMessagesDisplay();

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
});
// =========================================
// PERBAIKAN STABILITAS ADMIN & FORM BUKU TAMU
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Perbaikan Tombol Mode Gelap (Dark Mode) agar tidak rusak
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.onclick = null; // Menghapus bentrok klik ganda
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeBtn.innerText = '☀️ Mode Terang';
            } else {
                themeBtn.innerText = '🌙 Mode Gelap';
            }
        });
    }

    // 2. Perbaikan Pop-up Login Admin (Tombol Confirm / Masuk)
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminModalOverlay = document.getElementById('adminModalOverlay');
    const adminPasswordInput = document.getElementById('adminPasswordInput');
    const adminSubmitBtn = document.getElementById('adminSubmitBtn');
    const adminCancelBtn = document.getElementById('adminCancelBtn');

    if (adminToggleBtn && adminModalOverlay) {
        adminToggleBtn.onclick = null;
        adminToggleBtn.addEventListener('click', () => {
            if (typeof isAdmin !== 'undefined' && !isAdmin) {
                adminModalOverlay.classList.add('active');
                if (adminPasswordInput) {
                    adminPasswordInput.value = '';
                    adminPasswordInput.focus();
                }
            } else if (typeof isAdmin !== 'undefined') {
                isAdmin = false;
                alert("Mode Admin dimatikan.");
                adminToggleBtn.innerText = "🔐 Mode Admin";
                if (typeof updateMessagesDisplay === 'function') updateMessagesDisplay();
            }
        });
    }


    if (adminCancelBtn && adminModalOverlay) {
        adminCancelBtn.onclick = null;
        adminCancelBtn.addEventListener('click', () => {
            adminModalOverlay.classList.remove('active');
        });
    }

    // 3. Perbaikan Form Buku Tamu (Agar Kelas & Pesan tidak tertukar atau kosong)
    const guestbookForm = document.getElementById('guestbookForm');
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            const nameEl = document.getElementById('senderName');
            const classEl = document.getElementById('senderClass');
            const msgEl = document.getElementById('senderMessage');

            // Memastikan data kelas dan pesan benar-benar terbawa
            if (classEl && !classEl.value) {
                classEl.value = 'IX C'; // Default jika kosong
            }
        }, true);
    }
});
// =========================================
// TAMBAHAN DATABASE FIREBASE ONLINE (UNIVERSAL)
// Otomatis menimpa sistem lama tanpa harus menghapus kode lama!
// =========================================

// 1. Kunci Firebase Kamu
const firebaseConfig = {
    apiKey: "AIzaSyB0CE2A6nMgdR4jH-C2QtmcvVJ8Q-lPorQ",
    authDomain: "website-class-9c.firebaseapp.com",
    databaseURL: "https://website-class-9c-default-rtdb.firebaseio.com",
    projectId: "website-class-9c",
    storageBucket: "website-class-9c.firebasestorage.app",
    messagingSenderId: "468787276862",
    appId: "1:468787276862:web:6fbcfbc69183164e8e756f"
};

// 2. Inisialisasi Database
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messagesRef = database.ref('pesan_kelas9c');

document.addEventListener('DOMContentLoaded', () => {
    const messagesList = document.getElementById('messagesList');
    let latestMessagesData = null;
    let messageIdToDelete = null; 
    let messageNameToDelete = null;

    // Trik: Kloning Form agar tidak menjalankan kode lokal (tanpa menghapus kode lama)
    const oldForm = document.getElementById('guestbookForm');
    if (oldForm) {
        const newForm = oldForm.cloneNode(true);
        oldForm.parentNode.replaceChild(newForm, oldForm);
        
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameEl = document.getElementById('senderName');
            const classEl = document.getElementById('senderClass');
            const msgEl = document.getElementById('senderMessage');

            if (nameEl && msgEl && nameEl.value.trim() !== "" && msgEl.value.trim() !== "") {
                // Kirim langsung ke Server Google
                messagesRef.push({
                    name: nameEl.value,
                    userClass: classEl ? classEl.value : 'IX C',
                    message: msgEl.value,
                    timestamp: Date.now()
                });
                newForm.reset();
                alert("Pesan berhasil terkirim ke seluruh dunia!");
            }
        });
    }

    // Fungsi Sensor Nama
    function censorName(str) {
        if (!str) return '***';
        return str.split(' ').map(word => {
            if (word.length <= 1) return '*';
            return word[0] + '*'.repeat(word.length - 1);
        }).join(' ');
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Menampilkan Pesan dari Server secara Live
    function renderMessagesFromFirebase() {
        if (!messagesList || !latestMessagesData) return;
        messagesList.innerHTML = '';

        const messagesArray = [];
        for (let key in latestMessagesData) {
            messagesArray.push({ id: key, ...latestMessagesData[key] });
        }
        messagesArray.reverse(); // Urutkan dari yang paling baru

        messagesArray.forEach((item) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');

            const rawName = item.name || 'Anonim';
            const isModeAdmin = typeof window.isAdmin !== 'undefined' && window.isAdmin;
            const displayName = isModeAdmin ? escapeHtml(rawName) + ' 🔓' : censorName(escapeHtml(rawName));
            const displayClass = escapeHtml(item.userClass || 'IX C');
            const displayMessage = escapeHtml(item.message || '');

            let deleteButtonHTML = `<button class="delete-btn" title="Hapus Pesan" onclick="window.triggerFirebaseDelete('${item.id}', '${escapeHtml(rawName)}')">&times;</button>`;

            messageItem.innerHTML = `
                <h4>${displayName} <span class="user-class">Kelas ${displayClass}</span></h4>
                <p>${displayMessage}</p>
                ${deleteButtonHTML}
            `;
            messagesList.appendChild(messageItem);
        });
    }

    // Menimpa fungsi hapus pesan dengan sistem Firebase
    window.triggerFirebaseDelete = function(firebaseId, originalName) {
        messageIdToDelete = firebaseId;
        messageNameToDelete = originalName;

        const isModeAdmin = typeof window.isAdmin !== 'undefined' && window.isAdmin;
        if (isModeAdmin) {
            // Jika Admin: Langsung hapus dari database tanpa minta ketik nama
            messagesRef.child(firebaseId).remove();
            alert("Pesan berhasil dihapus oleh Admin!");
        } else {
            // Jika Pengunjung Biasa: Buka pop-up minta nama
            const deleteUserModal = document.getElementById('deleteUserModal');
            if (deleteUserModal) {
                deleteUserModal.classList.add('active');
            }
        }

        // Trik: Kloning tombol hapus di Modal agar fungsi Firebase yang berjalan
        const oldUserSubmit = document.getElementById('deleteUserSubmitBtn');
        if (oldUserSubmit) {
            const newUserSubmit = oldUserSubmit.cloneNode(true);
            oldUserSubmit.parentNode.replaceChild(newUserSubmit, oldUserSubmit);
            newUserSubmit.addEventListener('click', () => {
                const deleteUserNameInput = document.getElementById('deleteUserNameInput');
                const confirmName = deleteUserNameInput ? deleteUserNameInput.value : '';
                if (confirmName && confirmName.trim().toLowerCase() === messageNameToDelete.trim().toLowerCase()) {
                    messagesRef.child(messageIdToDelete).remove();
                    document.getElementById('deleteUserModal').classList.remove('active');
                    alert("Pesan berhasil dihapus!");
                } else {
                    alert("Nama tidak cocok! Kamu hanya bisa menghapus pesan yang kamu kirim sendiri.");
                }
            });
        }

        const oldAdminSubmit = document.getElementById('deleteAdminSubmitBtn');
        if (oldAdminSubmit) {
            const newAdminSubmit = oldAdminSubmit.cloneNode(true);
            oldAdminSubmit.parentNode.replaceChild(newAdminSubmit, oldAdminSubmit);
            newAdminSubmit.addEventListener('click', () => {
                messagesRef.child(messageIdToDelete).remove();
                document.getElementById('deleteAdminModal').classList.remove('active');
            });
        }
    };

    // Menarik Data dari Google Realtime Database
    messagesRef.on('value', (snapshot) => {
        latestMessagesData = snapshot.val();
        if (latestMessagesData) {
            renderMessagesFromFirebase();
        } else {
            if (messagesList) messagesList.innerHTML = '<p style="text-align:center; color:#777;">Belum ada pesan. Jadilah yang pertama!</p>';
        }
    });

    // Menimpa fungsi refresh dari kode lama agar ikut Firebase
    window.updateMessagesDisplay = renderMessagesFromFirebase;
// =========================================
// PENYELAMAT POP-UP ADMIN (PASTI MUNCUL)
// =========================================
window.addEventListener('load', () => {
    const adminToggleBtn = document.getElementById('adminToggleBtn');
    const adminModalOverlay = document.getElementById('adminModalOverlay');
    const adminCancelBtn = document.getElementById('adminCancelBtn');
    const adminSubmitBtn = document.getElementById('adminSubmitBtn');
    const adminPasswordInput = document.getElementById('adminPasswordInput');

    if (adminToggleBtn && adminModalOverlay) {
        adminToggleBtn.onclick = function(e) {
            e.preventDefault();
            const currentAdmin = (typeof window.isAdmin !== 'undefined' && window.isAdmin);
            if (currentAdmin) {
                window.isAdmin = false;
                alert("Mode Admin dimatikan. Sensor nama kembali aktif.");
                adminToggleBtn.innerText = "🔐 Mode Admin";
                if (typeof renderMessagesFromFirebase === 'function') renderMessagesFromFirebase();
            } else {
                adminModalOverlay.style.display = "flex";
                adminModalOverlay.classList.add('active');
                if (adminPasswordInput) {
                    adminPasswordInput.value = '';
                    adminPasswordInput.focus();
                }
            }
        };
    }

    if (adminCancelBtn && adminModalOverlay) {
        adminCancelBtn.onclick = function(e) {
            e.preventDefault();
            adminModalOverlay.style.display = "none";
            adminModalOverlay.classList.remove('active');
        };
    }

    if (adminSubmitBtn) {
        adminSubmitBtn.onclick = function(e) {
            e.preventDefault();
            if (adminPasswordInput && adminPasswordInput.value === "streak") {
                window.isAdmin = true;
                adminModalOverlay.style.display = "none";
                adminModalOverlay.classList.remove('active');
                alert("Mode Admin Aktif! Semua nama sekarang terlihat.");
                if (adminToggleBtn) adminToggleBtn.innerText = "🔓 Keluar Mode Admin";
                
                // Memuat ulang daftar pesan agar sensor terbuka
                if (typeof renderMessagesFromFirebase === 'function') renderMessagesFromFirebase();
            } else {
                alert("Password salah!");
                if (adminPasswordInput) adminPasswordInput.value = '';
            }
        };
    }
});
});