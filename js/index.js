// try {
//     console.log(test);
//     console.log("hello");
// } catch (error) {
//     console.log(error);
// }



// let i = 1;
// let a = setInterval(()=>{
//     console.log(document.write(i));
//     if(i == 5){
//         clearInterval(a)
//     }
//     i++
// }, 1000);


// function devide(a, b) {
//     if (b == 0) {
//         throw new Error("nolga bolish mumkin emas")
//     }
//     return a / b
// }

// try {
//     console.log(devide(10, 2));
// } catch (error) {
//     console.log(error);
// }


// import {sum} from "./utilities.js";

// console.log(sum(5, 3)); 




// 1. Foydalanuvchidan yoshini, telefon raqamini hamda elektron pochtasini kiritishini so'rovchi dastur tuzing.
// Telefon raqam quyidagi korinishda bolishi shart (+998991234567).
// Agar foydalanuvchi notogri formatdagi telefon raqam kiritsa uni togri kiritmaguncha qayta ragam kiritaversin.
// Foydalanuvchi yoshini togri kiritganiga e'tibor bering. Agar notogri kiritgan bolsa qayta kiritishini sorang
// Foydalanuvchi email ni togri kiritsin. Agar email ni notogri kiritgan bolsa togri kiritsin.
// Foydalanuvchidan barcha ma'lumotlarni to'g'ri holatda qabul qilib olgacha yoshi nechaga teng bo'lsa
// Yoshini teskari tartibda ekranga sanab chiqarsin (har birini orasida 1 sekunddan oraliq bilan) hamda 0 ga
// yetib kelganda barcha ma'lumotlarini ekranga chiqarib bersin.
// Ushbu ishni bajarishda:
// 1. setInterval
// 2. try...catch
// 3. throw
// 4. module lardan foydalanilgan bolishi shart.


// let phone = +prompt("telefon raqamingizni kiriting:");
// let age = +prompt("yoshingizni kiriting:");
// let emile = +prompt("emile ni kiriting:");

const readline = process('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userData = {
  age: null,
  phoneNumber: null,
  email: null
};

function getUserData() {
  rl.question('Iltimos, yoshingizni kiriting: ', (age) => {
    try {
      if (!Number.isInteger(parseInt(age)) || parseInt(age) <= 0) {
        throw new Error('Yoshni togri kiriting!');
      }
      userData.age = parseInt(age);
      rl.question('Iltimos, telefon raqamingizni kiriting (+998991234567): ', (phoneNumber) => {
        if (!/^\+9989[0-9]{9}$/.test(phoneNumber)) {
          throw new Error('Telefon raqamni togri kiriting!');
        }
        userData.phoneNumber = phoneNumber;
        rl.question('Iltimos, elektron pochtangizni kiriting: ', (email) => {
          if (!isValidEmail(email)) {
            throw new Error('Emailni togri kiriting!');
          }
          userData.email = email;
          getUserData(); // Recursive call to continue getting data
        });
      });
    } catch (error) {
      console.log(error.message);
      getUserData(); // Recursive call to retry getting data
    }
  });
}

function isValidEmail(email) {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function printUserData() {
  console.log('Yosh:', userData.age);
  console.log('Telefon raqami:', userData.phoneNumber);
  console.log('Email:', userData.email);
}

// Start getting user data
getUserData();

// Print user data when age reaches 0
let countdown = setInterval(() => {
  userData.age -= 1;
  console.log('Yosh:', userData.age);
  if (userData.age === 0) {
    clearInterval(countdown);
    printUserData();
    rl.close();
  }
}, 1000);
