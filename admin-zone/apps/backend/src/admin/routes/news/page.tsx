import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Newspaper, PencilSquare, Trash } from "@medusajs/icons"
import {
  Container,
  Heading,
  Button,
  Table,
  Input,
  Textarea,
  Drawer,
  Label,
  IconButton,
  toast,
} from "@medusajs/ui"
import { useEffect, useState } from "react"

type News = {
  id: string
  title: string
  image_url: string | null
  date: string | null
  author: string | null
  summary: string | null
  content: string | null
}

const emptyForm = {
  title: "",
  image_url: "",
  date: "",
  author: "",
  summary: "",
  content: "",
}

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const loadNews = async () => {
    setLoading(true)
    const res = await fetch("/admin/news", { credentials: "include" })
    const data = await res.json()
    setNews(data.news || [])
    setLoading(false)
  }

  useEffect(() => {
    loadNews()
  }, [])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  const openEdit = (item: News) => {
    setEditingId(item.id)
    setForm({
      title: item.title || "",
      image_url: item.image_url || "",
      date: item.date || "",
      author: item.author || "",
      summary: item.summary || "",
      content: item.content || "",
    })
    setDrawerOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editingId ? `/admin/news/${editingId}` : "/admin/news"
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Request failed")
      toast.success(editingId ? "Đã cập nhật bài viết" : "Đã tạo bài viết mới")
      setDrawerOpen(false)
      await loadNews()
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Xoá bài viết này?")) return
    await fetch(`/admin/news/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    toast.success("Đã xoá bài viết")
    await loadNews()
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Tin tức</Heading>
        <Button size="small" onClick={openCreate}>
          + Thêm bài viết
        </Button>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tiêu đề</Table.HeaderCell>
            <Table.HeaderCell>Tác giả</Table.HeaderCell>
            <Table.HeaderCell>Ngày đăng</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!loading &&
            news.map((n) => (
              <Table.Row key={n.id}>
                <Table.Cell>{n.title}</Table.Cell>
                <Table.Cell>{n.author}</Table.Cell>
                <Table.Cell>{n.date}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end gap-2">
                    <IconButton size="small" onClick={() => openEdit(n)}>
                      <PencilSquare />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(n.id)}>
                      <Trash />
                    </IconButton>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      {!loading && news.length === 0 && (
        <div className="px-6 py-10 text-center text-ui-fg-subtle">
          Chưa có bài viết nào. Bấm &quot;Thêm bài viết&quot; để tạo mới.
        </div>
      )}

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{editingId ? "Sửa bài viết" : "Thêm bài viết mới"}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-4 overflow-y-auto">
            <div>
              <Label size="small">Tiêu đề</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label size="small">Ảnh (URL)</Label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label size="small">Tác giả</Label>
                <Input
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>
              <div>
                <Label size="small">Ngày đăng</Label>
                <Input
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label size="small">Tóm tắt</Label>
              <Textarea
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
              />
            </div>
            <div>
              <Label size="small">Nội dung (markdown)</Label>
              <Textarea
                rows={10}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>
              Huỷ
            </Button>
            <Button onClick={handleSave} isLoading={saving}>
              Lưu
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Tin tức",
  icon: Newspaper,
})

export default NewsPage
