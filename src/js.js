// Импортируем только необходимые функции для работы с Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ВАЖНО: Замените этот объект вашим собственным объектом конфигурации Firebase!
const firebaseConfig = {
  apiKey: "AIzaSyCDhgByDLdBSUp5D60khoNHihUccL8JhAI",
  authDomain: "fish-4af7e.firebaseapp.com",
  projectId: "fish-4af7e",
  storageBucket: "fish-4af7e.firebasestorage.app",
  messagingSenderId: "338433900127",
  appId: "1:338433900127:web:f1ce915d52bc28a27da5ea",
  measurementId: "G-78L2RTMTCZ"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Получаем значения полей
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value; // Сохранение пароля в незашифрованном виде - это небезопасно!

  // Простая проверка
  if (!username || !email || !password) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  try {
    // 1. Создаем ссылку на коллекцию
    const usersCollectionRef = collection(db, "users");

    // 2. Сохраняем данные в коллекцию с автоматически сгенерированным ID
    await addDoc(usersCollectionRef, {
      username: username,
      email: email,
      password: password, // Внимание: Хранение паролей в виде обычного текста небезопасно!
      createdAt: new Date() // Добавляем метку времени
    });

    // Перенаправляем на страницу успеха
    window.location.href = 'success.html';

  } catch (error) {
    console.error("Ошибка при сохранении данных:", error);
    alert(`Ошибка: ${error.message}`);
  }
});