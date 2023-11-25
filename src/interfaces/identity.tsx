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

export type { RefreshTokenResponse, CustomGoogleLoginButtonProps };
