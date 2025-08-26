// import { fetchUtils, DataProvider } from "react-admin";
//
// const apiUrl = "http://localhost:5000/api";
//
// const httpClient = async (url: string, options: any = {}) => {
//     if (!options.headers) {
//         options.headers = new Headers({ Accept: "application/json" });
//     }
//     const token = localStorage.getItem("token");
//     if (token) {
//         options.headers.set("Authorization", `Bearer ${token}`);
//     }
//     return fetchUtils.fetchJson(url, options);
// };
//
// export const dataProvider: DataProvider = {
//     getList: (resource, params) =>
//         httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({
//             data: json,
//             total: json.length,
//         })),
//
//     getOne: (resource, params) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
//             data: json,
//         })),
//
//     create: (resource, params) =>
//         httpClient(`${apiUrl}/${resource}`, {
//             method: "POST",
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({ data: json })),
//
//     update: (resource, params) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`, {
//             method: "PUT",
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({ data: json })),
//
//     delete: (resource, params) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`, {
//             method: "DELETE",
//         }).then(({ json }) => ({ data: json })),
//
// } as DataProvider;
