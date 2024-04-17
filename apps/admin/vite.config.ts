import {createViteConfig} from '@config/vite'
import {defineConfig, UserConfig} from 'vite'

export default defineConfig(async ({command, mode}): Promise<UserConfig> => {
    const config = await createViteConfig(command, mode, process.cwd())
    // {preset: 'antd'}
    config.server = config.server || {}
    config.server.port = 3100
    return config
})
