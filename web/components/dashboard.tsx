'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link as LinkIcon, Copy, ExternalLink, BarChart, Sparkles, Sun, Moon } from 'lucide-react'

export default function Dashboard() {
  const [newLink, setNewLink] = useState('')
  const [links, setLinks] = useState([
    { original: 'https://www.example.com/very/long/url/that/needs/shortening', shortened: 'https://short.link/abc123', views: 145 },
    { original: 'https://another-example.com/with/a/long/url', shortened: 'https://short.link/def456', views: 89 },
  ])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

 
  const addLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (newLink) {
      const shortened = `https://short.link/${Math.random().toString(36).substr(2, 6)}`
      setLinks([{ original: newLink, shortened, views: 0 }, ...links])
      setNewLink('')
    }
  }

  if (!mounted) return null

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'} transition-all duration-300`}>
      <div className="max-w-4xl mx-auto p-8">
        <header className="mb-12 text-center relative">
         
          <h1 className={`text-4xl font-bold mb-2 bg-clip-text text-transparent ${theme === 'dark' ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}>
            Dashboard
          </h1>
          <p className={`text-md ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Simplify your links, amplify your reach</p>
          <Sparkles className={`absolute top-0 left-0 ${theme === 'dark' ? 'text-purple-600' : 'text-purple-400'} h-6 w-6 animate-pulse`} />
        </header>

        <Card className={`mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-all duration-300`}>
          <CardContent className="p-6">
            <form onSubmit={addLink} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="Enter a long URL to shorten"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className={`flex-grow ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105">
                <LinkIcon className="mr-2 h-4 w-4" /> Shorten
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-300`}>
                  <TableHead className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Original Link</TableHead>
                  <TableHead className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Shortened Link</TableHead>
                  <TableHead className={`font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Views</TableHead>
                  <TableHead className={`text-right font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link, index) => (
                  <TableRow key={index} className={`border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'} transition-colors duration-150`}>
                    <TableCell className={`font-medium truncate max-w-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>{link.original}</TableCell>
                    <TableCell className={`truncate max-w-xs ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'} transition-colors duration-150`}>
                      <a href={link.shortened} target="_blank" rel="noopener noreferrer">{link.shortened}</a>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <BarChart className={`h-4 w-4 mr-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-500'}`} />
                        <span className="font-semibold">{link.views}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(link.shortened)}
                        className={`${theme === 'dark' ? 'text-gray-400 hover:text-blue-300' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-150`}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm"   rel="noopener noreferrer"
                        className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-300' : 'text-gray-500 hover:text-purple-600'} transition-colors duration-150`}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}