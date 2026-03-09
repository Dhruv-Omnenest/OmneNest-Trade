import React, { useEffect } from 'react';
import { useFundsStore } from '@/store/funds.store';

const FundsPage = () => {
    const { rmsData, isLoading, getRMSLimits } = useFundsStore();

    useEffect(() => {
        getRMSLimits();
    }, []);

    if (isLoading || !rmsData) return <div style={loadingStyle}>Loading Funds...</div>;

    // Helper to render margin rows
    const MarginRow = ({ label, value, isHighlight = false }: { label: string, value: number, isHighlight?: boolean }) => (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '12px 0', 
            borderBottom: '1px solid var(--border)',
            fontSize: '13px'
        }}>
            <span style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span style={{ 
                color: isHighlight ? 'var(--green)' : 'var(--text-primary)', 
                fontWeight: '600' 
            }}>
                ₹{value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
        </div>
    );

    return (
        <div style={containerStyle}>
            <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>Funds</h1>
            </header>

            <div style={gridStyle}>
                {/* Available Margin Column */}
                <section style={sectionStyle}>
                    <h3 style={sectionHeaderStyle}>Margin Available</h3>
                    <div style={boxStyle}>
                        {rmsData.marginAvailable.map((item, i) => (
                            <MarginRow key={i} label={item.displayLabel} value={item.value} />
                        ))}
                    </div>
                </section>

                {/* Used Margin Column */}
                <section style={sectionStyle}>
                    <h3 style={sectionHeaderStyle}>Margin Used</h3>
                    <div style={boxStyle}>
                        {rmsData.marginUsed.map((item, i) => (
                            <MarginRow key={i} label={item.displayLabel} value={item.value} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

// --- STYLES ---

const containerStyle: React.CSSProperties = {
    background: "var(--bg-main)",
    minHeight: "100vh",
    padding: "32px",
    width: "100vw"
};

const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "32px"
};

const sectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column"
};

const sectionHeaderStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: "600",
    color: "var(--text-muted)",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
};

const boxStyle: React.CSSProperties = {
    background: "var(--bg-panel)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "0 20px"
};

const loadingStyle: React.CSSProperties = {
    color: "var(--text-muted)",
    padding: "40px",
    textAlign: "center",
    width: "100%"
};

export default FundsPage;