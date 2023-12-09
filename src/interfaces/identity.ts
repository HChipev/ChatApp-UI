import { JwtPayload } from "jwt-decode";

interface CustomGoogleLoginButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

interface RefreshTokenResponse {
  tokens: {
    token: string;
    refreshToken: string;
  };
}

interface IdentitySliceInitialState {
  token: string | null;
  roles: string[] | string | null | undefined;
  picture: string | null | undefined;
  name: string | null | undefined;
  id: number | null | undefined;
}

interface CustomJWTPayload extends JwtPayload {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
    | string[]
    | string;
  picture?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: number;
}

interface PrivateRouteProps {
  requiredRoles: string[];
}

export type {
  RefreshTokenResponse,
  CustomGoogleLoginButtonProps,
  IdentitySliceInitialState,
  CustomJWTPayload,
  PrivateRouteProps,
};
