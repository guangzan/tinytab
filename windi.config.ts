import { defineConfig } from 'windicss/helpers'

function range(size, startAt = 1) {
    return Array.from(Array(size).keys()).map((i) => i + startAt)
}

export default defineConfig({
    darkMode: 'class',
    // safelist: [range(100).map((i) => `blur-${i}`)],
})
