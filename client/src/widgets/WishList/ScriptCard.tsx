import { Scrip } from "@/store/watchlist.store";
import { useState } from "react";

interface ScripCardProps { scrip: Scrip; }

export const ScripCard = ({ scrip }: ScripCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const currentPrice = scrip.lastTradedPrice ?? scrip.previousClosePrice;
    const isPositive = scrip.netChange >= 0;

    // Dark Theme Colors
    const greenText = isPositive ? '#10b981' : '#ef4444'; // Emerald-500 or Red-500
    const subText = '#9ca3af'; // Gray-400

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                backgroundColor: isHovered ? '#1e293b' : '#0f172a', // Slate-800 to Slate-900
                borderBottom: '1px solid #1e293b',
                transition: 'background-color 0.2s ease',
                cursor: 'pointer'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: isHovered ? '#10b981' : '#f8fafc', // Green on hover, White otherwise
                    transition: 'color 0.2s ease'
                }}>
                    {scrip.symbolName}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        fontSize: '10px',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        backgroundColor: '#1e293b',
                        color: '#94a3b8',
                        borderRadius: '4px',
                    }}>
                        {scrip.exchange}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {scrip.segmentIndicator}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: greenText }}>
                    {currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: greenText }}>
                    <span>{isPositive ? '▲' : '▼'}</span>
                    <span>{Math.abs(scrip.netChange / 100).toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
};