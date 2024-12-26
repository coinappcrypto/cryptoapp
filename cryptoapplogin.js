 // Şifrelerin doğrudan koda yerleştirilmesi
        const validPasswords = ['', '', 'admin'];

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;

            // Şifre kontrolü
            if (validPasswords.includes(password)) {
                window.location.href = "index2.html"; // Başarılı giriş sonrası yönlendirme
            } else {
                alert("Invalid activation key. Please try again.");
                document.getElementById('password').value = "";
            }
        });
