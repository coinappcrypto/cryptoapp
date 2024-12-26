// cryptoapplogin.js

document.addEventListener('DOMContentLoaded', function () {
    // Form öğesini seç
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');

    // Base64 ile şifrelenmiş Google Sheets API bağlantısı
    const base64EncodedURL = "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMTh3NHNTeDhKMFRxdDdJNzJZQzJVM3Y4b09LUXNhMnhxUDkwQlM1eHdtOXcvZ3Zpei90cT90cXg9b3V0Ompzb24=";

    // Base64 çözme fonksiyonu
    function decodeBase64(encoded) {
        return atob(encoded);
    }

    // URL'yi çöz
    const sheetURL = decodeBase64(base64EncodedURL);

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Formun varsayılan davranışını durdur

        const userInput = passwordInput.value.trim(); // Kullanıcıdan gelen şifre

        // Google Sheets'teki şifreleri kontrol et
        fetch(sheetURL)
            .then(response => response.text())
            .then(text => {
                const json = JSON.parse(text.substring(47).slice(0, -2)); // JSON verisini ayıkla
                const rows = json.table.rows;

                // Şifre kontrolü
                const validPasswords = rows.map(row => row.c[0].v); // Şifreleri al
                if (validPasswords.includes(userInput)) {
                    window.location.href = "index2.html"; // Başarılı giriş sonrası yönlendirme
                } else {
                    alert("Invalid activation key. Please try again.");
                    passwordInput.value = ""; // Alanı temizle
                }
            })
            .catch(error => {
                console.error("An error occurred. Please check your connection.", error);
                alert("Error fetching activation keys. Please try again later.");
            });
    });
});
