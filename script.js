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
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';

    try {
        // Menggunakan API Vreden
        const response = await axios.get(`https://api.vreden.my.id/api/v1/download/tiktok?url=${encodeURIComponent(url)}`);
        
        const data = response.data;

        // Cek apakah API memberikan respon sukses (Biasanya status 200 atau data.result ada)
        if (data && data.status === 200 && data.result) {
            const videoData = data.result;

            // Update UI dengan data dari API
            document.getElementById('thumbnail').src = videoData.metadata.cover || '';
            document.getElementById('videoTitle').innerText = videoData.metadata.title || "Video TikTok";
            document.getElementById('videoAuthor').innerText = videoData.metadata.author?.nickname ? `@${videoData.metadata.author.nickname}` : "Unknown";
            
            // Link download (mengambil video tanpa watermark)
            const dlBtn = document.getElementById('downloadBtn');
            dlBtn.href = videoData.download.nowm; // Menggunakan link No Watermark
            
            loader.style.display = 'none';
            result.style.display = 'block';
        } else {
            alert("Video tidak ditemukan. Pastikan link TikTok benar dan bersifat publik.");
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error("Error Detail:", error);
        // Jika API Down atau koneksi internet bermasalah
        alert("Gagal menghubungi server atau API sedang gangguan. Coba lagi nanti.");
        loader.style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bolt"></i> Unduh';
    }
}
