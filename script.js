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
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sedang Proses...';

    try {
        const res = await axios.get(`https://api.vreden.my.id/api/v1/download/tiktok?url=${encodeURIComponent(url)}`);
        
        // PERBAIKAN: Gunakan res.data untuk mengecek hasil
        const responseData = res.data;

        if (responseData.result) {
            const videoData = responseData.result;
            
            // Update UI dengan data yang benar
            document.getElementById('thumbnail').src = videoData.cover;
            document.getElementById('videoTitle').innerText = videoData.title || "Video TikTok";
            
            // Perhatikan path data: sesuaikan dengan struktur asli API
            document.getElementById('videoAuthor').innerText = videoData.author?.nickname || "TikTok User";
            
            const dlBtn = document.getElementById('downloadBtn');
            dlBtn.href = videoData.video || videoData.music; // Sesuaikan properti download
            
            loader.style.display = 'none';
            result.style.display = 'block';
        } else {
            alert("Video tidak ditemukan atau link salah.");
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error("Error Detail:", error);
        alert("Gagal menghubungi server. Pastikan API aktif.");
        loader.style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bolt"></i> Unduh';
    }
}
