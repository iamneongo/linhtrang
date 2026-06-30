import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Buildings } from "@medusajs/icons"
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
import { PencilSquare, Trash } from "@medusajs/icons"
import { useEffect, useState } from "react"

type Project = {
  id: string
  title: string
  location: string | null
  image_url: string | null
  category: string | null
  year: string | null
  area: string | null
  style: string | null
  description: string | null
}

const emptyForm = {
  title: "",
  location: "",
  image_url: "",
  category: "",
  year: "",
  area: "",
  style: "",
  description: "",
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const loadProjects = async () => {
    setLoading(true)
    const res = await fetch("/admin/projects", { credentials: "include" })
    const data = await res.json()
    setProjects(data.projects || [])
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setDrawerOpen(true)
  }

  const openEdit = (project: Project) => {
    setEditingId(project.id)
    setForm({
      title: project.title || "",
      location: project.location || "",
      image_url: project.image_url || "",
      category: project.category || "",
      year: project.year || "",
      area: project.area || "",
      style: project.style || "",
      description: project.description || "",
    })
    setDrawerOpen(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url = editingId ? `/admin/projects/${editingId}` : "/admin/projects"
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Request failed")
      toast.success(editingId ? "Đã cập nhật dự án" : "Đã tạo dự án mới")
      setDrawerOpen(false)
      await loadProjects()
    } catch {
      toast.error("Có lỗi xảy ra, vui lòng thử lại")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Xoá dự án này?")) return
    await fetch(`/admin/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
    toast.success("Đã xoá dự án")
    await loadProjects()
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Dự án</Heading>
        <Button size="small" onClick={openCreate}>
          + Thêm dự án
        </Button>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Tên dự án</Table.HeaderCell>
            <Table.HeaderCell>Vị trí</Table.HeaderCell>
            <Table.HeaderCell>Phong cách</Table.HeaderCell>
            <Table.HeaderCell>Năm</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!loading &&
            projects.map((p) => (
              <Table.Row key={p.id}>
                <Table.Cell>{p.title}</Table.Cell>
                <Table.Cell>{p.location}</Table.Cell>
                <Table.Cell>{p.style}</Table.Cell>
                <Table.Cell>{p.year}</Table.Cell>
                <Table.Cell>
                  <div className="flex justify-end gap-2">
                    <IconButton size="small" onClick={() => openEdit(p)}>
                      <PencilSquare />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(p.id)}>
                      <Trash />
                    </IconButton>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

      {!loading && projects.length === 0 && (
        <div className="px-6 py-10 text-center text-ui-fg-subtle">
          Chưa có dự án nào. Bấm &quot;Thêm dự án&quot; để tạo mới.
        </div>
      )}

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>{editingId ? "Sửa dự án" : "Thêm dự án mới"}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="flex flex-col gap-4 overflow-y-auto">
            <div>
              <Label size="small">Tên dự án</Label>
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
                <Label size="small">Vị trí</Label>
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <div>
                <Label size="small">Danh mục</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>
              <div>
                <Label size="small">Năm hoàn thành</Label>
                <Input
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <div>
                <Label size="small">Diện tích</Label>
                <Input
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                />
              </div>
              <div>
                <Label size="small">Phong cách</Label>
                <Input
                  value={form.style}
                  onChange={(e) => setForm({ ...form, style: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label size="small">Mô tả</Label>
              <Textarea
                rows={5}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
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
  label: "Dự án",
  icon: Buildings,
})

export default ProjectsPage
