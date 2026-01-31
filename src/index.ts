import { Hono } from 'hono'
import { html } from 'hono/html'

const app = new Hono<{ Bindings: { DB: D1Database } }>()

// Komponen UI: Navbar Mewah
const Navbar = () => html`
  <nav class="flex justify-between items-center p-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
    <div class="text-2xl font-black bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">MANGALUX</div>
    <div class="space-x-6 text-sm font-medium">
      <a href="/" class="hover:text-blue-400 transition">Beranda</a>
      <a href="/bookmark" class="hover:text-blue-400 transition">Bookmark</a>
      <a href="/history" class="hover:text-blue-400 transition">Riwayat</a>
    </div>
  </nav>
`

app.get('/', async (c) => {
  // Ambil data komik dari D1
  const { results } = await c.env.DB.prepare("SELECT * FROM comics").all();

  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body { background-color: #020617; color: white; }
        .comic-card:hover img { transform: scale(1.05); }
      </style>
    </head>
    <body>
      ${Navbar()}
      <main class="max-w-7xl mx-auto p-6">
        <h2 class="text-3xl font-bold mb-8">Update Populer</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          ${results.map(comic => html`
            <div class="comic-card group relative overflow-hidden rounded-xl bg-slate-900 border border-white/5 p-2 transition-all">
              <div class="overflow-hidden rounded-lg aspect-[3/4]">
                <img src="${comic.cover}" class="w-full h-full object-cover transition duration-300" />
              </div>
              <div class="mt-3">
                <h3 class="font-bold text-sm line-clamp-1">${comic.title}</h3>
                <p class="text-xs text-slate-400 mt-1">Ch. 120</p>
              </div>
              <button onclick="location.href='/add-bookmark/${comic.id}'" class="absolute top-4 right-4 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition">⭐</button>
            </div>
          `)}
        </div>
      </main>
    </body>
    </html>
  `)
})

export default app