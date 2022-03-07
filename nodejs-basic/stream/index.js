const fs = require('fs');
const {resolve} = require('path');

// Teks yang dibaca oleh readable stream memiliki ukuran 15 karakter tiap bagiannya. Tentukan nilai highWaterMark-nya.
const readableStream = fs.createReadStream(resolve(__dirname, 'input.txt'),{
    highWaterMark: 15,
});

// Tulis ulang teks dengan menggunakan teknik writable stream pada berkas output.txt. Untuk tiap bagian teks yang dibaca melalui readable stream, pisahkan dengan baris baru (‘\n’).
const writableStream = fs.createWriteStream(resolve(__dirname, 'output.txt'));

readableStream.on('readable', () =>{
    try{
        writableStream.write(`${readableStream.read()}\n`);
    }catch(error){

    }
});

readableStream.on('end', () => {
    writableStream.end();
});