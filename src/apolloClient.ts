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
// import { SetContextLink} from "@apollo/client/link/context";
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

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP_URL || "http://localhost:3000/graphql",
});
console.log(httpLink);

const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  } else if (CombinedProtocolErrors.is(error)) {
    error.errors.forEach(({ message, extensions }) =>
      console.log(
        `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
          extensions
        )}`
      )
    );
  } else {
    console.error(`[Network error]: ${error}`);
  }
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);
console.log(link, "link");
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
