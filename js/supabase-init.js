// Ensure supabase-js is loaded first (see script order in HTML)
(function () {
  if (!window._env_ || !window._env_.SUPABASE_URL) {
    console.error("config.js missing or malformed.");
    return;
  }

  // Create the client ONCE and share globally
  window.sb = window.supabase.createClient(
    window._env_.SUPABASE_URL,
    window._env_.SUPABASE_ANON_KEY
  );
  console.log("Supabase client ready:", window.sb);

  // Dev helpers (optional)
  window.signInDev = async (email, password) => {
    const { data, error } = await window.sb.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Sign-in failed: " + error.message);
      return null;
    }
    return data.user;
  };
  window.getUser = async () => {
    const {
      data: { user },
    } = await window.sb.auth.getUser();
    return user;
  };
})();
