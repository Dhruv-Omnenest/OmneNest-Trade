import { useIndexStore } from '@/store/index.store';
import React, { useEffect } from 'react';

const IndexPage = () => {
    const { indices, selectedExchange, setExchange, getIndices, isLoading } = useIndexStore();

    useEffect(() => {
        getIndices();
    }, []);

    const exchanges = [
        { label: "All Exchanges", value: "" },
        { label: "BSE", value: "BSE" },
        { label: "NSE", value: "NSE" },
        { label: "MCX", value: "MCX" },
        { label: "NCDEX", value: "NCDEX" }
    ];

    return (
        <div style={pageWrapperStyle}>
            <div style={filterContainerStyle}>
                <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>Market Indices</h2>
                
                {/* Dropdown Styled for Groww Theme */}
                <select 
                    value={selectedExchange}
                    onChange={(e) => setExchange(e.target.value)}
                    style={dropdownStyle}
                >
                    {exchanges.map(ex => (
                        <option key={ex.value} value={ex.value} style={{ background: 'var(--bg-panel)' }}>
                            {ex.label}
                        </option>
                    ))}
                </select>
            </div>

            <main style={gridStyle}>
                {isLoading ? (
                    <div style={{ color: 'var(--text-muted)', padding: '20px' }}>Loading indices...</div>
                ) : (
                    indices.map((idx, i) => (
                        <div key={i} style={cardStyle}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '700', fontSize: '14px' }}>{idx.indexName}</span>
                                <span style={badgeStyle}>{idx.exchange}</span>
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                                Segment: {idx.exchangeSegment.toUpperCase()}
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

// --- STYLES ---

const pageWrapperStyle: React.CSSProperties = {
    background: "var(--bg-main)",
    minHeight: "100vh",
    padding: "24px",
    color: "var(--text-primary)"
};

const filterContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
};

const dropdownStyle: React.CSSProperties = {
    background: "var(--bg-panel)",
    color: "var(--text-primary)",
    border: "1px solid var(--border)",
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    outline: "none",
    cursor: "pointer"
};

const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "12px"
};

const cardStyle: React.CSSProperties = {
    background: "var(--bg-panel)",
    border: "1px solid var(--border)",
    padding: "16px",
    borderRadius: "8px"
};

const badgeStyle: React.CSSProperties = {
    fontSize: "10px",
    color: "var(--green)",
    background: "rgba(0, 210, 144, 0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: "bold"
};

export default IndexPage;