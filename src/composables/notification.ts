import type { NotificationConfig } from '@arco-design/web-vue'
import { Notification } from '@arco-design/web-vue'
import type { RenderFunction } from 'vue'

type RenderContent = string | RenderFunction

interface NotiConfig {
  title?: string
  content: RenderContent
  type?: 'info' | 'success' | 'warning' | 'error'
}

export function Noti(options: NotiConfig) {
  const {
    title = '',
    content,
    type = 'success',
  } = options

  const config: NotificationConfig = {
    title,
    content,
    duration: 3000,
    position: 'topLeft',
    closable: true,
  }
  Notification[type](config)
}
