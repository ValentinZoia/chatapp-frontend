declare module "apollo-upload-client/UploadHttpLink.mjs" {
  import { ApolloLink } from "@apollo/client/link";

  interface UploadHttpLinkOptions {
    uri?: string;
    useGETForQueries?: boolean;
    isExtractableFile?: (value: unknown) => boolean;
    FormData?: typeof FormData;
    formDataAppendFile?: (
      formData: FormData,
      fieldName: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      file: any
    ) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    print?: any;
    fetch?: typeof fetch;
    fetchOptions?: RequestInit;
    credentials?: RequestCredentials;
    headers?: Record<string, string>;
    includeExtensions?: boolean;
    includeUnusedVariables?: boolean;
  }

  export default class UploadHttpLink extends ApolloLink {
    constructor(options?: UploadHttpLinkOptions);
  }
}

declare module "apollo-upload-client/createUploadLink.mjs" {
  import { ApolloLink } from "@apollo/client/link";

  interface CreateUploadLinkOptions {
    uri?: string;
    useGETForQueries?: boolean;
    isExtractableFile?: (value: unknown) => boolean;
    FormData?: typeof FormData;
    formDataAppendFile?: (
      formData: FormData,
      fieldName: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      file: any
    ) => void;
    fetch?: typeof fetch;
    fetchOptions?: RequestInit;
    credentials?: RequestCredentials;
    headers?: Record<string, string>;
    includeExtensions?: boolean;
    includeUnusedVariables?: boolean;
  }

  export function createUploadLink(
    options?: CreateUploadLinkOptions
  ): ApolloLink;
}

declare module "apollo-upload-client/isExtractableFile.mjs" {
  export default function isExtractableFile(value: unknown): boolean;
}

declare module "apollo-upload-client/formDataAppendFile.mjs" {
  export default function formDataAppendFile(
    formData: FormData,
    fieldName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file: any
  ): void;
}
