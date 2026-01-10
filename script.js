// Theme Toggle Logic
const toggleSwitch = document.querySelector('#checkbox');
const body = document.body;

toggleSwitch.addEventListener('change', (e) => {
    if (e.target.checked) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }
});

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
        const response = await fetch(`https://api.vreden.my.id/api/?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.code === 0) {
            const video = data.data;
            document.getElementById('thumbnail').src = video.cover;
            document.getElementById('videoTitle').innerText = video.title || "Video TikTok";
            document.getElementById('videoAuthor').innerText = `@${video.author.unique_id}`;
            
            const dlBtn = document.getElementById('downloadBtn');
            dlBtn.href = "https://api.vreden.my.id" + video.play;
            
            loader.style.display = 'none';
            result.style.display = 'block';
        } else {
            alert("Video tidak ditemukan atau link salah.");
            loader.style.display = 'none';
        }
    } catch (error) {
        console.error(error);
        alert("Gagal menghubungi server.");
        loader.style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-bolt"></i> Unduh';
    }
}
