// ----------------------------------- VERSION 3 ------------------------------

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  Observable,
  // HttpLink,
} from "@apollo/client";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
// import { WebSocketLink } from "@apollo/client/link/ws";
import { useUserStore } from "./stores/userStore";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
// Variables de entorno para URLs
const HTTP_URL =
  import.meta.env.VITE_GRAPHQL_HTTP_URL || "http://localhost:3000/graphql";
const WS_URL =
  import.meta.env.VITE_GRAPHQL_WS_URL || "ws://localhost:3000/graphql";

loadDevMessages();
loadErrorMessages();

// Refresco de token
async function refreshToken(client) {
  try {
    const { data } = await client.mutate({
      mutation: /* GraphQL */ `
        mutation RefreshToken {
          refreshToken
        }
      `,
    });
    const newAccessToken = data?.refreshToken;
    if (!newAccessToken) throw new Error("New access token not received");
    return `Bearer ${newAccessToken}`;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting new access token");
  }
}

export function clearAuthSession() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Limpiar estado del usuario
  useUserStore.setState({
    id: undefined,
    avatarUrl: null,
    fullname: "",
    email: "",
    isAuthenticated: false,
  });

  // Opcional: redirigir al login
  // window.location.href = "/login";
}

let retryCount = 0;
const maxRetry = 3;

// WebSocketLink para suscripciones
const wsLink = new GraphQLWsLink(
  createClient({
    url: WS_URL,
    connectionParams: () => ({
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }),
    retryAttempts: Infinity, // reconnect:true
    shouldRetry: () => true, // opción para reintentar siempre
  })
);
//version vieja
// const wsLinkV3 = new WebSocketLink({
//   uri: WS_URL,
//   options: {
//     reconnect: true,
//     connectionParams: () => ({
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     }),
//   },
// });

// UploadLink para queries y mutations

const uploadLink = new UploadHttpLink({
  uri: HTTP_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "x-apollo-operation-name": "UploadFile",
  },
});

// const httpLink = new HttpLink({
//   uri: HTTP_URL,
// });

// AuthLink para añadir el token
const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// ErrorLink con refresco automático de token
const errorLink = new ErrorLink(({ error, operation, forward }) => {
  // ✅ Manejo de errores GraphQL usando CombinedGraphQLErrors
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );

      // ✅ Error de autenticación - intentar refresh token
      if (extensions?.code === "UNAUTHENTICATED") {
        console.log("SE TE VENCIO EL TOKEN");
        clearAuthSession(); // por el momento esto
        return;
        if (retryCount < maxRetry) {
          retryCount++;
          console.log(
            "Intentando refrescar el token..." + retryCount + "/" + maxRetry
          );
          return new Observable((observer) => {
            refreshToken(client)
              .then((newToken) => {
                localStorage.setItem(
                  "accessToken",
                  newToken.replace("Bearer ", "")
                );

                // Actualizar headers de la operación
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: newToken,
                  },
                }));

                // Reintentar la operación
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                forward(operation).subscribe(subscriber);
              })
              .catch((error: unknown) => {
                console.error("Failed to refresh token:", error);
                clearAuthSession();
                observer.error(error);
              });
          });
        } else {
          // Máximo de reintentos alcanzado
          console.warn("Max retries reached for token refresh");
          retryCount = 0;
          clearAuthSession();
        }
      }

      // ✅ Error específico: refresh token no encontrado
      if (message === "Refresh token not found") {
        console.log("Refresh token not found - clearing session");
        clearAuthSession();
      }

      // ✅ Error específico: token expirado
      if (message.includes("expired") || extensions?.code === "TOKEN_EXPIRED") {
        console.log("Token expired - attempting refresh");
        clearAuthSession();
      }
    });
  }
  // ✅ Manejo de errores de protocolo usando CombinedProtocolErrors
  else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) => {
      console.error(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      );

      // ✅ Error de autenticación en protocolo
      if (extensions?.code === "UNAUTHENTICATED") {
        if (retryCount < maxRetry) {
          retryCount++;

          return new Observable((observer) => {
            refreshToken(client)
              .then((newToken) => {
                localStorage.setItem(
                  "accessToken",
                  newToken.replace("Bearer ", "")
                );

                // Actualizar headers de la operación
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: newToken,
                  },
                }));

                // Reintentar la operación
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                forward(operation).subscribe(subscriber);
              })
              .catch((error: unknown) => {
                console.error("Error refreshing token:", error);
                clearAuthSession();
                observer.error(error);
              });
          });
        } else {
          // Máximo de reintentos alcanzado
          retryCount = 0;
          clearAuthSession();
        }
      }

      // ✅ Error específico: refresh token no encontrado
      if (message === "Refresh token not found") {
        console.log("Refresh token not found - clearing session");
        clearAuthSession();
      }
    });
  }
  // ✅ Manejo de errores de red
  else {
    console.error(`[Network error]: ${error}`);

    // Reset retry count en caso de errores de red
    if (retryCount > 0) {
      retryCount = 0;
    }

    // ✅ Manejo específico según el tipo de error de red
    if (error?.stack?.includes("401")) {
      console.log("Network 401 error - clearing session");
      clearAuthSession();
    }

    if (error?.stack?.includes("500")) {
      console.error("Server error - please try again later");
    }
  }
});

// SplitLink para separar subscripciones de queries/mutations
const splitLink = ApolloLink.split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, uploadLink])
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;

//------------------------------------- VERSION 1 ------------------------------
// //Configuracion de apollo client.
// //recordemos que en el back manejamos graphql con autenticacion
// //JWT y WebSockets.

// import {
//   ApolloClient,
//   InMemoryCache,
//   type NormalizedCacheObject,
//   gql,
//   Observable,
//   ApolloLink,
// } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
// import { useUserStore } from "./stores/userStore";
// import { connect } from "http2";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { SetContextLink } from "@apollo/client/link/context";
// import { ErrorLink } from "@apollo/client/link/error";

// //ejecuta la mutacion para obtener nuevo token
// async function refreshToken(client: ApolloClient<NormalizedCacheObject>) {
//   try {
//     const { data } = await client.mutate({
//       mutation: gql`
//         mutation RefreshToken {
//           refreshToken
//         }
//       `,
//     });
//     const newAccessToken = data?.refreshToken;
//     if (!newAccessToken) {
//       throw new Error("New access token not received");
//     }
//     return `Bearer ${newAccessToken}`;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error getting new access token");
//   }
// }

// //controlamos los reintentos
// let retryCount = 0;
// const maxRetry = 3;

// //configuramos la conexion WebSocket para subscripciones de GraphQl
// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:3000/graphql",
//   options: {
//     reconnect: true,
//     connectionParams: {
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   },
// });

// //Manejo de errores de Graphql y de red. con retry automatico
// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors) {
//       graphQLErrors.forEach(({ message, locations, path, extensions }) => {
//         console.error(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         );

//         // Si hay error de autenticación
//         if (extensions?.code === "UNAUTHENTICATED") {
//           // Intentar refrescar el token
//           if (retryCount < maxRetry) {
//             retryCount++;
//             return new Observable((observer) => {
//               refreshToken(client)
//                 .then((newToken) => {
//                   localStorage.setItem(
//                     "accessToken",
//                     newToken.replace("Bearer ", "")
//                   );
//                   // Actualizar el header de autorización
//                   operation.setContext(({ headers = {} }) => ({
//                     headers: {
//                       ...headers,
//                       Authorization: newToken,
//                     },
//                   }));
//                   // Reintentar la operación
//                   const subscriber = {
//                     next: observer.next.bind(observer),
//                     error: observer.error.bind(observer),
//                     complete: observer.complete.bind(observer),
//                   };
//                   forward(operation).subscribe(subscriber);
//                 })
//                 .catch((error) => {
//                   console.error("Error refreshing token:", error);
//                   // Limpiar tokens y redirigir al login
//                   localStorage.removeItem("accessToken");
//                   localStorage.removeItem("refreshToken");
//                   // Aquí podrías usar tu store o router para redirigir
//                   // useUserStore.getState().logout();
//                   observer.error(error);
//                 });
//             });
//           } else {
//             // Max retries alcanzados, limpiar sesión
//             retryCount = 0;
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//             // useUserStore.getState().logout();
//           }
//         }
//         if (message === "Refresh token not found") {
//           console.log("refresh token not found");
//           useUserStore.setState({
//             id: undefined,
//             avatarUrl: null,
//             fullname: "",
//             email: "",
//           });
//         }
//       });
//     }

//     if (networkError) {
//       console.error(`[Network error]: ${networkError}`);

//       // Reset retry count en caso de errores de red exitosos
//       if (retryCount > 0) {
//         retryCount = 0;
//       }
//     }
//   }
// );
// // Link de contexto para añadir headers de autorización
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("accessToken");
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// // Link HTTP para queries y mutations
// const httpLink = createUploadLink({
//   uri: "http://localhost:3000/graphql",
// });

// // Link de división para determinar qué tipo de operación usar
// const splitLink = ApolloLink.split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink, // Usar WebSocket para subscripciones
//   from([errorLink, authLink, httpLink]) // Usar HTTP para queries y mutations
// );

// // Configuración del cliente Apollo
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache({
//     typePolicies: {
//       // Aquí puedes definir políticas de caché personalizadas
//       Query: {
//         fields: {
//           // Ejemplo de merge para listas paginadas
//           // posts: {
//           //   keyArgs: false,
//           //   merge(existing = [], incoming) {
//           //     return [...existing, ...incoming];
//           //   },
//           // },
//         },
//       },
//     },
//   }),
//   defaultOptions: {
//     watchQuery: {
//       errorPolicy: "all",
//     },
//     query: {
//       errorPolicy: "all",
//     },
//   },
// });

// // Cargar mensajes de error en desarrollo
// if (process.env.NODE_ENV === "development") {
//   loadDevMessages();
//   loadErrorMessages();
// }

// export default client;

// ----------------------------------------- VERSION 2 ---------------------------------------
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   ApolloLink,
// } from "@apollo/client";
// import { ErrorLink } from "@apollo/client/link/error";
// import { SetContextLink } from "@apollo/client/link/context";
// import {
//   CombinedGraphQLErrors,
//   CombinedProtocolErrors,
// } from "@apollo/client/errors";

// const httpLink = new HttpLink({
//   uri: import.meta.env.VITE_GRAPHQL_HTTP_URL || "http://localhost:3000/graphql",
// });

// const authLink = new SetContextLink((prevContext) => {
//   const token = localStorage.getItem("accessToken");
//   return {
//     headers: {
//       ...prevContext.headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const errorLink = new ErrorLink(({ error }) => {
//   if (CombinedGraphQLErrors.is(error)) {
//     error.errors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   } else if (CombinedProtocolErrors.is(error)) {
//     error.errors.forEach(({ message, extensions }) => {
//       console.log(
//         `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
//           extensions
//         )}`
//       );

//       if (extensions?.code === "UNAUTHENTICATED") {
//         // Intentar refrescar el token
//         if (retryCount < maxRetry) {
//           retryCount++;
//           return new Observable((observer) => {
//             refreshToken(client)
//               .then((newToken) => {
//                 localStorage.setItem(
//                   "accessToken",
//                   newToken.replace("Bearer ", "")
//                 );
//                 // Actualizar el header de autorización
//                 operation.setContext(({ headers = {} }) => ({
//                   headers: {
//                     ...headers,
//                     Authorization: newToken,
//                   },
//                 }));
//                 // Reintentar la operación
//                 const subscriber = {
//                   next: observer.next.bind(observer),
//                   error: observer.error.bind(observer),
//                   complete: observer.complete.bind(observer),
//                 };
//                 forward(operation).subscribe(subscriber);
//               })
//               .catch((error) => {
//                 console.error("Error refreshing token:", error);
//                 // Limpiar tokens y redirigir al login
//                 localStorage.removeItem("accessToken");
//                 localStorage.removeItem("refreshToken");
//                 // Aquí podrías usar tu store o router para redirigir
//                 // useUserStore.getState().logout();
//                 observer.error(error);
//               });
//           });
//         } else {
//           // Max retries alcanzados, limpiar sesión
//           retryCount = 0;
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("refreshToken");
//           // useUserStore.getState().logout();
//         }
//       }
//       if (message === "Refresh token not found") {
//         console.log("refresh token not found");
//         useUserStore.setState({
//           id: undefined,
//           avatarUrl: null,
//           fullname: "",
//           email: "",
//         });
//       }
//     });
//   } else {
//     console.error(`[Network error]: ${error}`);
//   }
// });

// const client = new ApolloClient({
//   link: ApolloLink.from([errorLink, authLink, httpLink]),
//   cache: new InMemoryCache(),
// });

// export default client;
