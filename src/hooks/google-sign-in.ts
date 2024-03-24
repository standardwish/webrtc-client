import { socket } from "@/lib/socket";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

function SignIn() {
  //Profile Data
  const [tokenResponse, setTokenResponse] = useState<TokenResponse>();

  //Login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setTokenResponse(tokenResponse),
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    if (tokenResponse) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [tokenResponse]);

  return { login };
}
