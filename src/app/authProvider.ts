// // app/authProvider.ts
// import { AuthProvider } from "react-admin";
//
// export const authProvider: AuthProvider = {
//     // вызывается при логине
//     login: async ({ email, password }) => {
//         const response = await fetch("/api/Auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });
//
//         if (!response.ok) {
//             throw new Error("Неверный email или пароль");
//         }
//
//         const data = await response.json();
//         const token = data.token || data.accessToken || data.sessionToken;
//
//         if (!token) {
//             throw new Error("Сервер не вернул токен");
//         }
//
//         localStorage.setItem("token", token);
//         return Promise.resolve();
//     },
//
//     // вызывается при выходе
//     logout: () => {
//         localStorage.removeItem("token");
//         return Promise.resolve();
//     },
//
//     // проверяет, авторизован ли пользователь
//     checkAuth: () => {
//         return localStorage.getItem("token")
//             ? Promise.resolve()
//             : Promise.reject();
//     },
//
//     // вызывается при ошибках API (например 401)
//     checkError: (error) => {
//         if (error.status === 401 || error.status === 403) {
//             localStorage.removeItem("token");
//             return Promise.reject();
//         }
//         return Promise.resolve();
//     },
//
//     // можно реализовать роли (опционально)
//     getPermissions: () => Promise.resolve(),
// };
