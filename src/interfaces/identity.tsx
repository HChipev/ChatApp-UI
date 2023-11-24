interface PrivateRouteProps {
  isAuthenticated: boolean;
}

interface CustomGoogleLoginButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export type { PrivateRouteProps, CustomGoogleLoginButtonProps };
