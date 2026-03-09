import { useWatchlistStore } from "@/store/watchlist.store";
import { useState } from "react";

export const WatchlistTabs = () => {
    const { userDefined, predefined, activeId, setActiveWatchlist } = useWatchlistStore();
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const allLists = [...userDefined, ...predefined];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 16px',
            overflowX: 'auto',
            backgroundColor: '#0f172a', // Dark Navy/Slate
            borderBottom: '1px solid #1e293b',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        }}>
            {allLists.map((list) => {
                const isActive = activeId === list.watchlistId;
                const isHovered = hoveredId === list.watchlistId;
                
                return (
                    <button
                        key={list.watchlistId}
                        onClick={() => setActiveWatchlist(list.watchlistId)}
                        onMouseEnter={() => setHoveredId(list.watchlistId)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                            position: 'relative',
                            padding: '6px 18px',
                            borderRadius: '9999px',
                            fontSize: '13px',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            outline: 'none',
                            border: '1px solid',
                            // Green Active State vs Dark Inactive
                            backgroundColor: isActive ? 'rgba(16, 185, 129, 0.1)' : (isHovered ? '#1e293b' : 'transparent'),
                            color: isActive ? '#10b981' : '#94a3b8',
                            borderColor: isActive ? '#10b981' : 'transparent',
                        }}
                    >
                        {list.watchlistName}

                        {isActive && (
                            <span style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '2px',
                                display: 'flex',
                                height: '6px',
                                width: '6px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    height: '100%', width: '100%',
                                    borderRadius: '50%',
                                    backgroundColor: '#10b981',
                                    opacity: 0.6,
                                }}></span>
                                <span style={{
                                    position: 'relative',
                                    borderRadius: '50%',
                                    height: '6px', width: '6px',
                                    backgroundColor: '#10b981'
                                }}></span>
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
};  