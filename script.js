// Download Logic
async function downloadVideo() {
    const url = document.getElementById('videoUrl').value;
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    const btn = document.getElementById('btnDownload');

    if (!url) {
        alert("Masukkan link TikTok dulu bosku!");
        return;
    }

    // Show Loading
    loader.style.display = 'block';
    result.style.display = 'none';
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const res = await axios.get(`https://api.vreden.my.id/api/v1/download/tiktok?url=${encodeURIComponent(url)}`);

        // PERBAIKAN: Cek status keberhasilan dari API (biasanya status 200)
        // Dan pastikan struktur data res.data.result sesuai dengan respon API
        if (res.status === 200 && res.data.status === 200) {
            const data = res.data.result; // Shortcut agar kode lebih bersih

            document.getElementById('thumbnail').src = data.cover;
            document.getElementById('videoTitle').innerText = data.title || "Video TikTok";
            
            // Sesuaikan path data.fullname jika error, pastikan field ini ada di API
            document.getElementById('videoAuthor').innerText = `@${data.author?.nickname || 'User'}`;
            
            const dlBtn = document.getElementById('downloadBtn');
            // Pastikan menggunakan link video tanpa watermark yang benar
            dlBtn.href = data.video || data.play; 
            
            loader.style.display = 'none';
            result.style.display = 'block';
        } else {
            alert("Video tidak ditemukan atau link salah.");
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error("Detail Error:", error);
        // Jika error 404 atau 500, pesan ini akan muncul
        alert("Gagal menghubungi server atau API sedang down.");
        loader.style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bolt"></i> Unduh';
    }
}
