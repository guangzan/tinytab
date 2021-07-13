declare global {
    interface ImportMeta {
        env: Record<string, unknown>
        globEager<T = unknown>(globPath: string): Record<string, T>
    }
}
