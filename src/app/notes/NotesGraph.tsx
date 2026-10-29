'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NodeObject } from 'react-force-graph-2d';
import styles from './NotesGraph.module.scss';

// force-graph touches `window` on import, so it can only load in the browser.
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export type GraphNode = {
    id: string;
    title: string;
    // Main category key, or null when the note isn't in any category.
    category: string | null;
};

export type GraphLink = {
    source: string;
    target: string;
};

export type GraphCategory = {
    key: string;
    label: string;
};

type Props = {
    nodes: GraphNode[];
    links: GraphLink[];
    categories: GraphCategory[];
};

// Solarized accents, one per main category in order.
const CATEGORY_COLORS = ['#b58900', '#2aa198', '#268bd2', '#d33682', '#cb4b16', '#6c71c4', '#859900', '#dc322f'];

// Labels only appear once zoomed in far enough, like org-roam-ui.
const LABEL_ZOOM = 1.6;

type Theme = { bg: string; text: string; border: string };

const readTheme = (): Theme => {
    const style = getComputedStyle(document.documentElement);
    return {
        bg: style.getPropertyValue('--bg-color').trim(),
        text: style.getPropertyValue('--text-color').trim(),
        border: style.getPropertyValue('--border-color').trim(),
    };
};

// force-graph replaces link endpoints with node objects once the simulation starts.
const endpointId = (end: unknown) => (typeof end === 'object' && end !== null ? (end as GraphNode).id : (end as string));

export default function NotesGraph({ nodes, links, categories }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" className={styles.cta} onClick={() => setOpen(true)}>
                Visualise
            </button>
            {open && <GraphModal nodes={nodes} links={links} categories={categories} onClose={() => setOpen(false)} />}
        </>
    );
}

function GraphModal({ nodes, links, categories, onClose }: Props & { onClose: () => void }) {
    const router = useRouter();
    const canvasRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [theme, setTheme] = useState<Theme | null>(null);
    const [hovered, setHovered] = useState<string | null>(null);

    // The graph mutates the objects it's given, so hand it its own copy.
    const data = useMemo(
        () => ({ nodes: nodes.map((node) => ({ ...node })), links: links.map((link) => ({ ...link })) }),
        [nodes, links]
    );

    const colorOf = useMemo(() => {
        const colors = new Map(categories.map(({ key }, i) => [key, CATEGORY_COLORS[i % CATEGORY_COLORS.length]]));
        return (category: string | null) => (category && colors.get(category)) || theme?.border || '#93a1a1';
    }, [categories, theme]);

    const neighbours = useMemo(() => {
        const result = new Map<string, Set<string>>();
        nodes.forEach((node) => result.set(node.id, new Set()));
        links.forEach(({ source, target }) => {
            result.get(source)?.add(target);
            result.get(target)?.add(source);
        });
        return result;
    }, [nodes, links]);

    useEffect(() => {
        setTheme(readTheme());

        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);

        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const observer = new ResizeObserver(([entry]) =>
            setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
        );
        if (canvasRef.current) observer.observe(canvasRef.current);

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = overflow;
            observer.disconnect();
        };
    }, [onClose]);

    const isActive = useCallback(
        (id: string) => !hovered || id === hovered || !!neighbours.get(hovered)?.has(id),
        [hovered, neighbours]
    );

    const drawNode = useCallback(
        (obj: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const node = obj as NodeObject & GraphNode;
            if (node.x === undefined || node.y === undefined) return;
            const degree = neighbours.get(node.id)?.size ?? 0;
            const radius = 3 + Math.sqrt(degree) * 1.5;
            const active = isActive(node.id);

            ctx.globalAlpha = active ? 1 : 0.15;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = colorOf(node.category);
            ctx.fill();

            if (globalScale >= LABEL_ZOOM || node.id === hovered) {
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px 'Courier New', monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = theme?.text ?? '#657b83';
                ctx.fillText(node.title, node.x, node.y + radius + 2 / globalScale);
            }
            ctx.globalAlpha = 1;
        },
        [colorOf, hovered, isActive, neighbours, theme]
    );

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-label="Note connections"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.header}>
                    <span className={styles.title}>
                        {nodes.length} notes · {links.length} links
                    </span>
                    <ul className={styles.legend}>
                        {categories.map(({ key, label }) => (
                            <li key={key}>
                                <span className={styles.swatch} style={{ backgroundColor: colorOf(key) }} />
                                {label}
                            </li>
                        ))}
                    </ul>
                    <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
                        ×
                    </button>
                </div>

                <div ref={canvasRef} className={styles.canvas}>
                    {theme && size.width > 0 && (
                        <ForceGraph2D
                            graphData={data}
                            width={size.width}
                            height={size.height}
                            backgroundColor={theme.bg}
                            nodeLabel={() => ''}
                            nodeCanvasObject={drawNode}
                            nodePointerAreaPaint={(node, color, ctx) => {
                                if (node.x === undefined || node.y === undefined) return;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
                                ctx.fill();
                            }}
                            linkColor={(link) => {
                                const active =
                                    !hovered ||
                                    endpointId(link.source) === hovered ||
                                    endpointId(link.target) === hovered;
                                return active ? theme.border : `${theme.border}22`;
                            }}
                            linkWidth={(link) =>
                                hovered && (endpointId(link.source) === hovered || endpointId(link.target) === hovered)
                                    ? 1.5
                                    : 0.5
                            }
                            onNodeHover={(node) => setHovered(node ? (node as GraphNode).id : null)}
                            onNodeClick={(node) => router.push((node as GraphNode).id)}
                            cooldownTicks={200}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
