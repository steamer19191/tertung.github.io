 // ฟังก์ชันแสดง popup ตอนโหลดหน้า
 window.onload = function() {
    document.getElementById('popupOverlay').style.display = 'block';
};

// ฟังก์ชันปิด popup
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function showPopup() {
document.getElementById('popupOverlay').style.display = 'block';
}

// ฟังก์ชันปิด Popup
function closePopup() {
document.getElementById('popupOverlay').style.display = 'none';
}

/*ปุ่มแก้ไข*/
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-button');

    // ตรวจสอบว่า editButton มีอยู่จริง
    if (editButton) {
        editButton.addEventListener('click', () => {
            // เปลี่ยนเส้นทางไปยังหน้าใหม่
            window.location.href = './main.html'; // เปลี่ยนหน้า
        });
    } else {
        console.error('ไม่พบปุ่ม edit-button');
    }
});

// ฟังก์ชันสำหรับแสดงภาพ
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        // สร้าง wrapper สำหรับรูปภาพ
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        // สร้างภาพ
        const img = document.createElement('img');
        img.src = e.target.result;

        // สร้างปุ่มลบ
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '×';

        // เพิ่มเหตุการณ์สำหรับลบภาพ
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // หยุดการส่งต่อเหตุการณ์ไปยังพื้นที่อัปโหลด
            uploadArea.removeChild(imageWrapper); // ลบ wrapper ของภาพ
        });

        // ใส่ปุ่มลบและรูปภาพใน wrapper
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(deleteBtn);

        // เพิ่ม wrapper ในพื้นที่อัปโหลด
        uploadArea.appendChild(imageWrapper);
    };
    reader.readAsDataURL(file);
}

// การจัดการเมื่อคลิกพื้นที่อัปโหลด
uploadArea.addEventListener('click', (event) => {
    // ตรวจสอบว่าคลิกที่พื้นที่อัปโหลดโดยตรง (ไม่ใช่ภาพหรือปุ่มลบ)
    if (event.target === uploadArea) {
        fileInput.click(); // จำลองการคลิก input ไฟล์
    }
});

// การจัดการเมื่อเลือกไฟล์ผ่าน input
fileInput.addEventListener('change', (e) => {
    const files = e.target.files;

    Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
            displayImage(file);
        }
    });
});

// การจัดการเมื่อไฟล์ถูกดรอปในพื้นที่
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    uploadArea.style.backgroundColor = '#f1f1f1';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.backgroundColor = '#f9f9f9';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.backgroundColor = '#f9f9f9';

    const items = e.dataTransfer.items;

    for (const item of items) {
        const entry = item.webkitGetAsEntry();
        if (entry.isFile) {
            const file = item.getAsFile();
            if (file.type.startsWith('image/')) {
                displayImage(file);
            }
        }
    }
});


