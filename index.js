const fs = require('fs');
const { exec } = require('child_process');

// Fungsi untuk update file dan commit
function updateAndCommit() {
  const now = new Date().toISOString();
  const filePath = 'updated.txt';

  // Tulis waktu ke updated.txt
  fs.writeFileSync(filePath, `Last updated: ${now}\n`, 'utf8');
  console.log(`✔ File ${filePath} updated at ${now}`);

  // Jalankan perintah git
  exec('git add .', (err) => {
    if (err) return console.error('❌ Error git add:', err);

    exec(`git commit -m "update timestamp ${now}"`, (err) => {
      if (err) {
        console.error('❌ Error git commit (mungkin tidak ada perubahan):', err.message);
        return;
      }

      exec('git push origin master', (err, stdout, stderr) => {
        if (err) {
          console.error('❌ Error git pull:', err.message);
          return;
        }
        console.log('✔ Git pull success:\n', stdout || stderr);
      });
    });
  });
}

// Jalankan pertama kali langsung
updateAndCommit();

// Lalu ulangi setiap 1 jam (3600000 ms)
setInterval(updateAndCommit, 3600000);
