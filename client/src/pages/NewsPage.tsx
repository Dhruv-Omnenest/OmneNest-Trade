import { useNewsStore } from '@/store/news.store';
import React, { useEffect } from 'react';

const NewsPage = () => {
  const { news, isLoading, error, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews(20, 0); // Fetch more items for full-width layout
  }, [fetchNews]);

  if (isLoading && news.length === 0) {
    return (
      <div style={{ ...pageWrapperStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Loading market intelligence...</span>
      </div>
    );
  }

  return (
    <div className="news-page-wrapper" style={pageWrapperStyle}>
      {/* Page Content */}
      <div style={{ padding: "24px" }}>
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
              Market News
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "4px" }}>
              Real-time updates across global exchanges
            </p>
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
             Showing {news.length} results
          </div>
        </div>

        {error && (
          <div style={{ padding: "12px", background: "rgba(235, 87, 87, 0.1)", border: "1px solid var(--red)", borderRadius: "4px", color: "var(--red)", fontSize: "12px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <main style={newsGridStyle}>
          {news.map((item, index) => (
            <article key={index} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={sourceTagStyle}>{item.source}</span>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{item.publishedDate}</span>
              </div>
              
              <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", lineHeight: "1.4" }}>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={linkStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "var(--green)";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  {item.title}
                </a>
              </h3>
              
              <p style={{ color: "var(--text-muted)", fontSize: "12px", lineHeight: "1.5", margin: 0 }}>
                {item.contentSnippet}
              </p>
            </article>
          ))}
        </main>
      </div>
    </div>
  );
};

// --- STYLES (Using your provided variables) ---

const pageWrapperStyle: React.CSSProperties = {
  background: "var(--bg-main)", // Assumes your main background variable
  minHeight: "calc(100vh - 52px)",
  width: "100%",
  overflowY: "auto",
};

const newsGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
  gap: "16px",
};

const cardStyle: React.CSSProperties = {
  background: "var(--bg-panel)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "16px",
  transition: "transform 0.2s, border-color 0.2s",
  cursor: "default",
};

const linkStyle: React.CSSProperties = {
  color: "var(--text-primary)",
  textDecoration: "none",
  fontWeight: "600",
  transition: "all 0.2s",
};

const sourceTagStyle: React.CSSProperties = {
  fontSize: "9px",
  fontWeight: "700",
  color: "var(--green)",
  background: "rgba(0, 210, 144, 0.1)",
  padding: "2px 6px",
  borderRadius: "2px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

export default NewsPage;