/**
 * TODO:
 * Buatlah sebuah variabel dengan nama evenNumber yang merupakan sebuah array dengan ketentuan:
 *   - Array tersebut menampung bilangan genap dari 1 hingga 100
 *
 * Catatan:
 *   - Agar lebih mudah, gunakanlah for loop dan logika if untuk mengisi bilangan genap pada array.
 */

// TODO
let number;
let evenNumber = [];

for(number=1; number<=100; number++){
    if((number%2)==0){
        evenNumber.push(number)
        console.log(number);
    }
}

/**
 * Jangan hapus kode di bawah ini
 */

 module.exports = evenNumber;
