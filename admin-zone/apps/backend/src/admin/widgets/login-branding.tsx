import { defineWidgetConfig } from "@medusajs/admin-sdk"

const LoginBrandingWidget = () => {
  return (
    <div className="mb-4 flex flex-col items-center gap-1">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#245B4A] text-sm font-black text-[#FFD700]">
        LT
      </div>
      <span className="text-base font-bold text-ui-fg-base">Linh Trang Admin</span>
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default LoginBrandingWidget
