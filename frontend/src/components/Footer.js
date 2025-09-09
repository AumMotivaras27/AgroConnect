import { Link } from "react-router-dom";

export default function Footer() {
  const styles = {
    footer: {
      backgroundColor: "#f1f1f1",
      padding: "20px 0",
      marginTop: "40px",
    },
    container: {
      maxWidth: "1200px",
      margin: "auto",
      textAlign: "center",
      fontSize: "14px",
      color: "#555",
    },
    logo: {
      fontWeight: "bold",
      color: "#2e7d32",
      fontSize: "18px",
      marginBottom: "5px",
    },
    links: {
      margin: "10px 0",
    },
    link: {
      color: "#2e7d32",
      textDecoration: "none",
      fontWeight: "bold",
      margin: "0 5px",
    },
    copy: {
      marginTop: "5px",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.logo}>🌾 AgriWorld</p>
        <p>Empowering Farmers with Knowledge & Tools</p>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link> |{" "}
          <Link to="/crops" style={styles.link}>Crops</Link> |{" "}
          <Link to="/news" style={styles.link}>News</Link> |{" "}
          <Link to="/login" style={styles.link}>Login</Link>
        </div>

        <p style={styles.copy}>
          &copy; {new Date().getFullYear()} AgriWorld. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
