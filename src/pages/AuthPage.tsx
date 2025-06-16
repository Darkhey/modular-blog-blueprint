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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const redirectAfterLogin = async (s: any) => {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", s.user.id)
        .maybeSingle();
      if (data?.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        redirectAfterLogin(session);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        redirectAfterLogin(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isLogin) {
      if (!email || !password) {
        setError("Bitte fülle alle Felder aus.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      if (!email || !password || !username || !confirmPassword) {
        setError("Bitte fülle alle Felder aus.");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Die Passwörter stimmen nicht überein.");
        setLoading(false);
        return;
      }

      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
          },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setError("Bitte überprüfe deine E-Mails, um die Registrierung abzuschließen.");
      }
    }
    setLoading(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Registrieren"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleAuth}>
            {!isLogin && (
              <Input
                placeholder="Benutzername"
                type="text"
                autoComplete="username"
                value={username}
                required
                onChange={e => setUsername(e.target.value)}
                disabled={loading}
              />
            )}
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
            {!isLogin && (
              <Input
                placeholder="Passwort bestätigen"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                required
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            )}
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLogin ? "Login" : "Konto erstellen"}
            </Button>
          </form>
          <div className="text-center text-sm mt-4">
            {isLogin ? (
              <>
                Noch kein Account?{" "}
                <button
                  className="underline text-green-600 hover:text-green-800"
                  onClick={toggleForm}
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
                  onClick={toggleForm}
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
