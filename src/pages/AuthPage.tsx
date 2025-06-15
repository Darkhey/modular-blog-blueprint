
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/admin", { replace: true });
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/admin", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Bitte fülle alle Felder aus.");
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const redirectUrl = `${window.location.origin}/admin`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Registrieren"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleAuth}>
            <Input
              placeholder="E-Mail"
              type="email"
              autoComplete="email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Passwort"
              type="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLogin ? "Login" : "Registrieren"}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            {isLogin ? (
              <>
                Noch kein Account?{" "}
                <button
                  className="underline text-green-600 hover:text-green-800"
                  onClick={() => setIsLogin(false)}
                  disabled={loading}
                  type="button"
                >
                  Jetzt registrieren
                </button>
              </>
            ) : (
              <>
                Bereits registriert?{" "}
                <button
                  className="underline text-green-600 hover:text-green-800"
                  onClick={() => setIsLogin(true)}
                  disabled={loading}
                  type="button"
                >
                  Zum Login
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
