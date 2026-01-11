async function downloadTiktok() {
  const urlInput = document.getElementById("tiktokUrl").value.trim();
  const resultArea = document.getElementById("result");
  resultArea.innerHTML = "Processing...";

  if (!urlInput) {
    resultArea.innerHTML = "Masukkan URL TikTok!";
    return;
  }

  try {
    const apiUrl = "https://api.vreden.my.id/api/v1/download/tiktok";
    const fullUrl = `${apiUrl}?url=${encodeURIComponent(urlInput)`;

    const res = await fetch(fullUrl);
    const data = await res.json();
    console.log(data);

    if (!data.result) {
      resultArea.innerHTML = "Gagal mendapatkan video.";
      return;
    }

    const videoUrl = data.result.play; // Link video

    resultArea.innerHTML = `
      <p>Video ditemukan!</p>
      <a href="${videoUrl}" target="_blank">Klik untuk download</a>
      <br />
      <video width="320" controls src="${videoUrl}"></video>
    `;

  } catch (err) {
    console.error(err);
    resultArea.innerHTML = "Terjadi kesalahan.";
  }
}
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
