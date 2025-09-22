export default function LoginPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <input type="email" placeholder="Email" style={{ marginBottom: "10px", padding: "8px" }} />
        <input type="password" placeholder="Password" style={{ marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ padding: "10px", background: "black", color: "white" }}>
          Login
        </button>
      </form>
    </div>
  );
}
