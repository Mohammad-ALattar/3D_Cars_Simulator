export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>⛔ Access Denied</h1>
      <p>This token is invalid or has expired.</p>
    </div>
  );
}
